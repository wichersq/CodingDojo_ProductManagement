import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  editingProduct: any;
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
  //  createNewTask(newTask){
  //    console.log("http.service.ts")
  //    return this._http.post('/tasks/new', newTask); //newTask is for req.body in server.js
  //  }
  //  // TODO: write deleteOneTask
  //  deleteOneTask(id){
  //    return this._http.delete(`/tasks/${id}`)
  //  }
  setEditingProduct(product) {
    this.editingProduct = product
    console.log('editing product in service', this.editingProduct)

  }
  deleteOneProduct(product){
    return this._http.delete(`delete_a_product/${product._id}`);

  }
}

