import { createFeatureSelector, createSelector } from "@ngrx/store";
import { sumProducts } from "src/app/utils/sum-products";
import { getRouterSelectors } from "@ngrx/router-store";
import * as fromProducts from './products.reducer'

const selectProductsState = createFeatureSelector<fromProducts.productsState>('products');

export const selectProducts = createSelector(
    selectProductsState,
    fromProducts.selectProducts
);

export const selectProductsEntities = createSelector(
    selectProductsState,
    fromProducts.selectProductsEntities
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
    selectProductsEntities,
    selectRouteParams,
    (products, { id }) => products[id]
);






