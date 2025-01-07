import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Product } from "../product.model";

export const productsPageActions = createActionGroup({
    source: 'Products Page',
    events: {
        'Toggle Show Products Code': emptyProps(),
        'Load Products': emptyProps(),
        'Add Product': props<{ product: Product }>(),
        'Update Product': props<{ product: Product }>(),
        'Delete Product': props<{ id: number }>(),
    }
});

export const productsAPIActions = createActionGroup({
    source: 'Products API',
    events: {
        'Products Loaded Success': props<{ products: Product[] }>(),
        'Products Loaded Fail': props<{ errorMessage: string }>(),
        'Product Added Success': props<{ product: Product }>(),
        'Product Added Fail': props<{ errorMessage: string }>(),
        'Product Updated Success': props<{ product: Product }>(),
        'Product Updated Fail': props<{ errorMessage: string }>(),
        'Product Deleted Success': props<{ id: number }>(),
        'Product Deleted Fail': props<{ errorMessage: string }>()
    }
})