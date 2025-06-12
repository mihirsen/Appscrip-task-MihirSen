"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/assets/Logo.svg";
import { CiSearch, CiHeart, CiMenuBurger } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";

const Header: React.FC = () => {
  const menuBarList: string[] = [
    "Home",
    "Shop",
    "Skills",
    "About",
    "Contact Us",
  ];

  const [sideNavbarOpen, setSideNavbarOpen] = useState<boolean>(false);

  return (
    <header>
      <section className="header-top">
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`header-top-item ${i < 2 ? "mobile" : ""}`}>
            <p>Lorem ipsum dolor</p>
          </div>
        ))}
      </section>

      <section className="header-body">
        <div className="company-logo">
          <div
            onClick={() => setSideNavbarOpen((prev) => !prev)}
            className="burger-icon-link"
          >
            <CiMenuBurger className="burger-icon" />
          </div>
          <Link href="#">
            <Image src={Logo} alt="Company-Logo" />
          </Link>

          {sideNavbarOpen && (
            <div className="header-navbar-list-cont">
              <IoMdClose
                onClick={() => setSideNavbarOpen((prev) => !prev)}
                className="close-icon"
              />
              <div className="nav-lists">
                {menuBarList.map((list, index) => (
                  <Link key={index} href="#" className="nav-items">
                    {list}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="company-title">
          <h1>LOGO</h1>
        </div>

        <div className="header-nav-icons">
          {[
            <CiSearch key="search" className="nav-icons" />,
            <CiHeart key="heart" className="nav-icons" />,
            <LiaShoppingBagSolid key="bag" className="nav-icons" />,
            <IoPersonOutline key="person" className="nav-icons" />,
          ].map((Icon, index) => (
            <div key={index} className={index >= 3 ? "mobile" : ""}>
              <Link href="#">{Icon}</Link>
            </div>
          ))}

          <div className="mobile">
            <select name="languages" className="select">
              <option value="ENG">ENG</option>
              <option value="ESP">ESP</option>
              <option value="FRA">FRA</option>
            </select>
          </div>
        </div>
      </section>

      <section className="header-footer">
        <nav>
          {[
            { text: "HOME", active: true },
            { text: "SHOP", active: false },
            { text: "SKILLS", active: false, mobile: true },
            { text: "STORIES", active: false, mobile: true },
            { text: "ABOUT", active: false, mobile: true },
            { text: "CONTACT US", active: false, mobile: true },
          ].map(({ text, active, mobile }, index) => (
            <div
              key={index}
              className={`footer-item${active ? " footer-item-active" : ""}${
                mobile ? " mobile" : ""
              }`}
            >
              <Link href="#" className="link-txt">
                <p>{text}</p>
              </Link>
              {active && <p className="divider">|</p>}
            </div>
          ))}
        </nav>
      </section>
    </header>
  );
};

export default Header;
