export default function ProductModal({ product, isOpen, onClose }) {
  if (!isOpen || !product) return null;

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
        background: 'rgba(0,0,0,0.6)', zIndex: 1050, display: 'flex', 
        justifyContent: 'center', alignItems: 'center', padding: '1rem',
        backdropFilter: 'blur(5px)'
    }}>
      <div className="modal-content fade-in-up" onClick={e => e.stopPropagation()} style={{
          background: 'var(--card-bg)', width: '100%', maxWidth: '500px',
          borderRadius: '16px', overflow: 'hidden', position: 'relative'
      }}>
        <button onClick={onClose} style={{
            position: 'absolute', top: '15px', right: '15px', background: 'white',
            border: 'none', borderRadius: '50%', width: '35px', height: '35px',
            fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            zIndex: 10
        }}>&times;</button>
        
        <img src={product.image} alt={product.name} style={{
            width: '100%', height: '250px', objectFit: 'cover'
        }} />
        
        <div style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>{product.name}</h3>
          <h4 style={{ color: 'var(--accent-color)', fontSize: '1.2rem', marginBottom: '1.5rem' }}>{formatRupiah(product.price)}</h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>{product.desc}</p>
          
          <div>
            <h5 style={{ marginBottom: '0.5rem' }}>Komposisi Utama:</h5>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tepung terigu pilihan, ragi premium, mentega murni, dan bahan-bahan segar lainnya.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
