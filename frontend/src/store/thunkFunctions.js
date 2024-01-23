import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axios';

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (body, thunkAPI) => {
        try{
            const response = await axiosInstance.post(
                `/users/register`, 
                body
            );
            return response.data;
        } catch (error){
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
);

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/login`,
                body
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        };
    }
);

export const authUser = createAsyncThunk(
    "user/authUser",
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/users/auth`
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        };
    }
);

export const logoutUser = createAsyncThunk(
    "user/logoutUser",
    async (_, thunkAPI) => {
        try{
            const response = await axiosInstance.post(
                `/users/logout`, 
            );
            return response.data;
        } catch (error){
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
); 


export const addToLike = createAsyncThunk(
    "user/addToLike",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/like`,
                body
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        };
    }
);

export const addToCart = createAsyncThunk(
    "user/addToCart",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/cart`,
                body
            );
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        };
    }

);

export const getCartItems = createAsyncThunk(
    "user/getCartItems",
    async ({cartItemIds, userCart}, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/shop/${cartItemIds}?type=array`,
            )

            // CartItem에 해당하는 정보들을 Product Collection에서 가져온 후에 quantity 정보 넣어줌
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if(cartItem.id === productDetail._id){
                        response.data[index].quantity = cartItem.quantity;
                    };
                })
            })
            
            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
);

export const getLikeItems = createAsyncThunk(
    "user/getLikeItems",
    async ({likeItemIds, userLike}, thunkAPI) => {
        try {
            const response = await axiosInstance.get(
                `/shop/${likeItemIds}?type=array`,
            )

            userLike.forEach(likeItem => {
                response.data.forEach((productDetail, index) => {
                    if(likeItem.id === productDetail._id){
                        response.data[index].quantity = likeItem.quantity
                    }
                })
            })
            
            console.log(response)

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
);



export const removeCartItem = createAsyncThunk(
    "user/removeCartItem",
    async (prodcutId, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(
                `/users/cart?productId=${prodcutId}`
            )

            response.data.cart.forEach(cartItem => {
                response.data.productInfo.forEach((productDetail, index) => {
                    if(cartItem.id === productDetail._id){
                        response.data.productInfo[index].quantity = cartItem.quantity;
                    };
                })
            })

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)
export const removeLikeItem = createAsyncThunk(
    "user/removeLikeItem",
    async (prodcutId, thunkAPI) => {
        try {
            const response = await axiosInstance.delete(
                `/users/like?productId=${prodcutId}`
            )

            response.data.like.forEach(likeItem => {
                response.data.productInfo.forEach((productDetail, index) => {
                    if(likeItem.id === productDetail._id){
                        response.data.productInfo[index]._id = likeItem.id;
                    };
                })
            })

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)