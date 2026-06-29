import { Link } from 'react-router-dom';

export default function CartSidebar({ isOpen, onClose, cart, updateQuantity }) {
  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  const formatRupiah = (number) => 'Rp. ' + number.toLocaleString('id-ID');

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
      ></div>

      {/* Sidebar Panel */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Keranjang Anda</h2>
          <button className="btn-close-cart" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="cart-body">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <i className="fas fa-shopping-basket"></i>
              <p>Keranjang Anda masih kosong</p>
              <button className="btn btn-outline" onClick={onClose}>Mulai Belanja</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div className="cart-item-row" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{formatRupiah(item.price)}</p>
                    <div className="cart-item-actions">
                      <div className="mini-counter">
                        <button onClick={() => updateQuantity(item, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQuantity(item, item.qty + 1)}>+</button>
                      </div>
                      <button className="btn-remove" onClick={() => updateQuantity(item, 0)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
            <p className="cart-note">Ongkos kirim dan pajak dihitung saat checkout.</p>
            <Link to="/shipping" className="btn btn-full" onClick={onClose}>
              Checkout Sekarang
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
