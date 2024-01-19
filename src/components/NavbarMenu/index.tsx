import React from "react";
import "./menu.css";
import Link from "next/link";

const index = () => {
  return (
    <div>
      <body>
        <nav className="navbar">
          <div className="logo"></div>
          <ul className="nav">
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
                <i className="fa-solid fa-store">
                  <span className="material-icons">book_online</span>
                </i>
              </Link>
            </li>
            <li className="nav-items">
              <Link href="/history">
                <span className="link-text">Historial</span>
                <i className="fa-solid fa-user">
                <span className="material-icons">work_history</span>
                </i>
              </Link>
            </li>
          </ul>
          <Link href="/login" className="btn">
            Login <i className="fa-solid fa-chevron-right ok"></i>
          </Link>
        </nav>
      </body>
    </div>
  );
};

export default index;
