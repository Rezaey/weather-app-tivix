import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tracker } from "../models/tracker.model";
import { Observable, Subject } from "rxjs";
import { take } from "rxjs/operators";
import { Stats } from "../models/stats.model";

@Injectable({
  providedIn: "root",
})
export class TrackerService {
  private WeatheTrk = new Subject<any>();
  private Stats = new Subject<Stats>();

  cities = {
    Toronto: { lon: -79.347015, lat: 43.65107 },
    Montreal: { lon: -73.561668, lat: 45.508888 },
    Vancouver: { lon: -123.116226, lat: 49.246292 },
    Calgary: { lon: -114.066666, lat: 51.049999 },
    Edmonton: { lon: -113.323975, lat: 53.631611 },
    Ottawa: { lon: -75.695, lat: 45.424721 },
  };

  constructor(private http: HttpClient) {}

  fetchWeather(city: string) {
    this.http
      .get<any>(
        `http://api.openweathermap.org/data/2.5/weather?appid=a1a10c9e8bba40689372813c797c8b88&q=${city}&units=metric`
      )
      .subscribe((data) => {
        const tker = new Tracker(
          data["main"]["temp_min"],
          data["main"]["temp_max"],
          data["main"]["temp"],
          data["weather"][0]["main"]
        );
        this.WeatheTrk.next(tker);
      }),
      (error) => {
        console.log(error);
      };
  }

  fetchDailyStats(city: string) {
    const long = this.cities[city]["lon"];
    const lat = this.cities[city]["lat"];
    this.http
      .get<Stats>(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=a1a10c9e8bba40689372813c797c8b88&exclude=hourly,minutely,alerts&units=metric`
      )
      .pipe(take(1))
      .subscribe((data) => {
        const newStats = new Stats(
          data["daily"][0]["temp"]["day"],
          data["daily"][0]["temp"]["morn"],
          data["daily"][0]["temp"]["night"],
          data["daily"][0]["humidity"]
        );
        this.Stats.next(newStats);
      }),
      (error) => {
        console.log(error);
      };
  }

  getTracker(): Observable<any> {
    return this.WeatheTrk.asObservable();
  }

  getStats(): Observable<any> {
    return this.Stats.asObservable();
  }
}
