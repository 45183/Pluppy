import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import CommunityImage from './Sections/CommunityImage';
import CommunityInfo from './Sections/CommunityInfo';

const DetailCommunityPage = () => {

  const {communityId} = useParams();
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    async function fetchCommunity(){
      try {
        const response = await axiosInstance.get(`/community/${communityId}?type=single`);
        setCommunity(response.data[0]);
      } catch (error) {
        console.error(error);
      };
    }
    fetchCommunity();
  }, [communityId]);

  if(!community) return null;


  return (
    <section>
      <div className='text-center'>
        <h1 className='p-4 text-4xl'>{community.title}</h1>
      </div>
      <div className='w-full'>
        <CommunityImage community={community} />
      </div>
      <div className='w-full'>
        <CommunityInfo community={community} />
      </div>
    </section>
  )
}

export default DetailCommunityPage;;