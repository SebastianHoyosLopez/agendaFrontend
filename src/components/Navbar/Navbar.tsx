'use client'
import React, { useEffect, useState } from "react";
import NavbarResponsive from "./NavbarResponsive";
import Link from "next/link";
import styles from "./navbar.module.css";
import { useAuth } from "../Auth/AuthContext";
import { useRouter } from "next/router";

const Navbar = () => {
  const { checkToken, logout } = useAuth();
  const [isValid, setIsValid] = useState<boolean>();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const isValidResult: boolean = await checkToken();
      setIsValid(isValidResult);
    };
    verifyToken();
  }, [checkToken]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbar}>
      {isValid ? (
        <>
          <div className={styles.responsive}>
            <NavbarResponsive handleLogout={handleLogout} />
          </div>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link className={styles.link} href="/">
                Home
              </Link>
            </li>
            <li className={styles.item}>
              <Link className={styles.link} href="/reservations">
                Reservations
              </Link>
            </li>
            <li className={styles.item}>
              <Link className={styles.link} href="/about-us">
                About Us
              </Link>
            </li>
            {/* Agregar el icono de perfil */}
            <li className={styles.alignRight} onClick={toggleMenu}>
              <span className="material-icons">account_circle</span>
              {isMenuOpen && (
                <div className={styles.dropdownMenuLeft}>
                  <ul>
                    <li >
                      <Link href="/perfil">Perfil</Link>
                    </li>
                    <li >
                      <Link href="/configuracion">Configuración</Link>
                    </li>
                    <li >
                      <button onClick={() => handleLogout()}>
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
