import { Component, OnInit } from '@angular/core';
import { ObservableService } from 'src/app/services/observable.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  constructor(private fetch:ObservableService, private router: Router) { }

  ngOnInit(): void {
  }

  goTo(data:any){
    console.log(data);
    this.fetch.fetchData(data);
    this.router.navigateByUrl('/valuation');
  }

}
