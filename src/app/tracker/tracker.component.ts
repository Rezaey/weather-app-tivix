import { Component, OnInit } from "@angular/core";
import { Tracker } from "../models/tracker.model";
import { TrackerService } from "../services/tracker.service";

@Component({
  selector: "app-tracker",
  templateUrl: "./tracker.component.html",
  styleUrls: ["./tracker.component.scss"],
})
export class TrackerComponent implements OnInit {
  tracker: Tracker;

  constructor(private trackerService: TrackerService) {}

  ngOnInit() {
    this.trackerService.getTracker().subscribe((data: Tracker) => {
      this.tracker = data;
    });
  }
}
