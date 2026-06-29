import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MapModal from '../components/MapModal';

export default function Shipping({ cart }) {
  const [shippingOption, setShippingOption] = useState('express');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const shippingCost = shippingOption === 'express' ? 30000 : 10000;

  const formatRupiah = (number) => 'Rp. ' + number.toLocaleString('id-ID');

  const cartItems = Object.values(cart);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="container" style={{ marginTop: '2rem' }}>
      {/* Progress Steps */}
      <div className="progress-steps">
          <div className="step">
              <div className="step-icon"><i className="fas fa-check"></i></div>
              <div className="step-label">Keranjang</div>
          </div>
          <div className="step-line"></div>
          <div className="step active">
              <div className="step-icon"><i className="fas fa-truck"></i></div>
              <div className="step-label">Pengiriman</div>
          </div>
          <div className="step-line" style={{backgroundColor: 'var(--border-color)'}}></div>
          <div className="step">
              <div className="step-icon"><i className="fas fa-credit-card"></i></div>
              <div className="step-label">Pembayaran</div>
          </div>
      </div>

      <div className="layout-grid">
        {/* Left Form */}
        <div>
          <h2 className="mb-4" style={{fontFamily: 'var(--font-heading)'}}>Contact Information</h2>
          <div className="flex gap-4 mb-8">
              <div className="form-group flex-1" style={{flex: 1}}>
                  <label className="form-label">Nama Lengkap</label>
                  <input type="text" className="form-control" placeholder="e.g. Julian Artisan" />
              </div>
              <div className="form-group flex-1" style={{flex: 1}}>
                  <label className="form-label">No. Hp</label>
                  <input type="text" className="form-control" placeholder="+62 000-0000" />
              </div>
          </div>

          <h2 className="mb-4" style={{fontFamily: 'var(--font-heading)'}}>Alamat Pengiriman</h2>
          <div className="form-group">
              <label className="form-label">Alamat Lengkap</label>
              <input type="text" className="form-control" placeholder="123 Baker's Lane" />
          </div>
          <div className="map-placeholder" style={{ overflow: 'hidden' }}>
              {selectedLocation && (
                <MapContainer 
                  center={selectedLocation} 
                  zoom={15} 
                  zoomControl={false} 
                  dragging={false} 
                  scrollWheelZoom={false} 
                  doubleClickZoom={false}
                  style={{ height: '100%', width: '100%', position: 'absolute', top: 0, left: 0 }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={selectedLocation}></Marker>
                </MapContainer>
              )}
              <div className="btn-pin" onClick={() => setIsMapOpen(true)} style={{ zIndex: 1000 }}>
                  <i className={`fas ${selectedLocation ? 'fa-check-circle' : 'fa-map-marker-alt'}`}></i> 
                  {selectedLocation ? 'Edit Lokasi' : 'Pin your location'}
              </div>
          </div>

          <h2 className="mb-4" style={{fontFamily: 'var(--font-heading)'}}>Pilihan Pengiriman</h2>
          <div className="shipping-options">
              <div className={`shipping-card ${shippingOption === 'standard' ? 'active' : ''}`} onClick={() => setShippingOption('standard')}>
                  <div className="shipping-card-price">Rp. 10.000</div>
                  <div className="shipping-card-icon"><i className="fas fa-box"></i></div>
                  <h4>Pengiriman Standar</h4>
                  <p>Roti segar, dikirim dalam 2-3 hari. Tiba dengan kemasan kertas klasik ramah lingkungan.</p>
              </div>
              <div className={`shipping-card ${shippingOption === 'express' ? 'active' : ''}`} onClick={() => setShippingOption('express')}>
                  <div className="shipping-card-price">Rp. 30.000</div>
                  <div className="shipping-card-icon"><i className="fas fa-bolt"></i></div>
                  <h4>Langsung dari Oven</h4>
                  <p>Dikirim di hari yang sama jika dipesan sebelum jam 12 siang, tiba dalam kondisi masih hangat dari oven.</p>
              </div>
          </div>

          <div className="mt-8 mb-12">
              <Link to="/payment" className="btn">Lanjut untuk bayar &rarr;</Link>
          </div>
        </div>

        {/* Right Summary */}
        <div>
          <div className="order-summary">
              <h2 className="mb-4" style={{fontFamily: 'var(--font-heading)'}}>Orderan</h2>
              
              <div>
                {cartItems.length === 0 ? (
                  <div className="text-center text-secondary py-4">Keranjang Anda kosong.</div>
                ) : (
                  cartItems.map(item => (
                    <div className="order-item" key={item.id}>
                        <img src={item.image} alt={item.name} className="order-item-img" />
                        <div className="order-item-info">
                            <div className="order-item-title">{item.name}</div>
                            <div className="order-item-qty">Qty: {item.qty}</div>
                        </div>
                        <div className="order-item-price">{formatRupiah(item.price * item.qty)}</div>
                    </div>
                  ))
                )}
              </div>
              
              <hr style={{border: 'none', borderTop: '1px solid var(--border-color)', margin: '1.5rem 0'}} />
              
              <div className="summary-row">
                  <span>Total</span>
                  <span>{formatRupiah(subtotal)}</span>
              </div>
              <div className="summary-row">
                  <span>Ongkir</span>
                  <span>{formatRupiah(shippingCost)}</span>
              </div>
              <div className="summary-row">
                  <span>Pajak (10%)</span>
                  <span>{formatRupiah(tax)}</span>
              </div>
              
              <div className="summary-total">
                  <span>Total</span>
                  <span style={{fontSize: '1.5rem'}}>{formatRupiah(total)}</span>
              </div>

              <div className="guarantee-box">
                  <i className="fas fa-check-circle"></i>
                  <div>
                      <strong>Baked-to-Order Guarantee</strong>
                      <p>We only start kneading once you checkout.</p>
                  </div>
              </div>
          </div>
        </div>
      </div>

      <MapModal 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        onConfirm={(loc) => {
          setSelectedLocation(loc);
          setIsMapOpen(false);
        }} 
      />
    </div>
  );
}
