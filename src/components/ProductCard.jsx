import { useState } from 'react';

export default function ProductCard({ product, cart, updateQuantity, onSelectProduct }) {
  const [clicked, setClicked] = useState(false);
  const currentQty = cart[product.id] ? cart[product.id].qty : 0;

  const handlePesan = () => {
    updateQuantity(product, 1);
    setClicked(true);
    setTimeout(() => setClicked(false), 1500);
  };

  const handlePlus = () => {
    if (currentQty < 10) updateQuantity(product, currentQty + 1);
  };

  const handleMinus = () => {
    if (currentQty > 0) updateQuantity(product, currentQty - 1);
  };

  return (
    <div className="menu-card">
        <img 
            src={product.image} 
            alt={product.name} 
            className="menu-image" 
            onClick={onSelectProduct}
            style={{ cursor: onSelectProduct ? 'pointer' : 'default' }}
        />
        <div className="menu-info">
            <h3 
                className="product-name"
                onClick={onSelectProduct} 
                style={{ cursor: onSelectProduct ? 'pointer' : 'default' }}
            >
                {product.name}
            </h3>
            <p>{product.desc}</p>
            <div className="product-action">
                {currentQty === 0 ? (
                  <button 
                    className="btn btn-full btn-pesan" 
                    onClick={handlePesan}
                    style={clicked ? { backgroundColor: '#4CAF50' } : {}}
                  >
                    {clicked ? 'Ditambahkan ✓' : 'Pesan'}
                  </button>
                ) : (
                  <div className="counter-widget">
                      <button className="btn-counter minus" onClick={handleMinus}>-</button>
                      <span className="counter-value">{currentQty}</span>
                      <button className="btn-counter plus" onClick={handlePlus}>+</button>
                  </div>
                )}
            </div>
        </div>
    </div>
  );
}
