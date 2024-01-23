import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import NavItem from './Sections/NavItem';

const Navbar = () => {

  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  return (
    <section className='relative z-10'>
      <div className='w-full'>
        <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
          {/* logo */}
          <div className='flex items-center text-2xl h-20'>
            <Link to="/"><img src={logo} width={120}/></Link>
          </div>

          <div>
            <Link to="/shop">스토어</Link>
          </div>
          <div>
            <Link to="/community">커뮤니티</Link>
          </div>
          <div>
            <Link to="/faq">FAQ</Link>
          </div>
          
          {/* menu button */}
          <div className='text-2xl sm:hidden'>
            <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
          </div>

          {/* big screen nav-items */}
          <div className='hidden sm:block'>
            <NavItem />
          </div>
        </div>


        {/* mobile nav-items */}
        <div className='block sm:hidden'>
          {menu && <NavItem mobile />}
        </div>
      </div>
    </section>
  )
}

export default Navbar;