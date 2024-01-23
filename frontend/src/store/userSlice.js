import { createSlice } from "@reduxjs/toolkit";
import { addToCart, addToLike, authUser, getCartItems, getLikeItems, loginUser, logoutUser, registerUser, removeCartItem, removeLikeItem } from "./thunkFunctions";
import { toast } from "react-toastify";

const initialState = {
    userData: {
        id: '',
        email: '',
        name: '',
        role: 0,
        image: '',
    },
    isAuth: false,
    isLoading: false,
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                toast.info('회원가입을 성공했습니다.')
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true;
                localStorage.setItem('accessToken', action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            
            .addCase(authUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.userData = initialState.userData;
                state.isAuth = false;
                localStorage.removeItem('accessToken');
            })

            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = initialState.userData;
                state.isAuth = false;
                localStorage.removeItem('accessToken');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload)
            })

            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData.cart = action.payload;
                toast.info('장바구니에 추가되었습니다.');
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartDetail = action.payload; 
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(removeCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartDetail = action.payload.productInfo;
                state.userData.cart = action.payload.cart;
                toast.info('상품이 장바구니에서 제거되었습니다.')
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(addToLike.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToLike.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData.like = action.payload;
                toast.info('찜목록에 추가되었습니다.');
            })
            .addCase(addToLike.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(getLikeItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLikeItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.likeDetail = action.payload; 
            })
            .addCase(getLikeItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })

            .addCase(removeLikeItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeLikeItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.likeDetail = action.payload.productInfo;
                state.userData.like = action.payload.like;
                toast.info('상품이 찜목록 제거되었습니다.')
            })
            .addCase(removeLikeItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
    }
})

export default userSlice.reducer;