import { Component, OnInit,Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {
  // @Output() eventClicked = new EventEmitter<Event>();
  products = [];
  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService) { }

ngOnInit() {
  this.updateProducts()
}
updateProducts(){
  this._httpService.getAllProducts().subscribe(data =>{
    if(data["error"]){
      console.log('errorFromUpdate')
    }else{
      this.products = data['products']
    }
  })
}
getToEditPage(product): void {
  // this.eventClicked.emit(product);
  this._httpService.setEditingProduct(product);
  this._router.navigate([`products/edit/${product._id}`]);
}
deleteProduct(product){
  this._httpService.deleteOneProduct(product).subscribe(data=>{
    if(data["error"]){
      console.log('errorFromUpdate')
    }else{
      data['deleteData'];
      this.updateProducts();
    }
  });

}
}
