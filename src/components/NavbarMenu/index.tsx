"use client";

import React, { useEffect, useState } from "react";
import "./menu.css";
import Link from "next/link";
import { useAuth } from "../Auth/AuthContext";
import { useRouter } from "next/router";

const MenuNavbar: React.FC = () => {
  const { checkToken, logout } = useAuth();
  const [isValid, setIsValid] = useState<boolean>();
  const router = useRouter();

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

  return (
    <>
      <>
        <nav className="navbar">
          <div className="logo"></div>
          <ul className="nav">
            {isValid ? (
              <>
                <li className="nav-items">
                  <Link href="/">
                    <span className="link-text">Home</span>
                    <i className="fa-solid fa-house">
                      <span className="material-icons">home</span>
                    </i>
                  </Link>
                </li>
                <li className="nav-items">
                  <Link href="/reservations">
                    <span className="link-text">Reservas</span>
                    <i>
                      <span className="material-icons">view_agenda</span>
                    </i>
                  </Link>
                </li>
                <li className="nav-items">
                  <Link href="/history">
                    <span className="link-text">Historial</span>
                    <i>
                      <span className="material-icons">work_history</span>
                    </i>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-items">
                <Link href="/reservations">
                  <span className="link-text">Reservas</span>
                  <i>
                    <span className="material-icons">view_agenda</span>
                  </i>
                </Link>
              </li>
            )}
            {!isValid ? (
              <li className="nav-items">
                <Link href="/login" className="btn">
                  <span className="link-text">Login</span>
                  <i>
                    <span className="material-icons">login</span>
                  </i>
                </Link>
              </li>
            ) : (
              <li className="nav-items" onClick={handleLogout}>
                <a>
                  <span className="link-text">Logout</span>
                  <i className="logout">
                    <span className="material-icons">logout</span>
                  </i>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </>
    </>
  );
};

export default MenuNavbar;
