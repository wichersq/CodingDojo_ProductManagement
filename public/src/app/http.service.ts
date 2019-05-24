import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  targetingProduct: any;

  constructor(private _http: HttpClient) {

  }

  addNewProduct(product) {
    return this._http.post('/create_new_product', product);

  }
  getAllProducts() {
    // our http response is an Observable, store it in a variable
    return this._http.get('/get_all_products');
  }

  //  showOneTask(id){
  //    return this._http.get(`/showDetail/${id}`);
  //  }
  editOneProduct(updateInfo) {
    return this._http.put(`/update_the_product`, updateInfo);
  }

  updateTargetingProduct(product) {
    this.targetingProduct = product
    console.log('targeting product in service', this.targetingProduct)
  }

  getTargetingProduct() {
    console.log('getting targeting product in service', this.targetingProduct)
    let temp = this.targetingProduct;
    this.targetingProduct = {};
    return temp
  }
  deleteOneProduct(product) {
    return this._http.delete(`delete_a_product/${product._id}`);

  }
  createNewReview(id, review) {
    return this._http.put(`/addReviewToProduct/${id}`, review)
  }
}

