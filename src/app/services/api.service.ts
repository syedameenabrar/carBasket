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

  postValuationForm(data:any) {
    return this.http.post(`https://zulukk-backend-dev.onrender.com/product/`,data)
  }

  getValuationForm() {
    return this.http.get(`https://zulukk-backend-dev.onrender.com/product/`)
  }
}
