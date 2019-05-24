import { Component, OnInit,Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  selectedProduct:any;
  constructor(   private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {

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
}
