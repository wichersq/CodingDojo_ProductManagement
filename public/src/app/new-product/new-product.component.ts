import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  creatingProduct: any
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.creatingProduct = { title: "", url: "", price: null };
  }

  createNewProduct() {
    this._httpService.addNewProduct(this.creatingProduct).subscribe(data => {
      if (data['error']) {
        console.log(data['error'])
      } else {
        this.creatingProduct = { title: "", url: "", price: null };
        this._router.navigate(['products'])
      }
    })
    //TODO:create a new product
  }

}
