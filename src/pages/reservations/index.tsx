import Navbar from '@/components/Navbar';
import Link from 'next/link';
import React, { useState } from 'react'

const Reservations: React.FC = () => {
  const [isOpen1, setIsOpen1] = useState<boolean>(false);

  const toggleMenu = () => {
    console.log('entro al boolean')
    setIsOpen1(!isOpen1);
    console.log(isOpen1)
  };

  return (
    <>
      <h1>Reservations</h1>
      
    </>
  )
}

export default Reservations