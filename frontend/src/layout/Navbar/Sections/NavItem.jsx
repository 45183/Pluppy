import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/thunkFunctions';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AiOutlineHeart } from "react-icons/ai";

const routes = [
  {to: '/login', name:'로그인', auth: false},
  {to: '/register', name:'회원가입', auth: false},
  {to: '/shop/upload', name:'업로드', auth: true},
  {to: '/user/like', name:'찜', auth: true, icon: <AiOutlineHeart  style={{fontSize: '1.4rem'}} />},
  {to: '/user/cart', name:'카트', auth: true, icon: <AiOutlineShoppingCart style={{fontSize: '1.4rem'}} />},
  {to: '', name:'로그아웃', auth: true},
  {to: '/mypage', name:'마이페이지', auth: true},
  {to: '/history', name:'주문목록', auth: true},
]

const NavItem = ({mobile}) => {

  const isAuth = useSelector(state => state.user?.isAuth);
  const cart = useSelector(state => state.user?.userData?.cart);
  const like = useSelector(state => state.user?.userData?.like);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 메인페이지로 돌아갈 경우
    // dispatch(logoutUser());
    // navigate('/');

    // 다시 로그인 페이지로 갈 경우
    dispatch(logoutUser())
      .then(() => {
        navigate('/login');
      });
  };

  return (
    <ul className={`text-md justify-center w-full flex gap-4 ${mobile && "flex-col bg-gray-100 h-full"} items-center`}>
      {/* 업로드 페이지 -> 관리자 로그인일때만 나타나게 설정해야함 */}
      {routes.map(({to, name, auth, icon}) => {
        if(isAuth !== auth) return null;

        if(name === '로그아웃'){
          return <li key={name} className='py-2 text-center border-b-4 cursor-pointer'><Link onClick={handleLogout}>{name}</Link></li>
        } else if(icon && name === '카트'){
          return(
            <li className='relative py-2 text-center border-b-4 cursor-pointer' key={name}>
            <Link to={to}>
              {icon}
              <span className='absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -right-3'>
                {cart?.length}
              </span>
            </Link>
          </li>
          )
        } else if(icon && name === '찜'){
          return(
            <li className='relative py-2 text-center border-b-4 cursor-pointer' key={name}>
            <Link to={to}>
              {icon}
              <span className='absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -right-3'>
                {like?.length}
              </span>
            </Link>
          </li>
          )
        } else {
          return <li key={name} className='py-2 text-center border-b-4 cursor-pointer'><Link to={to}>{name}</Link></li>
        };
      })};
    </ul>
  )
};

export default NavItem;