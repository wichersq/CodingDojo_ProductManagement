import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editingProduct: any
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

  ngOnInit() {
    this.editingProduct = { _id: "", title: "", price: null, url: "" }
    this.getEditingProduct()
  }
  getEditingProduct() {
    this._route.params.subscribe((params: Params) => {
      let temp = this._httpService.editingProduct
      if (temp._id === params['id']) {
        this.editingProduct = temp;
      } else {
        this.editingProduct = { _id: "", title: "", price: null, url: "" }
      }
    });
  }

  updateProduct() {
    this._httpService.editOneProduct(this.editingProduct).subscribe(data => {
      if (data['error']) {
        console.log(data['error'])
      } else {
        console.log(data['updatedData'])
        this._router.navigate(['products'])
      }

    })
  }

}
