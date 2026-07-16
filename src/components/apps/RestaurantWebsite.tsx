import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Utensils, 
  MapPin, 
  Clock, 
  Check, 
  X, 
  ArrowLeft,
  Menu,
  Flame,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen
} from "lucide-react";

export interface DishItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: "Starters" | "Main Course" | "Desserts" | "Beverages";
  ingredients: string[];
  desc: string;
  image: string;
  spiceLevel: 1 | 2 | 3 | 0;
  tag?: string;
}

interface RestaurantWebsiteProps {
  navState: { page: string; params?: any };
  onNavigate: (page: string, params?: any) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const DISHES: DishItem[] = [
  // Starters
  {
    id: "crispy-okra",
    name: "Crispy Okra Fries",
    price: 14,
    rating: 4.8,
    category: "Starters",
    ingredients: ["Fresh Okra", "Hand-ground chili", "Mango powder", "Coarse sea salt"],
    desc: "Lightly crusted and wood-fired sliced okra tossed with coarse sea salt, dried mango powder, and freshly squeezed key lime juice.",
    image: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?auto=format&fit=crop&w=500&q=80",
    spiceLevel: 2,
    tag: "Crowd Favorite"
  },
  {
    id: "charred-sweetcorn",
    name: "Charred Street Sweetcorn",
    price: 16,
    rating: 4.9,
    category: "Starters",
    ingredients: ["Sweet sweetcorn", "Tandoori butter crema", "Cotija style cheese", "Smoked red paprika"],
    desc: "Wood-fired cob layered with direct tandoori crema, crumbled local farmer's curd, and fresh backyard mint leaves.",
    image: "https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=500&q=80",
    spiceLevel: 1
  },
  // Main Courses
  {
    id: "butter-chicken",
    name: "Clay-Oven Butter Chicken",
    price: 32,
    rating: 5.0,
    category: "Main Course",
    ingredients: ["Clay-oven chicken", "Tomato cream sauce", "House-churned butter", "Fenugreek leaves"],
    desc: "Tender boneless organic chicken slow-roasted in our clay oven, then finished in an emulsion of organic heirloom tomato paste and raw butter.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=500&q=80",
    spiceLevel: 1,
    tag: "Today's Special"
  },
  {
    id: "paneer-tikka",
    name: "Fire-Roasted Paneer Tikka",
    price: 24,
    rating: 4.7,
    category: "Main Course",
    ingredients: ["Handmade paneer", "Spiced Greek yogurt", "Turmeric", "Smoked bell peppers"],
    desc: "Plump cubes of fresh milk-curd marinated with organic turmeric, high-country Greek yogurt, and stone-crushed ginger.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=500&q=80",
    spiceLevel: 2
  },
  {
    id: "slow-lamb-nihari",
    name: "Slow-Braised Lamb Nihari",
    price: 38,
    rating: 4.9,
    category: "Main Course",
    ingredients: ["Local grass-fed lamb shank", "Marrow reduction", "Ginger slivers", "Kettle-pressed oil"],
    desc: "Shank fall-off-the-bone tender, cooked overnight with fresh star anise, cardamom, and thick bone gravy.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
    spiceLevel: 3,
    tag: "Chef Special"
  },
  // Desserts
  {
    id: "saffron-custard",
    name: "Saffron Blossom Custard",
    price: 12,
    rating: 4.9,
    category: "Desserts",
    ingredients: ["Fresh jersey milk", "Wild organic honey", "Cardamom seed dust", "Saffron strands"],
    desc: "Velvety fresh cream custard infused with organic saffron stamen, wild honey, and freshly crushed cardamom seed dust.",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=500&q=80",
    spiceLevel: 0
  },
  {
    id: "pistachio-kulfi",
    name: "Roasted Pistachio Kulfi",
    price: 11,
    rating: 4.8,
    category: "Desserts",
    ingredients: ["Reduced milk base", "Roasted pistachio crumbs", "Rosewater essence"],
    desc: "An organic local recipe of slow-frozen whole organic milk, crushed toasted nuts, and direct damask rosewater spray.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80",
    spiceLevel: 0
  },
  // Beverages
  {
    id: "mango-lassi",
    name: "Cardamom Mango Lassi",
    price: 8,
    rating: 4.9,
    category: "Beverages",
    ingredients: ["Alphonso mangoes", "Thick cultured yogurt", "Cardamom dust"],
    desc: "Smooth cold blend of hand-pressed Alphonso mango pulp, homemade organic yogurt, and a sprinkle of organic cardamom.",
    image: "https://images.unsplash.com/photo-1553530979-7ee52a2670c2?auto=format&fit=crop&w=500&q=80",
    spiceLevel: 0,
    tag: "House Favorite"
  },
  {
    id: "rose-sparkler",
    name: "Damask Rose Sparkler",
    price: 9,
    rating: 4.7,
    category: "Beverages",
    ingredients: ["Distilled rose hydrosol", "Fresh key lime", "Sparkling mineral water"],
    desc: "A bright, elegant botanic spitz made with organic white damask rose distillations, natural mineral water, and raw cane sugar.",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=500&q=80",
    spiceLevel: 0
  }
];

export default function RestaurantWebsite({ navState, onNavigate, menuOpen, setMenuOpen }: RestaurantWebsiteProps) {
  const [activeCategory, setActiveCategory] = useState<"Starters" | "Main Course" | "Desserts" | "Beverages">("Main Course");
  
  // Reservations details
  const [partySize, setPartySize] = useState(2);
  const [seatingArea, setSeatingArea] = useState("Garden Courtyard");
  const [reserveDate, setReserveDate] = useState("2026-06-25");
  const [reserveTime, setReserveTime] = useState("19:00");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  // Contact States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedDish, setSelectedDish] = useState<DishItem | null>(null);

  const activeDish = DISHES.find(d => d.id === (navState.params?.id || navState.params)) || DISHES[2];

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!customerName.trim()) tempErrors.customerName = "Required";
    if (!customerPhone.trim()) tempErrors.customerPhone = "Required";
    if (!customerEmail.trim() || !customerEmail.includes("@")) tempErrors.customerEmail = "Valid email required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});
    onNavigate("reservation-success");
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!contactName.trim()) tempErrors.contactName = "Required";
    if (!contactEmail.trim() || !contactEmail.includes("@")) tempErrors.contactEmail = "Valid email required";
    if (!contactMessage.trim()) tempErrors.contactMessage = "Required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});
    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 4500);
  };

  const filteredDishes = DISHES.filter(d => d.category === activeCategory);

  if (menuOpen) {
    return (
      <div className="w-full h-full flex flex-col bg-[#FAF8F5] text-[#2C2120] font-sans overflow-hidden relative animate-fade-in select-none">
        <div className="w-full h-full flex flex-col px-5 py-4.5 justify-between overflow-y-auto">
          {/* TOP SECTION */}
          <div className="flex items-center justify-between shrink-0 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { onNavigate("home"); setMenuOpen(false); }}>
              <Utensils className="w-4 h-4 text-[#B2422A] shrink-0" />
              <span className="font-serif font-black text-[11px] uppercase tracking-[0.2em] text-[#2C2120]">Spice Garden</span>
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 text-stone-550 hover:text-[#B2422A] transition-colors py-1 px-1.5 rounded-md hover:bg-stone-200/40"
              id="restaurant-nav-menu-close"
            >
              <span className="text-[7px] uppercase tracking-[0.15em] font-extrabold">Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MIDDLE SECTION - NAVIGATION LINKS */}
          <div className="flex flex-col gap-2 py-4 my-auto shrink-0 text-left">
            {[
              { label: "Home", page: "home" },
              { label: "Our Story", page: "about" },
              { label: "Our Menu", page: "menu" },
              { label: "Reserve Table", page: "reserve" },
              { label: "Contact Us", page: "contact" },
            ].map((link, i) => {
              const isSelected = link.page === navState.page;
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    onNavigate(link.page);
                    setMenuOpen(false);
                  }}
                  className={`text-left text-sm uppercase tracking-[0.15em] font-extrabold py-1.5 transition-all flex items-center justify-between group ${
                    isSelected 
                      ? "text-[#B2422A] translate-x-1" 
                      : "text-stone-800 hover:text-[#B2422A] hover:translate-x-1"
                  }`}
                >
                  <span>{link.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#B2422A]" />}
                </button>
              );
            })}
          </div>

          {/* FEATURED SECTION */}
          <div className="border-t border-stone-200 pt-3 pb-3 text-left">
            <span className="text-[6.5px] uppercase tracking-[0.18em] font-bold text-[#B2422A] block mb-0.5 font-sans">Special Dinners</span>
            <p className="text-[8.5px] text-stone-500 leading-relaxed font-sans font-light mb-2.5">
              Secure elegant brick hearth dining or open courtyard tasting menus.
            </p>
            <button
              onClick={() => {
                onNavigate("reserve");
                setMenuOpen(false);
              }}
              className="text-[7.5px] font-sans font-extrabold uppercase tracking-widest text-[#2C2120] border-b border-[#B2422A] pb-0.5 hover:text-[#B2422A] transition-colors"
            >
              [ Reserve Table ]
            </button>
          </div>

          {/* VISUAL SECTION */}
          <div className="w-full h-24 rounded-md overflow-hidden relative shadow-sm border border-stone-200/40 my-1 shrink-0 select-none">
            <img 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80" 
              alt="Hearth Kitchen Dining Room" 
              className="w-full h-full object-cover filter brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/10" />
          </div>

          {/* BOTTOM SECTION */}
          <div className="text-left pt-3 border-t border-stone-200 shrink-0 font-sans flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-0.5 text-[7px] font-semibold text-stone-550">
                <span className="text-[#B2422A] uppercase text-[5.5px] tracking-widest pb-0.5">Contact & Bookings</span>
                <span>+1 (855) 700-1992</span>
                <span>hearth@spicegarden.com</span>
              </div>
              <div className="flex gap-2.5 pb-0.5">
                <span className="text-[6.5px] uppercase tracking-wider text-stone-400 font-extrabold hover:text-[#B2422A] cursor-pointer">Instagram</span>
                <span className="text-[6.5px] uppercase tracking-wider text-stone-400 font-extrabold hover:text-[#B2422A] cursor-pointer">Facebook</span>
              </div>
            </div>
            <span className="text-[5.5px] tracking-widest uppercase block opacity-45 text-[#887875]">SPICE GARDEN INC © 2026</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#FAF8F5] text-[#2C2120] overflow-y-auto overscroll-contain font-sans relative">
      {/* Premium Mobile Header */}
      <header className="px-4.5 py-4 flex items-center justify-between sticky top-0 bg-[#FAF8F5]/90 backdrop-blur-md z-30 shrink-0 border-b border-stone-200/40">
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { onNavigate("home"); setMenuOpen(false); }}>
          <Utensils className="w-3.5 h-3.5 text-[#B2422A] shrink-0" />
          <span className="font-serif font-black text-[10px] uppercase tracking-[0.2em] text-[#2C2120]">Spice Garden</span>
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="flex items-center gap-1.5 hover:opacity-85 transition-opacity py-0.5 px-1 rounded-sm"
          id="restaurant-nav-menu-btn"
        >
          <span className="font-sans text-[7.5px] uppercase tracking-[0.2em] text-[#2C2120] font-medium">Menu</span>
          <Menu className="w-3.5 h-3.5 text-[#2C2120]" />
        </button>
      </header>

      {/* Main Website Page Content */}
      <div className="flex-grow pb-8 text-left animate-fade-in text-[#2C2120]">
        
        {/* ======================= HOME LANDING ======================= */}
        {navState.page === "home" && (
          <div className="flex flex-col">
            {/* Elegant Large Food Photography View */}
            <div className="relative w-full h-[320px] text-white flex items-end p-5 overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80" 
                alt="Clay oven roasting bread masterclass photography" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.76]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent opacity-85" />
              <div className="absolute inset-0 bg-black/10 z-0" />
              <div className="relative z-10 flex flex-col text-left gap-1.5 w-full">
                <span className="text-[7.5px] font-sans font-bold tracking-[0.35em] text-[#B2422A] uppercase">Open Hearth Dining</span>
                <h1 className="font-serif text-[23px] tracking-tight text-white font-medium leading-tight max-w-[245px] whitespace-pre-line">
                  True Clay Oven
                  Cooking, Daily
                </h1>
                <p className="text-[9px] text-[#E5DCDA] max-w-[245px] font-light leading-relaxed font-sans mb-3.5">
                  We crush organic spices on hand-carved stone mills twice a day to serve authentic regional warmth without compromise.
                </p>
                <div className="flex gap-2.5 bg-transparent">
                  <button 
                    onClick={() => onNavigate("reserve")}
                    className="px-4 py-2 bg-[#2C2120] text-stone-50 hover:bg-[#B2422A] text-[8px] font-sans font-extrabold uppercase rounded-sm tracking-widest transition-all cursor-pointer"
                  >
                    Reserve Table
                  </button>
                  <button 
                    onClick={() => onNavigate("menu")}
                    className="px-4 py-2 bg-white/20 backdrop-blur-md text-white border border-white/25 text-[8px] font-sans font-extrabold uppercase rounded-sm tracking-widest transition-all cursor-pointer"
                  >
                    Explore Dishes
                  </button>
                </div>
              </div>
            </div>

            <div className="px-5 py-6 flex flex-col gap-6.5">
              {/* Today's Special Block (High Priority highlight card) */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-baseline border-b border-stone-200 pb-2">
                  <span className="text-[7px] font-sans font-bold text-[#B2422A] uppercase tracking-[0.15em]">Today's Highlight Special</span>
                  <span className="text-[6.5px] text-stone-500 uppercase tracking-widest font-extrabold font-sans flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-500 fill-current" /> Fresh at 18:00
                  </span>
                </div>

                <div 
                  onClick={() => setSelectedDish(DISHES[2])}
                  className="group cursor-pointer bg-white border border-stone-200 rounded p-3 flex gap-3.5 items-center hover:shadow-xs transition-shadow"
                >
                  <div className="w-16 h-16 rounded overflow-hidden shrink-0 bg-stone-100 relative">
                    <img src={DISHES[2].image} alt={DISHES[2].name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col min-w-0">
                    <div className="flex justify-between items-baseline gap-1.5">
                      <h4 className="text-[10px] font-serif font-extrabold truncate text-stone-900">{DISHES[2].name}</h4>
                      <span className="text-[10px] font-sans font-extrabold text-[#B2422A] shrink-0">${DISHES[2].price}</span>
                    </div>
                    <p className="text-[8px] text-stone-500 line-clamp-2 mt-0.5 leading-relaxed font-light">{DISHES[2].desc}</p>
                    <span className="text-[6.5px] font-sans font-extrabold text-[#B2422A] uppercase tracking-wider mt-1.5 block">View Ingredients →</span>
                  </div>
                </div>
              </div>

              {/* Cooking philosophy quote */}
              <div className="text-left flex flex-col gap-2.5">
                <span className="text-[6.5px] font-sans font-bold tracking-[0.2em] uppercase text-[#B2422A]">The Stone Hearth Story</span>
                <p className="text-[14px] leading-relaxed text-stone-850 font-serif">
                  "No industrial mixers, no frozen bases. We preserve the organic, wood-smoke scent in every main dish."
                </p>
                <button
                  onClick={() => onNavigate("about")}
                  className="self-start text-[7.5px] font-sans font-extrabold uppercase tracking-widest text-[#B2422A] border-b border-[#B2422A] pb-0.5 mt-1"
                >
                  [ Read Our Heritage ]
                </button>
              </div>

              {/* Fast Category shortcut buttons */}
              <div className="flex flex-col gap-3 mt-1.5">
                <div className="border-b border-stone-200 pb-2 flex justify-between items-baseline">
                  <span className="text-[7px] font-sans font-bold text-[#B2422A] uppercase tracking-[0.15em]">Quick Menu Selection</span>
                  <button onClick={() => onNavigate("menu")} className="text-[6.5px] font-sans font-extrabold tracking-[0.1em] text-stone-500 uppercase">View All Menu →</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { cat: "Starters", count: "2 items", desc: "Crispy hearth plates", img: DISHES[0].image },
                    { cat: "Main Course", count: "3 items", desc: "Clay oven curries", img: DISHES[2].image },
                    { cat: "Desserts", count: "2 items", desc: "Saffron infused cold plates", img: DISHES[5].image },
                    { cat: "Beverages", count: "2 items", desc: "Fresh botanical distillations", img: DISHES[7].image }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveCategory(item.cat as any);
                        onNavigate("menu");
                      }}
                      className="cursor-pointer group flex flex-col gap-1.5 text-left border border-stone-200 p-2.5 bg-white rounded hover:shadow-xs transition-shadow"
                    >
                      <div className="h-16 rounded overflow-hidden bg-stone-100 w-full relative">
                        <img src={item.img} alt={item.cat} className="w-full h-full object-cover group-hover:scale-101 transition-transform" />
                      </div>
                      <div>
                        <h5 className="text-[8.5px] font-sans font-extrabold text-stone-900 group-hover:text-[#B2422A] transition-colors">{item.cat}</h5>
                        <p className="text-[7px] text-stone-400 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Guest Reviews inline block */}
              <div className="bg-[#FAF8F5] border border-stone-200/70 rounded p-4 text-left mt-2 flex flex-col gap-1.5">
                <span className="text-[6.5px] font-sans font-bold tracking-[0.2em] uppercase text-[#B2422A]">The Critic Table</span>
                <p className="text-[10.5px] font-serif italic text-stone-850 leading-relaxed">
                  "Spice Garden represents an authentic, beautifully stubborn rejection of generic commercial spice packets. The lamb shank was outstanding."
                </p>
                <div className="flex justify-between items-baseline mt-2">
                  <span className="text-[8px] font-sans font-bold text-stone-900">The Culinary Review • 2026</span>
                  <span className="text-[7px] text-amber-505 font-sans font-extrabold">⭐️ 4.9 out of 5</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================= OUR MENU ======================= */}
        {navState.page === "menu" && (
          <div className="px-5 py-5 flex flex-col gap-4 animate-fade-in">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-[6.5px] font-sans font-bold text-[#B2422A] tracking-[0.2em] uppercase">The Hearth Kitchen</span>
              <h4 className="font-serif text-[17px] font-medium uppercase text-stone-900 mt-0.5">Seasonal Plates</h4>
            </div>

            {/* Menu categories tabs */}
            <div className="flex gap-1.5 overflow-x-auto select-none no-scrollbar pb-1">
              {["Starters", "Main Course", "Desserts", "Beverages"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`text-[7px] font-sans font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-sm shrink-0 transition-all ${
                    activeCategory === cat 
                      ? "bg-[#2C2120] text-stone-50" 
                      : "bg-stone-105 hover:bg-stone-200 text-stone-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dishes grid */}
            <div className="flex flex-col gap-4.5 mt-2">
              {filteredDishes.map((dish) => (
                <div
                  key={dish.id}
                  onClick={() => setSelectedDish(dish)}
                  className="cursor-pointer group flex flex-col gap-2.5 p-3.5 bg-white border border-stone-200 rounded text-left hover:shadow-xs transition-shadow"
                >
                  <div className="h-44 w-full rounded overflow-hidden relative bg-stone-105 border border-stone-200/50">
                    <img src={dish.image} alt={dish.name} className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500" />
                    {dish.tag && (
                      <span className="absolute top-2.5 left-2.5 bg-white px-2.2 py-0.8 text-[6.5px] font-sans font-extrabold uppercase rounded shadow-xs text-stone-900 border border-stone-200">
                        {dish.tag}
                      </span>
                    )}
                    <span className="absolute bottom-2.5 right-2.5 bg-[#FAF8F5]/90 backdrop-blur-md px-2.5 py-1 text-[8.5px] font-sans font-extrabold text-stone-900 rounded">
                      ${dish.price}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 px-0.5">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-[11.5px] font-serif font-extrabold text-stone-900">{dish.name}</h4>
                      {dish.spiceLevel > 0 && (
                        <div className="flex gap-0.5 text-[#B2422A]">
                          {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                            <Flame key={i} className="w-2.5 h-2.5 fill-current" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-[8px] text-stone-550 leading-relaxed font-sans font-light mt-0.5">{dish.desc}</p>
                    <span className="text-[6.5px] font-sans font-extrabold uppercase text-[#B2422A] tracking-wider mt-1.5 block hover:translate-x-0.5 transition-transform">
                      View Plate Details & Ingredients →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= RESERVE PAGE ======================= */}
        {navState.page === "reserve" && (
          <div className="px-5 py-5 flex flex-col gap-4 text-left animate-fade-in font-sans">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-[6.5px] font-sans font-bold text-[#B2422A] tracking-[0.2em] uppercase">Reservations</span>
              <h4 className="font-serif text-[17px] font-medium uppercase text-stone-900 mt-0.5">Book a Table</h4>
            </div>

            <p className="text-[8.5px] text-stone-500 tracking-wide font-sans font-light leading-relaxed">
              Accepting evening reservations up to 30 days in advance. Standard parties are allotted 120 minutes of dining.
            </p>

            <form onSubmit={handleReserveSubmit} className="flex flex-col gap-3.5 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[6px] font-sans text-stone-400 font-bold uppercase tracking-widest">Party Size</label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(parseInt(e.target.value))}
                    className="px-2.5 py-1.5 text-[8.5px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#B2422A]"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6 Guests</option>
                    <option value={8}>8+ Guests</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[6px] font-sans text-stone-400 font-bold uppercase tracking-widest">Seating Area</label>
                  <select
                    value={seatingArea}
                    onChange={(e) => setSeatingArea(e.target.value)}
                    className="px-2.5 py-1.5 text-[8.5px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#B2422A]"
                  >
                    <option value="Garden Courtyard">Garden Courtyard</option>
                    <option value="Central Hearth Room">Central Hearth Room</option>
                    <option value="Chef Counter Bar">Chef Counter Bar (Tasting)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[6px] font-sans text-stone-400 font-bold uppercase tracking-widest">Date</label>
                  <input
                    type="date"
                    value={reserveDate}
                    onChange={(e) => setReserveDate(e.target.value)}
                    className="px-2.5 py-1.5 text-[8.5px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#B2422A]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[6px] font-sans text-stone-400 font-bold uppercase tracking-widest">Time Slot</label>
                  <select
                    value={reserveTime}
                    onChange={(e) => setReserveTime(e.target.value)}
                    className="px-2.5 py-1.5 text-[8.5px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#B2422A]"
                  >
                    <option value="17:00">17:00 (Sunset Tab)</option>
                    <option value="18:30">18:30 (Dinner Peak)</option>
                    <option value="19:00">19:00 (Dinner Peak)</option>
                    <option value="20:30">20:30 (Late Sitting)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] font-sans text-stone-400 font-bold uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Your full name"
                  className="px-3 py-1.5 text-[8.5px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#B2422A]"
                />
                {errors.customerName && <span className="text-[6px] text-red-500 font-semibold">{errors.customerName}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] font-sans text-stone-400 font-bold uppercase tracking-widest">Contact Phone</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="px-3 py-1.5 text-[8.5px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#B2422A]"
                />
                {errors.customerPhone && <span className="text-[6px] text-red-500 font-semibold">{errors.customerPhone}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] font-sans text-stone-400 font-bold uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="yourname@gourmet.html"
                  className="px-3 py-1.5 text-[8.5px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#B2422A]"
                />
                {errors.customerEmail && <span className="text-[6px] text-red-500 font-semibold">{errors.customerEmail}</span>}
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 bg-[#2C2120] hover:bg-[#B2422A] text-white rounded-sm text-[8px] font-sans font-extrabold uppercase tracking-widest text-center duration-150 transition-colors cursor-pointer"
              >
                Book Table Proposal
              </button>
            </form>
          </div>
        )}

        {/* ======================= OUR STORY / ABOUT ======================= */}
        {navState.page === "about" && (
          <div className="flex flex-col animate-fade-in text-left">
            <div className="relative w-full h-44 overflow-hidden flex items-end p-5">
              <img 
                src="https://images.unsplash.com/photo-1551782450-17144efb9c50?auto=format&fit=crop&w=650&q=80" 
                alt="Chef in real active tandoor kitchen assembly" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.70]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent opacity-85" />
              <div className="absolute inset-0 bg-black/10 z-0" />
              <div className="relative z-10 w-full">
                <span className="text-[6.5px] font-sans font-bold text-[#B2422A] tracking-[0.25em] uppercase">Est. 2012</span>
                <h4 className="font-serif text-[18px] font-medium text-white leading-tight mt-1">Our Heritage and Stone Hearth</h4>
              </div>
            </div>

            <div className="px-5 py-5 flex flex-col gap-6">
              <div className="flex flex-col gap-2.5">
                <blockquote className="font-serif italic text-[#B2422A] text-[13px] leading-relaxed border-l-2 border-[#B2422A] pl-3.5">
                  "Authentic culinary memories can only be shaped through hours of simmering, physical clay oven glowing, and fresh herbs crushed on call."
                </blockquote>
                <p className="text-[8.5px] text-stone-605 leading-relaxed font-sans font-light mt-1">
                  Spice Garden was founded in 2012 in a tiny brick dwelling, using an old hand-crafted clay oven and three family spice logs. We refuse ready-made powder packs or artificial food preserves to honor authentic rustic cuisines.
                </p>
              </div>

              {/* Kitchen and Dining split view images */}
              <div className="grid grid-cols-2 gap-3.5 my-1">
                <div className="flex flex-col gap-1.5">
                  <div className="h-28 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80" 
                      alt="Real charcoal grill baking bread" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[6.5px] font-sans tracking-wider text-[#B2422A] uppercase font-bold text-center">Active Hearth</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="h-28 rounded overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80" 
                      alt="Warm organic wooden dining layout" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[6.5px] font-sans tracking-wider text-[#B2422A] uppercase font-bold text-center">Rustic Table Room</span>
                </div>
              </div>

              {/* Chef team section */}
              <div className="flex flex-col gap-3">
                <span className="text-[7.5px] font-sans font-bold tracking-[0.15em] uppercase text-[#B2422A]">The Hearth Masters</span>
                <p className="text-[8.5px] text-stone-500 font-sans tracking-wide leading-relaxed font-light mb-1">
                  Crafting authentic culinary plates daily with meticulous focus.
                </p>
                <div className="flex gap-4 p-3 bg-white border border-stone-200 rounded shadow-xs items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-stone-200 bg-stone-50">
                    <img 
                      src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=250&h=250&q=80" 
                      alt="Master Chef" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[9.5px] font-sans font-extrabold text-[#2C2120] leading-none mb-1">Chef Devendra Pathak</h5>
                    <span className="text-[6.5px] font-sans font-bold text-[#B2422A] uppercase tracking-wider mb-1">Culinary Founder</span>
                    <p className="text-[8px] text-stone-500 leading-normal">Brought over 20 years of North Indian clay-oven legacy, preserving regional baking styles.</p>
                  </div>
                </div>
              </div>

              {/* CTAButons */}
              <button
                onClick={() => onNavigate("menu")}
                className="w-full py-3 bg-[#2C2120] text-white hover:bg-[#B2422A] text-[8px] font-sans font-bold uppercase tracking-widest text-center rounded-sm"
              >
                Browse Menu Cards
              </button>
            </div>
          </div>
        )}

        {/* ======================= CONTACT PAGE ======================= */}
        {navState.page === "contact" && (
          <div className="px-5 py-5 flex flex-col gap-5 text-left animate-fade-in text-[#2C2120]">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-[6.5px] font-sans font-bold text-[#B2422A] tracking-[0.2em] uppercase">Connect</span>
              <h4 className="font-serif text-[17px] font-medium uppercase text-stone-900 mt-0.5">Contact Us</h4>
            </div>

            {/* Quick Contact info */}
            <div className="flex flex-col gap-3.5 bg-white border border-stone-200 p-4.5 rounded-lg font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B2422A] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[6px] tracking-wider text-stone-400 font-extrabold uppercase">ADDRESS</span>
                  <span className="text-[9px] font-bold text-stone-850 mt-0.5">445 Oakwood Boulevard, Suite B</span>
                  <span className="text-[8px] text-stone-500">San Francisco, CA 94107</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3.5 border-t border-stone-200/50">
                <Phone className="w-4 h-4 text-[#B2422A] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[6px] tracking-wider text-stone-400 font-extrabold uppercase">TELEPHONE</span>
                  <span className="text-[9px] font-bold text-stone-850 mt-0.5">+1 (855) 700-1992</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3.5 border-t border-stone-200/50">
                <Clock className="w-4 h-4 text-[#B2422A] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[6px] tracking-wider text-stone-400 font-extrabold uppercase">HOURS OF SERVICE</span>
                  <span className="text-[8.5px] font-semibold text-stone-850 mt-0.5">Lunch: Tue - Sun (11:30 - 14:30)</span>
                  <span className="text-[8.5px] font-semibold text-stone-810">Dinner: Tue - Sun (17:00 - 22:00)</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="p-3 bg-white border border-stone-200 rounded-lg flex flex-col gap-1">
              <span className="text-[6px] font-sans text-[#B2422A] uppercase font-bold tracking-widest">Find us on street map</span>
              <div className="h-28 bg-stone-100 rounded border border-stone-200 relative overflow-hidden flex items-center justify-center p-4 text-center">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#b2422a_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <Utensils className="w-5 h-5 text-[#B2422A]" />
                  <span className="text-[8.5px] font-sans font-bold text-stone-850">Oakwood Blvd & 18th Street</span>
                  <span className="text-[6.5px] text-stone-400 tracking-wider">SECURE PARKING BEHIND CONCOURSE</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleContactFormSubmit} className="flex flex-col gap-3.5 mt-2">
              <span className="text-[7px] font-sans font-bold uppercase tracking-widest text-[#B2422A]">Inquire Form</span>
              
              <div className="flex flex-col gap-1">
                <label className="text-[6px] text-stone-400 uppercase font-extrabold">Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your full name"
                  className="px-3 py-1.5 text-[8px] rounded border border-stone-300 outline-none focus:border-[#B2422A]"
                />
                {errors.contactName && <span className="text-[6px] text-red-500 font-bold">Required</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] text-stone-400 uppercase font-extrabold">Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="yourname@gourmet.html"
                  className="px-3 py-1.5 text-[8px] rounded border border-stone-300 outline-none focus:border-[#B2422A]"
                />
                {errors.contactEmail && <span className="text-[6px] text-red-500 font-bold">Email required</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] text-stone-400 uppercase font-extrabold">Message</label>
                <textarea
                  rows={2}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Private catering or event requests?"
                  className="px-3 py-1.5 text-[8px] rounded border border-stone-300 outline-none focus:border-[#B2422A] resize-none"
                />
                {errors.contactMessage && <span className="text-[6px] text-red-500 font-bold">Message required</span>}
              </div>

              {contactSuccess ? (
                <div className="p-3 bg-emerald-50 text-emerald-850 border border-emerald-150 rounded text-[7.5px] font-sans font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Proposal submitted! Our booking crew will notify you by phone.</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 bg-[#2C2120] text-white hover:bg-[#B2422A] text-[8px] font-sans font-bold uppercase tracking-widest rounded-sm"
                >
                  Send Inquiry Message
                </button>
              )}
            </form>
          </div>
        )}

        {/* ======================= RESERVATION SUCCESS PAGE ======================= */}
        {navState.page === "reservation-success" && (
          <div className="px-5 py-8 flex flex-col items-center justify-center text-center gap-5.5 animate-fade-in font-sans">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center select-none shadow-inner">
              <Check className="w-5.5 h-5.5 text-emerald-600" />
            </div>

            <div className="flex flex-col gap-1.5 text-center">
              <span className="text-[6.5px] font-sans text-emerald-700 uppercase font-bold tracking-widest">Table Reserved</span>
              <h4 className="font-serif text-[16px] text-stone-900 uppercase font-bold leading-tight">Secured</h4>
              <p className="text-[8.5px] text-stone-500 leading-normal px-3.5 font-light">Your seat request has been registered. We are preparing the hearth tables for your group.</p>
            </div>

            {/* Custom Ticket details */}
            <div className="w-full bg-white border border-stone-200 rounded-lg relative overflow-hidden flex flex-col p-4 text-left gap-2.5 mt-2 shadow-sm font-sans text-[7px] uppercase font-semibold">
              <div className="absolute top-[-4px] left-[-4px] w-2 h-2 bg-[#FAF8F5] rounded-full border border-stone-200" />
              <div className="absolute top-[-4px] right-[-4px] w-2 h-2 bg-[#FAF8F5] rounded-full border border-stone-200" />
              <div className="absolute bottom-[-4px] left-[-4px] w-2 h-2 bg-[#FAF8F5] rounded-full border border-stone-200" />
              <div className="absolute bottom-[-4px] right-[-4px] w-2 h-2 bg-[#FAF8F5] rounded-full border border-stone-200" />
              
              <div className="flex justify-between text-neutral-450 pb-2 border-b border-dashed border-stone-200">
                <span>Party Lead</span>
                <span className="text-stone-900 font-extrabold">{customerName.toUpperCase() || "GOURMET GUEST"}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-left">
                <div className="flex flex-col gap-0.5">
                  <span className="text-stone-400 text-[6px]">Sitting Area</span>
                  <span className="text-stone-850 font-bold">{seatingArea}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-stone-400 text-[6px]">Seating size</span>
                  <span className="text-stone-855 font-bold">{partySize} Reserving</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-stone-400 text-[6px]">Date</span>
                  <span className="text-stone-855 font-bold">{reserveDate}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-stone-400 text-[6px]">Time Slot</span>
                  <span className="text-stone-855 font-bold">{reserveTime} PM</span>
                </div>
              </div>

              <div className="flex justify-between text-neutral-450 mt-2.5 pt-2.5 border-t border-dashed border-stone-200 text-[6px] tracking-wide">
                <span>RESERVATION LOGS</span>
                <span className="text-[#B2422A] font-bold">#SG-55099</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate("home")}
              className="py-3 px-5 bg-[#2C2120] hover:bg-[#B2422A] text-stone-50 text-[8px] font-sans font-extrabold uppercase rounded-sm w-full tracking-widest transition-colors mt-2"
            >
              Return Home
            </button>
          </div>
        )}

      </div>

      {/* Plate Details Dialog Lightbox Modal */}
      <AnimatePresence>
        {selectedDish && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDish(null)}
            className="absolute inset-0 bg-[#2C2120]/80 backdrop-blur-xs z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF8F5] border border-stone-250 w-full max-w-[280px] rounded shadow-lg overflow-hidden flex flex-col relative text-left"
            >
              <button 
                onClick={() => setSelectedDish(null)}
                className="absolute top-3 right-3 bg-white/90 p-1 rounded hover:bg-stone-50"
              >
                <X className="w-3.5 h-3.5 text-stone-600" />
              </button>

              <div className="h-32 w-full bg-stone-105 overflow-hidden">
                <img src={selectedDish.image} alt={selectedDish.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-4 flex flex-col gap-3">
                <div>
                  <span className="text-[6.5px] font-sans font-bold text-[#B2422A] uppercase tracking-wider block">{selectedDish.category}</span>
                  <div className="flex justify-between items-baseline mt-0.5">
                    <h5 className="font-serif text-[11px] font-extrabold text-stone-900 pr-5">{selectedDish.name}</h5>
                    <span className="text-[11px] font-sans font-extrabold text-[#B2422A]">${selectedDish.price}</span>
                  </div>
                </div>

                <p className="text-[8px] text-stone-602 font-sans font-light leading-relaxed">{selectedDish.desc}</p>

                {/* Ingredients tag cloud */}
                <div className="flex flex-col gap-1.5 mt-1 border-t border-stone-200/50 pt-2.5">
                  <span className="text-[6.5px] font-sans font-bold text-stone-400 uppercase tracking-widest block">Included Ingredients</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedDish.ingredients.map((ing, idx) => (
                      <span key={idx} className="text-[7px] bg-stone-150 text-stone-750 px-2 py-0.5 rounded-sm">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedDish(null);
                    onNavigate("reserve");
                  }}
                  className="w-full py-2 bg-[#2C2120] hover:bg-[#B2422A] text-white text-[7.5px] font-sans font-bold uppercase tracking-widest text-center rounded mt-2"
                >
                  Reserve Table to Enjoy Plate
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
