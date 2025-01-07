import { Component } from '@angular/core';
import { Product } from '../product.model';
import { Store } from '@ngrx/store';
import { productsPageActions } from '../state/products.actions';
import { selectProducts, selectProductsErrorMessage, selectProductsLoading, selectShowProductsCode, selectSumProducts } from '../state/products.selector';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  constructor(private store: Store) {
  }

  products$ = this.store.select<Product[]>(selectProducts);
  total$ = this.store.select<number>(selectSumProducts);
  loading$ = this.store.select<boolean>(selectProductsLoading);
  showProductCode$ = this.store.select<boolean>(selectShowProductsCode);
  errorMessage$ = this.store.select<string>(selectProductsErrorMessage);

  toggleShowProductCode() {
    this.store.dispatch(productsPageActions.toggleShowProductsCode());
  }
}
