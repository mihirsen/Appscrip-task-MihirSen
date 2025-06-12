"use client";
import React, { useState, useEffect } from "react";

export default function FooterClient() {
  const [openFooterGroup, setOpenFooterGroup] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className="footer">
      <div className="footer-top-row">
        <div className="footer-newsletter">
          <div className="footer-news-title">BE THE FIRST TO KNOW</div>
          <div className="footer-news-desc">
            Sign up for updates from mettä muse.
          </div>
          <form className="footer-news-form">
            <div className="footer-news-input-wrapper">
              <input
                className="footer-news-input"
                type="email"
                placeholder="Enter your e-mail..."
              />
            </div>
            <button className="footer-news-btn" type="submit">
              SUBSCRIBE
            </button>
          </form>
        </div>
        <div className="footer-contactcol">
          <div className="footer-col-title">CONTACT US</div>
          <div className="footer-contact">
            +44 221 133 5360
            <br />
            customercare@mettamuse.com
          </div>
          <div className="footer-col-title" style={{ marginTop: "1.5rem" }}>
            CURRENCY
          </div>
          <div className="footer-currency">
            <img
              src="/assets/United States of America (US).png"
              alt="USD"
              style={{
                height: "18px",
                verticalAlign: "middle",
                marginRight: "6px",
              }}
            />{" "}
            <b>USD</b>
          </div>
          <div className="footer-currency-note">
            Transactions will be completed in Euros and a currency reference is
            available on hover.
          </div>
        </div>
      </div>
      <div className="footer-divider" />
      <div className="footer-content footer-content-3col">
        <div
          className={`footer-col${openFooterGroup === "metta" ? " open" : ""}`}
        >
          <div
            className="footer-col-title"
            onClick={() =>
              setOpenFooterGroup(openFooterGroup === "metta" ? null : "metta")
            }
          >
            mettä muse <span>{openFooterGroup === "metta" ? "▲" : "▼"}</span>
          </div>
          <ul
            style={{
              display:
                openFooterGroup === "metta" ||
                (windowWidth !== null && windowWidth > 600)
                  ? "block"
                  : "none",
            }}
          >
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Stories</a>
            </li>
            <li>
              <a href="#">Artisans</a>
            </li>
            <li>
              <a href="#">Boutiques</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">EU Compliances Docs</a>
            </li>
          </ul>
        </div>
        <div
          className={`footer-col${openFooterGroup === "quick" ? " open" : ""}`}
        >
          <div
            className="footer-col-title"
            onClick={() =>
              setOpenFooterGroup(openFooterGroup === "quick" ? null : "quick")
            }
          >
            QUICK LINKS <span>{openFooterGroup === "quick" ? "▲" : "▼"}</span>
          </div>
          <ul
            style={{
              display:
                openFooterGroup === "quick" ||
                (windowWidth !== null && windowWidth > 600)
                  ? "block"
                  : "none",
            }}
          >
            <li>
              <a href="#">Orders & Shipping</a>
            </li>
            <li>
              <a href="#">Join/Login as a Seller</a>
            </li>
            <li>
              <a href="#">Payment & Pricing</a>
            </li>
            <li>
              <a href="#">Return & Refunds</a>
            </li>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </ul>
        </div>
        <div
          className={`footer-col${openFooterGroup === "follow" ? " open" : ""}`}
        >
          <div
            className="footer-col-title"
            onClick={() =>
              setOpenFooterGroup(openFooterGroup === "follow" ? null : "follow")
            }
          >
            FOLLOW US <span>{openFooterGroup === "follow" ? "▲" : "▼"}</span>
          </div>
          <div
            className="footer-socials"
            style={{
              display:
                openFooterGroup === "follow" ||
                (windowWidth !== null && windowWidth > 600)
                  ? "flex"
                  : "none",
            }}
          >
            <a href="#" aria-label="Instagram">
              <img
                src="/assets/Insta.png"
                alt="Instagram"
                width={22}
                height={22}
              />
            </a>
            <a href="#" aria-label="LinkedIn">
              <img src="/assets/a.png" alt="LinkedIn" width={22} height={22} />
            </a>
          </div>
          <div
            style={{
              marginTop: "1.5rem",
              display:
                openFooterGroup === "follow" ||
                (windowWidth !== null && windowWidth > 600)
                  ? "block"
                  : "none",
            }}
          >
            <div className="footer-col-title">mettä muse ACCEPTS</div>
            <div className="footer-payments">
              <img src="/assets/Group 136188.png" alt="GPay" />
              <img src="/assets/Group 136190.png" alt="Mastercard" />
              <img src="/assets/Group 136192.png" alt="PayPal" />
              <img src="/assets/Group 136193.png" alt="Amex" />
              <img src="/assets/Group 136194.png" alt="Apple Pay" />
              <img src="/assets/Group 136195.png" alt="OPay" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        Copyright © 2023 mettamuse. All rights reserved.
      </div>
    </footer>
  );
}
