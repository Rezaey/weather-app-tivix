import { Component, OnInit } from "@angular/core";
import { Stats } from "../models/stats.model";
import { TrackerService } from "../services/tracker.service";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"],
})
export class StatisticsComponent implements OnInit {
  stats: Stats;

  constructor(private trackerService: TrackerService) {}

  ngOnInit() {
    this.trackerService.getStats().subscribe((data) => {
      this.stats = data;
    });
  }
}
