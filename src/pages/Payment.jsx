import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Payment({ cart, setCart }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const [walletType, setWalletType] = useState('gopay');
  const [bankType, setBankType] = useState('bca');

  const formatRupiah = (number) => 'Rp. ' + number.toLocaleString('id-ID');

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shippingCost = 30000;
  const total = subtotal + shippingCost;

  const handlePayment = () => {
    if (Object.keys(cart).length === 0) {
      alert("Keranjang Anda kosong!");
      return;
    }
    setCart({}); // Clear the cart
    navigate('/success');
  };

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      {/* Progress Steps */}
      <div className="progress-steps">
          <div className="step">
              <div className="step-icon"><i className="fas fa-check"></i></div>
              <div className="step-label">Keranjang</div>
          </div>
          <div className="step-line"></div>
          <div className="step">
              <div className="step-icon"><i className="fas fa-truck"></i></div>
              <div className="step-label">Pengiriman</div>
          </div>
          <div className="step-line"></div>
          <div className="step active">
              <div className="step-icon"><i className="fas fa-credit-card"></i></div>
              <div className="step-label">Pembayaran</div>
          </div>
      </div>

      <div className="layout-grid">
        {/* Left Form */}
        <div>
          <h2 className="mb-2" style={{fontFamily: 'var(--font-heading)'}}>Selesaikan Pembayaran</h2>
          <p className="mb-8 text-secondary">Pilih metode pembayaran pilihan Anda di bawah ini untuk menikmati kue-kue panggang segar Anda.</p>
          
          <div className={`payment-method ${method === 'card' ? 'active' : ''}`} onClick={() => setMethod('card')}>
              <div className="payment-method-header justify-between">
                  <div className="flex items-center gap-2">
                      <i className="fas fa-credit-card"></i> Credit or Debit Card
                  </div>
                  <div className="card-icons">
                      <i className="fab fa-cc-visa"></i>
                      <i className="fab fa-cc-mastercard"></i>
                  </div>
              </div>
              
              {method === 'card' && (
                <div className="payment-details">
                    <div className="form-group">
                        <label className="form-label">Cardholder Name</label>
                        <input type="text" className="form-control" defaultValue="John Doe" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Card Number</label>
                        <input type="text" className="form-control" placeholder="**** **** **** 1234" />
                    </div>
                    <div className="flex gap-4">
                        <div className="form-group flex-1" style={{flex: 1}}>
                            <label className="form-label">Expiry Date</label>
                            <input type="text" className="form-control" placeholder="MM/YY" />
                        </div>
                        <div className="form-group flex-1" style={{flex: 1}}>
                            <label className="form-label">CVV</label>
                            <input type="text" className="form-control" placeholder="***" />
                        </div>
                    </div>
                </div>
              )}
          </div>
          
          <div className={`payment-method ${method === 'wallet' ? 'active' : ''}`} onClick={() => setMethod('wallet')}>
              <div className="payment-method-header">
                  <i className="fas fa-wallet"></i> Digital Wallets
              </div>
              <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginLeft: '1.7rem'}}>GoPay, OVO, DANA, ShopeePay</p>
              
              {method === 'wallet' && (
                <div className="payment-details" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {['gopay', 'ovo', 'dana', 'shopeepay'].map(wallet => (
                    <label key={wallet} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', padding: '0.8rem 1rem', border: `1px solid ${walletType === wallet ? 'var(--button-bg)' : 'var(--border-color)'}`, borderRadius: '8px', background: walletType === wallet ? 'rgba(212, 163, 115, 0.1)' : 'transparent', flex: '1 1 calc(50% - 1rem)' }} onClick={(e) => { e.stopPropagation(); setWalletType(wallet); }}>
                      <input type="radio" name="wallet" checked={walletType === wallet} onChange={() => {}} style={{ cursor: 'pointer' }} />
                      <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{wallet}</span>
                    </label>
                  ))}
                </div>
              )}
          </div>
          
          <div className={`payment-method ${method === 'bank' ? 'active' : ''}`} onClick={() => setMethod('bank')}>
              <div className="payment-method-header">
                  <i className="fas fa-university"></i> Direct Bank Transfer
              </div>
              <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginLeft: '1.7rem'}}>BCA, Mandiri, BNI, BRI</p>
              
              {method === 'bank' && (
                <div className="payment-details" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { id: 'bca', name: 'BCA Virtual Account' },
                    { id: 'mandiri', name: 'Mandiri Virtual Account' },
                    { id: 'bni', name: 'BNI Virtual Account' },
                    { id: 'bri', name: 'BRIVA' }
                  ].map(bank => (
                    <label key={bank.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', padding: '1rem', border: `1px solid ${bankType === bank.id ? 'var(--button-bg)' : 'var(--border-color)'}`, borderRadius: '8px', background: bankType === bank.id ? 'rgba(212, 163, 115, 0.1)' : 'transparent' }} onClick={(e) => { e.stopPropagation(); setBankType(bank.id); }}>
                      <input type="radio" name="bank" checked={bankType === bank.id} onChange={() => {}} style={{ cursor: 'pointer' }} />
                      <span style={{ fontWeight: 500 }}>{bank.name}</span>
                    </label>
                  ))}
                </div>
              )}
          </div>
          
          <div className={`payment-method ${method === 'qris' ? 'active' : ''}`} onClick={() => setMethod('qris')}>
              <div className="payment-method-header">
                  <i className="fas fa-qrcode"></i> QRIS (Quick Response Code)
              </div>
              <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem', marginLeft: '1.7rem'}}>Scan to pay with any supported app</p>
              
              {method === 'qris' && (
                <div className="payment-details" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center' }}>
                  <div style={{ background: 'white', padding: '1rem', display: 'inline-block', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <img src={`${import.meta.env.BASE_URL}images/qris_code.png`} alt="QRIS Code" style={{ maxWidth: '200px', height: 'auto', display: 'block' }} />
                  </div>
                  <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Buka aplikasi e-wallet atau m-banking Anda, lalu scan QR Code di atas untuk menyelesaikan pembayaran.</p>
                </div>
              )}
          </div>
        </div>

        {/* Right Summary */}
        <div>
          <div className="order-summary" style={{backgroundColor: '#FAF4EA'}}>
              <div className="flex justify-between items-center mb-6">
                  <h2 style={{fontFamily: 'var(--font-heading)'}}>Pesanan</h2>
                  <span style={{fontSize: '0.8rem', fontWeight: 600}}>Kesegaran Terjamin</span>
              </div>
              
              <div>
                {cartItems.map(item => (
                  <div className="order-item" key={item.id}>
                      <img src={item.image} alt={item.name} className="order-item-img" />
                      <div className="order-item-info">
                          <div className="order-item-title">{item.name}</div>
                          <div className="order-item-qty">Qty: {item.qty}</div>
                      </div>
                      <div className="order-item-price">{formatRupiah(item.price * item.qty)}</div>
                  </div>
                ))}
              </div>
              
              <hr style={{border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0'}} />
              
              <div className="summary-row">
                  <span>Total</span>
                  <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="summary-row" style={{marginBottom: 0}}>
                  <span>Ongkir</span>
                  <span>{formatRupiah(shippingCost)}</span>
              </div>
              
              <div className="promo-code">
                  <input type="text" placeholder="BAKED20" defaultValue="BAKED20" />
                  <button type="button">Apply</button>
              </div>
              
              <div className="summary-total" style={{borderTop: 'none', paddingTop: 0}}>
                  <span>Total Semua</span>
                  <span style={{fontSize: '1.5rem'}}>{formatRupiah(total)}</span>
              </div>
              
              <button className="btn btn-full mt-4" style={{fontSize: '1.1rem', padding: '1rem'}} onClick={handlePayment}>Bayar Sekarang &rarr;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
