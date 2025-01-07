import { createAction, createReducer, on } from "@ngrx/store";
import { productsAPIActions, productsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface productsState {
    showProductsCode: boolean;
    loading: boolean;
    products: Product[],
    errorMessage: string
}

const initialProductsState: productsState = {
    showProductsCode: true,
    loading: false,
    products: [],
    errorMessage: ''
}

export const productsReducer = createReducer(
    initialProductsState,
    on(productsPageActions.toggleShowProductsCode, (state) => ({
        ...state,
        showProductsCode: !state.showProductsCode
    })),
    on(productsPageActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
        products: []
    })),
    on(productsAPIActions.productsLoadedSuccess, (state, { products }) => ({
        ...state,
        products: products,
        loading: false
    })),
    on(productsAPIActions.productsLoadedFail, (state, { errorMessage }) => ({
        ...state,
        errorMessage,
        loading: false,
        products: []
    })),
    on(productsPageActions.addProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
    })),
    on(productsAPIActions.productAddedSuccess, (state, { product }) => ({
        ...state,
        products: [...state.products, product],
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
    on(productsAPIActions.productUpdatedSuccess, (state, { product }) => ({
        ...state,
        products: state.products.map((existingProduct) => existingProduct.id === product.id ? product : existingProduct),
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
    on(productsAPIActions.productDeletedSuccess, (state, { id }) => ({
        ...state,
        products: state.products.filter((product) => product.id !== id),
        loading: false
    })),
    on(productsAPIActions.productDeletedFail, (state, { errorMessage }) => ({
        ...state,
        errorMessage: errorMessage,
        loading: false
    })),
)
