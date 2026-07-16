import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Check, 
  X, 
  ArrowLeft, 
  Compass,
  Menu,
  Phone,
  Mail,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Map,
  Clock,
  Briefcase,
  Sliders,
  ShieldCheck
} from "lucide-react";

export interface HotelRoom {
  id: string;
  name: string;
  rate: number;
  desc: string;
  rating: number;
  image: string;
  category: "suite" | "villa" | "penthouse";
  amenities: string[];
  detailedDesc: string;
  maxGuests: number;
  size: string;
}

interface HotelWebsiteProps {
  navState: { page: string; params?: any };
  onNavigate: (page: string, params?: any) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const ROOMS: HotelRoom[] = [
  {
    id: "ocean-suite",
    name: "Mediterranean Ocean Suite",
    rate: 380,
    category: "suite",
    desc: "King Bed • Oceanfront Terrace • Private Patio",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=600&q=80",
    amenities: ["Ocean View Balcony", "King Bedroom", "Premium Stocked Mini Bar", "Rain Shower", "Free High-Speed Wi-Fi"],
    detailedDesc: "Perched gracefully above the pristine shoreline, our Executive Ocean Suite merges modern lines with coastal warmth. Enjoy morning mist straight from your private terrace, equipped with hand-crafted teak loungers.",
    maxGuests: 2,
    size: "72 m²"
  },
  {
    id: "royal-penthouse",
    name: "The Belvedere Penthouse",
    rate: 750,
    category: "penthouse",
    desc: "Two Stories • Private Plunge Pool • Butler Service",
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
    amenities: ["Private Rooftop Plunge Pool", "Dedicated butler support", "Private Lounge Access", "In-Suite Dinings", "Complimentary Airport Escort"],
    detailedDesc: "Reigning over the highest floors of our central mansion, this legendary residence delivers ultimate comfort. Features include full floor-to-ceiling panoramic glass, a private pool, and custom natural fiber linens.",
    maxGuests: 4,
    size: "185 m²"
  },
  {
    id: "garden-villa",
    name: "Coastal Garden Villa",
    rate: 290,
    category: "villa",
    desc: "Direct Pool Access • Limestone Walkway",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    amenities: ["Stroll-Out Garden Terrace", "Double Marble Vanities", "Outdoor Limestone Rain Shower", "Premium Pillow Menu", "In-Room Nespresso Bar"],
    detailedDesc: "Find deep composure in natural surroundings. The Garden Villa features raw local limestone, sliding oak panelling, and direct gated access to the central heated mineral baths.",
    maxGuests: 3,
    size: "95 m²"
  }
];

const REVIEWS = [
  {
    id: 1,
    author: "Charlotte Sterling",
    rating: 5,
    text: "An absolute masterclass in subtle service. The architecture feels historical yet fresh, completely away from typical hotel glitz.",
    stay: "Belvedere Penthouse"
  },
  {
    id: 2,
    author: "Richard Kessler",
    rating: 5,
    text: "Waking up to the shoreline views in the Ocean Suite is something we will remember for years. Pristinely maintained grounds.",
    stay: "Mediterranean Suite"
  },
  {
    id: 3,
    author: "Dr. Hana Kobayashi",
    rating: 4,
    text: "Beautiful mineral pools and gorgeous walking trails through coastal gardens. Unbelievably thoughtful staff.",
    stay: "Coastal Garden Lodge"
  }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500&q=80", // pool
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=500&q=80", // interior
  "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=500&q=80", // bath
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=500&q=80", // spa
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80", // garden
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=80"  // ocean
];

const TIMELINE = [
  { year: "1912", title: "The Foundation", desc: "Built as a seaside retreat for architectural artists along the rocky coastline." },
  { year: "1954", title: "Royal Restorations", desc: "Revitalized into a modern boutique luxury hotel hosting diplomatic dignitaries." },
  { year: "1998", title: "Ecological Integration", desc: "Redesigned with passive cooling, regional limestone structures, and organic botanic gardens." },
  { year: "2026", title: "Modern Luxury Sanctuary", desc: "Fully upgraded digital amenities with a sustained heritage look and offline-first peace." }
];

const STAFF = [
  { name: "Elena Rostova", role: "General Manager", bio: "Over 18 years shaping European hospitality with extreme care.", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80" },
  { name: "Chef Marcus Vance", role: "Culinary Director", bio: "Two Michelin-star veteran highlighting locally caught raw ingredients.", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&h=300&q=80" },
  { name: "Paul Bisset", role: "Head Concierge", bio: "A master of the local countryside, matching guests with quiet coastal coves.", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80" }
];

export default function HotelWebsite({ navState, onNavigate, menuOpen, setMenuOpen }: HotelWebsiteProps) {
  const [checkIn, setCheckIn] = useState("2026-06-25");
  const [checkOut, setCheckOut] = useState("2026-06-28");
  const [guests, setGuests] = useState(2);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [inquirySuccess, setInquirySuccess] = useState(false);
  
  // Interactive features
  const [activeFilter, setActiveFilter] = useState<"all" | "suite" | "villa" | "penthouse">("all");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [selectedMapPin, setSelectedMapPin] = useState<{ name: string; distance: string } | null>({
    name: "The Palace Private Beach",
    distance: "Direct Walk out"
  });

  const activeRoom = ROOMS.find(r => r.id === (navState.params?.id || navState.params)) || ROOMS[0];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!fullName.trim()) tempErrors.fullName = "Required";
    if (!phone.trim()) tempErrors.phone = "Required";
    if (!email.trim() || !email.includes("@")) tempErrors.email = "Valid email required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});
    onNavigate("booking-confirmation");
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!fullName.trim()) tempErrors.fullName = "Required";
    if (!email.trim() || !email.includes("@")) tempErrors.email = "Valid email required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});
    setInquirySuccess(true);
    setTimeout(() => {
      setInquirySuccess(false);
      setFullName("");
      setEmail("");
      setMessage("");
    }, 4500);
  };

  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end.getTime() - start.getTime();
    const nights = Math.ceil(diff / (1000 * 3600 * 24));
    return isNaN(nights) || nights <= 0 ? 3 : nights;
  };

  const nights = calculateNights();
  const estimatedCost = activeRoom.rate * nights;

  const filteredRooms = ROOMS.filter(r => activeFilter === "all" || r.category === activeFilter);

  const prevReview = () => {
    setReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };
  const nextReview = () => {
    setReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  if (menuOpen) {
    return (
      <div className="w-full h-full flex flex-col bg-[#FAF9F5] text-[#24201E] font-sans overflow-hidden relative animate-fade-in select-none">
        <div className="w-full h-full flex flex-col px-5 py-4.5 justify-between overflow-y-auto">
          {/* TOP SECTION */}
          <div className="flex items-center justify-between shrink-0 pb-3 border-b border-stone-200">
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { onNavigate("home"); setMenuOpen(false); }}>
              <Compass className="w-4 h-4 text-[#8B6E50] shrink-0" />
              <span className="font-serif font-black text-[11px] uppercase tracking-[0.2em] text-[#24201E]">The Palace</span>
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 text-stone-550 hover:text-[#8B6E50] transition-colors py-1 px-1.5 rounded-md hover:bg-stone-200/40"
              id="hotel-nav-menu-close"
            >
              <span className="text-[7px] uppercase tracking-[0.15em] font-extrabold">Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MIDDLE SECTION - NAVIGATION LINKS */}
          <div className="flex flex-col gap-2 py-4 my-auto shrink-0 text-left">
            {[
              { label: "Home", page: "home" },
              { label: "About", page: "about" },
              { label: "Rooms", page: "rooms" },
              { label: "Contact", page: "contact" },
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
                      ? "text-[#8B6E50] translate-x-1" 
                      : "text-stone-800 hover:text-[#8B6E50] hover:translate-x-1"
                  }`}
                >
                  <span>{link.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#8B6E50]" />}
                </button>
              );
            })}
          </div>

          {/* FEATURED SECTION */}
          <div className="border-t border-stone-200 pt-3 pb-3 text-left">
            <span className="text-[6.5px] uppercase tracking-[0.18em] font-bold text-[#8B6E50] block mb-0.5">Book Your Stay</span>
            <p className="text-[8.5px] text-stone-500 leading-relaxed font-sans font-light mb-2.5">
              Secure premium coastal suites or garden villas with ocean view.
            </p>
            <button
              onClick={() => {
                onNavigate("rooms");
                setMenuOpen(false);
              }}
              className="text-[7.5px] font-sans font-extrabold uppercase tracking-widest text-[#24201E] border-b border-[#8B6E50] pb-0.5 hover:text-[#8B6E50] transition-colors"
            >
              [ Book Stay ]
            </button>
          </div>

          {/* VISUAL SECTION */}
          <div className="w-full h-24 rounded-md overflow-hidden relative shadow-sm border border-stone-200/40 my-1 shrink-0 select-none">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80" 
              alt="Luxury Grand Hotel Pool Side" 
              className="w-full h-full object-cover filter brightness-95"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-stone-900/10" />
          </div>

          {/* BOTTOM SECTION */}
          <div className="text-left pt-3 border-t border-stone-200 shrink-0 font-sans flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-0.5 text-[7px] font-semibold text-stone-550">
                <span className="text-[#8B6E50] uppercase text-[5.5px] tracking-widest pb-0.5">Concierge Desk</span>
                <span>+1 (800) 990-2101</span>
                <span>concierge@palacesanctuary.com</span>
              </div>
              <div className="flex gap-2.5 pb-0.5">
                <span className="text-[6.5px] uppercase tracking-wider text-stone-400 font-extrabold hover:text-[#8B6E50] cursor-pointer">Instagram</span>
                <span className="text-[6.5px] uppercase tracking-wider text-stone-400 font-extrabold hover:text-[#8B6E50] cursor-pointer">Twitter</span>
              </div>
            </div>
            <span className="text-[5.5px] tracking-widest uppercase block opacity-40 text-stone-600">GRAND PALACE HOTEL © 2026</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#FAF9F5] text-[#24201E] overflow-y-auto overscroll-contain font-sans relative">
      {/* Premium Mobile Header (LOGO on left, MENU on right) */}
      <header className="px-4.5 py-4 flex items-center justify-between sticky top-0 bg-[#FAF9F5]/90 backdrop-blur-md z-30 shrink-0 border-b border-stone-200/45">
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { onNavigate("home"); setMenuOpen(false); }}>
          <Compass className="w-3.5 h-3.5 text-[#8B6E50] shrink-0" />
          <span className="font-serif font-black text-[10px] uppercase tracking-[0.25em] text-[#24201E]">The Palace</span>
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="flex items-center gap-1.5 hover:opacity-85 transition-opacity py-0.5 px-1 rounded-sm"
          id="hotel-nav-menu-btn"
        >
          <span className="font-sans text-[7.5px] uppercase tracking-[0.2em] text-[#24201E] font-medium">Menu</span>
          <Menu className="w-3.5 h-3.5 text-[#24201E]" />
        </button>
      </header>

      {/* Main Website Page Content */}
      <div className="flex-grow pb-8 text-left">
        
        {/* ======================= HOME LANDING ======================= */}
        {navState.page === "home" && (
          <div className="flex flex-col animate-fade-in">
            {/* Elegant Large Hero View */}
            <div className="relative w-full h-[340px] text-white flex items-end p-5 overflow-hidden shrink-0">
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" 
                alt="Hotel Architecture Lobby" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.80]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-black/10 z-0" />
              <div className="relative z-10 flex flex-col text-left gap-1.5 w-full">
                <span className="text-[7.5px] font-sans font-bold tracking-[0.35em] text-[#8B6E50] uppercase">Coastal Enclave</span>
                <h1 className="font-serif text-[23px] tracking-tight text-white font-medium leading-tight max-w-[245px] whitespace-pre-line">
                  Where Sea meets
                  Timeless Quiet
                </h1>
                <p className="text-[9px] text-neutral-300 max-w-[245px] font-light leading-relaxed font-sans mb-3">
                  On a quiet coastal ridge, Grand Palace pairs historic Mediterranean charm with the soothing rhythm of the shoreline.
                </p>
                <div className="flex gap-2.5">
                  <button 
                    onClick={() => onNavigate("rooms")}
                    className="px-4 py-2 bg-[#24201E] text-white hover:bg-[#8B6E50] text-[8px] font-sans font-extrabold uppercase rounded-sm tracking-widest transition-all cursor-pointer"
                  >
                    Book Stay
                  </button>
                  <button 
                    onClick={() => onNavigate("about")}
                    className="px-4 py-2 bg-white/20 backdrop-blur-md text-white border border-white/30 text-[8px] font-sans font-extrabold uppercase rounded-sm tracking-widest transition-all cursor-pointer"
                  >
                    View History
                  </button>
                </div>
              </div>
            </div>

            {/* Hotel Core Intro */}
            <div className="px-5 py-6 flex flex-col gap-6.5">
              <div className="flex flex-col gap-2.5">
                <span className="text-[6.5px] font-sans font-bold tracking-[0.2em] uppercase text-[#8B6E50]">The Palace Sanctuary</span>
                <p className="text-[14px] leading-relaxed text-stone-800 font-serif">
                  Originally established in 1912, the Grand Palace is defined by quiet limestone villas, sun-drenched coastal paths, and unhurried service designed to restore the soul.
                </p>
              </div>

              {/* Featured Residences Showcase */}
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex justify-between items-baseline border-b border-stone-200 pb-2">
                  <span className="text-[7px] font-sans font-bold text-[#8B6E50] uppercase tracking-[0.15em]">Signature Retreats</span>
                  <button onClick={() => onNavigate("rooms")} className="text-[6.5px] font-sans font-bold tracking-[0.1em] text-stone-500 hover:text-black uppercase">All Suites →</button>
                </div>

                <div className="grid grid-cols-1 gap-5">
                  {ROOMS.slice(0, 2).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => onNavigate("room-details", { id: item.id })}
                      className="group cursor-pointer flex flex-col gap-2"
                    >
                      <div className="h-44 overflow-hidden rounded bg-stone-150 relative">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700"
                        />
                        <div className="absolute top-3 right-3 bg-white/95 px-2.5 py-1 text-[7.5px] font-sans font-bold rounded text-stone-900 border border-stone-200 shadow-xs">
                          From ${item.rate}/N
                        </div>
                      </div>
                      <div className="flex justify-between items-start gap-2">
                        <div className="flex flex-col text-left gap-0.5">
                          <span className="text-[11.5px] font-serif font-semibold text-stone-900">{item.name}</span>
                          <span className="text-[7.5px] text-stone-500 font-sans">{item.desc}</span>
                        </div>
                        <span className="text-[7.5px] font-sans font-extrabold uppercase text-[#8B6E50] hover:translate-x-0.5 transition-transform">Book →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Refinement / Amenities Grid */}
              <div className="flex flex-col gap-3 mt-4">
                <div className="border-b border-stone-200 pb-2">
                  <span className="text-[7px] font-sans font-bold text-[#8B6E50] uppercase tracking-[0.15em]">Curated Amenities</span>
                </div>
                <div className="grid grid-cols-2 gap-3 bg-stone-100/50 p-4 rounded-md border border-stone-200/40">
                  {[
                    "Therapeutic hot lagoons",
                    "Scenic wellness studio",
                    "Aesthetic coast balconies",
                    "Curated regional wine menu",
                    "Pillow comfort menus",
                    "Historical coastal gardens"
                  ].map((am, i) => (
                    <div key={i} className="flex items-center gap-2 text-[8px] text-stone-750">
                      <Check className="w-2.5 h-2.5 text-[#8B6E50] shrink-0" />
                      <span>{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Guest Reviews Section */}
              <div className="flex flex-col gap-3.5 mt-4 bg-[#FAF9F5] border border-stone-200 rounded p-4">
                <span className="text-[6.5px] font-sans font-bold text-[#8B6E50] tracking-[0.2em] uppercase">Resident Words</span>
                <div className="flex flex-col gap-2 min-h-[75px]">
                  <p className="text-[10px] text-stone-850 font-serif italic leading-relaxed">
                    "{REVIEWS[reviewIndex].text}"
                  </p>
                  <div className="mt-2 flex justify-between items-center text-left">
                    <div>
                      <h5 className="text-[8.5px] font-sans font-bold text-stone-900">{REVIEWS[reviewIndex].author}</h5>
                      <span className="text-[6.5px] text-stone-400 uppercase tracking-widest">Stayed in: {REVIEWS[reviewIndex].stay}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: REVIEWS[reviewIndex].rating }).map((_, rIdx) => (
                        <Star key={rIdx} className="w-2 h-2 text-amber-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-1.5 border-t border-stone-200/50 pt-2.5">
                  <button onClick={prevReview} className="p-1 px-2 rounded hover:bg-stone-100 text-stone-600 transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={nextReview} className="p-1 px-2 rounded hover:bg-stone-100 text-stone-600 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Photo Gallery Section */}
              <div className="flex flex-col gap-3 mt-4">
                <div className="border-b border-stone-200 pb-2">
                  <span className="text-[7px] font-sans font-bold text-[#8B6E50] uppercase tracking-[0.15em]">Photo Gallery</span>
                </div>
                <p className="text-[8.5px] text-stone-500 font-sans tracking-wide leading-relaxed font-light mb-1">
                  A glimpse into our Mediterranean style rooms, mineral bath lagoons, and pristine gardens. Click any image to preview.
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {GALLERY_IMAGES.map((url, i) => (
                    <div 
                      key={i} 
                      onClick={() => setLightboxImage(url)}
                      className="h-16 rounded overflow-hidden cursor-pointer border border-stone-200/40 hover:opacity-90 transform hover:scale-[1.01] transition-all"
                    >
                      <img src={url} alt="Gallery view thumbnail" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Feature Block */}
              <div className="flex flex-col gap-3.5 mt-4">
                <div className="border-b border-stone-200 pb-2">
                  <span className="text-[7px] font-sans font-bold text-[#8B6E50] uppercase tracking-[0.15em]">Arrival & Location</span>
                </div>
                <div className="p-3.5 bg-white border border-stone-200 rounded-lg flex flex-col gap-3 font-sans">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#8B6E50] shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-[8.5px] font-bold text-stone-850">Palermo Highway Km 14.5, Italy</span>
                      <span className="text-[7.5px] text-stone-500 mt-0.5">Nestled 45 minutes from Palermo Airport on the high coast sands.</span>
                    </div>
                  </div>
                  
                  {/* Map Pin Selector Card */}
                  <div className="mt-1 flex flex-col gap-1.5">
                    <span className="text-[6.5px] font-bold text-[#8B6E50] uppercase tracking-wider">Explore Nearby Attractions (Click to View)</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: "Palace Private Beach", distance: "Direct Walk out" },
                        { name: "Cefalù Cathedral", distance: "18 min drive" },
                        { name: "Marine Nature Reserve", distance: "5 min walk" }
                      ].map((loc, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedMapPin({ name: loc.name, distance: loc.distance })}
                          className={`text-[7px] px-2 py-1 rounded border transition-colors ${
                            selectedMapPin?.name === loc.name 
                              ? "bg-[#24201E] text-white border-transparent shadow-xs" 
                              : "bg-stone-50 text-stone-605 border-stone-200 hover:bg-stone-100"
                          }`}
                        >
                          {loc.name}
                        </button>
                      ))}
                    </div>

                    {selectedMapPin && (
                      <div className="p-2 border border-stone-200/50 rounded bg-stone-50/55 flex justify-between items-center text-[7.5px] mt-1 italic text-stone-600 font-sans">
                        <span>Selected destination distance:</span>
                        <span className="font-extrabold text-[#24201E]">{selectedMapPin.distance}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Minimal Contact CTA Block */}
              <div className="flex flex-col gap-3 mt-4">
                <div className="p-4 bg-[#24201E] text-white rounded-md text-left flex flex-col gap-1.5 relative overflow-hidden">
                  <span className="text-[7.5px] text-[#8B6E50] font-sans font-bold uppercase tracking-widest">Connect With Us</span>
                  <p className="text-[10px] font-serif pr-6 text-neutral-200 leading-relaxed">
                    Have distinct requests? Reach out to our concierge desk for tailored arrangements.
                  </p>
                  <button 
                    onClick={() => onNavigate("contact")}
                    className="self-start text-[8px] font-sans font-bold uppercase tracking-widest text-stone-100 border-b border-[#8B6E50] pb-0.5 mt-2 hover:text-[#8B6E50] transition-colors"
                  >
                    [ Contact Concierge ]
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ======================= ABOUT PAGE ======================= */}
        {navState.page === "about" && (
          <div className="flex flex-col animate-fade-in text-left">
            {/* Fine Architecture Header */}
            <div className="relative w-full h-[180px] overflow-hidden flex items-end p-5">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80" 
                alt="Hotel Architecture Entrance" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F5] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-black/10 z-0" />
              <div className="relative z-10 w-full">
                <span className="text-[6.5px] font-sans font-bold text-[#8B6E50] tracking-[0.25em] uppercase font-bold">Est. 1912</span>
                <h4 className="font-serif text-[18px] font-medium text-white leading-tight mt-1">A Century of Coastal Calm</h4>
              </div>
            </div>

            <div className="px-5 py-6 flex flex-col gap-6.5">
              {/* Editorial quotes */}
              <div className="flex flex-col gap-2.5">
                <blockquote className="font-serif italic text-[#8B6E50] text-[13px] leading-relaxed border-l-2 border-[#8B6E50] pl-3.5">
                  "At Grand Palace, we believe true luxury is found in the soft ocean breeze, time slowed down, and the perfect execution of everyday essentials."
                </blockquote>
                <p className="text-[8.5px] text-stone-605 leading-relaxed font-sans font-light mt-1">
                  Originally built as a cliffside retreat for regional architectural designers and scholars, the palace has been carefully curated across multiple generations to ensure a genuine, restful escape.
                </p>
              </div>

              {/* Milestones Timeline */}
              <div className="flex flex-col gap-3 mt-1.5">
                <span className="text-[7.5px] font-sans font-bold tracking-[0.15em] uppercase text-[#8B6E50]">The Palace Registry</span>
                
                <div className="border border-stone-200 rounded p-4 bg-white/50 flex flex-col gap-3.5">
                  <div className="flex gap-2">
                    {TIMELINE.map((time, idx) => (
                      <button
                        key={time.year}
                        onClick={() => setTimelineIndex(idx)}
                        className={`text-[8.5px] font-extrabold px-2.5 py-1 rounded transition-all ${
                          timelineIndex === idx 
                            ? "bg-[#24201E] text-white" 
                            : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                        }`}
                      >
                        {time.year}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1 text-left min-h-[50px] transition-all">
                    <span className="text-[8px] font-sans font-bold uppercase text-[#8B6E50]">{TIMELINE[timelineIndex].title}</span>
                    <p className="text-[8.5px] text-stone-602 font-sans font-light leading-relaxed">{TIMELINE[timelineIndex].desc}</p>
                  </div>
                </div>
              </div>

              {/* Staff Member Overviews */}
              <div className="flex flex-col gap-3.5 mt-2">
                <span className="text-[7.5px] font-sans font-bold tracking-[0.15em] uppercase text-[#8B6E50]">Host Sanctuary Staff</span>
                <p className="text-[8.5px] text-stone-500 font-sans tracking-wide leading-relaxed font-light mb-1">
                  A legacy of warm attention. Meet the curated team supporting your stay.
                </p>
                <div className="flex flex-col gap-4">
                  {STAFF.map((member, i) => (
                    <div key={i} className="flex gap-3.5 items-center p-3 bg-white border border-stone-200 rounded shadow-xs">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-stone-200 bg-stone-50 select-none">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col text-left">
                        <h5 className="text-[10px] font-sans font-extrabold text-stone-900 leading-tight">{member.name}</h5>
                        <span className="text-[6.5px] text-[#8B6E50] uppercase tracking-wider font-extrabold mt-0.5">{member.role}</span>
                        <p className="text-[8px] text-stone-500 leading-normal font-sans mt-1">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Return to Suites */}
              <button 
                onClick={() => onNavigate("rooms")}
                className="mt-2 w-full py-3 bg-[#24201E] hover:bg-[#8B6E50] text-stone-100 text-[8px] font-sans font-bold uppercase rounded-sm tracking-widest text-center cursor-pointer transition-colors"
              >
                View Residence Rooms
              </button>
            </div>
          </div>
        )}

        {/* ======================= ROOMS DIRECTORY ======================= */}
        {navState.page === "rooms" && (
          <div className="px-5 py-5 flex flex-col gap-5 animate-fade-in text-left">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-[6.5px] font-sans font-bold text-[#8B6E50] tracking-[0.2em] uppercase">Private Lodging</span>
              <h4 className="font-serif text-[16px] font-medium uppercase text-[#24201E] mt-0.5">Residence Suites</h4>
            </div>

            {/* Real Interactive Room Categories Selector */}
            <div className="flex gap-1.5">
              {[
                { label: "All Rooms", filter: "all" },
                { label: "Suites", filter: "suite" },
                { label: "Villas", filter: "villa" },
                { label: "Penthouses", filter: "penthouse" }
              ].map((tab) => (
                <button
                  key={tab.filter}
                  onClick={() => setActiveFilter(tab.filter as any)}
                  className={`text-[7px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded transition-all ${
                    activeFilter === tab.filter 
                      ? "bg-[#24201E] text-white" 
                      : "bg-stone-105 hover:bg-stone-200/60 text-stone-500"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-6.5 mt-2">
              {filteredRooms.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => onNavigate("room-details", { id: item.id })}
                  className="group cursor-pointer flex flex-col gap-3"
                >
                  <div className="h-48 overflow-hidden rounded bg-stone-100 relative border border-stone-200/40">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700"
                    />
                    <div className="absolute bottom-3 left-3 bg-[#FAF9F5]/95 backdrop-blur-md px-3 py-1.5 rounded text-[8.5px] font-sans font-bold text-[#24201E] shadow-sm">
                      ${item.rate} / Night
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1 px-0.5">
                    <div className="flex justify-between items-baseline">
                      <h5 className="text-[12px] font-serif font-semibold text-stone-900">{item.name}</h5>
                      <div className="flex items-center text-amber-600 text-[7px] font-bold">
                        <Star className="w-2.2 h-2.2 fill-current mr-0.5" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-[7.5px] text-stone-500 font-sans tracking-wide leading-relaxed font-light">{item.desc}</p>
                    <div className="flex gap-2.5 mt-1 pointer-events-none">
                      <span className="text-[6.5px] font-sans text-neutral-400 font-bold uppercase tracking-wider">{item.size}</span>
                      <span className="text-[6.5px] font-sans text-neutral-400 font-bold uppercase tracking-wider">Up to {item.maxGuests} guests</span>
                    </div>
                    
                    {/* Action buttons inside room directory */}
                    <div className="mt-2.5 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("booking", { id: item.id });
                        }}
                        className="flex-1 py-2 bg-[#24201E] hover:bg-[#8B6E50] text-stone-50 text-[7.5px] font-sans font-extrabold uppercase rounded-sm tracking-widest text-center transition-all"
                      >
                        Book Stay
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate("room-details", { id: item.id });
                        }}
                        className="flex-1 py-2 bg-transparent border border-stone-300 text-stone-700 hover:bg-stone-50 text-[7.5px] font-sans font-extrabold uppercase rounded-sm tracking-widest text-center transition-all"
                      >
                        Suite Detail
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredRooms.length === 0 && (
                <div className="py-8 text-center text-[9px] text-stone-400 italic">
                  No hotel rooms match the category filter selection.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================= ROOM DETAILS ======================= */}
        {navState.page === "room-details" && (
          <div className="px-4.5 py-4.5 flex flex-col gap-4 text-left animate-fade-in">
            <button 
              onClick={() => onNavigate("rooms")}
              className="flex items-center gap-1.5 text-[7px] font-sans font-bold text-neutral-400 hover:text-stone-900 uppercase transition-colors"
            >
              <ArrowLeft className="w-2.5 h-2.5" /> Back to Residences
            </button>

            {/* Room Image Display */}
            <div className="relative w-full h-52 bg-stone-100 rounded overflow-hidden shrink-0 border border-stone-200/45">
              <img 
                src={activeRoom.image} 
                alt={activeRoom.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Room Content */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-start border-b border-stone-200 pb-2">
                <div className="flex flex-col gap-0.5 text-left">
                  <span className="text-[6.5px] font-sans font-semibold text-[#8B6E50] uppercase tracking-widest">Selected Residence</span>
                  <h4 className="font-serif text-[15px] font-semibold leading-tight text-neutral-900 mt-1">{activeRoom.name}</h4>
                </div>
                <div className="font-sans text-[11px] text-[#24201E] font-bold shrink-0 text-right mt-1.5">
                  ${activeRoom.rate} <span className="text-[6.5px] text-neutral-400 font-normal">/ Night</span>
                </div>
              </div>
              <p className="text-[8.5px] text-stone-605 leading-relaxed font-sans font-light mt-2">{activeRoom.detailedDesc}</p>
            </div>

            {/* Room Parameters Card */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 border border-stone-200/45 rounded-md font-sans text-[7.5px] uppercase font-bold text-stone-600">
              <div className="flex flex-col gap-0.5">
                <span className="text-stone-400 text-[6px]">Suites Dimensions</span>
                <span className="text-[#24201E]">{activeRoom.size} Private Space</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-stone-400 text-[6px]">Max Bed Allowance</span>
                <span className="text-[#24201E]">{activeRoom.maxGuests} Active Guests</span>
              </div>
            </div>

            {/* Curated Amenities Included */}
            <div className="flex flex-col gap-2.5 p-4 bg-stone-100/50 rounded-lg mt-1 border border-stone-200/50">
              <span className="text-[6.5px] font-sans text-[#8B6E50] uppercase font-bold tracking-[0.15em]">Amenities Provided</span>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {activeRoom.amenities.map((am, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[7.5px] text-stone-700 text-left">
                    <Check className="w-2.5 h-2.5 text-[#8B6E50] shrink-0" />
                    <span className="truncate">{am}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instant Reserve CTA */}
            <button 
              onClick={() => onNavigate("booking", { id: activeRoom.id })}
              className="w-full mt-3 py-3 bg-[#24201E] hover:bg-[#8B6E50] text-stone-100 rounded-sm text-[8px] font-sans font-bold uppercase tracking-widest text-center transition-all cursor-pointer"
            >
              Book Stay
            </button>
          </div>
        )}

        {/* ======================= CONTACT PAGE ======================= */}
        {navState.page === "contact" && (
          <div className="px-5 py-5 flex flex-col gap-5 text-left animate-fade-in">
            <div className="border-b border-stone-200 pb-2">
              <span className="text-[6.5px] font-sans font-bold text-[#8B6E50] tracking-[0.2em] uppercase">Inquiries</span>
              <h4 className="font-serif text-[16px] font-medium uppercase text-stone-900 mt-0.5">Contact Us</h4>
            </div>

            {/* Fine Call / Mail layout */}
            <div className="flex flex-col gap-4 bg-white p-4.5 rounded-lg border border-stone-200/50">
              <div className="flex items-start gap-3.5">
                <Phone className="w-4 h-4 text-[#8B6E50] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[6px] font-sans text-stone-400 uppercase font-black tracking-wider">CONCIERGE DESK</span>
                  <span className="text-[10px] font-sans text-stone-800 font-semibold mt-0.5">+1 (800) 990-2101</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3.5 pt-3.5 border-t border-stone-200/50">
                <Mail className="w-4 h-4 text-[#8B6E50] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[6px] font-sans text-stone-400 uppercase font-black tracking-wider">RESERVATIONS EMAIL</span>
                  <span className="text-[10px] font-sans text-stone-800 font-semibold mt-0.5">concierge@palacesanctuary.com</span>
                </div>
              </div>
            </div>

            {/* Mock Map Layout Card */}
            <div className="p-3 bg-white border border-stone-200 rounded-lg flex flex-col gap-1">
              <span className="text-[6px] font-sans text-[#8B6E50] uppercase font-bold tracking-widest">Property Location Map</span>
              <div className="h-28 bg-stone-100 rounded border border-stone-200 relative overflow-hidden flex items-center justify-center p-4 text-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8b6e50_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="flex flex-col items-center gap-1.5 z-10">
                  <Compass className="w-5 h-5 text-[#8B6E50] animate-spin-slow" />
                  <span className="text-[8.5px] font-sans font-bold text-stone-850">Palermo Coast Bay, Sicily 90100</span>
                  <span className="text-[6.5px] text-stone-400 tracking-wider">MAPPED LOCATION FOR GRAND PALACE SANCTUARY</span>
                </div>
              </div>
            </div>

            {/* Simple Inquiry Form */}
            <form onSubmit={handleInquirySubmit} className="flex flex-col gap-3.5 mt-2">
              <span className="text-[6.5px] font-sans font-bold text-[#8B6E50] tracking-widest uppercase block mb-1">Make an Inquiry</span>
              
              <div className="flex flex-col gap-1">
                <label className="text-[6px] font-sans text-neutral-450 uppercase font-bold tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className="px-3 py-2 text-[8px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#8B6E50] transition-colors"
                />
                {errors.fullName && <span className="text-[6.5px] text-red-500 font-sans">Full name required</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] font-sans text-neutral-450 uppercase font-bold tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@domain.com"
                  className="px-3 py-2 text-[8px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#8B6E50] transition-colors"
                />
                {errors.email && <span className="text-[6.5px] text-red-500 font-sans">Valid email required</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] font-sans text-neutral-450 uppercase font-bold tracking-widest">Message</label>
                <textarea 
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you?"
                  className="px-3 py-2 text-[8px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#8B6E50] resize-none transition-colors"
                />
              </div>

              {inquirySuccess ? (
                <div className="p-3 bg-emerald-50 text-emerald-850 border border-emerald-100 rounded text-[7.5px] flex items-center gap-1.5 font-sans">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Your request has been filed. We will contact you shortly.</span>
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-3 bg-[#24201E] hover:bg-[#8B6E50] text-white rounded-sm text-[8px] font-sans font-bold uppercase tracking-widest text-center cursor-pointer transition-colors"
                >
                  Send Inquiry
                </button>
              )}
            </form>
          </div>
        )}

        {/* ======================= BOOKING FORM ======================= */}
        {navState.page === "booking" && (
          <div className="px-5 py-5 flex flex-col gap-4 text-left animate-fade-in font-sans">
            <h4 className="font-serif text-[15px] font-medium uppercase text-[#24201E] border-b border-stone-200 pb-2">Request Booking Detail</h4>

            {/* Miniature Room Banner */}
            <div className="p-3.5 bg-white rounded-md flex items-center gap-3 border border-stone-200">
              <img 
                src={activeRoom.image} 
                alt={activeRoom.name} 
                className="w-12 h-12 object-cover rounded shadow-inner bg-stone-100 shrink-0"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-serif font-bold text-stone-900 leading-tight block">{activeRoom.name}</span>
                <span className="text-[7.5px] text-[#8B6E50] font-sans font-bold uppercase tracking-wider mt-1">${activeRoom.rate} / Night</span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-3.5 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[6px] font-sans text-stone-400 uppercase font-bold tracking-widest">Check-In</label>
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="px-2.5 py-1.5 text-[8px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#8B6E50] font-sans"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[6px] font-sans text-stone-400 uppercase font-bold tracking-widest">Check-Out</label>
                  <input 
                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="px-2.5 py-1.5 text-[8px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#8B6E50] font-sans"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] font-sans text-stone-400 uppercase font-bold tracking-widest">Guests</label>
                <select 
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                  className="px-2.5 py-1.5 text-[8.5px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#8B6E50] font-medium"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] font-sans text-stone-400 uppercase font-bold tracking-widest">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Valued guest's full name"
                  className="px-3 py-1.5 text-[8px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#8B6E50]"
                />
                {errors.fullName && <span className="text-[6.5px] text-red-500 font-sans">Full name required</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] font-sans text-stone-400 uppercase font-bold tracking-widest">Contact Phone</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  className="px-3 py-1.5 text-[8px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#8B6E50] font-sans"
                />
                {errors.phone && <span className="text-[6.5px] text-red-500 font-sans">Phone required</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] font-sans text-stone-400 uppercase font-bold tracking-widest">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="yourname@domain.com"
                  className="px-3 py-1.5 text-[8px] rounded-sm border border-stone-300 bg-white outline-none focus:border-[#8B6E50] font-sans"
                />
                {errors.email && <span className="text-[6.5px] text-red-500 font-sans">{errors.email}</span>}
              </div>

              <div className="my-2 p-4 bg-stone-100 rounded-md border border-stone-200/60 flex flex-col gap-1 text-[7.5px] font-sans font-bold uppercase shadow-inner">
                <div className="flex justify-between text-neutral-400">
                  <span>Suites Rate</span>
                  <span>${activeRoom.rate} × {nights} Nights</span>
                </div>
                <div className="flex justify-between text-[#24201E] font-black mt-2 pt-2 border-t border-stone-200">
                  <span>Estimated Total cost</span>
                  <span className="text-[10px] font-sans font-black text-stone-900">${estimatedCost}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#24201E] hover:bg-[#8B6E50] text-[#FAF9F5] rounded-sm text-[8px] font-sans font-bold uppercase tracking-widest text-center cursor-pointer transition-colors"
              >
                Send Booking Request
              </button>
            </form>
          </div>
        )}

        {/* ======================= BOOKING CONFIRMED ======================= */}
        {navState.page === "booking-confirmation" && (
          <div className="px-5 py-8 flex flex-col items-center justify-center text-center gap-5.5 animate-fade-in font-sans">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-xs select-none">
              <Check className="w-5.5 h-5.5 text-emerald-600" />
            </div>

            <div className="flex flex-col gap-1.5 text-center">
              <span className="text-[6.5px] font-sans text-emerald-700 uppercase font-bold tracking-widest">Confirmed</span>
              <h4 className="font-serif text-[15px] text-[#24201E] uppercase font-bold leading-tight">Sanctuary Secured</h4>
              <p className="text-[8px] text-stone-500 px-3.5 leading-relaxed font-light">Your stay proposal has been successfully recorded. We are preparing for your arrival.</p>
            </div>

            {/* Custom Hotel Ticket */}
            <div className="w-full bg-white border border-stone-200 rounded-lg relative overflow-hidden flex flex-col p-4 text-left gap-2.5 mt-2 shadow-sm font-sans text-[7px] uppercase font-semibold">
              <div className="absolute top-[-4px] left-[-4px] w-2 h-2 bg-[#FAF9F5] rounded-full border border-stone-200" />
              <div className="absolute top-[-4px] right-[-4px] w-2 h-2 bg-[#FAF9F5] rounded-full border border-stone-200" />
              <div className="absolute bottom-[-4px] left-[-4px] w-2 h-2 bg-[#FAF9F5] rounded-full border border-stone-200" />
              <div className="absolute bottom-[-4px] right-[-4px] w-2 h-2 bg-[#FAF9F5] rounded-full border border-stone-200" />
              
              <div className="flex justify-between text-neutral-400 pb-2 border-b border-dashed border-stone-200">
                <span>Primary Guest</span>
                <span className="text-[#24201E] font-bold">{fullName.toUpperCase() || "VALUED RESIDENT"}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-left">
                <div className="flex flex-col gap-0.5">
                  <span className="text-neutral-400 text-[6px]">Arrival</span>
                  <span className="text-stone-800 font-bold">{checkIn}</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-neutral-400 text-[6px]">Departure</span>
                  <span className="text-stone-800 font-bold">{checkOut}</span>
                </div>
              </div>

              <div className="flex justify-between text-neutral-450 mt-2 pt-2 border-t border-dashed border-stone-200 text-[6px] tracking-wide">
                <span>Booking reference</span>
                <span className="text-[#8B6E50] font-black">#GP-99217</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate("home")}
              className="py-3 px-5 bg-[#24201E] hover:bg-[#8B6E50] text-stone-100 text-[8px] font-sans font-bold uppercase rounded-sm w-full tracking-widest transition-colors mt-2"
            >
              Return Home
            </button>
          </div>
        )}

      </div>

      {/* Modern Dialog Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="absolute inset-0 bg-stone-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="absolute top-4 right-4 p-2 text-white">
              <X className="w-4 h-4" />
            </div>
            <img 
              src={lightboxImage} 
              alt="Lightbox Preview" 
              className="max-w-full max-h-[75%] rounded object-contain border border-white/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
