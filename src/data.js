import React, { createContext, useContext, useState, useMemo } from 'react';

export const appInfo = {
  title: 'Tradly Grocery Marketplace',
  tagline: 'Social Marketplace for Sustainable & Organic Groceries',
  primaryColor: '#33907C',
  version: '2.4.0',
};

export const categoriesData = [
  { id: 'beverages', name: 'Beverages', count: 48, icon: 'wine-outline', imageKey: 'category_beverages.jpg' },
  { id: 'bread', name: 'Bread & Bakery', count: 32, icon: 'cafe-outline', imageKey: 'category_bread.jpg' },
  { id: 'vegetables', name: 'Vegetables', count: 76, icon: 'nutrition-outline', imageKey: 'category_vegetables.jpg' },
  { id: 'fruit', name: 'Fruit', count: 54, icon: 'flower-outline', imageKey: 'category_fruit.jpg' },
  { id: 'egg', name: 'Egg & Dairy', count: 28, icon: 'egg-outline', imageKey: 'category_egg.jpg' },
  { id: 'frozen', name: 'Frozen Veg', count: 39, icon: 'snow-outline', imageKey: 'category_frozen.jpg' },
  { id: 'homecare', name: 'Home Care', count: 45, icon: 'sparkles-outline', imageKey: 'category_homecare.jpg' },
  { id: 'petcare', name: 'Pet Care', count: 22, icon: 'paw-outline', imageKey: 'category_petcare.jpg' },
];

export const storesData = [
  {
    id: 's1',
    name: 'Tradly Store',
    tagline: 'Official Tradly flagship store for farm-direct organic produce',
    category: 'Groceries',
    followers: 1200,
    totalProducts: 24,
    rating: 4.9,
    verified: true,
    website: 'tradly.app',
    phone: '+1 (555) 392-8821',
    address: 'Green Hub Central, 404 Orchard Way',
    imageKey: 'store_tradly.jpg',
  },
  {
    id: 's2',
    name: 'Groceries Store',
    tagline: 'Local fresh grocery & household essentials direct to your door',
    category: 'Daily Essentials',
    followers: 850,
    totalProducts: 42,
    rating: 4.8,
    verified: true,
    website: 'groceries-hub.tradly.app',
    phone: '+1 (555) 774-2091',
    address: 'Eastside Farmers Market, Stall 12',
    imageKey: 'store_groceries.jpg',
  },
  {
    id: 's3',
    name: 'Green Valley Organic',
    tagline: '100% certified organic fruits, greens and seasonal root veggies',
    category: 'Organic Farm',
    followers: 2400,
    totalProducts: 68,
    rating: 5.0,
    verified: true,
    website: 'greenvalley.farm',
    phone: '+1 (555) 234-9988',
    address: '77 Valley Vista Lane, Meadowbrook',
    imageKey: 'store_tradly.jpg',
  },
  {
    id: 's4',
    name: 'SunFresh Farms',
    tagline: 'Tree-ripened citrus, apples and fresh picked berries',
    category: 'Fruit Orchard',
    followers: 980,
    totalProducts: 19,
    rating: 4.7,
    verified: true,
    website: 'sunfresh.tradly.app',
    phone: '+1 (555) 883-4411',
    address: 'Sunridge Heights, Ridge Rd',
    imageKey: 'store_groceries.jpg',
  },
  {
    id: 's5',
    name: 'Bakers Delight',
    tagline: 'Artisan sourdough, ancient grain loaves and morning pastries',
    category: 'Bakery',
    followers: 620,
    totalProducts: 15,
    rating: 4.9,
    verified: false,
    website: 'bakersdelight.tradly.app',
    phone: '+1 (555) 102-3948',
    address: '18 Flour Mill Alley',
    imageKey: 'store_tradly.jpg',
  },
];

export const initialProducts = [
  {
    id: 'p1',
    title: 'Coca Cola Classic',
    storeId: 's1',
    storeName: 'Tradly Store',
    price: 25,
    originalPrice: 35,
    discount: '28% Off',
    category: 'beverages',
    unit: '6 x 330ml pack',
    organic: false,
    rating: 4.8,
    reviews: 140,
    stock: 50,
    featured: true,
    isPopular: true,
    imageKey: 'product_coke.jpg',
    description: 'Crisp, refreshing carbonated soft drink packaged in recyclable aluminum cans. Ideal for family gatherings and celebrations.',
    origin: 'Atlanta, USA',
    shelfLife: '12 Months',
    storage: 'Store in a cool, dry place',
  },
  {
    id: 'p2',
    title: 'Fresh Green Broccoli',
    storeId: 's2',
    storeName: 'Groceries Store',
    price: 15,
    originalPrice: 20,
    discount: '25% Off',
    category: 'vegetables',
    unit: '1 kg head',
    organic: true,
    rating: 4.9,
    reviews: 88,
    stock: 35,
    featured: true,
    isPopular: true,
    imageKey: 'product_broccoli.jpg',
    description: 'Crisp, nutrient-dense organic broccoli florets harvested daily at sunrise. Rich in Vitamin C, K and dietary fiber.',
    origin: 'California Organics, USA',
    shelfLife: '7 Days',
    storage: 'Keep refrigerated between 2°C - 4°C',
  },
  {
    id: 'p3',
    title: 'Organic Crisp Red Apple',
    storeId: 's1',
    storeName: 'Tradly Store',
    price: 14,
    originalPrice: 20,
    discount: '30% Off',
    category: 'fruit',
    unit: '1 kg bag (approx. 5-6 pcs)',
    organic: true,
    rating: 4.9,
    reviews: 210,
    stock: 60,
    featured: true,
    isPopular: true,
    imageKey: 'product_apple.jpg',
    description: 'Crisp and juicy Honeycrisp apples naturally sweetened under golden sunlight. Free from artificial waxes and chemicals.',
    origin: 'Washington Valley Orchards',
    shelfLife: '14 Days',
    storage: 'Refrigerate for optimum crispness',
  },
  {
    id: 'p4',
    title: 'Farm Fresh Brown Eggs',
    storeId: 's2',
    storeName: 'Groceries Store',
    price: 9,
    originalPrice: 12,
    discount: '25% Off',
    category: 'egg',
    unit: 'Carton of 12 eggs',
    organic: true,
    rating: 4.8,
    reviews: 95,
    stock: 40,
    featured: true,
    isPopular: true,
    imageKey: 'product_egg.jpg',
    description: 'Pasture-raised grade-A brown eggs from hormone-free, free-roaming hens. Deep golden yolks rich in Omega-3.',
    origin: 'Happy Meadow Country Hen House',
    shelfLife: '21 Days',
    storage: 'Keep refrigerated',
  },
  {
    id: 'p5',
    title: 'Sweet Navel Oranges',
    storeId: 's4',
    storeName: 'SunFresh Farms',
    price: 12,
    originalPrice: 16,
    discount: '25% Off',
    category: 'fruit',
    unit: '1.5 kg mesh bag',
    organic: true,
    rating: 4.7,
    reviews: 74,
    stock: 45,
    featured: false,
    isPopular: true,
    imageKey: 'product_orange.jpg',
    description: 'Juicy seedless navel oranges bursting with natural sweet citrus nectar. Loaded with immunity-boosting Vitamin C.',
    origin: 'Florida Citrus Groves',
    shelfLife: '10 Days',
    storage: 'Cool room temperature or refrigerated',
  },
  {
    id: 'p6',
    title: 'Herbal Moisture Cream',
    storeId: 's2',
    storeName: 'Groceries Store',
    price: 25,
    originalPrice: 35,
    discount: '28% Off',
    category: 'homecare',
    unit: '200 ml jar',
    organic: true,
    rating: 4.6,
    reviews: 62,
    stock: 25,
    featured: false,
    isPopular: true,
    imageKey: 'product_moisturizer.jpg',
    description: 'Gentle, all-natural skin hydration cream formulated with cold-pressed jojoba, aloe vera extract, and shea butter.',
    origin: 'PureCare Naturals, Vermont',
    shelfLife: '24 Months',
    storage: 'Store away from direct heat and sunlight',
  },
  {
    id: 'p7',
    title: 'Artisan Tropical Fruit Mix',
    storeId: 's3',
    storeName: 'Green Valley Organic',
    price: 18,
    originalPrice: 24,
    discount: '25% Off',
    category: 'fruit',
    unit: '1 kg assortment pack',
    organic: true,
    rating: 4.9,
    reviews: 112,
    stock: 30,
    featured: true,
    isPopular: false,
    imageKey: 'product_fruit.jpg',
    description: 'A vibrant selection of sweet kiwi, papayas, and berries hand-selected at peak ripeness.',
    origin: 'Green Valley Farms',
    shelfLife: '5 Days',
    storage: 'Refrigerate immediately',
  },
  {
    id: 'p8',
    title: 'Wild Catch Fish Cutlets',
    storeId: 's2',
    storeName: 'Groceries Store',
    price: 28,
    originalPrice: 35,
    discount: '20% Off',
    category: 'frozen',
    unit: '500g frozen pack',
    organic: false,
    rating: 4.8,
    reviews: 53,
    stock: 20,
    featured: false,
    isPopular: true,
    imageKey: 'product_fish.jpg',
    description: 'Sustainably wild-caught salmon and whitefish cutlets flash-frozen at sea to seal in freshness, flavor, and natural oils.',
    origin: 'North Pacific Fisheries',
    shelfLife: '6 Months',
    storage: 'Keep frozen at -18°C',
  },
  {
    id: 'p9',
    title: 'Eco Herbal Shampoo',
    storeId: 's1',
    storeName: 'Tradly Store',
    price: 18,
    originalPrice: 24,
    discount: '25% Off',
    category: 'homecare',
    unit: '400 ml bottle',
    organic: true,
    rating: 4.7,
    reviews: 44,
    stock: 32,
    featured: false,
    isPopular: true,
    imageKey: 'product_shampoo.jpg',
    description: 'Biodegradable clarifying shampoo with rosemary, mint, and tea tree oils. Free of sulfates, parabens, and microplastics.',
    origin: 'EcoGreen Botanicals, Oregon',
    shelfLife: '18 Months',
    storage: 'Room temperature',
  },
];

export const onboardingSlides = [
  {
    id: '1',
    title: 'Empowering Artisans, Farmers & Micro Business',
    subtitle: 'Sell directly to consumers without middlemen and earn fair prices for sustainable produce.',
    badge: 'Direct Trade',
    icon: 'leaf-outline',
  },
  {
    id: '2',
    title: 'Connecting NGOs, Social Enterprises with Communities',
    subtitle: 'Support ethical makers, local farms, and fair trade collectives with transparent sourcing.',
    badge: 'Community First',
    icon: 'people-outline',
  },
  {
    id: '3',
    title: 'Donate, Invest & Support infrastructure projects',
    subtitle: 'Contribute micro-investments directly into small farm solar refrigeration and eco transport.',
    badge: 'Impact Investment',
    icon: 'globe-outline',
  },
];

export const initialOrders = [
  {
    id: 'TRD-89412',
    date: 'Januari 2026',
    timestamp: '2026-01-18 14:20',
    status: 'Delivered',
    statusStep: 4,
    total: 40.00,
    discount: '50% Off',
    items: [
      { id: 'p1', title: 'Coca Cola Classic', price: 25, qty: 1, imageKey: 'product_coke.jpg' },
      { id: 'p2', title: 'Fresh Green Broccoli', price: 15, qty: 1, imageKey: 'product_broccoli.jpg' },
    ],
    address: '142 Market Street, Green District, Suite 500',
    paymentMethod: 'Credit Card (**** 4242)',
  },
  {
    id: 'TRD-88204',
    date: 'Desember 2025',
    timestamp: '2025-12-24 10:15',
    status: 'Delivered',
    statusStep: 4,
    total: 35.00,
    discount: '25% Off',
    items: [
      { id: 'p3', title: 'Organic Crisp Red Apple', price: 14, qty: 1, imageKey: 'product_apple.jpg' },
      { id: 'p4', title: 'Farm Fresh Brown Eggs', price: 9, qty: 1, imageKey: 'product_egg.jpg' },
      { id: 'p5', title: 'Sweet Navel Oranges', price: 12, qty: 1, imageKey: 'product_orange.jpg' },
    ],
    address: '142 Market Street, Green District, Suite 500',
    paymentMethod: 'Tradly Wallet',
  },
  {
    id: 'TRD-87110',
    date: 'November 2025',
    timestamp: '2025-11-05 18:40',
    status: 'Delivered',
    statusStep: 4,
    total: 25.00,
    discount: '28% Off',
    items: [
      { id: 'p6', title: 'Herbal Moisture Cream', price: 25, qty: 1, imageKey: 'product_moisturizer.jpg' },
    ],
    address: '142 Market Street, Green District, Suite 500',
    paymentMethod: 'Apple Pay',
  },
];

const MarketplaceContext = createContext(null);

export const MarketplaceProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);
  const [stores, setStores] = useState(storesData);
  const [cart, setCart] = useState([
    { ...initialProducts[0], qty: 2 },
    { ...initialProducts[1], qty: 1 },
  ]);
  const [wishlist, setWishlist] = useState(['p1', 'p3']);
  const [orders, setOrders] = useState(initialOrders);
  const [followedStoreIds, setFollowedStoreIds] = useState(['s1']);
  const [searchQuery, setSearchQuery] = useState('');
  const [userProfile, setUserProfile] = useState({
    name: 'Tradly Team',
    email: 'info@tradly.co',
    phone: '+1 999 888 7776',
    address: '142 Market Street, Green District, Suite 500',
    location: 'Tradly Central Depot, New York',
    currency: 'USD ($)',
    language: 'English',
  });

  const [myStore, setMyStore] = useState({
    id: 'user_store_1',
    name: 'Tradly Organic Farm',
    category: 'Groceries',
    tagline: 'Farm-fresh sustainable veggies and greenhouse produce',
    followers: 1240,
    totalProducts: 8,
    balance: 1420.50,
    rating: 4.9,
    address: '142 Market Street, Suite 500',
    website: 'tradly.app/my-farm',
    phone: '+1 999 888 7776',
  });

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + quantity } : item
        );
      }
      return [...prev, { ...product, qty: quantity }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const deliveryFee = cart.length > 0 ? 5.00 : 0.00;
  const promoDiscount = cart.length > 0 ? 10.00 : 0.00;
  const cartTotal = Math.max(0, cartSubtotal + deliveryFee - promoDiscount);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const toggleFollowStore = (storeId) => {
    setFollowedStoreIds((prev) =>
      prev.includes(storeId) ? prev.filter((id) => id !== storeId) : [...prev, storeId]
    );
  };

  const isFollowingStore = (storeId) => followedStoreIds.includes(storeId);

  const placeOrder = (orderData) => {
    const newOrder = {
      id: 'TRD-' + Math.floor(10000 + Math.random() * 90000),
      date: 'Januari 2026',
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'Order Placed',
      statusStep: 0,
      total: cartTotal,
      discount: 'Promo -$10',
      items: [...cart],
      address: orderData?.address || userProfile.address,
      paymentMethod: orderData?.paymentMethod || 'Credit Card (**** 4242)',
    };
    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const createStore = (storeDetails) => {
    const newStore = {
      id: 'user_store_' + Date.now(),
      name: storeDetails.name || 'My Tradly Store',
      category: storeDetails.category || 'Groceries',
      tagline: storeDetails.tagline || 'Fresh produce directly from grower to table',
      followers: 1,
      totalProducts: 0,
      balance: 0.00,
      rating: 5.0,
      address: storeDetails.address || userProfile.address,
      website: storeDetails.website || 'tradly.app/mystore',
      phone: storeDetails.phone || userProfile.phone,
    };
    setMyStore(newStore);
    return newStore;
  };

  const addProduct = (productData) => {
    const newProduct = {
      id: 'p_' + Date.now(),
      title: productData.title,
      storeId: myStore ? myStore.id : 's1',
      storeName: myStore ? myStore.name : 'Tradly Store',
      price: parseFloat(productData.price) || 10,
      originalPrice: parseFloat(productData.originalPrice) || parseFloat(productData.price) + 5,
      discount: productData.discount || '15% Off',
      category: productData.category || 'vegetables',
      unit: productData.unit || '1 unit',
      organic: !!productData.organic,
      rating: 5.0,
      reviews: 1,
      stock: parseInt(productData.stock, 10) || 20,
      featured: false,
      isPopular: false,
      imageKey: productData.imageKey || 'product_broccoli.jpg',
      description: productData.description || 'Locally grown fresh produce.',
      origin: productData.origin || 'Local Farm',
      shelfLife: productData.shelfLife || '7 Days',
      storage: productData.storage || 'Refrigerate',
    };
    setProducts((prev) => [newProduct, ...prev]);
    if (myStore) {
      setMyStore((prev) => ({ ...prev, totalProducts: (prev.totalProducts || 0) + 1 }));
    }
    return newProduct;
  };

  const editProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    if (myStore) {
      setMyStore((prev) => ({ ...prev, totalProducts: Math.max(0, (prev.totalProducts || 1) - 1) }));
    }
  };

  const updateProfile = (data) => {
    setUserProfile((prev) => ({ ...prev, ...data }));
  };

  const value = {
    products,
    stores,
    cart,
    wishlist,
    orders,
    followedStoreIds,
    searchQuery,
    setSearchQuery,
    userProfile,
    myStore,
    addToCart,
    updateCartQty,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    promoDiscount,
    cartTotal,
    toggleWishlist,
    isWishlisted,
    toggleFollowStore,
    isFollowingStore,
    placeOrder,
    createStore,
    addProduct,
    editProduct,
    deleteProduct,
    updateProfile,
  };

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
