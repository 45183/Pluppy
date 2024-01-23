import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LikeTable from './Sections/LikeTable';
import { getLikeItems, removeLikeItem } from '../../store/thunkFunctions';

const LikePage = () => {

  const userData = useSelector(state => state.user?.userData);
  const likeDetail = useSelector(state => state.user?.likeDetail);
  const dispatch = useDispatch();

  useEffect(() => {
    let likeItemIds = []

    if(userData?.like && userData.like.length > 0){
      userData.like.forEach(item => {
        likeItemIds.push(item.id);
      })

      const body = {
        likeItemIds,
        userLike: userData.like
      };

      dispatch(getLikeItems(body));
    };
  }, [dispatch, userData])

  const handleRemoveLikeItem = (productId) => {
    dispatch(removeLikeItem(productId));
  };

  return (
    <section>
      <div className='text-center m-7'>
        <h2 className='text-2xl'>찜 목록</h2>
      </div>

      {likeDetail?.length > 0 ?
        <>
          <LikeTable products={likeDetail} onRemoveItem={handleRemoveLikeItem} />
        </>
        :
        <p>찜 목록이 비었습니다.</p>
      }
    </section>
  )
}

export default LikePage