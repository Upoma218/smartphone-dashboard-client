import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TProduct } from '../../redux/types/productsTypes';

interface ProductState {
  products: TProduct[];
  loading: boolean;
  error: string | null;
  searQuery: string
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  searQuery: "",
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProduct[]>) => {
      state.products = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateProduct: (state, action: PayloadAction<TProduct>) => {
      state.products = state.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
    searchString: (state, action) => {
      state.searQuery = action.payload
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((product) => product._id !== action.payload);
    },
  },
});

export const { setProducts, setLoading, setError, deleteProduct, updateProduct, searchString  } = productSlice.actions;

export default productSlice.reducer;
