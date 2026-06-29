import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Admin from './pages/Admin';
import CartSidebar from './components/CartSidebar';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('afourCartReact');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const initialProducts = {
    roti: [
      { id: 'roti_tawar', name: 'Roti Tawar Kupas', desc: 'Roti tawar putih tanpa kulit yang sangat empuk, praktis untuk sarapan.', price: 15000, image: `${import.meta.env.BASE_URL}images/roti_tawar.png` },
      { id: 'roti_sobek', name: 'Roti Sobek Keju', desc: 'Roti manis bertekstur kapas yang lembut dipadukan dengan isian keju gurih melimpah.', price: 20000, image: `${import.meta.env.BASE_URL}images/roti_sobek.png` },
      { id: 'roti_gandum', name: 'Roti Gandum Utuh', desc: 'Roti sehat kaya serat dari gandum utuh pilihan dengan taburan biji-bijian.', price: 25000, image: `${import.meta.env.BASE_URL}images/roti_tawar.png` },
      { id: 'roti_coklat', name: 'Roti Isi Coklat Lumer', desc: 'Roti super lembut dengan isian coklat premium yang lumer di mulut.', price: 18000, image: `${import.meta.env.BASE_URL}images/roti_sobek.png` },
      { id: 'roti_sisir', name: 'Roti Sisir Mentega', desc: 'Roti klasik yang dioles dengan mentega manis bertabur gula.', price: 16000, image: `${import.meta.env.BASE_URL}images/roti_tawar.png` }
    ],
    kue: [
      { id: 'lapis_surabaya', name: 'Lapis Surabaya', desc: 'Bolu berlapis tiga dengan tekstur super padat dan rasa otentik selai strawberry di tengahnya.', price: 35000, image: `${import.meta.env.BASE_URL}images/lapis_surabaya.png` },
      { id: 'chiffon_pandan', name: 'Chiffon Cake Pandan', desc: 'Bolu super ringan dan berongga dengan aroma pandan alam yang memikat.', price: 30000, image: `${import.meta.env.BASE_URL}images/chiffon_pandan.png` },
      { id: 'brownies_fudge', name: 'Fudgy Brownies', desc: 'Brownies padat dengan rasa coklat pekat dan pinggiran yang renyah.', price: 40000, image: `${import.meta.env.BASE_URL}images/lapis_surabaya.png` },
      { id: 'cheese_cake', name: 'Basque Cheesecake', desc: 'Cheesecake panggang ala Spanyol dengan tekstur creamy dan permukaan karamel eksotis.', price: 45000, image: `${import.meta.env.BASE_URL}images/chiffon_pandan.png` },
      { id: 'bolu_gulung', name: 'Bolu Gulung Moka', desc: 'Bolu gulung klasik dengan krim moka lembut dan taburan meises.', price: 32000, image: `${import.meta.env.BASE_URL}images/lapis_surabaya.png` }
    ],
    pastry: [
      { id: 'butter_croissant', name: 'Butter Croissant', desc: 'Pastry berlapis rasa mentega original yang renyah di luar dan berongga di dalam.', price: 15000, image: `${import.meta.env.BASE_URL}images/butter_croissant.png` },
      { id: 'cromboloni', name: 'Cromboloni', desc: 'Perpaduan unik croissant bulat renyah dengan isian krim manis yang meluber.', price: 20000, image: `${import.meta.env.BASE_URL}images/cromboloni.png` },
      { id: 'pain_au_chocolat', name: 'Pain au Chocolat', desc: 'Pastry berlapis mentega dengan isian dua batang coklat hitam Prancis.', price: 18000, image: `${import.meta.env.BASE_URL}images/butter_croissant.png` },
      { id: 'danish_fruit', name: 'Mixed Fruit Danish', desc: 'Danish renyah dengan krim vanilla dan topping buah-buahan segar.', price: 22000, image: `${import.meta.env.BASE_URL}images/cromboloni.png` },
      { id: 'cinnamon_roll', name: 'Classic Cinnamon Roll', desc: 'Roti gulung kayu manis dengan siraman cream cheese frosting yang berlimpah.', price: 19000, image: `${import.meta.env.BASE_URL}images/butter_croissant.png` }
    ]
  };

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem('afourProductsReact_v2');
    return savedProducts ? JSON.parse(savedProducts) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('afourCartReact', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('afourProductsReact_v2', JSON.stringify(products));
  }, [products]);

  const updateQuantity = (product, newQty) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newQty <= 0) {
        delete newCart[product.id];
      } else {
        newCart[product.id] = { ...product, qty: newQty };
      }
      return newCart;
    });
  };

  const getCartCount = () => {
    return Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  };

  return (
    <Router>
      <Navbar cartCount={getCartCount()} onOpenCart={() => setIsCartOpen(true)} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} updateQuantity={updateQuantity} />
      <Routes>
        <Route path="/" element={<Home cart={cart} updateQuantity={updateQuantity} searchQuery={searchQuery} products={products} />} />
        <Route path="/shipping" element={<Shipping cart={cart} />} />
        <Route path="/payment" element={<Payment cart={cart} setCart={setCart} />} />
        <Route path="/success" element={<Success />} />
        <Route path="/admin" element={<Admin products={products} setProducts={setProducts} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
