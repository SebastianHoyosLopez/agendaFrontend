import React, { useEffect, useState } from 'react'
import NavbarResponsive from './NavbarResponsive'
import Link from 'next/link'
import styles from './navbar.module.css'
import { useAuth } from '../Auth/AuthContext'
import { useRouter } from 'next/router'

const Navbar = () => {
  const { checkToken, logout } = useAuth();
  const [isValid, setIsValid] = useState<void>()
  const router = useRouter();

  useEffect(() => {
    const verifyToken = async () => {
      const isValid: void = await checkToken();
      setIsValid(isValid)
    };
    verifyToken();
  }, [checkToken]);

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className={styles.navbar}>
      {isValid ? (<><div className={styles.responsive}>
        <NavbarResponsive isValid={isValid} handleLogout={handleLogout} />
      </div>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link} href="/">Home</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/reservations">Reservations</Link>
          </li>
          <li className={styles.item}>
            <Link className={styles.link} href="/about-us">About Us</Link>
          </li>
          <li><button onClick={() => handleLogout()}>Cerrar Sesión</button></li>
        </ul></>) : (
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link className={styles.link} href='/login'>iniciar sesión</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Navbar