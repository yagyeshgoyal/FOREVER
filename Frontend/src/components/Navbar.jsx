import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link , NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';


const Navbar = () => {

  const [visible , setvisible] = useState(false);
  const {setShowSearch , getCartCount, navigate, token , setToken , setCartItem } = useContext(ShopContext);

  const logout = () =>{
    navigate('/login')
    localStorage.removeItem('token');
    setToken('');
    setCartItem({});
    
  }


  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to="/"><img src={assets.logo} className='w-36 mx-7 ' /> </Link> 
        
        <ul className='hidden sm:flex items-center gap-5 text-sm text-gray-700'>

          <NavLink to="/" className="flex flex-col items-center gap-1">
            <p>HOME</p>
            <hr className='w-[50%] border-none h-[1.5px] bg-gray-500 hidden'/>
          </NavLink>
          <NavLink to="/collection" className="flex flex-col items-center gap-1 ">
            <p>COLLECTION</p>
            <hr className='w-[50%] border-none h-[1.5px] bg-gray-500 hidden'/>
          </NavLink>
          <NavLink to="/about" className="flex flex-col items-center gap-1 ">
            <p>ABOUT</p>
            <hr className='w-[50%] border-none h-[1.5px] bg-gray-500 hidden'/>
          </NavLink>
          <NavLink to="/contact" className="flex flex-col items-center gap-1 ">
            <p>CONTACT</p>
            <hr className='w-[50%] border-none h-[1.5px] bg-gray-500 hidden'/>
          </NavLink>
          <a href="http://localhost:5174/" target='_blank' className="flex flex-col items-center gap-1">
            <div className=' border-black-500 border-2 rounded-full px-3 py-1 '>
              <p className='text-xs text-gray-600'>Admin Panel</p>
            </div>
          </a>
          

        
        </ul>

        <div className='flex gap-6 justify-center items-center mx-[30px]'>
          <img onClick={()=>{setShowSearch(true)}} src={assets.search_icon} className='w-[20px] cursor-pointer' />

          <div className='group relative flex gap-6'>
            <img onClick={()=>token ? null : navigate('/login')} src={assets.profile_icon} className='w-[20px] cursor-pointer' />
            
            {token &&
              <div className='group-hover:block hidden absolute dropdown-menu right-0 mt-6'>
                <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-700'>
                  <p className='cursor-pointer hover:text-black'>My Profile</p>
                  <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                  <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                </div>
              </div>
            }
          </div>

          <Link to="/cart" className='relative'>
            <img src={assets.cart_icon} className='w-[20px] min-w-[20px] cursor-pointer' />
            <p className='text-[9px] absolute bg-black text-white rounded-full h-[15px] w-[16px] text-center flex justify-center items-center bottom-[-4px] right-[-5px]'>{getCartCount()}</p>
          </Link>

          
          <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='w-6 min-w-6 cursor-pointer sm:hidden' alt="" />
          
        </div>

        <div className={`absolute top-0 bottom-0 right-0 overflow-hidden bg-white transition-all ${visible? 'w-full' : 'w-0'} `}>
            <div className='flex flex-col text-gray-600 py-2 '>
              <div onClick={()=>setvisible(false)} className='flex gap-3  items-center px-3 py-3'>
                <img  className='h-4 rotate-180' src={assets.dropdown_icon} alt="" />
                <p className='text-gray-600'>BACK</p>
              </div>
              <NavLink onClick={()=>{setvisible(false)}} to="/" className='border px-6 pl-2'>HOME</NavLink>
              <NavLink onClick={()=>{setvisible(false)}} to="/collection" className='border px-6 pl-2'>COLLECTION</NavLink>
              <NavLink onClick={()=>{setvisible(false)}} to="/about" className='border px-6 pl-2'>ABOUT</NavLink>
              <NavLink onClick={()=>{setvisible(false)}} to="/contact" className='border px-6 pl-2'>CONTACT</NavLink>
              <a onClick={()=>{setvisible(false)}} href="http://localhost:5174/" className='border px-6 pl-2'>Admin Panel</a>
            </div>
        </div>
        
    </div>
  )
}

export default Navbar
