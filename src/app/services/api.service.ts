import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient,) { }

  postVehicle(data:any) {
    return this.http.post(`https://sheetdb.io/api/v1/fovjakpnx9d6c`,data)
  }
}
