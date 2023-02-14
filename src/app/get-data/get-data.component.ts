import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-get-data',
  templateUrl: './get-data.component.html',
  styleUrls: ['./get-data.component.css']
})
export class GetDataComponent implements OnInit {

  getList:any[]=[]
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.getValuationForm().subscribe((res:any) => {
      console.log(res)
      this.getList = res.data;
    })
  }


}
