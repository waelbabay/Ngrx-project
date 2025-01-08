import { Component } from '@angular/core';
import { Product } from '../product.model';
import { Store } from '@ngrx/store';
import { selectProductById, selectProductsLoading } from '../state/products.selector';
import { productsPageActions } from '../state/products.actions';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {
  constructor(
    private store: Store
  ) { }

  product$ = this.store.select(selectProductById);
  loading$ = this.store.select(selectProductsLoading);

  addProduct(product: Product) {
    this.store.dispatch(productsPageActions.addProduct({ product }));
  }

  updateProduct(product: Product) {
    this.store.dispatch(productsPageActions.updateProduct({ product }));
  }

  deleteProduct(id: number) {
    this.store.dispatch(productsPageActions.deleteProduct({ id }));
  }
}
