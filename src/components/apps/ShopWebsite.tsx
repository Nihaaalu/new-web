import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Check, 
  Trash2, 
  X, 
  ArrowLeft,
  Menu,
  Plus,
  Minus,
  Star,
  Sparkles,
  HelpCircle,
  Tag,
  Heart,
  Search,
  ChevronRight,
  MapPin,
  Truck,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

export interface FootwearProduct {
  id: string;
  name: string;
  originalPrice: number;
  price: number;
  category: string;
  tags: string[];
  rating: number;
  image: string;
  gallery: string[];
  desc: string;
  materials: string;
  colorways: string[];
  featuresList: string[];
}

// Support type alias to prevent compile errors
export type TechProduct = FootwearProduct;

interface ShopWebsiteProps {
  navState: { page: string; params?: any };
  onNavigate: (page: string, params?: any) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const PRODUCTS: FootwearProduct[] = [
  {
    id: "oversized-graphic-tee",
    name: "Tokyo Void Oversized Tee",
    originalPrice: 1499,
    price: 799,
    category: "Oversized",
    tags: ["Men", "Oversized", "New Arrivals"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Crafted from heavyweight 240 GSM organic loop-knit cotton. Features a bold high-definition cyberpunk screen print graphic on the back, drop-shoulder comfort fit, and durable rib-knit crewneck collar.",
    materials: "100% Cotton French Terry, 240 GSM weight",
    colorways: ["Carbon Black", "Aged Off-White", "Acid Violet"],
    featuresList: ["Heavyweight puff print detail", "Relaxed drop-shoulder unisex fit", "Pre-shrunk soft wash texture"]
  },
  {
    id: "cargo-pants",
    name: "Urban Utility Cargo Pants",
    originalPrice: 2999,
    price: 1899,
    category: "Men",
    tags: ["Men", "Best Sellers"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1517441162441-b88a0c41f05b?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517441162441-b88a0c41f05b?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Street-tuned performance lifestyle cargo wear. Features weather-resistant tactical ripstop fabric, 6 secure-fold pockets, and adjustable ankle cinch toggles.",
    materials: "70% Organic Cotton Ripstop, 30% Recycled Nylon",
    colorways: ["Tactical Olive", "Shadow Black", "Sandstone Kraft"],
    featuresList: ["6 pocket cargo storage grid", "Articulated pre-bent knee joints", "Heavy-duty canvas seat stitching"]
  },
  {
    id: "running-shoes",
    name: "Swift Pace Trail Runners",
    originalPrice: 3499,
    price: 2499,
    category: "Sneakers",
    tags: ["Sneakers", "Best Sellers"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Ultra-responsive athletic running trainers engineered for dynamic road and trail pacing. Incorporates supportive high-wear treads and hyper-breathing engineered shell vents.",
    materials: "Aerated Knit Polyester, Recycled High Density EVA Foam Core",
    colorways: ["Crimson Flare", "Stealth Onyx", "Glow Neon"],
    featuresList: ["Full wet-grip terrain traction", "Dual-density spring foam midsole", "Comfort glove fit lining"]
  },
  {
    id: "varsity-jacket",
    name: "All-Star Campus Varsity",
    originalPrice: 3999,
    price: 2499,
    category: "Men",
    tags: ["Men", "Women", "Best Sellers", "Limited Drop"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Retro American campus style fleece jacket. Styled with polyurethane leatherette sleeves, high-density chenille embroidery patches, snap buttons, and soft wool blended body frame.",
    materials: "80% Brushed Wool Melange, 20% Vegan Faux Leather",
    colorways: ["Burgundy Classics", "Varsity Royal Blue", "Monochrome Black"],
    featuresList: ["Rich chenille embroidered badges", "Quilted wind-block inner satin lining", "Heavy stretch elastic striped ribbing"]
  },
  {
    id: "premium-hoodie",
    name: "Luxe French Terry Hoodie",
    originalPrice: 2499,
    price: 1299,
    category: "Hoodies",
    tags: ["Hoodies", "New Arrivals"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Your search for the ultimate comfort piece ends here. Heavyweight organic cotton loopback fleece, oversized double-layer structural hood, and kangaroo pocket array.",
    materials: "100% GOTS Certified Organic Cotton (420 GSM)",
    colorways: ["Desert Pebble", "Mineral Charcoal", "Core White"],
    featuresList: ["Heavy fabric structural posture", "Stitched zero-pinch neck seam", "Double cuffs with elastane retention"]
  },
  {
    id: "gym-shorts",
    name: "Pro dry-fit Active Shorts",
    originalPrice: 1199,
    price: 699,
    category: "New Arrivals",
    tags: ["Men", "Women", "New Arrivals"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Lightweight and moisture-wicking active dry training shorts designed with a comfort waist support and highly elastic 4-way stretch fiber layout.",
    materials: "92% Eco Polyester, 8% Lycra stretch blend",
    colorways: ["Athletic Smoke", "Active Cobalt", "Slate Stealth"],
    featuresList: ["Deep zip-close cardio storage pockets", "No-chafing active flat seams", "Laser-cut ventilation matrix"]
  },
  {
    id: "sneakers",
    name: "Classic Heritage Sneakers",
    originalPrice: 2499,
    price: 1499,
    category: "Sneakers",
    tags: ["Sneakers", "Best Sellers", "Recommended For You"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "A timeless, minimalist flat-profile sneaker matching premium heavy canvas paneling with soft vegan suede overlays and sturdy non-marking organic rubber outsoles.",
    materials: "Suede overlays, Solid Weave Canvas, Rubber cupsole",
    colorways: ["Vintage White / Gum", "Desert Khaki", "Monocolor Onyx"],
    featuresList: ["OrthoLite custom foam sockliner", "Double cap reinforced toe stitch", "Premium solid brass rustproof eyelets"]
  },
  {
    id: "accessories-cap",
    name: "Savage Stitch Denim Cap",
    originalPrice: 999,
    price: 499,
    category: "Accessories",
    tags: ["Accessories", "Limited Drop"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Unstructured vintage distressed casual dad hat with deep sweat band, custom metal buckle fit sliders, and raw organic brim-seam detailing.",
    materials: "100% Washed Twill Heavy Denim",
    colorways: ["Indigo Washed", "Distressed Khaki", "Charcoal Acid"],
    featuresList: ["Slide-lock custom buckle adjuster", "Padded fast-dry sweat cushion", "Breathable structural grommets"]
  },
  {
    id: "accessories-backpack",
    name: "Urban Nomad Street Pack",
    originalPrice: 3299,
    price: 1899,
    category: "Accessories",
    tags: ["Accessories", "Recommended For You"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "The go-to companion for daily transitions. Built from water repellent heavyweight ballistic texture, keeping gear dry and secure.",
    materials: "900D Cordura Ripstop Canvas, SBS coated waterproof zippers",
    colorways: ["Core Stealth Black", "Sand Dune", "Gravel Sandstone"],
    featuresList: ["Sleek padded 15.6 inch laptop bay", "External flex hydro mesh holder", "Padded back cushion airflow system"]
  },
  {
    id: "womens-oversized-tee",
    name: "Neo-Retro Oversized Tee",
    originalPrice: 1499,
    price: 799,
    category: "Oversized",
    tags: ["Women", "Oversized", "New Arrivals"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
    ],
    desc: "Comfort-redefined aesthetic streetwear t-shirt with crackle collegiate screen-printing overlays on premium ultra-soft ring spun cotton weave.",
    materials: "100% Combed Cotton Jersey, 220 GSM Weight",
    colorways: ["Warm Oatmeal", "Midnight Teal", "Retro Coral Red"],
    featuresList: ["Collegiate classic high density graphics", "Premium ribbed neckband detailing", "Soft-air breathable fabric finish"]
  }
];

export default function ShopWebsite({ navState, onNavigate, menuOpen, setMenuOpen }: ShopWebsiteProps) {
  // Store States
  const [cart, setCart] = useState<{ product: FootwearProduct; quantity: number; selectedSize: string }[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [wishlist, setWishlist] = useState<string[]>(["swift-pace-runners", "varsity-jacket"]);
  
  // Selection States
  const [selectedSize, setSelectedSize] = useState("M");
  const [detailActiveImg, setDetailActiveImg] = useState<string>("");

  // Search Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Delivery check state
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Checkout inputs
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutCity, setCheckoutCity] = useState("");
  const [checkoutPincode, setCheckoutPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI">("COD");

  // Form Validations
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeProduct = PRODUCTS.find(p => p.id === (navState.params?.id || navState.params)) || PRODUCTS[0];

  // Notification helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: FootwearProduct, size: string) => {
    const existingIdx = cart.findIndex(item => item.product.id === product.id && item.selectedSize === size);
    if (existingIdx > -1) {
      const updated = [...cart];
      updated[existingIdx].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { product, quantity: 1, selectedSize: size }]);
    }
    triggerToast(`Added ${product.name} [Size: ${size}] to Cart!`);
  };

  const handleQuickAdd = (product: FootwearProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const defaultSz = product.category === "Sneakers" ? "9" : "M";
    handleAddToCart(product, defaultSz);
  };

  const handleUpdateQuantity = (idx: number, delta: number) => {
    const updated = [...cart];
    updated[idx].quantity += delta;
    if (updated[idx].quantity <= 0) {
      updated.splice(idx, 1);
    }
    setCart(updated);
  };

  const handleRemoveItem = (idx: number) => {
    const updated = [...cart];
    updated.splice(idx, 1);
    setCart(updated);
  };

  const handleWishlistToggle = (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      triggerToast("Removed item from Wishlist");
    } else {
      setWishlist([...wishlist, productId]);
      triggerToast("Added item to Wishlist! ❤️");
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!checkoutName.trim()) tempErrors.checkoutName = "Full name required";
    if (!checkoutPhone.trim() || checkoutPhone.length < 10) tempErrors.checkoutPhone = "Valid 10-digit mobile number required";
    if (!checkoutAddress.trim()) tempErrors.checkoutAddress = "Shipping address required";
    if (!checkoutCity.trim()) tempErrors.checkoutCity = "City required";
    if (!checkoutPincode.trim() || checkoutPincode.length !== 6) tempErrors.checkoutPincode = "6-digit Pincode required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});
    onNavigate("checkout-success");
  };

  const handleCheckPincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode)) {
      setPincodeStatus("🎉 Premium Cash on Delivery is active. Expected in 2-3 days!");
    } else {
      setPincodeStatus("❌ Please enter a valid 6-digit pin.");
    }
  };

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Discount Savings Calculation
  const originalSubtotal = cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  const totalSavings = originalSubtotal - cartSubtotal;
  
  const deliveryFee = cartSubtotal >= 999 || cartSubtotal === 0 ? 0 : 90;
  const grandTotal = cartSubtotal + deliveryFee;

  // Filter products based on search query & selected category chip
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (activeFilter === "All") return true;
    if (activeFilter === "Wishlist") return wishlist.includes(p.id);
    return p.tags.includes(activeFilter) || p.category === activeFilter;
  });

  // Sizes choices
  const getSizesList = (category: string) => {
    return category === "Sneakers" 
      ? ["7", "8", "9", "10", "11"] 
      : ["S", "M", "L", "XL", "XXL"];
  };

  // Sync image when navigating to product detail view
  React.useEffect(() => {
    if (navState.page === "product") {
      setDetailActiveImg(activeProduct.image);
      const defaults = getSizesList(activeProduct.category);
      setSelectedSize(defaults[1]); // e.g. M or 8
    }
  }, [navState.page, activeProduct]);

  // Sidebar Menu Options
  if (menuOpen) {
    return (
      <div className="w-full h-full flex flex-col bg-white text-zinc-950 font-sans overflow-hidden relative animate-fade-in select-none">
        <div className="w-full h-full flex flex-col px-5 py-5 justify-between overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-zinc-100">
            <span className="font-black text-[13px] uppercase tracking-[0.2em] text-zinc-950">STYLEHUB MENU</span>
            <button 
              onClick={() => setMenuOpen(false)}
              className="p-1 px-1.5 rounded-md hover:bg-zinc-100 flex items-center gap-1 text-zinc-500 hover:text-black duration-150"
            >
              <span className="text-[7.5px] uppercase tracking-wide font-black">Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Options */}
          <div className="flex flex-col gap-2.5 py-6 my-auto text-left">
            {[
              { label: "🔥 Shop Home", action: () => { onNavigate("home"); setActiveFilter("All"); } },
              { label: "👕 Oversized Tees", action: () => { onNavigate("home"); setActiveFilter("Oversized"); } },
              { label: "👖 Comfort Fits", action: () => { onNavigate("home"); setActiveFilter("Men"); } },
              { label: "👟 Sneakers", action: () => { onNavigate("home"); setActiveFilter("Sneakers"); } },
              { label: "🎒 Accessories Store", action: () => { onNavigate("home"); setActiveFilter("Accessories"); } },
              { label: "❤️ My Wishlist", action: () => { onNavigate("home"); setActiveFilter("Wishlist"); } },
              { label: "🛒 View Cart & Bag", action: () => { onNavigate("cart"); } }
            ].map((link, i) => (
              <button
                key={i}
                onClick={() => {
                  link.action();
                  setMenuOpen(false);
                }}
                className="text-left text-[13px] uppercase tracking-wider font-extrabold py-2 text-zinc-800 hover:text-black active:translate-x-0.5 transition-all flex items-center justify-between border-b border-dashed border-zinc-100"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </button>
            ))}
          </div>

          {/* Promotional Card */}
          <div className="bg-amber-50 p-3.5 border border-amber-200/60 rounded-xl text-left">
            <div className="flex items-center gap-1.5 text-amber-800 mb-1">
              <Tag className="w-3.5 h-3.5" />
              <span className="text-[8.5px] uppercase font-black tracking-widest">PROMO ACTIVE</span>
            </div>
            <p className="text-[10px] font-black text-amber-950 leading-tight">
              Get flat 40% discount on 2+ items. Code applied automatically inside the cart!
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-100 text-[6.5px] text-zinc-400 tracking-wider text-left leading-relaxed">
            STYLEHUB COMMERCIAL PVT LTD • SUPPORT: DELIVERIES@STYLEHUB.INR
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white text-zinc-900 overflow-y-auto overscroll-contain font-sans relative">
      
      {/* 1. Ticker Promos Stripe banner */}
      <div className="w-full py-1 bg-zinc-950 text-white text-center select-none overflow-hidden shrink-0">
        <p className="font-mono text-[7px] md:text-[8px] font-extrabold tracking-[0.18em] uppercase flex items-center justify-center gap-1">
          <span>⚡ FREE STANDARD SHIPPING ON ORDERS ABOVE ₹999 ⚡</span>
        </p>
      </div>

      {/* 2. Commercial Header */}
      <header className="px-3.5 py-3 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-30 shrink-0 border-b border-zinc-150 shadow-xs">
        {/* Brand Logo */}
        <div 
          onClick={() => { onNavigate("home"); setActiveFilter("All"); setSearchQuery(""); }}
          className="flex items-center gap-1 cursor-pointer"
        >
          <span className="font-sans font-black text-[13.5px] tracking-tighter text-zinc-950 uppercase">STYLEHUB</span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 block shrink-0" />
        </div>

        {/* Action icons row */}
        <div className="flex items-center gap-3">
          {/* Search trigger */}
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`p-1.5 rounded-full ${isSearchOpen ? "text-zinc-950 bg-zinc-100" : "text-zinc-600 hover:text-black"}`}
          >
            <Search className="w-[14px] h-[14px]" />
          </button>

          {/* Wishlist Shortcut */}
          <button 
            onClick={() => { onNavigate("home"); setActiveFilter("Wishlist"); }}
            className={`p-1.5 rounded-full relative ${activeFilter === "Wishlist" ? "text-red-650 bg-red-50/50" : "text-zinc-650 hover:text-black"}`}
          >
            <Heart className={`w-[14px] h-[14px] ${wishlist.length > 0 ? "fill-red-600 text-red-600" : ""}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-600" />
            )}
          </button>

          {/* Cart Bag */}
          <button 
            onClick={() => onNavigate("cart")}
            className="p-1.5 rounded-full relative text-zinc-700 hover:text-black"
          >
            <ShoppingBag className="w-[14.5px] h-[14.5px]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 max-h-4.5 min-w-4.5 px-1 rounded-full bg-red-600 text-[7px] font-bold text-white flex items-center justify-center border border-white">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Sidebar Menu button */}
          <button 
            onClick={() => setMenuOpen(true)} 
            className="p-1 px-[5px] bg-zinc-100 text-zinc-950 rounded hover:bg-zinc-200 transition-colors"
          >
            <Menu className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 3. Dropdown Search interface */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full bg-zinc-50 border-b border-zinc-200 overflow-hidden px-4 py-2 flex items-center gap-2"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Search graphic tees, cargos, sneakers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-transparent text-xs text-zinc-900 outline-none placeholder-zinc-400 py-1"
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-zinc-200 rounded">
                <X className="w-3 h-3 text-zinc-500" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container Content */}
      <div className="flex-grow pb-12 text-left bg-white">
        
        {/* ======================= HOME / LISTINGS GRID ======================= */}
        {(navState.page === "home" || navState.page === "shop") && (
          <div className="flex flex-col">
            
            {/* Horizontal Categorized Carousels */}
            <div className="w-full py-2 px-3 border-b border-zinc-100 bg-zinc-50/50 flex overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth">
              {[
                { name: "All", label: "🔥 All Products" },
                { name: "New Arrivals", label: "✨ New" },
                { name: "Oversized", label: "👕 Oversized" },
                { name: "Men", label: "👖 Men" },
                { name: "Women", label: "👩 Women" },
                { name: "Sneakers", label: "👟 sneakers" },
                { name: "Hoodies", label: "🧥 Hoodies" },
                { name: "Accessories", label: "🎒 Gear" },
                { name: "Wishlist", label: "❤️ Saved" }
              ].map((chip) => {
                const isActive = activeFilter === chip.name;
                return (
                  <button
                    key={chip.name}
                    onClick={() => { setActiveFilter(chip.name); onNavigate("home"); }}
                    className={`px-3 py-1.5 mr-2 rounded-full text-[9px] font-extrabold uppercase tracking-wider transition-all duration-150 inline-block shrink-0 ${
                      isActive 
                        ? "bg-zinc-950 text-white shadow-sm border border-zinc-950" 
                        : "bg-white text-zinc-800 hover:text-black border border-zinc-200 hover:border-zinc-450"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            {/* Campaign Flash Sale Section (Dynamic based on selected filters, hidden on wishlist view) */}
            {activeFilter === "All" && !searchQuery && (
              <div className="p-3.5 bg-red-600 text-white select-none flex items-center justify-between pointer-events-none shrink-0 border-b border-red-700">
                <div className="flex flex-col text-left">
                  <span className="font-mono text-[7px] font-black uppercase tracking-widest text-red-100">LIMITED PERIOD ONLY</span>
                  <span className="text-[14px] font-extrabold leading-none uppercase mt-0.5">Mid-Season Madness</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[16px] font-black tracking-tight">FLAT 50% OFF</span>
                </div>
              </div>
            )}

            {/* Title / Section Banner Display */}
            <div className="px-4.5 pt-4.5 pb-2 flex items-baseline justify-between">
              <div>
                <span className="text-[7.5px] font-sans font-black text-red-650 tracking-wider uppercase block">
                  {searchQuery ? "SEARCH RESULTS" : activeFilter === "Wishlist" ? "YOUR SELECTION" : "LIVE COLLECTIONS"}
                </span>
                <h2 className="font-sans text-[16px] font-black uppercase tracking-tight text-zinc-900 mt-0.5">
                  {searchQuery 
                    ? `Matches for "${searchQuery}"` 
                    : activeFilter === "All" 
                      ? "Trending Now" 
                      : activeFilter === "Wishlist"
                        ? `Saved Items (${wishlist.length})`
                        : `${activeFilter} Staples`}
                </h2>
              </div>
              <span className="text-[7px] text-zinc-400 font-extrabold font-mono uppercase tracking-wider">
                {filteredProducts.length} Items
              </span>
            </div>

            {/* Empty States (E.g. if Wishlist is empty or search captures zero results) */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center px-6 gap-3">
                <div className="w-12 h-12 bg-zinc-50 border rounded-full flex items-center justify-center text-zinc-300">
                  {activeFilter === "Wishlist" ? (
                    <Heart className="w-5.5 h-5.5" />
                  ) : (
                    <Search className="w-5.5 h-5.5" />
                  )}
                </div>
                <h4 className="text-[11px] font-black uppercase text-zinc-800">
                  {activeFilter === "Wishlist" ? "Your Wishlist is Empty" : "No Matching Products"}
                </h4>
                <p className="text-[8.5px] text-zinc-450 leading-relaxed max-w-xs">
                  {activeFilter === "Wishlist" 
                    ? "Tap the heart icon on any apparel cards to quickly build a personalized collection." 
                    : "Review your parameters or tap another category chip above to reset matches."}
                </p>
                <button 
                  onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                  className="px-4.5 py-2.5 bg-zinc-950 text-white rounded text-[8px] font-black uppercase tracking-widest mt-1.5"
                >
                  Shop Best Sellers
                </button>
              </div>
            ) : (
              /* Real 2-Columns Product Grid layout */
              <div className="grid grid-cols-2 gap-3.5 px-3.5 pt-2 pb-8">
                {filteredProducts.map((product) => {
                  const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                  const isSaved = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      onClick={() => onNavigate("product", { id: product.id })}
                      className="cursor-pointer group flex flex-col justify-between border border-zinc-205 rounded-xl bg-white shadow-xs overflow-hidden pb-1 hover:border-zinc-350 transition-all duration-200 text-left relative"
                    >
                      {/* Product image block with quick badges & actions */}
                      <div className="h-44 bg-zinc-50 relative flex items-center justify-center p-2 border-b border-zinc-100 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="max-w-full max-h-full object-contain filter group-hover:scale-102 transition-transform duration-300 drop-shadow" 
                        />
                        
                        {/* Discount Sticker badge */}
                        <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 rounded text-[7.5px] font-black uppercase tracking-wide">
                          {discountPct}% OFF
                        </div>

                        {/* Favorite button toggle */}
                        <button
                          onClick={(e) => handleWishlistToggle(product.id, e)}
                          className={`absolute top-2 right-2 w-6.5 h-6.5 rounded-full border border-zinc-150 flex items-center justify-center shadow-xs transition-colors bg-white ${
                            isSaved ? "text-red-600 hover:bg-zinc-100" : "text-zinc-400 hover:text-black hover:bg-zinc-50"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isSaved ? "fill-red-600" : ""}`} />
                        </button>

                        {/* Rating overlay badge */}
                        <div className="absolute bottom-2 left-2 bg-white/90 border border-zinc-200/50 backdrop-blur-xs px-1.5 py-0.5 rounded flex items-center gap-0.5 text-[6.5px] font-extrabold text-zinc-800">
                          <Star className="w-2 h-2 fill-yellow-450 text-yellow-500" />
                          <span>{product.rating}</span>
                        </div>
                      </div>

                      {/* Info & labels block */}
                      <div className="p-2.5 flex-grow flex flex-col justify-between text-left">
                        <div className="flex flex-col">
                          <span className="text-[7.5px] font-black uppercase tracking-wider text-zinc-450">
                            {product.category}
                          </span>
                          <h3 className="text-[10.5px] font-black text-zinc-950 mt-0.5 line-clamp-2 leading-tight">
                            {product.name}
                          </h3>
                        </div>

                        {/* Price indicators */}
                        <div className="mt-2.5 flex flex-col justify-start">
                          <div className="flex items-baseline gap-1.5 leading-none">
                            <span className="text-[12.5px] font-black text-zinc-950">
                              ₹{product.price}
                            </span>
                            <span className="text-[9px] text-zinc-400 line-through">
                              ₹{product.originalPrice}
                            </span>
                          </div>
                          
                          {/* Save amount badge */}
                          <span className="text-[7px] text-red-600 font-extrabold uppercase mt-0.5 tracking-wider">
                            You Save ₹{product.originalPrice - product.price}
                          </span>
                        </div>
                      </div>

                      {/* Quick Add CTA */}
                      <div className="px-2 pb-1.5 pt-0.5">
                        <button
                          onClick={(e) => handleQuickAdd(product, e)}
                          className="w-full py-1.5 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 text-[8px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors duration-150"
                        >
                          <Plus className="w-2.5 h-2.5" />
                          <span>Quick Add</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Beautiful, High conversion home bento highlights */}
            {activeFilter === "All" && !searchQuery && (
              <div className="px-3.5 pb-12 flex flex-col gap-4 text-left">
                {/* Horizontal divider ribbon */}
                <div className="border-t border-zinc-200 pt-5">
                  <div className="p-4 bg-zinc-50 border border-zinc-150 rounded-xl flex items-center gap-4.5 justify-between">
                    <div className="flex-1 text-left">
                      <span className="text-[6px] font-black text-zinc-400 tracking-widest uppercase block">COMMERCIAL STANDARD</span>
                      <h4 className="text-[12px] font-black text-zinc-900 uppercase leading-snug mt-1">100% Cotton Oversized Fits starting at ₹799</h4>
                      <p className="text-[8.5px] text-zinc-450 leading-relaxed mt-1">
                        High density graphic structures designed for ultimate daily transition. Direct dispatch with quick door step courier.
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveFilter("Oversized")}
                      className="px-3.5 py-2 bg-zinc-950 text-white text-[7.5px] font-black uppercase tracking-wider rounded-lg shrink-0 hover:bg-zinc-850 duration-150"
                    >
                      Shop Tees
                    </button>
                  </div>
                </div>

                {/* Return guarantees info */}
                <div className="grid grid-cols-3 gap-2 text-center text-zinc-500 py-3 border-y border-dashed border-zinc-155 mt-1 select-none">
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw className="w-4 h-4 text-zinc-850" />
                    <span className="text-[7.5px] font-black uppercase text-zinc-900 leading-none">15-Day Return</span>
                    <span className="text-[5.5px] leading-tight text-zinc-400 mt-0.5">Hassle-free mail refund</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-zinc-850" />
                    <span className="text-[7.5px] font-black uppercase text-zinc-900 leading-none">Swift Delivery</span>
                    <span className="text-[5.5px] leading-tight text-zinc-400 mt-0.5">Insured courier express</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-zinc-850" />
                    <span className="text-[7.5px] font-black uppercase text-zinc-900 leading-none">100% Genuine</span>
                    <span className="text-[5.5px] leading-tight text-zinc-400 mt-0.5">Strict curated staples</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================= PRODUCT DETAIL VIEW ======================= */}
        {navState.page === "product" && (
          <div className="flex flex-col animate-fade-in text-left">
            
            {/* Nav Back Header strip option */}
            <div className="px-4.5 py-3 border-b border-zinc-150 bg-zinc-50/50 flex justify-between items-center select-none">
              <button 
                onClick={() => onNavigate("home")}
                className="flex items-center gap-1.5 text-zinc-600 hover:text-black duration-150"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="text-[8px] uppercase font-black tracking-wide">Back to collection</span>
              </button>

              <span className="text-[7px] font-mono font-black uppercase tracking-wider text-zinc-400">
                STAPLE ID: {activeProduct.id}
              </span>
            </div>

            {/* Large layout main display wrapper */}
            <div className="relative w-full bg-zinc-50 border-b border-zinc-200 h-[320px] flex items-center justify-center p-4">
              <img 
                src={detailActiveImg || activeProduct.image} 
                alt={activeProduct.name} 
                className="max-w-full max-h-full object-contain filter drop-shadow-xl saturate-[1.03]"
                referrerPolicy="no-referrer"
              />

              {/* Discount Percentage Badge sticker overlay */}
              <div className="absolute top-4 left-4 bg-red-600 text-white px-2.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                {Math.round(((activeProduct.originalPrice - activeProduct.price) / activeProduct.originalPrice) * 100)}% DISCOUNT
              </div>

              {/* Heart toggle on image */}
              <button
                onClick={(e) => handleWishlistToggle(activeProduct.id, e)}
                className={`absolute top-4 right-4 w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center bg-white shadow-md transition-all ${
                  wishlist.includes(activeProduct.id) ? "text-red-650" : "text-zinc-400"
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(activeProduct.id) ? "fill-red-600" : ""}`} />
              </button>
            </div>

            {/* Multi gallery layout switcher rows */}
            {activeProduct.gallery && activeProduct.gallery.length > 1 && (
              <div className="px-4.5 py-3.5 flex gap-2.5 bg-white border-b border-zinc-100 select-none">
                {activeProduct.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setDetailActiveImg(imgUrl)}
                    className={`w-12 h-12 rounded border p-1 bg-zinc-50 flex items-center justify-center overflow-hidden transition-all ${
                      detailActiveImg === imgUrl ? "border-zinc-950 scale-102 bg-white" : "border-zinc-205"
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail view" className="max-w-full max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Description and size chooser context */}
            <div className="px-4.5 py-5 flex flex-col gap-4 font-sans bg-white">
              <div>
                <span className="text-[7.5px] font-black text-red-650 uppercase tracking-widest block">
                  {activeProduct.category} COLLECTION
                </span>
                <h1 className="text-[17px] font-black text-zinc-950 mt-1 uppercase leading-snug">
                  {activeProduct.name}
                </h1>

                {/* Pricing section with genuine commercial crossed styles */}
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-[19px] font-black text-zinc-950 leading-none">
                    ₹{activeProduct.price}
                  </span>
                  <span className="text-[12.5px] text-zinc-405 line-through">
                    ₹{activeProduct.originalPrice}
                  </span>
                  <span className="text-[10px] text-red-650 font-black tracking-wide uppercase bg-red-50 px-1.5 py-0.5 rounded">
                    Save ₹{activeProduct.originalPrice - activeProduct.price}
                  </span>
                </div>
                <span className="text-[7.5px] text-zinc-405 font-mono uppercase tracking-wider block mt-1.5">MRP inclusive of all domestic taxes</span>
              </div>

              {/* Split specifications */}
              <div className="py-3 border-y border-zinc-150 flex flex-col gap-2">
                <p className="text-[10.5px] text-zinc-650 leading-relaxed font-sans font-medium">
                  {activeProduct.desc}
                </p>
                <div className="flex flex-col gap-1 text-[8.5px] font-semibold text-zinc-500 mt-1">
                  <span>🍃 <strong className="text-zinc-800">Composition:</strong> {activeProduct.materials}</span>
                  <span>🎨 <strong className="text-zinc-800">Color Options:</strong> {activeProduct.colorways ? activeProduct.colorways.join(", ") : "Standard Edition"}</span>
                </div>
              </div>

              {/* Custom interactive Pincode checker block */}
              <div className="py-2.5 px-3 bg-zinc-50 rounded-xl border border-zinc-200 text-left">
                <span className="text-[7.5px] font-black uppercase text-zinc-600 tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-zinc-800" />
                  <span>Check courier delivery serviceability</span>
                </span>
                
                <form onSubmit={handleCheckPincodeSubmit} className="flex gap-2 mt-2">
                  <input 
                    type="text" 
                    placeholder="Enter 6-digit Pincode (e.g. 400001)" 
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                    className="flex-grow bg-white border border-zinc-250 rounded-lg px-2.5 py-1.5 text-[9.5px] outline-none focus:border-zinc-950 font-mono font-bold"
                  />
                  <button 
                    type="submit"
                    className="px-4 py-1.5 bg-zinc-950 text-white rounded-lg text-[8.5px] font-bold uppercase hover:bg-zinc-850 duration-150"
                  >
                    Verify
                  </button>
                </form>

                {pincodeStatus && (
                  <p className="text-[8px] font-bold text-zinc-800 mt-2 leading-relaxed">
                    {pincodeStatus}
                  </p>
                )}
              </div>

              {/* Sizes choosing system button grids */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-baseline select-none">
                  <span className="text-[8.5px] font-black uppercase text-zinc-800 tracking-wider">
                    {activeProduct.category === "Sneakers" ? "Select shoe measurement (UK/US)" : "Select apparel size"}
                  </span>
                  <span className="text-[7px] text-zinc-400 font-extrabold cursor-pointer border-b border-zinc-200">
                    Size Guide
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {getSizesList(activeProduct.category).map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 rounded-lg border text-xs font-black tracking-wide text-center uppercase duration-150 ${
                          isSelected 
                            ? "bg-zinc-950 text-white border-zinc-950 shadow-sm scale-102"
                            : "bg-white text-zinc-750 border-zinc-205 hover:bg-zinc-50 hover:border-zinc-450"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Core responsive shopping CTA buttons */}
              <div className="grid grid-cols-1 gap-2.5 pt-3">
                <button
                  onClick={() => handleAddToCart(activeProduct, selectedSize)}
                  className="w-full py-3.5 bg-white border-2 border-zinc-950 text-zinc-950 font-black text-[9.5px] uppercase tracking-widest text-center shadow-xs hover:bg-zinc-50 duration-150 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add selection to bag</span>
                </button>

                <button
                  onClick={() => {
                    // Quick Checkout trigger shortcut
                    const alreadyInCart = cart.some(item => item.product.id === activeProduct.id && item.selectedSize === selectedSize);
                    if (!alreadyInCart) {
                      setCart([...cart, { product: activeProduct, quantity: 1, selectedSize }]);
                    }
                    onNavigate("cart");
                  }}
                  className="w-full py-3.5 bg-red-600 text-white font-black text-[9.5px] uppercase tracking-widest text-center shadow-md hover:bg-red-750 duration-150 cursor-pointer"
                >
                  Buy Now Instantly
                </button>
              </div>

              {/* Genuine logistics support summaries */}
              <div className="mt-4 p-3.5 bg-zinc-50 rounded-xl border border-zinc-150 select-none flex flex-col gap-2">
                <div className="flex gap-2.5 text-zinc-500">
                  <Truck className="w-4 h-4 mt-0.5 text-zinc-800 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[7.5px] leading-tight font-black text-zinc-900 uppercase">Express Dispatch</span>
                    <span className="text-[6.5px] leading-normal text-zinc-450 mt-0.5">Dispatched within 24 hours on premium courier routes. Transit timeline 2-3 business days.</span>
                  </div>
                </div>

                <div className="flex gap-2.5 text-zinc-500 pt-2 border-t border-zinc-200">
                  <HelpCircle className="w-4 h-4 mt-0.5 text-zinc-800 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[7.5px] leading-tight font-black text-zinc-900 uppercase">Hassle-Free Return guarantee</span>
                    <span className="text-[6.5px] leading-normal text-zinc-450 mt-0.5">Full refunds issued without question within 15 days of domestic package arrivals.</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================= CART / BAG PAGE ======================= */}
        {navState.page === "cart" && (
          <div className="px-4.5 py-5 flex flex-col gap-5 animate-fade-in text-left">
            
            <div className="border-b border-zinc-150 pb-2.5">
              <span className="text-[7.5px] font-sans font-black text-zinc-450 tracking-wider uppercase block">YOUR BAG</span>
              <h1 className="font-sans text-[17px] font-black uppercase tracking-tight text-zinc-900 mt-0.5">Shopping bag</h1>
            </div>

            {cart.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-zinc-50 border rounded-full flex items-center justify-center text-zinc-300">
                  <ShoppingBag className="w-5.5 h-5.5" />
                </div>
                <h4 className="text-[11px] font-black uppercase text-zinc-800">Your Bag is Empty</h4>
                <p className="text-[8.5px] text-zinc-450 leading-relaxed max-w-xs px-3">
                  Check back into our seasonal live catalog collections to load premium streetwear apparel.
                </p>
                <button
                  onClick={() => onNavigate("home")}
                  className="px-4.5 py-2.5 bg-zinc-950 text-white rounded text-[8.5px] font-black uppercase tracking-widest mt-1.5 cursor-pointer"
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* List items block */}
                <div className="flex flex-col gap-3">
                  {cart.map((item, idx) => {
                    const discountAmt = item.product.originalPrice - item.product.price;
                    return (
                      <div 
                        key={idx}
                        className="flex gap-3 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200 items-center justify-between shadow-xs"
                      >
                        {/* Thumbnail */}
                        <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center p-1 border border-zinc-200/60 shrink-0">
                          <img src={item.product.image} className="max-w-full max-h-full object-contain" alt={item.product.name} />
                        </div>

                        {/* Middle info */}
                        <div className="flex-grow flex flex-col justify-start min-w-0 pr-2">
                          <h4 className="text-[10px] font-black text-zinc-900 leading-tight truncate uppercase">
                            {item.product.name}
                          </h4>
                          <div className="flex gap-1.5 mt-1 text-zinc-500 text-[7px] font-bold uppercase tracking-wide">
                            <span>Size: {item.selectedSize}</span>
                            <span>•</span>
                            <span className="text-zinc-800">₹{item.product.price}</span>
                          </div>
                          {discountAmt > 0 && (
                            <span className="text-[6.5px] text-red-650 font-mono font-bold mt-0.5 uppercase tracking-wider">
                              ₹{discountAmt} Off Applied
                            </span>
                          )}
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 shrink-0 select-none">
                          <div className="flex items-center border border-zinc-200.5 rounded-md bg-white p-0.5">
                            <button 
                              onClick={() => handleUpdateQuantity(idx, -1)}
                              className="p-1 px-1.5 text-zinc-500 hover:text-black duration-150"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-[9px] font-mono font-black text-zinc-900 px-1">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(idx, 1)}
                              className="p-1 px-1.5 text-zinc-500 hover:text-black duration-150"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>

                          <button 
                            onClick={() => handleRemoveItem(idx)}
                            className="p-1.5 text-zinc-400 hover:text-red-600 rounded-md hover:bg-zinc-100 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtotals Recaps Table details */}
                <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl flex flex-col gap-2 font-sans text-left">
                  <div className="flex justify-between text-zinc-500 text-[8.5px] uppercase font-semibold">
                    <span>Selected items ({cartItemCount})</span>
                    <span>₹{originalSubtotal}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-red-650 text-[8.5px] uppercase font-black">
                      <span>Limited store discounts</span>
                      <span>- ₹{totalSavings}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-500 text-[8.5px] uppercase font-semibold border-b border-dashed border-zinc-200 pb-2">
                    <span>Surface door step courier</span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-650 font-black">FREE SHIPPING</span>
                    ) : (
                      <span>₹{deliveryFee}</span>
                    )}
                  </div>
                  <div className="flex justify-between text-zinc-950 text-[11px] font-black uppercase pt-1">
                    <span>Payable Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                {/* Modern active commercial checkout fields */}
                <form onSubmit={handleCheckoutSubmit} className="flex flex-col gap-3 mt-2 border-t border-zinc-150 pt-4 text-left">
                  <span className="text-[8.5px] font-black uppercase tracking-wider text-red-650">COURIER DISPATCH RECIPIENT</span>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[6.5px] uppercase text-zinc-550 font-extrabold tracking-wide">Full Name</label>
                    <input
                      type="text"
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      placeholder="Receiver's complete name"
                      className="px-3 py-2 text-[9px] rounded-lg border border-zinc-250 outline-none focus:border-zinc-950 bg-white placeholder-zinc-350"
                    />
                    {errors.checkoutName && <span className="text-[6.5px] text-red-600 font-extrabold">{errors.checkoutName}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[6.5px] uppercase text-zinc-550 font-extrabold tracking-wide">Mobile Number</label>
                    <input
                      type="tel"
                      value={checkoutPhone}
                      onChange={(e) => setCheckoutPhone(e.target.value)}
                      placeholder="10-digit smartphone number"
                      maxLength={10}
                      className="px-3 py-2 text-[9px] rounded-lg border border-zinc-250 outline-none focus:border-zinc-950 bg-white placeholder-zinc-350 font-mono"
                    />
                    {errors.checkoutPhone && <span className="text-[6.5px] text-red-600 font-extrabold">{errors.checkoutPhone}</span>}
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[6.5px] uppercase text-zinc-550 font-extrabold tracking-wide">Street Address Location</label>
                    <input
                      type="text"
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      placeholder="Flat, building, area name and street details"
                      className="px-3 py-3 text-[9px] rounded-lg border border-zinc-250 outline-none focus:border-zinc-950 bg-white placeholder-zinc-250"
                    />
                    {errors.checkoutAddress && <span className="text-[6.5px] text-red-600 font-extrabold">{errors.checkoutAddress}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="flex flex-col gap-1">
                      <label className="text-[6.5px] uppercase text-zinc-550 font-extrabold tracking-wide">City</label>
                      <input
                        type="text"
                        value={checkoutCity}
                        onChange={(e) => setCheckoutCity(e.target.value)}
                        placeholder="e.g. Mumbai"
                        className="px-3 py-1.5 text-[9px] rounded-lg border border-zinc-250 outline-none focus:border-zinc-950 bg-white placeholder-zinc-350"
                      />
                      {errors.checkoutCity && <span className="text-[6.5px] text-red-600 font-extrabold">{errors.checkoutCity}</span>}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[6.5px] uppercase text-zinc-550 font-extrabold tracking-wide">Pincode destination</label>
                      <input
                        type="text"
                        value={checkoutPincode}
                        onChange={(e) => setCheckoutPincode(e.target.value)}
                        placeholder="6 Digits"
                        maxLength={6}
                        className="px-3 py-1.5 text-[9px] rounded-lg border border-zinc-250 outline-none focus:border-zinc-950 bg-white text-center placeholder-zinc-350 font-mono font-bold"
                      />
                      {errors.checkoutPincode && <span className="text-[6.5px] text-red-600 font-extrabold">{errors.checkoutPincode}</span>}
                    </div>
                  </div>

                  {/* Payment selection blocks */}
                  <div className="flex flex-col gap-1.5 mt-2.5 select-none">
                    <label className="text-[6.5px] uppercase text-zinc-550 font-extrabold tracking-wide">Choose Payment option</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("COD")}
                        className={`p-2.5 rounded-lg border text-left flex flex-col gap-0.5 font-sans ${
                          paymentMethod === "COD" 
                            ? "bg-zinc-950 text-white border-zinc-950" 
                            : "bg-white text-zinc-750 border-zinc-200"
                        }`}
                      >
                        <span className="text-[8px] font-black uppercase">🤝 Cash on Delivery</span>
                        <span className={`text-[5.5px] ${paymentMethod === "COD" ? "text-zinc-300" : "text-zinc-400"}`}>Pay cash when box arrives</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod("UPI")}
                        className={`p-2.5 rounded-lg border text-left flex flex-col gap-0.5 font-sans ${
                          paymentMethod === "UPI" 
                            ? "bg-zinc-950 text-white border-zinc-950" 
                            : "bg-white text-zinc-750 border-zinc-200"
                        }`}
                      >
                        <span className="text-[8px] font-black uppercase">📱 Scan UPI / Cards</span>
                        <span className={`text-[5.5px] ${paymentMethod === "UPI" ? "text-zinc-300" : "text-zinc-400"}`}>RazorPay premium checkout</span>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 bg-red-600 text-white hover:bg-red-750 font-sans font-black text-[9.5px] uppercase tracking-widest text-center transition-colors duration-150 cursor-pointer rounded-xl shadow-md"
                  >
                    Confirm & Place Cash Order
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ======================= CHECKOUT SUCCESS PAGE ======================= */}
        {navState.page === "checkout-success" && (
          <div className="px-5 py-9 flex flex-col items-center justify-center text-center gap-5 animate-fade-in font-sans">
            <div className="w-13 h-13 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center select-none shadow-sm animate-bounce">
              <Check className="w-6 h-6 text-emerald-600" />
            </div>

            <div className="flex flex-col gap-1 text-center">
              <span className="text-[6.5px] text-emerald-700 uppercase tracking-[0.2em] font-black">PACKAGE DISPATCH CONFIRMED</span>
              <h1 className="font-sans font-black text-[15.5px] uppercase text-zinc-950 mt-1">Order Placed Successfully! 🎉</h1>
              <p className="text-[8.5px] text-zinc-500 px-3.5 leading-relaxed font-semibold mt-1">
                Your receipt and delivery details have been registered. The box will leave our hub in Mumbai within 12 hours.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="w-full bg-zinc-50 border border-zinc-200 rounded-xl relative overflow-hidden flex flex-col p-4 text-left gap-2.5 shadow-xs font-sans text-[7px] uppercase font-bold text-zinc-650">
              <div className="absolute top-[-4px] left-[-4px] w-2.5 h-2.5 bg-white rounded-full border border-zinc-200" />
              <div className="absolute top-[-4px] right-[-4px] w-2.5 h-2.5 bg-white rounded-full border border-zinc-200" />
              <div className="absolute bottom-[-4px] left-[-4px] w-2.5 h-2.5 bg-white rounded-full border border-zinc-200" />
              <div className="absolute bottom-[-4px] right-[-4px] w-2.5 h-2.5 bg-white rounded-full border border-zinc-200" />
              
              <div className="flex justify-between border-b border-dashed border-zinc-200 pb-2">
                <span>Customer Lead</span>
                <span className="text-zinc-950 font-black">{checkoutName.toUpperCase() || "WALK-IN GUEST"}</span>
              </div>

              <div className="flex flex-col gap-0.5 py-0.5">
                <span className="text-zinc-400 text-[6px]">SHIPPING DESTINATION</span>
                <span className="text-zinc-800 font-extrabold leading-normal">{checkoutAddress}, {checkoutCity} - {checkoutPincode}</span>
                <span className="text-zinc-800 font-extrabold mt-1">📱 PHONE: +91 {checkoutPhone || "9988776655"}</span>
              </div>

              <div className="flex justify-between border-t border-dashed border-zinc-250 pt-2.5 text-[6.5px] tracking-wide text-zinc-450">
                <span>Courier Reference Index</span>
                <span className="text-emerald-705 font-black">#SH-INR-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setCart([]); // Clear shopping basket/grocery
                onNavigate("home");
                setActiveFilter("All");
              }}
              className="py-3.5 px-5 bg-zinc-950 text-white rounded-xl text-[8.5px] font-sans font-black uppercase tracking-widest w-full mt-3 hover:bg-zinc-850 duration-150 cursor-pointer shadow-sm"
            >
              Continue commercial shopping
            </button>
          </div>
        )}

      </div>

      {/* Dynamic Native looking Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 35 }}
            className="absolute bottom-4 left-3 right-3 bg-zinc-950 text-white rounded-xl p-3 text-[9px] flex items-center justify-between shadow-2xl z-50 border border-zinc-800"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold leading-tight">{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="p-0.5 hover:bg-zinc-800 rounded">
              <X className="w-3 h-3 text-zinc-400" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
