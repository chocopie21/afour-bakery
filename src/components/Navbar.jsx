import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar({ cartCount, onOpenCart, searchQuery, setSearchQuery }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  
  const [bounce, setBounce] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    if (cartCount > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 500);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  return (
    <div className="navbar-wrapper">
      <nav className="navbar container">
        {isHome && (
          <div className="hamburger-icon" onClick={toggleMobileMenu}>
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
        )}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={`${import.meta.env.BASE_URL}images/media_.png`} alt="Afour Bakery Logo" style={{ height: '50px', objectFit: 'contain' }} />
        </Link>
        {isHome && (
          <div className={`nav-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#menu" onClick={closeMobileMenu}>Menu</a>
            <a href="#tentang-kita" onClick={closeMobileMenu}>Tentang Kita</a>
            <a href="#kontak" onClick={closeMobileMenu}>Kontak</a>
          </div>
        )}
        <div className="nav-icons">
          {isHome && (
            <div className={`search-container ${isSearchOpen ? 'open' : ''}`}>
              {isSearchOpen && (
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Cari roti, kue..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              )}
              <a href="#search" onClick={e => { e.preventDefault(); setIsSearchOpen(!isSearchOpen); }}>
                <i className={`fas ${isSearchOpen ? 'fa-times' : 'fa-search'}`}></i>
              </a>
            </div>
          )}
          <div className={`cart-icon-wrapper ${bounce ? 'animate-bounce' : ''}`} onClick={onOpenCart} style={{cursor: 'pointer'}}>
            <i className="fas fa-shopping-bag"></i>
            <span className={`cart-badge ${cartCount > 0 ? 'has-items' : ''}`}>{cartCount}</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
