// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
// ** Actions
import {
  createProductAsync,
  deleteMultipleProductAsync,
  deleteProductAsync,
  getAllProductsAsync,
  getAllProductsLikedAsync,
  getAllProductsViewedAsync,
  likeProductAsync,
  unLikeProductAsync,
  serviceName,
  updateProductAsync
} from 'src/stores/product/actions'
const initialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: '',
  isSuccessCreateEdit: false,
  isErrorCreateEdit: false,
  messageErrorCreateEdit: '',
  isSuccessDelete: false,
  isErrorDelete: false,
  messageErrorDelete: '',
  isSuccessMultipleDelete: false,
  isErrorMultipleDelete: false,
  messageErrorMultipleDelete: '',
  isSuccessLike: false,
  isErrorLike: false,
  messageErrorLike: '',
  isSuccessUnLike: false,
  isErrorUnLike: false,
  messageErrorUnLike: '',
  products: {
    data: [],
    total: 0
  },
  viewedProducts: {
    data: [],
    total: 0
  },
  likedProducts: {
    data: [],
    total: 0
  }
}
export const productSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ''
      state.typeError = ''
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageErrorCreateEdit = ''
      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.messageErrorDelete = ''
      state.isSuccessMultipleDelete = false
      state.isErrorMultipleDelete = true
      state.messageErrorMultipleDelete = ''
      state.isSuccessLike = false
      state.isErrorLike = true
      state.messageErrorLike = ''
      state.isSuccessUnLike = false
      state.isErrorUnLike = true
      state.messageErrorUnLike = ''
    }
  },
  extraReducers: builder => {
    // ** get all products
    builder.addCase(getAllProductsAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllProductsAsync.fulfilled, (state, action) => {
      console.log(action)
      state.isLoading = false
      state.products.data = action.payload?.data || []
      state.products.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllProductsAsync.rejected, (state, action) => {
      state.isLoading = false
      state.products.data = []
      state.products.total = 0
    })
    // ** create product
    builder.addCase(createProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?.data.id
      state.isErrorCreateEdit = !action.payload?.data?.data.id
      state.messageErrorCreateEdit = action.payload?.data?.message
      state.typeError = action.payload?.typeError
    })
    // ** update product
    builder.addCase(updateProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?.data.id
      state.isErrorCreateEdit = !action.payload?.data?.data.id
      state.messageErrorCreateEdit = action.payload?.data?.message
      state.typeError = action.payload?.typeError
    })
    // ** delete product
    builder.addCase(deleteProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?.data
      state.isErrorDelete = !action.payload?.data?.data
      state.messageErrorDelete = action.payload?.data?.message
      state.typeError = action.payload?.typeError
    })
    // ** delete multiple product
    builder.addCase(deleteMultipleProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data?.data
      state.isErrorMultipleDelete = !action.payload?.data?.data
      state.messageErrorMultipleDelete = action.payload?.data?.message
      state.typeError = action.payload?.typeError
    })
    // ** like product
    builder.addCase(likeProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(likeProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessLike = !!action.payload?.data
      state.isErrorLike = !action.payload?.data
      state.messageErrorLike = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    // ** unlike product
    builder.addCase(unLikeProductAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(unLikeProductAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessUnLike = !!action.payload?.data
      state.isErrorUnLike = !action.payload?.data
      state.messageErrorUnLike = action.payload?.message
      state.typeError = action.payload?.typeError
    })
    // ** get all viewed products
    builder.addCase(getAllProductsViewedAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllProductsViewedAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.viewedProducts.data = action.payload?.data?.products || []
      state.viewedProducts.total = action.payload?.data?.totalCount
    })
    builder.addCase(getAllProductsViewedAsync.rejected, (state, action) => {
      state.isLoading = false
      state.viewedProducts.data = []
      state.viewedProducts.total = 0
    })
    // ** get all liked products
    builder.addCase(getAllProductsLikedAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllProductsLikedAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.likedProducts.data = action.payload?.data || []
      state.likedProducts.total = action.payload?.totalCount
    })
    builder.addCase(getAllProductsLikedAsync.rejected, (state, action) => {
      state.isLoading = false
      state.likedProducts.data = []
      state.likedProducts.total = 0
    })
  }
})
export const { resetInitialState } = productSlice.actions
export default productSlice.reducer
