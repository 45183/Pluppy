import React, { useEffect, useState } from 'react'
import CheckBox from '../ShopPage/Sections/CheckBox'
import SearchInput from '../ShopPage/Sections/SearchInput'
import axiosInstance from '../../utils/axios';
import { categories } from '../../utils/filterData';
import CardCommunity from './Sections/CardCommunity';
import { Link } from 'react-router-dom';

const CommunityPage = () => {

    const limit = 4;
    const [searchTerm, setSearchTerm] = useState('');
    const [community, setCommunity]= useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [filters, setFilters] = useState({
        categories: []
    });

    useEffect(() => {
      fetchCommunity({skip, limit})
    }, []);

    const fetchCommunity = async ({skip, limit, loadMore = false, filters={}, searchTerm= ""}) => {
      const params = {
          skip,
          limit,
          filters,
          searchTerm
      };

      try {
          const response = await axiosInstance.get('/community', {params});

          if(loadMore){
              setCommunity([...community, ...response.data.community]);
          } else{
            setCommunity(response.data.community);
          };
          setHasMore(response.data.hasMore);
          
      } catch (error) {
          console.error(error);
      };
    };


    const handleLoadMore = () => {
      const body = {
          skip: skip + limit,
          limit,
          loadMore: true,
          filters,
          searchTerm
      };
      fetchCommunity(body);
      setSkip(skip + limit);
    };

    const handleFilters = (newFilteredData, category) => {
      const newFilters = {...filters};
      newFilters[category] = newFilteredData;

      showFilteredResults(newFilters);
      setFilters(newFilters);
    };

    const showFilteredResults = (filters) => {
      const body = {
          skip: 0,
          limit,
          filters,
          searchTerm
      };

      fetchCommunity(body);
      setSkip(0);
    };
    
    const handleSearchTerm = (event) => {
      const body = {
          skip: 0,
          limit,
          filters,
          searchTerm: event.target.value
      };
      setSkip(0);
      setSearchTerm(event.target.value);
      fetchCommunity(body);
    }


  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>커뮤니티</h2>
      </div>

      {/* filter */}
      <div className='flex flex-col'>
        <CheckBox categories={categories} checkedCategories={filters.categories} onFilters={filters => handleFilters(filters, 'categories')} />
      </div>

      {/* search */}
      <div className='flex justify-end mb-3'>
        <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
      </div>

      {/* card */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {community.map(community => <CardCommunity community={community} key={community._id} />)}
      </div>

      {/* load more */}
      {hasMore &&
      <div className='flex justify-center mt-5'>
          <button onClick={handleLoadMore} className='px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500'>더 보기</button>
      </div> 
      }

      <div className='flex justify-end'>
        <button className='border-[1px] bg-gray-200 rounded-md px-2 py-1 mt-5'>
          <Link to={'/community/upload'}>글쓰기</Link>
        </button>
      </div>
    </section>
  )
}

export default CommunityPage