import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin({ products, setProducts }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    price: '',
    image: '',
    category: 'roti'
  });

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Tolong unggah file gambar (JPG, PNG, dll)');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData(prev => ({ ...prev, image: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[e.dataTransfer.files.length - 1]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.desc || !formData.price || !formData.image) {
      alert('Mohon lengkapi semua field!');
      return;
    }

    const newId = formData.name.toLowerCase().replace(/[^a-z0-9]/g, '_') + '_' + Math.floor(Math.random() * 1000);
    const newProduct = {
      id: newId,
      name: formData.name,
      desc: formData.desc,
      price: parseInt(formData.price),
      image: formData.image
    };

    setProducts(prev => {
      const updatedCategory = [...prev[formData.category], newProduct];
      return { ...prev, [formData.category]: updatedCategory };
    });

    setFormData({ name: '', desc: '', price: '', image: '', category: 'roti' });
    alert('Produk berhasil ditambahkan!');
  };

  const handleDelete = (category, productId) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      setProducts(prev => {
        const updatedCategory = prev[category].filter(p => p.id !== productId);
        return { ...prev, [category]: updatedCategory };
      });
    }
  };

  const formatRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <section className="container mt-12 mb-12">
      <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="section-title" style={{ margin: 0 }}>PANEL ADMIN RAHSIA 🕵️‍♂️</h2>
        <button onClick={() => navigate('/')} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
          &larr; Kembali ke Toko
        </button>
      </div>

      <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        
        {/* FORM TAMBAH PRODUK */}
        <div className="admin-card" style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Tambah Menu Baru</h3>
          
          <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Kategori</label>
              <select name="category" value={formData.category} onChange={handleInputChange} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontFamily: 'var(--font-body)' }}>
                <option value="roti">Roti</option>
                <option value="kue">Kue</option>
                <option value="pastry">Kue Kering / Pastry</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nama Produk</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Contoh: Roti Sosis" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontFamily: 'var(--font-body)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Harga (Rp)</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Contoh: 15000" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontFamily: 'var(--font-body)' }} />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Gambar Produk</label>
              
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${isDragging ? 'var(--button-bg)' : 'var(--border-color)'}`,
                  background: isDragging ? 'rgba(212, 163, 115, 0.1)' : 'var(--bg-color)',
                  borderRadius: '12px',
                  padding: '2rem 1rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                
                {formData.image ? (
                  <div style={{ position: 'relative' }}>
                    <img src={formData.image} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px', objectFit: 'contain' }} />
                    <p style={{ margin: '1rem 0 0 0', color: 'var(--button-bg)', fontWeight: 500, fontSize: '0.9rem' }}>Klik atau drag file lain untuk mengganti gambar</p>
                  </div>
                ) : (
                  <div>
                    <i className="fas fa-cloud-upload-alt" style={{ fontSize: '3rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}></i>
                    <p style={{ margin: 0, fontWeight: 500 }}>Drag & Drop file gambar di sini</p>
                    <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Atau klik untuk memilih dari perangkat Anda (Mendukung semua format gambar)</p>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Deskripsi Singkat</label>
              <textarea name="desc" value={formData.desc} onChange={handleInputChange} placeholder="Deskripsikan kelezatan produk ini..." rows="3" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', fontFamily: 'var(--font-body)', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" className="btn btn-full mt-2">Simpan Menu Baru</button>
          </form>
        </div>

        {/* DAFTAR PRODUK */}
        <div className="admin-card" style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Daftar Menu Aktif</h3>
          
          <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '1rem' }}>
            {['roti', 'kue', 'pastry'].map(category => (
              <div key={category} style={{ marginBottom: '2rem' }}>
                <h4 style={{ textTransform: 'uppercase', color: 'var(--button-bg)', marginBottom: '1rem' }}>Kategori: {category}</h4>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-color)', textAlign: 'left' }}>
                      <th style={{ padding: '0.8rem' }}>Gambar</th>
                      <th style={{ padding: '0.8rem' }}>Nama</th>
                      <th style={{ padding: '0.8rem' }}>Harga</th>
                      <th style={{ padding: '0.8rem', textAlign: 'center' }}>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products[category].length === 0 && (
                      <tr><td colSpan="4" style={{ padding: '1rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Belum ada produk di kategori ini.</td></tr>
                    )}
                    {products[category].map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '0.8rem' }}>
                          <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                        </td>
                        <td style={{ padding: '0.8rem', fontWeight: 500 }}>{p.name}</td>
                        <td style={{ padding: '0.8rem', color: 'var(--text-secondary)' }}>{formatRupiah(p.price)}</td>
                        <td style={{ padding: '0.8rem', textAlign: 'center' }}>
                          <button 
                            onClick={() => handleDelete(category, p.id)}
                            style={{ background: '#ff4d4f', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                          >
                            Hapus
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
