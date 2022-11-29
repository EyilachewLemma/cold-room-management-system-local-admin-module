import {createSlice} from '@reduxjs/toolkit'

const productSlice = createSlice({
    name:'product',
    initialState:{products:[],productHistries:[],},
    reducers:{
        setProducts:(state,action)=>{
            state.products = action.payload
        },
        addProduct:(state,action)=>{
            state.products.push(action.payload)
        },
        setProductHistory:(state,action)=>{
            state.productHistries = action.payload
        },
        deleteHistory:(state,action)=>{
            const index  = state.productHistries.findIndex(product=>product.id === action.payload)
            state.productHistries.splice(index,1)
        }
        

    }
})
export const productAction = productSlice.actions
export default productSlice.reducer