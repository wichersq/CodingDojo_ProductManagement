import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { HomeComponent } from './home/home.component';
import { ShowProductsComponent } from './show-products/show-products.component';
import { DetailProductComponent } from './detail-product/detail-product.component';

const routes: Routes = [
  {
    path: 'products', component: ProductsComponent
    , children: [
      { path: '', component: ShowProductsComponent },
      { path: 'edit/:id', component: EditProductComponent },
      { path: 'new', component: NewProductComponent },
      { path: 'detail/:id', component: DetailProductComponent },
      { path: '**', redirectTo: '' }
    ]
  },
  { path: 'home', pathMatch: 'full', redirectTo: '' },
  {
    path: '', component: HomeComponent
  }, {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
