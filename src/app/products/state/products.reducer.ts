import { createReducer, on } from "@ngrx/store";
import { productsAPIActions, productsPageActions } from "./products.actions";
import { Product } from "../product.model";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export interface productsState extends EntityState<Product> {
    showProductsCode: boolean;
    loading: boolean;
    errorMessage: string
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialProductsState: productsState = adapter.getInitialState({
    showProductsCode: true,
    loading: false,
    errorMessage: ''
});

export const productsReducer = createReducer(
    initialProductsState,
    on(productsPageActions.toggleShowProductsCode, (state) => ({
        ...state,
        showProductsCode: !state.showProductsCode
    })),
    on(productsPageActions.loadProducts, (state) =>
        adapter.setAll([], {
            ...state,
            loading: true,
            errorMessage: ''
        })),
    on(productsAPIActions.productsLoadedSuccess, (state, { products }) =>
        adapter.setAll(products, {
            ...state,
            loading: false
        })),
    on(productsAPIActions.productsLoadedFail, (state, { errorMessage }) =>
        adapter.setAll([], {
            ...state,
            errorMessage,
            loading: false
        })),
    on(productsPageActions.addProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
    })),
    on(productsAPIActions.productAddedSuccess, (state, { product }) =>
        adapter.addOne(product, {
            ...state,
            loading: false
        })),
    on(productsAPIActions.productAddedFail, (state, { errorMessage }) => ({
        ...state,
        errorMessage: errorMessage,
        loading: false
    })),
    on(productsPageActions.updateProduct, (state) => ({
        ...state,
        errorMessage: '',
        loading: true
    })),
    on(productsAPIActions.productUpdatedSuccess, (state, { update }) =>
        adapter.updateOne(update, {
            ...state,
            loading: false
        })),
    on(productsAPIActions.productUpdatedFail, (state, { errorMessage }) => ({
        ...state,
        errorMessage: errorMessage,
        loading: false
    })),
    on(productsPageActions.deleteProduct, (state) => ({
        ...state,
        errorMessage: '',
        loading: true
    })),
    on(productsAPIActions.productDeletedSuccess, (state, { id }) =>
        adapter.removeOne(id, {
            ...state,
            loading: false
        })),
    on(productsAPIActions.productDeletedFail, (state, { errorMessage }) => ({
        ...state,
        errorMessage: errorMessage,
        loading: false
    })),
)

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectProducts = selectAll;
export const selectProductsEntities = selectEntities;


