import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {


  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  setLoading(loading: boolean, url: string): void {
    this.loadingSub.next(loading);
  }
}
