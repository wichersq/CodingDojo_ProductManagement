import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
@Input() showingProduct:any;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router){}

  ngOnInit() {
  }

}
