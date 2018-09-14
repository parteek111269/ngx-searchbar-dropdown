import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SearchbarModule } from './modules/searchbar/searchbar.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SearchbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
