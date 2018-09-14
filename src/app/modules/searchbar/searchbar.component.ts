import { Component, OnInit, Input, EventEmitter, Output, HostListener, OnChanges, SimpleChanges, ViewChildren, ElementRef, QueryList } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit, OnChanges {
	// Get the required inputs  options = inputItems
	@Input() public inputItems: any = [{'name': 'parteek'}, {'name': 'uims'}, {'name': 'searchbar'}];

	// configuration options
	@Input() public config: any = {};

	// Whether multiple selection or single selection allowed
  	@Input() public ismultiple: boolean = false;

  	// value
    @Input() public value: any;

    // event when value changes to update in the UI
    @Output() public valueChange: EventEmitter<any> = new EventEmitter();

  	// change event when value changes to provide user to handle things in change event
    @Output() public change: EventEmitter<any> = new EventEmitter();

    // to get the typed string
    @Output() public keyWord: EventEmitter<any> = new EventEmitter();

    // Toogle list toggleDropdown = toggleList
  	public toggleList: boolean = false;

  	// Available items for selection availableItems = availItems
  	public availItems: any = [];

  	// Selected Items
	public selectedItems: any = [];

	// Selection text to be Displayed
    public selectedDisplayText: string = "Select";

    // Search text
    public searchtxt: string;

    // variable to track if clicked inside or outside of component
    public clickedInside: boolean = false;

    // variable to track the focused item whenuser uses arrow keys to select item
  	public focusedItemIndex: number = null;

  	// Get the reference to available items in the list to focus on the item when scrolling
	@ViewChildren('availOption') public availOptions: QueryList<ElementRef>;

	constructor() {}
	
	ngOnInit() {
        console.log(this.inputItems)
		if (typeof this.inputItems !== "undefined" && Array.isArray(this.inputItems)) {
    		this.availItems = [...this.inputItems.sort(this.config.customComparator)];
      		this.initDropdownValuesAndOptions();
    	}
	}

	// change event to detect when input changes
  	public ngOnChanges(changes: SimpleChanges) {
    	this.selectedItems = [];
    	this.searchtxt = null;
    	this.inputItems = this.inputItems || [];
    	if (changes.inputItems) {
      		this.availItems = [...this.inputItems.sort(this.config.customComparator)];
    	}
		this.initDropdownValuesAndOptions();
  	}

    // click listener for host inside this component (check for multiple instances and detects if click inside)
	@HostListener('click')
  	public clickInsideComponent() {
    	this.clickedInside = true;
  	}

  	// click handler on documnent to hide the open list if clicked outside
  	@HostListener('document:click')
	public clickOutsideComponent() {
    	if (!this.clickedInside) {
    		this.toggleList = false;
      		this.resetArrowKeyActiveElement();
    	}
    	this.clickedInside = false;
  	}

    // Event handler for key up and down event and enter press for selecting item
	@HostListener('document:keydown', ['$event'])
	public handleKeyboardEvent($event: KeyboardEvent) {
		const avaOpts = this.availOptions.toArray();
		if ($event.code === 'ArrowDown' && avaOpts.length > 0) {
    		this.onArrowKeyDown(avaOpts);
    		avaOpts[this.focusedItemIndex].nativeElement.focus();
    		$event.preventDefault();
		}
		if ($event.code === 'ArrowUp' && avaOpts.length) {
  			this.onArrowKeyUp(avaOpts);
    		avaOpts[this.focusedItemIndex].nativeElement.focus();
  			$event.preventDefault();
		}
		if ($event.code === 'Enter' && this.focusedItemIndex !== null) {
  			this.selectItem(this.availItems[this.focusedItemIndex], this.focusedItemIndex);
  			return false;
		}
	}
	
   	// unselect the items
   	// @param item:  item to be deselected
   	// @param index:  index of the item
   // 	public deselectItem(item: any, index: number) {
   //  	this.selectedItems.splice(index, 1);
   //  	if (!this.availItems.includes(item)) {
   //    		this.availItems.push(item);
   //    		this.availItems.sort(this.config.customComparator);
   //  	}
	  //   this.selectedItems = [...this.selectedItems];
	  //   this.availItems = [...this.availItems];
	  //   this.valueChanged();
	  //   this.resetArrowKeyActiveElement();
  	// }
    
   	// Select an item
   	// @param item:  item to be selected
   	// @param index:  index of the item
    public selectItem(item: string, index: number) {
    	if (!this.ismultiple) {
      		if (this.selectedItems.length > 0) {
        		this.availItems.push(this.selectedItems[0]);
      		}
      		this.selectedItems = [];
    	  	this.toggleList = false;
    	}
    	this.availItems.splice(index, 1);
	    this.selectedItems.push(item);
	    this.selectedItems = [...this.selectedItems];
	    this.availItems = [...this.availItems];
	    this.selectedItems.sort(this.config.customComparator);
	    this.availItems.sort(this.config.customComparator);
	    this.valueChanged();
	    this.resetArrowKeyActiveElement();
  	}

  	// When selected items changes trigger the chaange back to parent
	public valueChanged() {
	    this.value = this.selectedItems;
	    this.valueChange.emit(this.value);
	    this.change.emit({ value: this.value });
	    // this.setSelectedDisplayText();
	}

	// Toggle the dropdownlist on/off
    // @param event
    public toggleSelectDropdown($event: any) {
    	this.toggleList = !this.toggleList;
    	this.resetArrowKeyActiveElement();
  	}

  	// initialize the config and other properties
  	private initDropdownValuesAndOptions() {
    	const config: any = {
      		displayKey: "name",
      		height: 'auto',
      		search: false,
      		placeholder: 'Search/Add Project',
      		limitTo: this.inputItems.length,
      		customComparator: undefined
    	};
	    if (this.config === "undefined" || Object.keys(this.config).length === 0) {
	    	this.config = { ...config };
	    }
	    for (const key of Object.keys(config)) {
	    	this.config[key] = this.config[key] ? this.config[key] : config[key];
	    }
    	// Adding placeholder in config as default param
    	this.selectedDisplayText = this.config["placeholder"];
    	if (this.value !== "" && typeof this.value !== "undefined" && Array.isArray(this.value)) {
      		this.selectedItems = this.value;
      		this.value.forEach((item: any) => {
        		const ind = this.availItems.indexOf(item);
        		if (ind !== -1) {
          			this.availItems.splice(ind, 1);
        		}
      		});
      		// this.setSelectedDisplayText();
    	}
  	}

  	// set the text to be displayed
 //  	private setSelectedDisplayText() {
	//     let text: string = this.selectedItems[0];
	//     if (typeof this.selectedItems[0] === "object") {
	//     	text = this.selectedItems[0][this.config.displayKey];
	//     }
	//     if (this.ismultiple && this.selectedItems.length > 0) {
	//     	this.selectedDisplayText = this.selectedItems.length === 1 ? text :
	//         text + ` + ${this.selectedItems.length - 1} more`;
	//     }else{
	//     	this.selectedDisplayText = this.selectedItems.length === 0 ? this.config.placeholder : text;
	//     }
	// }

	// Event handler for arrow key up
	private onArrowKeyUp(avaOpts) {
	    if (this.focusedItemIndex === 0) {
	    	this.focusedItemIndex = avaOpts.length - 1;
	      	return;
	    }
	    if (this.onArrowKey()) {
	    	this.focusedItemIndex--;
	    }
  	}

	// Event handler for arrow key down
	private onArrowKeyDown(avaOpts) {
	    if (this.focusedItemIndex === avaOpts.length - 1) {
	      	this.focusedItemIndex = 0;
	      	return;
	    }
    	if (this.onArrowKey()) {
      		this.focusedItemIndex++;
    	}
  	}

  	private onArrowKey() {
	    if (this.focusedItemIndex === null) {
	    	this.focusedItemIndex = 0;
	      	return false;
	    }
	    return true;
	}

	// reset the active element
	private resetArrowKeyActiveElement() {
    	this.focusedItemIndex = null;
	}
    // key event to get the type string
    keyevent(string, e){
        this.keyWord.emit(string)
    }
}
