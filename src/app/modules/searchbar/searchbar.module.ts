import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar.component';
import { FormsModule } from '@angular/forms';
// pipes
import { FilterPipe } from "../../pipes/filter/filter.pipe";
import { LimittoPipe } from "../../pipes/limitto/limitto.pipe";
@NgModule({
	declarations: [SearchbarComponent, FilterPipe, LimittoPipe],
	imports: [ CommonModule, FormsModule ],
	exports: [SearchbarComponent, LimittoPipe],
	providers: [],
	bootstrap: []
})
export class SearchbarModule {}
