import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  constructor() { }
  
  public getDataSubject = new BehaviorSubject(null);

  fetchData(data: any) {
    this.getDataSubject.next(data);
  }
}
