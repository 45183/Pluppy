import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';


// 세부 카테고리 설정 -> select - optgroup - option 으로 할수 있는지 확인
const categories = [
    {key: 1, value: '강아지'},
    {key: 2, value: '고양이'}
]


// 이런 방식으로하고 진행 가능한지 -> 나중에 강아지 부분만 볼경우 key 1~4 조회 하는 방식으로
// const categories = [
//     {key: 1, value: '강아지 - 사료'},
//     {key: 2, value: '강아지 - 간식'},
//     {key: 3, value: '강아지 - 위생'},
//     {key: 4, value: '강아지 - 기타'},
//     {key: 5, value: '고양이 - 사료'},
//     {key: 6, value: '고양이 - 간식'},
//     {key: 7, value: '고양이 - 위생'},
//     {key: 8, value: '고양이 - 기타'}
// ]

const UploadProductPage = () => {

    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: 0,
        categories: 1,
        images: []
    });

    const userData = useSelector(state => state.user?.userData);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]:value
        }));
    };

    const handleImages = (newImages) => {
        setProduct((prevState) => ({
            ...prevState,
            images: newImages
        }));
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        const body = {
            writer: userData.id,
            ...product
        };

        try {
            await axiosInstance.post('/shop', body);
            navigate('/');
        } catch (error) {
            console.error(error);
        };
    };


    return (
        <section>
            <div className='text-center m-7'>
                <h1>상품 업로드</h1>
            </div>
            <form className='mt-6' onSubmit={handleSubmit}>
                
                <FileUpload images={product.images} onImageChange={handleImages} />

                <div className='mt-4'>
                    <label htmlFor='title'>이름</label>
                    <input className='w-full px-4 py-2 bg-white border rounded-md' name='title' id='title' onChange={handleChange} value={product.title} />
                </div>
                <div className='mt-4'>
                    <label htmlFor='description'>설명</label>
                    <input className='w-full px-4 py-2 bg-white border rounded-md' name='description' id='description' onChange={handleChange} value={product.description} />
                </div>
                <div className='mt-4'>
                    <label htmlFor='price'>가격</label>
                    <input className='w-full px-4 py-2 bg-white border rounded-md' type='number' name='price' id='price' onChange={handleChange} value={product.price} />
                </div>
                <div className='mt-4'>
                    <label htmlFor='categories'>카테고리</label>
                    <select className='w-full px-4 mt-2 bg-white border rounded-md' name='categories' id='categories' onChange={handleChange} value={product.categories}>
                        {categories.map(item => (
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                    </select>
                </div>
                <div className='mt-4'>
                    <button type='submit' className='w-full px-4 text-white bg-black rounded-md hover:bg-gray-700 py-2'>생성하기</button>
                </div>
            </form>
        </section>
    )
}

export default UploadProductPage