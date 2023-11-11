import React from 'react'
import NavbarResponsive from './NavbarResponsive'
import Link from 'next/link'
import styles from './navbar.module.css'
import { useAuth } from '../Auth/AuthContext'

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.navbar}>
      {isAuthenticated ? (<><div className={styles.responsive}>
        <NavbarResponsive />
      </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link} href="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/about-us">About Us</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/reservations">Reservations</Link>
          </li>
        </ul></>) : (
          <li>
            <Link className={styles.link} href='/login'>iniciar sesión</Link>
          </li>)}

    </div>
  )
}

export default Navbar