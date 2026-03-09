import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiMapPin, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

import logo from "../../assets/logo/logo_film.png";

const footerLinks = {
  Explore: ["Home", "Trending", "Web Series", "Hindi Movies", "Hollywood", "Bengali Cinema"],
  Genres:  ["Action", "Comedy", "Drama", "Thriller", "Romance", "Documentary"],
  Legal:   ["Terms of Use", "Privacy Policy", "Cookie Preferences", "Corporate Information", "Contact Us"],
};

const socials = [
  { icon: FaLinkedin,  href: "#", label: "LinkedIn",  color: "#0A66C2" },
  { icon: FaFacebook,  href: "#", label: "Facebook",  color: "#1877F2" },
  { icon: FaInstagram, href: "#", label: "Instagram", color: "#E1306C" },
  { icon: FaTwitter,   href: "#", label: "Twitter",   color: "#1DA1F2" },
  { icon: FaYoutube,   href: "#", label: "YouTube",   color: "#FF0000" },
];

function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;600&display=swap');

        .ft-root {
          position: relative;
          background: #060810;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        /* ambient top glow */
        .ft-root::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #F58C1E 40%, #2EC4B6 60%, transparent);
          opacity: 0.6;
        }
        .ft-root::after {
          content: '';
          position: absolute;
          top: -80px; left: 50%;
          transform: translateX(-50%);
          width: 500px; height: 160px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(245,140,30,0.06), transparent 70%);
          pointer-events: none;
        }

        /* ── TOP STRIP ── */
        .ft-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 32px clamp(20px, 4vw, 64px) 28px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-wrap: wrap;
        }

        /* brand / logo */
        .ft-brand {
          display: flex;
          align-items: center;
          gap: 0;
          text-decoration: none;
        }
        .ft-logo-wrap {
          background: #0a0c10;
          padding: 6px 18px 6px 0px;
          border-radius: 10px;
          display: flex;
          align-items: center;
        }
        .ft-logo-img {
          height: 52px;
          width: 180px;
          object-fit: contain;
          object-position: left center;
          display: block;
          filter: brightness(1.08);
          transition: filter 0.3s, transform 0.3s;
        }
        .ft-brand:hover .ft-logo-img {
          filter: brightness(1.2) drop-shadow(0 0 10px rgba(245,140,30,0.45));
          transform: scale(1.03);
        }
        .ft-tagline {
          font-size: 11.5px;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.06em;
          font-style: italic;
          margin-left: 4px;
          align-self: flex-end;
          padding-bottom: 2px;
        }

        /* socials */
        .ft-socials {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .ft-social-btn {
          width: 38px; height: 38px;
          border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5);
          font-size: 16px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.22s;
        }
        .ft-social-btn:hover {
          border-color: var(--sc);
          color: var(--sc);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          transform: translateY(-2px);
        }

        /* ── MAIN GRID ── */
        .ft-main {
          display: grid;
          grid-template-columns: 1.9fr repeat(3, 1fr);
          gap: 48px 40px;
          padding: clamp(32px, 4vw, 52px) clamp(20px, 4vw, 64px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        @media (max-width: 960px) {
          .ft-main { grid-template-columns: 1fr 1fr; gap: 36px 32px; }
        }
        @media (max-width: 560px) {
          .ft-main { grid-template-columns: 1fr; gap: 28px; }
        }

        /* about column */
        .ft-about-desc {
          font-size: 13.5px;
          line-height: 1.78;
          color: rgba(255,255,255,0.36);
          margin: 0 0 20px;
          max-width: 290px;
        }

        /* API powered badges row */
        .ft-api-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .ft-api-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.2);
          text-transform: uppercase;
          margin-right: 2px;
        }
        .ft-api-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 5px 11px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: rgba(255,255,255,0.55);
          transition: border-color 0.2s, color 0.2s;
        }
        .ft-api-chip:hover {
          border-color: var(--chip-color);
          color: var(--chip-color);
        }
        .ft-api-chip-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--chip-color);
          box-shadow: 0 0 6px var(--chip-color);
          flex-shrink: 0;
        }

        .ft-location {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.32);
          margin-bottom: 10px;
        }
        .ft-location-icon { color: #F58C1E; flex-shrink: 0; margin-top: 2px; }

        .ft-contact {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.32);
          text-decoration: none;
          transition: color 0.2s;
          margin-bottom: 20px;
        }
        .ft-contact:hover { color: #F58C1E; }
        .ft-contact-icon { color: #2EC4B6; flex-shrink: 0; }

        /* status badges */
        .ft-badges {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .ft-badge {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 3px 9px;
          border-radius: 5px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.025);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
        }
        .ft-badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
        }

        /* link columns */
        .ft-col-title {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F58C1E;
          margin: 0 0 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .ft-col-title::before {
          content: '';
          display: inline-block;
          width: 14px; height: 2px;
          border-radius: 1px;
          background: linear-gradient(90deg, #F58C1E, #2EC4B6);
        }
        .ft-links {
          list-style: none;
          margin: 0; padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ft-link {
          font-size: 13.5px;
          color: rgba(255,255,255,0.36);
          text-decoration: none;
          cursor: pointer;
          transition: color 0.18s, padding-left 0.2s;
          display: inline-block;
          letter-spacing: 0.01em;
        }
        .ft-link:hover { color: #fff; padding-left: 4px; }
        .ft-link.legal { font-size: 12.5px; }
        .ft-link.legal:hover { color: #F58C1E; padding-left: 4px; }

        /* ── BOTTOM BAR ── */
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px clamp(20px, 4vw, 64px);
          flex-wrap: wrap;
        }
        .ft-copy {
          font-size: 12px;
          color: rgba(255,255,255,0.18);
          letter-spacing: 0.03em;
        }
        .ft-copy span { color: rgba(245,140,30,0.55); }
        .ft-bottom-links {
          display: flex;
          align-items: center;
          gap: 0;
          flex-wrap: wrap;
        }
        .ft-bottom-link {
          font-size: 11.5px;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.18s;
          cursor: pointer;
          padding: 0 12px;
        }
        .ft-bottom-link:hover { color: rgba(255,255,255,0.6); }
        .ft-bottom-sep {
          width: 1px; height: 11px;
          background: rgba(255,255,255,0.1);
          flex-shrink: 0;
        }
        .ft-powered {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: rgba(255,255,255,0.16);
        }
        .ft-powered-chip {
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.07em;
          border: 1px solid rgba(255,255,255,0.08);
        }
      `}</style>

      <footer className="ft-root">

        {/* ── TOP STRIP: logo + socials ── */}
        <div className="ft-top">

          {/* Logo from assets — dark bg so it's always visible */}
          <a href="/" className="ft-brand">
            <div className="ft-logo-wrap">
              <img
                src={logo}
                alt="Flixor – Movies & Series"
                className="ft-logo-img"
              />
            </div>
            <span className="ft-tagline">Movies &amp; Series</span>
          </a>

          <div className="ft-socials">
            {socials.map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className="ft-social-btn"
                style={{ "--sc": color }}
                whileHover={{ y: -3, scale: 1.08 }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon />
              </motion.a>
            ))}
          </div>

        </div>

        {/* ── MAIN GRID ── */}
        <div className="ft-main">

          {/* ── About column ── */}
          <div>
            <p className="ft-about-desc">
              Flixor is a modern movie &amp; web series discovery platform. Explore thousands
              of titles — from Bollywood blockbusters and Bengali cinema to Hollywood hits and
              binge-worthy series — all beautifully organized in one place.
            </p>

            {/* API credits */}
            <div className="ft-api-row">
              <span className="ft-api-label">Powered by</span>

              <div className="ft-api-chip" style={{ "--chip-color": "#F5C518" }}>
                <span className="ft-api-chip-dot" style={{ "--chip-color": "#F5C518" }} />
                OMDB API
              </div>

              <div className="ft-api-chip" style={{ "--chip-color": "#01B4E4" }}>
                <span className="ft-api-chip-dot" style={{ "--chip-color": "#01B4E4" }} />
                TMDB API
              </div>
            </div>

            <div className="ft-location">
              <FiMapPin className="ft-location-icon" size={14} />
              <span>Salt Lake City, Kolkata, West Bengal, India — 700 064</span>
            </div>

            <a href="mailto:hello@flixor.app" className="ft-contact">
              <FiMail className="ft-contact-icon" size={14} />
              hello@flixor.app
            </a>

            <div className="ft-badges">
              <div className="ft-badge">
                <div className="ft-badge-dot" style={{ background: "#4ade80" }} />
                API Live
              </div>
              <div className="ft-badge">
                <div className="ft-badge-dot" style={{ background: "#F5C518" }} />
                OMDB
              </div>
              <div className="ft-badge">
                <div className="ft-badge-dot" style={{ background: "#01B4E4" }} />
                TMDB
              </div>
              <div className="ft-badge">
                <div className="ft-badge-dot" style={{ background: "#2EC4B6" }} />
                Free to Use
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <div className="ft-col-title">Explore</div>
            <ul className="ft-links">
              {footerLinks.Explore.map((l) => (
                <li key={l}><a href="#" className="ft-link">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Genres */}
          <div>
            <div className="ft-col-title">Genres</div>
            <ul className="ft-links">
              {footerLinks.Genres.map((l) => (
                <li key={l}><a href="#" className="ft-link">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <div className="ft-col-title">Legal &amp; Info</div>
            <ul className="ft-links">
              {footerLinks.Legal.map((l) => (
                <li key={l}><a href="#" className="ft-link legal">{l}</a></li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── BOTTOM BAR ── */}
        <div className="ft-bottom">

          <div className="ft-copy">
            © {new Date().getFullYear()} <span>Flixor</span>. All rights reserved.
          </div>

          <div className="ft-bottom-links">
            {["Terms of Use", "Privacy", "Cookie Preferences", "Corporate Information", "Contact Us"]
              .map((item, i, arr) => (
                <span key={item} style={{ display: "flex", alignItems: "center" }}>
                  <a href="#" className="ft-bottom-link">{item}</a>
                  {i < arr.length - 1 && <div className="ft-bottom-sep" />}
                </span>
              ))}
          </div>

          <div className="ft-powered">
            Data by
            <span className="ft-powered-chip" style={{ color: "#F5C518", borderColor: "rgba(245,197,24,0.2)" }}>
              OMDB
            </span>
            &amp;
            <span className="ft-powered-chip" style={{ color: "#01B4E4", borderColor: "rgba(1,180,228,0.2)" }}>
              TMDB
            </span>
          </div>

        </div>

      </footer>
    </>
  );
}

export default Footer;