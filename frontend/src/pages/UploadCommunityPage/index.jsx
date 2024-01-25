import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileUploadCommunity from '../../components/FileUploadCommunity';
import axiosInstance from '../../utils/axios';

const categories = [
  {key: 1, value: '강아지'},
  {key: 2, value: '고양이'}
]

const UploadCommunityPage = () => {

  const [community, setCommunity] = useState({
    title: '',
    contents: '',
    categories: 1,
    images: []
  });

  const userData = useSelector(state => state.user?.userData);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;
    setCommunity((prevState) => ({
        ...prevState,
        [name]:value
    }));
  };

  const handleImages = (newImages) => {
    setCommunity((prevState) => ({
        ...prevState,
        images: newImages
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
        writer: userData.id,
        ...community
    };

    try {
        await axiosInstance.post('/community', body);
        navigate('/');
    } catch (error) {
        console.error(error);
    };
  };

  return (
    <section>
      <div className='text-center m-7'>
          <h1>게시글 업로드</h1>
      </div>
      <form className='mt-6' onSubmit={handleSubmit}>
          
          <FileUploadCommunity images={community.images} onImageChange={handleImages} />

          <div className='mt-4'>
              <label htmlFor='title'>제목</label>
              <input className='w-full px-4 py-2 bg-white border rounded-md' name='title' id='title' onChange={handleChange} value={community.title} />
          </div>
          <div className='mt-4'>
              <label htmlFor='contents'>내용</label>
              <input className='w-full px-4 py-2 bg-white border rounded-md' name='contents' id='contents' onChange={handleChange} value={community.contents} />
          </div>
          <div className='mt-4'>
              <label htmlFor='categories'>카테고리</label>
              <select className='w-full px-4 mt-2 bg-white border rounded-md' name='categories' id='categories' onChange={handleChange} value={community.categories}>
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
  );
};

export default UploadCommunityPage;