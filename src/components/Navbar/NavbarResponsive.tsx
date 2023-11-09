import Link from 'next/link';
import React, { useState } from 'react'
import styles from './navbarResponsive.module.css'

const NavbarResponsive: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {
        isOpen ? (<div onClick={() => toggleMenu()}>{"<"}</div>) :
          <div onClick={() => toggleMenu()}>&#9776;</div>
      }
      {isOpen ?
        <ul className={styles.list}>
          <li>
            <Link className={styles.link} href="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/about-us">About Us</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/reservations">Reservations</Link>
          </li>
        </ul> : ''}
    </>
  )
}

export default NavbarResponsive;