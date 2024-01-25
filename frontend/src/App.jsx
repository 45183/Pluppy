import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedPage from './pages/ProtectedPage';
import ProtectedRoutes from './components/ProtectedRoutes';
import { authUser } from './store/thunkFunctions';
import NotAuthRoutes from './components/NotAuthRoutes';
import HistoryPage from './pages/HistoryPage';
import CartPage from './pages/CartPage';
import DetailProductPage from './pages/DetailProductPage';
import UploadProductPage from './pages/UploadProductPage';
import LikePage from './pages/LikePage';
import ShopPage from './pages/ShopPage';
import CommunityPage from './pages/CommunityPage';
import Mypage from './pages/MypagePage';
import FAQPage from './pages/FAQPage';
import UploadCommunityPage from './pages/UploadCommunityPage';
import DetailCommunityPage from './pages/DetailCommunityPage';

function Layout() {
  return (
    <div className='flex flex-col h-screen justify-between'>

      <ToastContainer position='bottom-right' theme='light' pauseOnHover autoClose={1500} />

      <Navbar />
      <main className='mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        
        <Route index element={<LandingPage />} />
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/community' element={<CommunityPage />} />
        <Route path='/faq' element={<FAQPage />} />

        {/* 로그인할 경우만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path='/protected' element={<ProtectedPage />} />
          <Route path='/shop/:productId' element={<DetailProductPage />} />
          <Route path='/shop/upload' element={<UploadProductPage />} />
          <Route path='/community/upload' element={<UploadCommunityPage />} />
          <Route path='/community/:communityId' element={<DetailCommunityPage />} />
          <Route path='/user/cart' element={<CartPage />} />
          <Route path='/user/like' element={<LikePage />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/history' element={<HistoryPage />} />
        </Route>

        {/* 로그인할 경우 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
