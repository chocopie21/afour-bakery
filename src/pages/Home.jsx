import { useEffect, useRef, useState } from 'react';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

const DraggableCarousel = ({ children }) => {
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };
  const onMouseLeave = () => setIsDown(false);
  const onMouseUp = () => setIsDown(false);
  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div 
      className="menu-grid" 
      ref={sliderRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      style={{ cursor: isDown ? 'grabbing' : 'grab', scrollSnapType: isDown ? 'none' : 'x mandatory' }}
    >
      {children}
    </div>
  );
};

export default function Home({ cart, updateQuantity, searchQuery, products }) {


  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.section-title, .category-title, .hero-content, .hero-image-box, .banner-image');
    animatedElements.forEach((el, index) => {
        if (!el.classList.contains('fade-in-up')) el.classList.add('fade-in-up');
        observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const filterProducts = (categoryProducts) => {
    if (!searchQuery) return categoryProducts;
    return categoryProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredRoti = filterProducts(products.roti);
  const filteredKue = filterProducts(products.kue);
  const filteredPastry = filterProducts(products.pastry);

  return (
    <>
      <section id="tentang-kita" className="container mt-8">
        <div className="hero">
            <div className="hero-content">
                <h1 className="hero-title">Kelembutan Sempurna yang Manjakan Lidah Anda.</h1>
                <p className="hero-desc">Di Afour Bakery, kami percaya bahwa kebahagiaan sejati dimulai dari gigitan pertama. Visi kami adalah memadukan bahan-bahan premium pilihan dengan teknik baking terbaik demi menyajikan kelezatan kue dan roti yang tak terlupakan.</p>
                <div className="flex gap-4">
                    <a href="#menu" className="btn">Lihat Menu</a>
                    <a href="#kontak" className="btn btn-outline">Contact Us</a>
                </div>
            </div>
            <div className="hero-image-container">
                <div className="hero-image-box">
                    <img src={`${import.meta.env.BASE_URL}images/cat_croissant.png`} alt="Kucing lucu memakai croissant" className="hero-cat" />
                </div>
            </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="container mt-8 mb-12">
          <div className="banner-image-container">
              <img src={`${import.meta.env.BASE_URL}images/bread_characters.png`} alt="Karakter Roti Lucu" className="banner-image fade-in-up" />
          </div>
      </section>

      <section id="menu" className="container mt-12">
          <h2 className="section-title">MENU</h2>
          
          <h3 className="category-title">Roti</h3>
          {filteredRoti.length > 0 ? (
            <DraggableCarousel>
              {filteredRoti.map(p => <ProductCard key={p.id} product={p} cart={cart} updateQuantity={updateQuantity} onSelectProduct={() => setSelectedProduct(p)} />)}
            </DraggableCarousel>
          ) : <p style={{color: 'var(--text-secondary)', marginBottom: '2rem'}}>Tidak ada roti yang cocok dengan pencarian Anda.</p>}

          <h3 className="category-title">Kue</h3>
          {filteredKue.length > 0 ? (
            <DraggableCarousel>
              {filteredKue.map(p => <ProductCard key={p.id} product={p} cart={cart} updateQuantity={updateQuantity} onSelectProduct={() => setSelectedProduct(p)} />)}
            </DraggableCarousel>
          ) : <p style={{color: 'var(--text-secondary)', marginBottom: '2rem'}}>Tidak ada kue yang cocok dengan pencarian Anda.</p>}

          <h3 className="category-title">Kue Kering</h3>
          {filteredPastry.length > 0 ? (
            <DraggableCarousel>
              {filteredPastry.map(p => <ProductCard key={p.id} product={p} cart={cart} updateQuantity={updateQuantity} onSelectProduct={() => setSelectedProduct(p)} />)}
            </DraggableCarousel>
          ) : <p style={{color: 'var(--text-secondary)', marginBottom: '2rem'}}>Tidak ada kue kering yang cocok dengan pencarian Anda.</p>}
      </section>
      <section id="kontak" className="container mb-12">
          <h2 className="section-title">KONTAK KAMI</h2>
          <div className="contact-section flex" style={{ gap: '4rem', background: 'var(--card-bg)', padding: '3rem', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
              
              <div className="contact-info" style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Kunjungi Toko Kami</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
                      Pintu kami selalu terbuka untuk Anda yang mencari kehangatan dari secangkir kopi dan sepotong roti segar.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                          <i className="fas fa-map-marker-alt" style={{ color: 'var(--button-bg)', fontSize: '1.2rem', marginTop: '0.2rem' }}></i>
                          <div>
                              <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Alamat</strong>
                              <span style={{ color: 'var(--text-secondary)' }}>Jl. Kelembutan No. 123, Jakarta Selatan</span>
                          </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                          <i className="fas fa-phone-alt" style={{ color: 'var(--button-bg)', fontSize: '1.2rem', marginTop: '0.2rem' }}></i>
                          <div>
                              <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Telepon / WhatsApp</strong>
                              <span style={{ color: 'var(--text-secondary)' }}>+62 857-7333-3256</span>
                          </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                          <i className="fas fa-clock" style={{ color: 'var(--button-bg)', fontSize: '1.2rem', marginTop: '0.2rem' }}></i>
                          <div>
                              <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Jam Operasional</strong>
                              <span style={{ color: 'var(--text-secondary)' }}>Senin - Minggu: 07:00 - 21:00</span>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="contact-form-container" style={{ flex: 1 }}>
                  <form onSubmit={e => { e.preventDefault(); alert('Pesan Anda berhasil dikirim! Kami akan segera merespons.'); e.target.reset(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                      <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nama Lengkap</label>
                          <input type="text" placeholder="Masukkan nama Anda" required style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', outline: 'none' }} />
                      </div>
                      <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Alamat Email</label>
                          <input type="email" placeholder="contoh@email.com" required style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', outline: 'none' }} />
                      </div>
                      <div>
                          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Pesan</label>
                          <textarea placeholder="Tuliskan pesan, pertanyaan, atau pesanan khusus Anda di sini..." required rows="4" style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', resize: 'vertical', outline: 'none' }}></textarea>
                      </div>
                      <button type="submit" className="btn btn-full" style={{ padding: '1rem', borderRadius: '12px', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                          Kirim Pesan <i className="fas fa-paper-plane" style={{ marginLeft: '0.5rem' }}></i>
                      </button>
                  </form>
              </div>

          </div>
      </section>
      
      <ProductModal product={selectedProduct} isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  );
}
