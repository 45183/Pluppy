import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';


const CardCommunity = ({community}) => {
  return (
    <div className='border-[1px] border-gray-300'>
      <ImageSlider images={community.images}/>
      <Link to={`/community/${community._id}`}>
        <p className='p-1 text-center'>제목 : {community.title}</p>
        <p className='p-1 text-center'>작성자 : {community.writer.name}</p>
        
      </Link>
    </div>
  )
}

export default CardCommunity;