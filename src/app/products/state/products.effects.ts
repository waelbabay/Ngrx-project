import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { productsAPIActions, productsPageActions } from "./products.actions";
import { catchError, concatMap, exhaustMap, map, mergeMap, of } from "rxjs";
import { OnInitEffects } from "@ngrx/effects/src/lifecycle_hooks";
import { Action } from "@ngrx/store";

@Injectable()
export class productEffects implements OnInitEffects {
    constructor(private actions$: Actions, private productsService: ProductsService) {
    }

    ngrxOnInitEffects(): Action {
        console.log('init effects')
        return productsPageActions.loadProducts();
    }

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productsPageActions.loadProducts),
            exhaustMap(() => this.productsService.getAll().pipe(
                map(products => productsAPIActions.productsLoadedSuccess({ products })),
                catchError((errorMessage) => of(productsAPIActions.productsLoadedFail({ errorMessage })))
            ))
        )
    );

    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productsPageActions.addProduct),
            mergeMap(({ product }) => this.productsService.add(product).pipe(
                map(product => productsAPIActions.productAddedSuccess({ product })),
                catchError((errorMessage) => of(productsAPIActions.productAddedFail({ errorMessage })))
            ))
        )
    );

    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productsPageActions.updateProduct),
            concatMap(({ product }) => this.productsService.update(product).pipe(
                map(product => productsAPIActions.productUpdatedSuccess({ product })),
                catchError((errorMessage) => of(productsAPIActions.productAddedFail({ errorMessage })))
            ))
        )
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(productsPageActions.deleteProduct),
            concatMap(({ id }) => this.productsService.delete(id).pipe(
                map(() => productsAPIActions.productDeletedSuccess({ id })),
                catchError((errorMessage) => of(productsAPIActions.productDeletedFail({ errorMessage })))
            ))
        )
    );
} 