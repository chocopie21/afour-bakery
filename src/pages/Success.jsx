import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function Success() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const orderId = Math.floor(100000 + Math.random() * 900000); // Random 6 digit order ID

  return (
    <section className="container mt-12 mb-12">
      <div className="checkout-container" style={{ alignItems: 'center', textAlign: 'center', maxWidth: '600px', margin: '0 auto', background: 'var(--card-bg)', padding: '4rem 2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '5rem', color: '#4CAF50', marginBottom: '1rem' }}>
          <i className="fas fa-check-circle"></i>
        </div>
        <h2 className="section-title" style={{ margin: '1rem 0' }}>Pembayaran Berhasil!</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Terima kasih telah berbelanja di Afour Bakery. Pesanan Anda sedang kami proses dan akan segera dikirimkan.
        </p>
        
        <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '8px', width: '100%', marginBottom: '2rem' }}>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Nomor Pesanan Anda:</p>
          <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>ORD-{orderId}</h3>
        </div>

        <Link to="/" className="btn btn-full" style={{ maxWidth: '300px' }}>
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  );
}
