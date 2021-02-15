import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { TrackerComponent } from "./tracker/tracker.component";
import { DropdownDirective } from './directives/dropdown.directive';

@NgModule({
  declarations: [AppComponent, StatisticsComponent, TrackerComponent, DropdownDirective],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
