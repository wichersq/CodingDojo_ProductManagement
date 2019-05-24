import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  selectedProduct: any;
  newReview: any;
  allReviews: any
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.newReview = { content: "", rate: null };
    this.selectedProduct = { _id: "", title: "", price: null, url: "" }
    this.getTargetingProduct();
    this.allReviews = this.selectedProduct.reviews

  }

  getTargetingProduct() {
    this._route.params.subscribe((params: Params) => {
      let temp = this._httpService.getTargetingProduct();
      if (temp && temp._id === params['id']) {
        console.log("getInfo")
        this.selectedProduct = temp;
      } else {
        this.selectedProduct = { _id: "", title: "", price: null, url: "" }
        this._router.navigate(['products'])
      }
    });
  }


  addReviews(id) {
    if (this.selectedProduct._id === id) {
      this._httpService.createNewReview(id, this.newReview).subscribe(data => {
        if (data["error"]) {
          console.log('errorFromUpdate')
        } else {
          console.log('update is done', data['updatedData'])
          this.selectedProduct = data['updatedData'];
        }
      });
    } else {

      this._router.navigate(['products'])

    }
  }
}
