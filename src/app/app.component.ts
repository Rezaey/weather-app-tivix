import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { TrackerService } from "./services/tracker.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Tivix Test";
  cities: string[] = [];
  selected: string;

  constructor(private trackerService: TrackerService) {}

  ngOnInit() {
    this.cities = Object.keys(this.trackerService.cities).map((key) => key);
  }

  setCity(city: string) {
    this.selected = city;
    this.trackerService.fetchWeather(city);
    this.trackerService.fetchDailyStats(city);
  }
}
