import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productsState } from './products.reducer';
import { sumProducts } from "src/app/utils/sum-products";
import { getRouterSelectors } from "@ngrx/router-store";

const selectProductsState = createFeatureSelector<productsState>('products');

export const selectProducts = createSelector(
    selectProductsState,
    (state) => state.products
);

export const selectProductsLoading = createSelector(
    selectProductsState,
    (state) => state.loading
);

export const selectShowProductsCode = createSelector(
    selectProductsState,
    (state) => state.showProductsCode
);

export const selectProductsErrorMessage = createSelector(
    selectProductsState,
    (state) => state.errorMessage
)

export const selectSumProducts = createSelector(
    selectProducts,
    sumProducts
);

export const { selectRouteParams } = getRouterSelectors();

export const selectProductById = createSelector(
    selectProducts,
    selectRouteParams,
    (products, { id }) => products.find(product => product.id === parseInt(id))
)






