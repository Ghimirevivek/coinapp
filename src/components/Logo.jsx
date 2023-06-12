import React from 'react';
import logosvg from '../assets/logo.svg';
import { Link } from 'react-router-dom';
const Logo = () => {
  return (
    <Link
      to={'/'}
      className='
    absolute sm:top-[1.5rem] top-[1rem] sm:left-[1.5rem] left-[1rem] [text-decoration:none]  text-cyan cursor-pointer flex items-center sm:text-lg text-md 
   '
    >
      <img src={logosvg} alt='logo' />
      <span>CryptoCoins</span>
    </Link>
  );
};

export default Logo;
