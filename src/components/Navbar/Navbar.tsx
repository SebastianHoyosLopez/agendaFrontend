import React from 'react'
import NavbarResponsive from './NavbarResponsive'
import Link from 'next/link'
import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.responsive}>
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
      </ul>
    </div>
  )
}

export default Navbar