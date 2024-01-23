import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { addToCart, addToLike } from '../../../store/thunkFunctions';

const ProductInfo = ({product}) => {

    const dispatch = useDispatch();

    const handleClickLike = () => {
        dispatch(addToLike({productId: product._id}))
    }
    const handleClickCart = () => {
        dispatch(addToCart({productId: product._id}))
    }

    return (
        <div className='mx-10'>
            <p className='text-2xl text-bold'>{product.title}</p>
            <ul>
                <li><span className='text-xl font-semibold text-gray-900'>가격 : </span>{product.price}원</li>
                <li><span className='text-xl font-semibold text-gray-900'>설명 : </span>{product.description}</li>
                {/* <li><span className='font-semibold text-gray-900'>팔린 개수 : </span>{product.sold}개</li> */}
            </ul>

            <div className='mt-3'>
                <button onClick={handleClickLike} className='w-1/6 px-4 py-2'><AiOutlineHeart size={30}/></button>
                {/* 찜한 상품이면 바뀌게 해야 함 */}
                {/* <button onClick={handleClickLike} className='w-1/6 px-4 py-2'><AiFillHeart  size={30}/></button> */}
                <button onClick={handleClickCart} className='w-1/6 px-4 py-2'><AiOutlineShoppingCart size={30}/></button>
            </div>
        </div>
    )
};

export default ProductInfo;