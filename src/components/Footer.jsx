import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>
          <Link to="/" className="logo-text footer-logo" style={{fontSize: '2rem'}}>AFOUR BAKERY</Link>
          <p className="footer-desc">Dibuat dengan cinta, dipanggang dengan ketulusan. Terima kasih telah mengizinkan Afour Bakery menjadi bagian dari momen manis dan hangat di rumah Anda setiap hari.</p>
        </div>
        <div>
          <h4>EXPLORE</h4>
          <ul className="footer-links">
            <li><Link to="/#menu">Menu Roti</Link></li>
            <li><Link to="/#menu">Menu Kue</Link></li>
            <li><Link to="/#menu">Menu Kue Kering</Link></li>
          </ul>
        </div>
        <div>
          <h4>COMPANY</h4>
          <ul className="footer-links">
            <li><Link to="/#tentang-kita">Tentang Kita</Link></li>
            <li><Link to="/#menu">Menu</Link></li>
            <li><Link to="/#kontak">Kontak</Link></li>
          </ul>
        </div>
        <div>
          <h4 
            onDoubleClick={() => navigate('/admin')}
            style={{ cursor: 'text' }} // Make it look like normal text
            title="Double click for secret admin panel"
          >
            STAY GOLDEN
          </h4>
          <p style={{fontSize: '0.9rem', marginBottom: '1rem', opacity: 0.8}}>Subscribe for fresh recipes and early access to new bakes.</p>
          <form className="subscribe-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Email Address" />
            <button type="submit"><i className="fas fa-arrow-right"></i></button>
          </form>
        </div>
      </div>
    </footer>
  );
}
