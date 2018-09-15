import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	// @Input() options: any;
	// @Input() multiple: any;
	public config: any;
	public option: any;
	public dataModel: any;
	constructor(){
		this.config = {
            displayKey: 'name',
            search: true //enables the search plugin to search in the list
        }
        this.option = [{'name': 'parteek'}, {'name': 'uims'}, {'name': 'searchbar'}];
	}
	changeValue($event: any) {
        console.log($event);
    }
    keyWord(e){
    	console.log(e);
    }
}	
