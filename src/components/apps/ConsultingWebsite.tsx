import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, 
  ChevronRight, 
  Check, 
  X, 
  ArrowLeft,
  Menu,
  Mail,
  Phone,
  Compass,
  ArrowRight,
  TrendingUp,
  Settings,
  Zap,
  Globe,
  Sliders,
  Calendar
} from "lucide-react";

export interface ConsultingService {
  id: string;
  title: string;
  category: "Strategy" | "Operations" | "Growth" | "Technology";
  shortDesc: string;
  baseFee: number;
  longDesc: string;
  benefits: string[];
}

interface ConsultingWebsiteProps {
  navState: { page: string; params?: any };
  onNavigate: (page: string, params?: any) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

const SERVICES: ConsultingService[] = [
  // Business Strategy
  {
    id: "market-entry",
    title: "Market Strategy & Launch",
    category: "Strategy",
    shortDesc: "Helping expanding businesses design, launch, and price services in volatile segments.",
    baseFee: 8500,
    longDesc: "A complete mapping of competitor market shares, segment price elasticities, and local regulatory boundaries. Crafted to ground corporate ventures prior to capital deployment.",
    benefits: ["Relative Share Modeling", "Pricing Elasticity Audits", "Regulatory Risk Matrices", "Go-To-Market Phase Planning"]
  },
  // Operations
  {
    id: "process-audit",
    title: "Operational Audit & CRM Sync",
    category: "Operations",
    shortDesc: "Identifying system bottlenecks and integrating internal workflow engines.",
    baseFee: 12000,
    longDesc: "Surgical inspection of cross-department systems, repetitive manual workflows, and communication silos. We build automated loops that trim monthly overhead and reduce data-transfer lag.",
    benefits: ["System Latency Mapping", "Repetitive Task Decoupling", "CRM Custom Flow Buildout", "Direct Software Rationalization"]
  },
  // Growth
  {
    id: "scale-ops",
    title: "Acquisition & Channel Growth",
    category: "Growth",
    shortDesc: "Optimizing digital client acquisitions and regional corporate expansion models.",
    baseFee: 9500,
    longDesc: "Data-driven diagnostics targeting your active client journeys. We optimize acquisition paths, model retention behaviors, and design strategic partner channels.",
    benefits: ["Customer Lifecycle Diagnostics", "Organic Expansion Framework", "Strategic Channel Sourcing", "Conversion Funnel Hardening"]
  },
  // Technology
  {
    id: "stack-rationalization",
    title: "Technology Stack Alignment",
    category: "Technology",
    shortDesc: "Pruning modern SaaS bloat and ensuring clean database structure.",
    baseFee: 14000,
    longDesc: "Deep technical review of software spend, API middleware connections, and database integrity. We reduce subscription overlap and ensure structured systems ready for scale.",
    benefits: ["SaaS Spend Minimization", "Database Normalization Map", "API Middleware Verification", "Data Security Hardening"]
  }
];

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Dr. Rachel Chen",
    role: "Managing Director",
    bio: "Ex-strategy lead at elite venture houses. Over fifteen years advising high-growth tech platforms and global scale audits.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Marcus Thorne",
    role: "Operations Principle",
    bio: "Specialist in systems engineering, structural workflow automation, and custom CRM architecture.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
  },
  {
    name: "Paul Bisset",
    role: "Senior Consultant",
    bio: "Ex-SaaS optimization architect. Expert in database rationalization and enterprise systems coordination.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
  }
];

export default function ConsultingWebsite({ navState, onNavigate, menuOpen, setMenuOpen }: ConsultingWebsiteProps) {
  // Calculator local state
  const [selectedServiceId, setSelectedServiceId] = useState(SERVICES[0].id);
  const [scaleHours, setScaleHours] = useState(15);
  const [urgencyRate, setUrgencyRate] = useState("Standard");

  // Meeting Booking Form local state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [revenueTier, setRevenueTier] = useState("$1M - $5M");
  const [contactMessage, setContactMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Interactive Categories filter
  const [activeCategory, setActiveCategory] = useState<"All" | "Strategy" | "Operations" | "Growth" | "Technology">("All");

  const activeService = SERVICES.find(s => s.id === (navState.params?.id || navState.params)) || SERVICES[0];

  const handleInquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: Record<string, string> = {};
    if (!contactName.trim()) tempErrors.contactName = "Full name required";
    if (!contactEmail.trim() || !contactEmail.includes("@")) tempErrors.contactEmail = "Valid corporate email required";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }
    setErrors({});
    onNavigate("success");
  };

  const calculateEstimates = () => {
    const s = SERVICES.find(srv => srv.id === selectedServiceId) || SERVICES[0];
    const multiplier = urgencyRate === "Urgent (2w)" ? 1.4 : urgencyRate === "Expedited (4w)" ? 1.2 : 1.0;
    const hourCost = scaleHours * 250;
    return Math.round((s.baseFee + hourCost) * multiplier);
  };

  const estimatedFee = calculateEstimates();

  const filteredServices = SERVICES.filter(s => activeCategory === "All" || s.category === activeCategory);

  if (menuOpen) {
    return (
      <div className="w-full h-full flex flex-col bg-[#050505] text-[#E5E5E5] font-sans overflow-hidden relative animate-fade-in select-none">
        <div className="absolute top-[20%] left-[10%] w-[200px] h-[200px] bg-neutral-800/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="w-full h-full flex flex-col px-5 py-4.5 justify-between relative z-10 overflow-y-auto">
          {/* TOP SECTION */}
          <div className="flex items-center justify-between shrink-0 pb-3 border-b border-neutral-900">
            <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { onNavigate("home"); setMenuOpen(false); }}>
              <Briefcase className="w-4 h-4 text-white shrink-0" />
              <span className="font-sans font-black text-[11px] uppercase tracking-[0.25em] text-white">Prime</span>
            </div>
            <button 
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors py-1 px-1.5 rounded-md hover:bg-white/5"
              id="consulting-nav-menu-close"
            >
              <span className="text-[7px] uppercase tracking-[0.15em] font-extrabold">Close</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* MIDDLE SECTION - NAVIGATION LINKS */}
          <div className="flex flex-col gap-2 py-4 my-auto shrink-0 text-left">
            {[
              { label: "Home Base", page: "home" },
              { label: "Strategic Fields", page: "services" },
              { label: "Our Advisors", page: "about" },
              { label: "Book Alignment", page: "contact" },
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
                      ? "text-white translate-x-1" 
                      : "text-neutral-500 hover:text-white hover:translate-x-1"
                  }`}
                >
                  <span>{link.label}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </div>

          {/* FEATURED CTA CARD */}
          <div className="border-t border-neutral-900 pt-3 pb-3 text-left">
            <span className="text-[6.5px] uppercase tracking-[0.18em] font-black text-neutral-400 block mb-0.5">Corporate Alignment</span>
            <p className="text-[8.5px] text-neutral-500 leading-relaxed font-sans font-light mb-2.5">
              Secure brief initial diagnostics on workflow debt or partner channel modeling.
            </p>
            <button
              onClick={() => {
                onNavigate("contact");
                setMenuOpen(false);
              }}
              className="text-[7.5px] font-sans font-extrabold uppercase tracking-widest text-white border-b border-white pb-0.5 hover:text-neutral-350 transition-colors"
            >
              [ Check Slots ]
            </button>
          </div>

          {/* VISUAL IMAGE SECTION */}
          <div className="w-full h-24 rounded overflow-hidden relative shadow-sm border border-neutral-900 my-1 shrink-0 select-none bg-neutral-950">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=500&q=80" 
              alt="Architectural Corporate Office Studio" 
              className="w-full h-full object-cover filter brightness-[0.60] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* BOTTOM SECTION */}
          <div className="text-left pt-3 border-t border-neutral-900 shrink-0 font-sans flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-0.5 text-[7px] font-semibold text-neutral-500">
                <span className="text-neutral-400 uppercase text-[5.5px] tracking-widest pb-0.5">Advisory Entrance Desk</span>
                <span>+1 (415) 555-0199</span>
                <span>partner@primeconsulting.com</span>
              </div>
              <div className="flex gap-2.5 pb-0.5">
                <span className="text-[6.5px] uppercase tracking-wider text-neutral-400 font-extrabold hover:text-white cursor-pointer font-sans">MEMBER BASE</span>
              </div>
            </div>
            <span className="text-[5.5px] tracking-widest uppercase block opacity-40 text-neutral-600">PRIME ADVISORY GROUP © 2026</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-[#0A0A0A] text-[#F3F4F6] overflow-y-auto overscroll-contain font-sans relative">
      {/* High-End Minimal Header */}
      <header className="px-4.5 py-4 flex items-center justify-between sticky top-0 bg-[#0A0A0A]/95 backdrop-blur-md z-30 shrink-0 border-b border-neutral-900">
        <div className="flex items-center gap-1.5 cursor-pointer" onClick={() => { onNavigate("home"); setMenuOpen(false); }}>
          <Briefcase className="w-3.5 h-3.5 text-white shrink-0" />
          <span className="font-sans font-black text-[11px] uppercase tracking-[0.25em] text-white">Prime</span>
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="flex items-center gap-1.5 hover:opacity-85 transition-opacity py-0.5 px-1 rounded-sm"
          id="consulting-nav-menu-btn"
        >
          <span className="font-sans text-[7.5px] uppercase tracking-[0.2em] text-neutral-300 font-medium">Menu</span>
          <Menu className="w-3.5 h-3.5 text-white" />
        </button>
      </header>

      {/* Main Website Page Content */}
      <div className="flex-grow pb-8 text-[#E5E5E5] text-left animate-fade-in">
        
        {/* ======================= HOME LANDING ======================= */}
        {navState.page === "home" && (
          <div className="flex flex-col">
            {/* Elegant Large Monotonal Hero View */}
            <div className="relative w-full h-[320px] bg-neutral-950 flex items-end p-5 overflow-hidden shrink-0 border-b border-neutral-900">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80" 
                alt="Elite workspace corporate design" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] saturate-[0.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
              <div className="relative z-10 flex flex-col text-left gap-1.5 w-full">
                <span className="text-[7.5px] font-sans font-black tracking-[0.35em] text-neutral-450 uppercase">Capital Management</span>
                <h1 className="font-sans text-[22px] tracking-tight text-white font-black leading-tight uppercase max-w-[245px] whitespace-pre-line">
                  Pruning System debt.
                  Targeting real Scale.
                </h1>
                <p className="text-[9px] text-[#A3A3A3] max-w-[230px] font-light leading-relaxed font-sans mb-3.5">
                  An elite corporate advisory partnership. We isolate CRM latencies, audit SaaS subscriptions, and structure department scorecards to prep networks for scale.
                </p>
                <div className="flex gap-2.5">
                  <button 
                    onClick={() => onNavigate("contact")}
                    className="px-4 py-2 bg-white text-black hover:bg-neutral-200 text-[8px] font-sans font-extrabold uppercase rounded-sm tracking-widest transition-all cursor-pointer"
                  >
                    Schedule Consult
                  </button>
                  <button 
                    onClick={() => onNavigate("services")}
                    className="px-4 py-2 bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-850 text-[8px] font-sans font-extrabold uppercase rounded-sm tracking-widest transition-all cursor-pointer"
                  >
                    Our Fields
                  </button>
                </div>
              </div>
            </div>

            <div className="px-5 py-6 flex flex-col gap-6.5">
              {/* Core What We Do list */}
              <div className="flex flex-col gap-3">
                <span className="text-[6.5px] font-sans font-black tracking-[0.2em] uppercase text-neutral-400">Core Disciplines</span>
                <p className="text-[14.5px] font-sans font-black text-white leading-snug uppercase">
                  An uncompromised framework to audit and isolate systems debt.
                </p>

                <div className="grid grid-cols-1 gap-2.5 mt-2">
                  {[
                    { title: "System Architecture Audits", desc: "A detailed map of software lag and subscription overlaps.", icon: Settings },
                    { title: "Workforce Alignment", desc: "Crafting structured scorecards and department communication trees.", icon: Briefcase },
                    { title: "Channel Growth Analysis", desc: "Modeling customer lifecycles and pricing structures.", icon: TrendingUp }
                  ].map((block, i) => {
                    const IconComp = block.icon;
                    return (
                      <div key={i} className="flex gap-3 p-3.5 bg-neutral-950 border border-neutral-900 rounded items-start">
                        <IconComp className="w-4.5 h-4.5 text-white shrink-0 mt-0.5" />
                        <div className="flex flex-col text-left">
                          <h5 className="text-[9.5px] font-black text-white uppercase leading-none mb-1">{block.title}</h5>
                          <p className="text-[8.5px] text-neutral-500 font-sans leading-normal font-light">{block.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Fee Estimator (Aesthetic and High Utility) */}
              <div className="p-4 bg-neutral-950 border border-neutral-900 rounded font-sans text-left flex flex-col gap-4 mt-2">
                <div className="border-b border-neutral-900 pb-2">
                  <span className="text-[6.5px] font-black text-neutral-450 uppercase tracking-widest">Resource Allocator Tool</span>
                  <h5 className="text-[11px] font-black text-white uppercase mt-0.5">Estimate Initiative Scope</h5>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[6px] tracking-wider text-neutral-400 uppercase font-black">Select Objective Area</label>
                    <select
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="px-2.5 py-1.5 text-[8.5px] rounded-sm border border-neutral-800 bg-black outline-none focus:border-white text-white font-semibold"
                    >
                      {SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.id}>{srv.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[6px] tracking-wider text-neutral-400 uppercase font-black">Allocated Hours ({scaleHours}h)</label>
                      <input
                        type="range"
                        min={5}
                        max={80}
                        value={scaleHours}
                        onChange={(e) => setScaleHours(parseInt(e.target.value))}
                        className="h-1.5 bg-neutral-805 rounded outline-none cursor-pointer accent-white"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[6px] tracking-wider text-neutral-400 uppercase font-black">Timeline Pace</label>
                      <select
                        value={urgencyRate}
                        onChange={(e) => setUrgencyRate(e.target.value)}
                        className="px-2.5 py-1 text-[8.5px] rounded-sm border border-neutral-800 bg-black outline-none focus:border-[#E5E5E5] text-white"
                      >
                        <option value="Standard">Standard (8-10 weeks)</option>
                        <option value="Expedited (4w)">Expedited (4 weeks)</option>
                        <option value="Urgent (2w)">Urgent (2 weeks)</option>
                      </select>
                    </div>
                  </div>

                  {/* Calculated outputs */}
                  <div className="p-3 bg-black border border-neutral-900 rounded-sm flex items-center justify-between text-[8px] uppercase font-black mt-1">
                    <div className="flex flex-col">
                      <span className="text-neutral-500 text-[6px]">Tailored Estimate Budget</span>
                      <span className="text-white text-[12px] font-sans leading-none mt-1">${estimatedFee.toLocaleString()} base</span>
                    </div>
                    <button
                      onClick={() => onNavigate("contact")}
                      className="px-3 py-1.5 bg-white text-black text-[7px] tracking-widest uppercase font-extrabold hover:bg-neutral-200"
                    >
                      Lock Slot
                    </button>
                  </div>
                </div>
              </div>

              {/* Minimal Services teaser list */}
              <div className="flex flex-col gap-3.5 mt-2">
                <div className="border-b border-neutral-900 pb-2 flex justify-between items-baseline">
                  <span className="text-[7px] font-sans font-black text-neutral-400 uppercase tracking-[0.15em]">Strategic Scopes</span>
                  <button onClick={() => onNavigate("services")} className="text-[6.5px] font-sans font-black tracking-wider text-neutral-450 uppercase">Services Grid →</button>
                </div>

                <div className="flex flex-col gap-4">
                  {SERVICES.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onNavigate("service-details", { id: item.id })}
                      className="group cursor-pointer flex justify-between items-center p-3.5 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 rounded transition-all"
                    >
                      <div className="flex flex-col min-w-0 pr-4">
                        <span className="text-[6.5px] uppercase font-bold text-neutral-400">{item.category} Module</span>
                        <h4 className="text-[10px] uppercase font-black text-white leading-tight mt-0.5 truncate">{item.title}</h4>
                        <p className="text-[8.5px] text-neutral-500 font-sans leading-relaxed mt-1 line-clamp-1">{item.shortDesc}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-550 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional credentials block */}
              <div className="bg-[#0D0D0D] border border-neutral-900 rounded p-4 text-left mt-2 flex flex-col gap-1.5">
                <span className="text-[6.5px] font-sans font-black tracking-[0.2em] uppercase text-neutral-450">Active Diagnostics</span>
                <p className="text-[10.5px] font-sans text-neutral-400 leading-snug">
                  "Prime is not a directory of generic templates. They identify clear data debt and help execute structural transitions."
                </p>
                <span className="text-[7.5px] font-sans font-black text-white uppercase mt-1">Enterprise Advisory Report • 2026</span>
              </div>

            </div>
          </div>
        )}

        {/* ======================= STRATEGIC FIELDS / SERVICES ======================= */}
        {navState.page === "services" && (
          <div className="px-5 py-5 flex flex-col gap-4 animate-fade-in text-left">
            <div className="border-b border-neutral-900 pb-2">
              <span className="text-[6.5px] font-sans font-black text-neutral-550 tracking-[0.25em] uppercase block">PRACTICE FIELDS</span>
              <h4 className="font-sans text-[17px] font-black uppercase text-white mt-0.5">Strategic Advisory</h4>
            </div>

            {/* Filter tags */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 select-none">
              {["All", "Strategy", "Operations", "Growth", "Technology"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat as any)}
                  className={`text-[7.5px] font-sans font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-sm shrink-0 transition-all ${
                    activeCategory === cat 
                      ? "bg-white text-black" 
                      : "bg-neutral-950 hover:bg-neutral-900 text-neutral-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Services List display with base rates */}
            <div className="flex flex-col gap-4.5 mt-2">
              {filteredServices.map((service) => (
                <div
                  key={service.id}
                  onClick={() => onNavigate("service-details", { id: service.id })}
                  className="cursor-pointer group flex flex-col p-4 bg-neutral-950 border border-neutral-900 hover:border-neutral-800 rounded transition-all text-left"
                >
                  <div className="flex justify-between items-baseline border-b border-neutral-900 pb-2.5">
                    <div>
                      <span className="text-[6.2px] font-sans font-black uppercase text-neutral-450 tracking-wider block">{service.category} Advisory Module</span>
                      <h4 className="text-[11.5px] font-black uppercase text-white tracking-wide mt-0.5 group-hover:text-white">{service.title}</h4>
                    </div>
                    <span className="text-[10px] font-mono text-white font-extrabold shrink-0 pl-4">
                      ${service.baseFee.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-[8.5px] text-neutral-500 font-sans leading-normal font-light mt-3">{service.shortDesc}</p>
                  
                  <div className="mt-3.5 flex justify-between items-baseline text-[7px] uppercase font-black text-neutral-450">
                    <span>Includes: {service.benefits.length} components</span>
                    <span className="text-white hover:text-white tracking-widest">Detail Scope →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================= ADVISORY FIELDS DETAIL ======================= */}
        {navState.page === "service-details" && (
          <div className="px-4.5 py-4.5 flex flex-col gap-4 text-left animate-fade-in bg-[#0A0A0A] font-sans">
            <button 
              onClick={() => onNavigate("services")}
              className="flex items-center gap-1.5 text-[7px] font-sans font-black text-neutral-450 hover:text-white uppercase transition-colors"
            >
              <ArrowLeft className="w-2.5 h-2.5" /> Back to Practices
            </button>

            {/* Service Title */}
            <div className="border-b border-neutral-900 pb-3 flex flex-col gap-1.5 mt-1">
              <span className="text-[6.5px] font-bold text-neutral-400 uppercase tracking-widest">{activeService.category} Advisory Practice</span>
              <h4 className="text-[15px] font-black uppercase leading-tight text-white">{activeService.title}</h4>
              <div className="text-[10.5px] text-white font-semibold mt-1 font-sans">
                Base Initiative Cost: ${activeService.baseFee.toLocaleString()} USD
              </div>
            </div>

            {/* Service Body Descriptions */}
            <div className="flex flex-col gap-1 mt-1">
              <p className="text-[8.5px] text-neutral-400 leading-relaxed font-sans font-light">{activeService.longDesc}</p>
            </div>

            {/* Core Deliverables list */}
            <div className="flex flex-col gap-2.5 p-4 bg-neutral-950 border border-neutral-900 rounded-lg mt-1.5">
              <span className="text-[6.5px] text-neutral-400 uppercase font-black tracking-widest">Core Diagnostic Benefits Included</span>
              <div className="grid grid-cols-1 gap-2.5 mt-1">
                {activeService.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-[8px] text-neutral-300 text-left">
                    <Check className="w-3 h-3 text-white shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic booking instant CTA */}
            <button 
              onClick={() => onNavigate("contact", { id: activeService.id })}
              className="w-full mt-3.5 py-3 bg-white hover:bg-neutral-200 text-black rounded-sm text-[8px] font-sans font-extrabold uppercase tracking-widest text-center transition-all cursor-pointer"
            >
              Schedule Consult
            </button>
          </div>
        )}

        {/* ======================= TEAM / EXPERIENCES / STORY ======================= */}
        {navState.page === "about" && (
          <div className="flex flex-col animate-fade-in text-left">
            <div className="relative w-full h-44 overflow-hidden flex items-end p-5 border-b border-neutral-900">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=650&q=80" 
                alt="Minimalist design of board table and architectural windows" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.40] saturate-[0.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-85" />
              <div className="relative z-10 w-full">
                <span className="text-[6.5px] font-sans font-black text-neutral-450 tracking-[0.25em] uppercase">Est. 2011</span>
                <h4 className="font-sans text-[18px] font-black uppercase text-white leading-tight mt-1">Consistently Pruning Complexity</h4>
              </div>
            </div>

            <div className="px-5 py-5 flex flex-col gap-6.5 bg-[#0a0a0a]">
              {/* Story introduction blocks */}
              <div className="flex flex-col gap-2.5">
                <blockquote className="font-sans font-black uppercase text-neutral-450 text-[12px] leading-snug border-l-2 border-white pl-3.5">
                  "True capital efficiency cannot coexist with modern SaaS subscription bloating or un-structured, multi-layered report frameworks."
                </blockquote>
                <p className="text-[8.5px] text-neutral-500 leading-relaxed font-sans font-light mt-1">
                  Prime was created in San Francisco as a stubborn partnership of systems engineers and ex-corporate strategists. We reject dry templates and empty slides to help companies isolate real data workflow debt.
                </p>
              </div>

              {/* Photos layout */}
              <div className="grid grid-cols-2 gap-3.5 my-1.5">
                <div className="flex flex-col gap-1.5">
                  <div className="h-28 rounded overflow-hidden relative border border-neutral-900 bg-neutral-950">
                    <img 
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80" 
                      alt="Operations workspace modeling" 
                      className="w-full h-full object-cover filter brightness-[0.60] saturate-0"
                    />
                  </div>
                  <span className="text-[6.5px] font-sans tracking-wide text-neutral-400 uppercase font-black text-center">Diagnostics Studio</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="h-28 rounded overflow-hidden relative border border-neutral-900 bg-neutral-950">
                    <img 
                      src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=300&q=80" 
                      alt="Systems board session" 
                      className="w-full h-full object-cover filter brightness-[0.65] saturate-0"
                    />
                  </div>
                  <span className="text-[6.5px] font-sans tracking-wide text-neutral-400 uppercase font-black text-center">Partner Office Room</span>
                </div>
              </div>

              {/* Advisors List */}
              <div className="flex flex-col gap-3.5 mt-2">
                <span className="text-[7.5px] font-sans font-black tracking-[0.15em] uppercase text-neutral-400">Strategic Advisors</span>
                <p className="text-[8.5px] text-neutral-500 font-sans tracking-wide leading-relaxed font-light mb-1">
                  We maintain a lean, partner-only team of consultants. No junior brokers or temporary managers.
                </p>
                <div className="flex flex-col gap-4">
                  {TEAM.map((member, idx) => (
                    <div key={idx} className="flex gap-4 items-center p-3.5 bg-neutral-955 border border-neutral-900 rounded select-none">
                      <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-neutral-900 bg-neutral-950">
                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover filter grayscale contrast-[1.1]" />
                      </div>
                      <div className="flex flex-col text-left">
                        <h5 className="text-[9.5px] font-sans font-black text-white leading-tight uppercase">{member.name}</h5>
                        <span className="text-[6.5px] text-neutral-400 uppercase tracking-widest font-black mt-0.5">{member.role}</span>
                        <p className="text-[8px] text-neutral-500 leading-normal font-sans mt-1">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA button */}
              <button
                onClick={() => onNavigate("services")}
                className="w-full py-3 bg-white text-black hover:bg-neutral-200 text-[8px] font-sans font-black uppercase tracking-widest text-center mt-2"
              >
                Go Browse Practices
              </button>
            </div>
          </div>
        )}

        {/* ======================= DIAGNOSTIC MEETING BOOKING / CONTACT ======================= */}
        {navState.page === "contact" && (
          <div className="px-5 py-5 flex flex-col gap-5 text-left animate-fade-in bg-[#0A0A0A] text-[#F3F4F6]">
            <div className="border-b border-neutral-900 pb-2">
              <span className="text-[6.5px] font-sans font-black text-neutral-450 tracking-[0.2em] uppercase">Inquire Slot</span>
              <h4 className="font-sans text-[17px] font-black uppercase text-white mt-0.5">Book Alignment</h4>
            </div>

            {/* Quick coordinates cards */}
            <div className="flex flex-col gap-3.5 bg-neutral-950 border border-neutral-900 rounded p-4 text-[8.5px] font-sans">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[6px] tracking-wider text-neutral-450 font-black uppercase">PARTNER RELATIONS</span>
                  <span className="text-[9px] font-black text-white mt-0.5">partner@primeconsulting.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3.5 border-t border-neutral-900">
                <Phone className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[6px] tracking-wider text-neutral-450 font-black uppercase">FRONT DESK TELEPHONE</span>
                  <span className="text-[9px] font-black text-white mt-0.5">+1 (415) 555-0199</span>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3.5 border-t border-neutral-900">
                <Compass className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-[6px] tracking-wider text-neutral-450 font-black uppercase">EXCLUSIVES OFFICE</span>
                  <span className="text-[8px] font-semibold text-neutral-300 mt-0.5">188 Montgomery St, Suite 440</span>
                  <span className="text-[8px] text-neutral-500">San Francisco, CA 94105</span>
                </div>
              </div>
            </div>

            {/* Standard Corporate Form */}
            <form onSubmit={handleInquireSubmit} className="flex flex-col gap-3.5 mt-2 font-sans">
              <span className="text-[7.5px] font-black uppercase tracking-widest text-neutral-400">Request Diagnostic Session</span>
              
              <div className="flex flex-col gap-1">
                <label className="text-[6px] uppercase text-neutral-400 font-black">Full Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your complete name"
                  className="px-3 py-1.5 text-[8.5px] rounded border border-neutral-900 bg-neutral-950 text-white outline-none focus:border-white"
                />
                {errors.contactName && <span className="text-[6px] text-red-500 font-black">{errors.contactName}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] uppercase text-neutral-400 font-black">Corporate Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="px-3 py-1.5 text-[8.5px] rounded border border-neutral-900 bg-neutral-950 text-white outline-none focus:border-white"
                />
                {errors.contactEmail && <span className="text-[6px] text-red-505 font-black">{errors.contactEmail}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] uppercase text-neutral-400 font-black">Company Annual Revenue</label>
                <select
                  value={revenueTier}
                  onChange={(e) => setRevenueTier(e.target.value)}
                  className="px-2.5 py-1.5 text-[8.5px] rounded border border-neutral-900 bg-neutral-950 text-white outline-none focus:border-white"
                >
                  <option value="<$1M">&lt; $1,000,000 USD</option>
                  <option value="$1M - $5M">$1,000,000 - $5,000,000</option>
                  <option value="$5M - $20M">$5,000,000 - $20,000,000</option>
                  <option value=">$20M">&gt; $20,000,000 USD</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[6px] uppercase text-neutral-400 font-black">Enterprise challenges / Notes</label>
                <textarea
                  rows={2}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Tell us briefly about active database bloat, software overlaps, or role friction."
                  className="px-3 py-1.5 text-[8.5px] rounded border border-neutral-900 bg-neutral-950 text-white outline-none focus:border-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-3 py-3 bg-white hover:bg-neutral-200 text-black rounded-sm text-[8px] font-sans font-black uppercase tracking-widest text-center"
              >
                Send Request Session
              </button>
            </form>
          </div>
        )}

        {/* ======================= SUCCESS PAGE ======================= */}
        {navState.page === "success" && (
          <div className="px-5 py-8 flex flex-col items-center justify-center text-center gap-5 animate-fade-in font-sans">
            <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-900 flex items-center justify-center select-none shadow-inner">
              <Check className="w-5.5 h-5.5 text-emerald-400" />
            </div>

            <div className="flex flex-col gap-1.5 text-center">
              <span className="text-[6.5px] text-emerald-450 uppercase tracking-widest font-black">TICKET LOGGED</span>
              <h4 className="font-sans font-black text-[15px] uppercase text-white mt-1">Proposal Registered</h4>
              <p className="text-[8px] text-neutral-500 px-3.5 leading-relaxed font-light">Your corporate coordinates were verified. An advisory partner will reach out to schedule an introductory call inside 4 hours.</p>
            </div>

            {/* Custom Consultation ticket */}
            <div className="w-full bg-neutral-950 border border-neutral-900 rounded relative overflow-hidden flex flex-col p-4 text-left gap-2.5 shadow-sm font-sans text-[7px] uppercase font-bold text-neutral-400">
              <div className="absolute top-[-4px] left-[-4px] w-2 h-2 bg-[#0A0A0A] rounded-full border border-neutral-900" />
              <div className="absolute top-[-4px] right-[-4px] w-2 h-2 bg-[#0A0A0A] rounded-full border border-neutral-900" />
              <div className="absolute bottom-[-4px] left-[-4px] w-2 h-2 bg-[#0A0A0A] rounded-full border border-neutral-900" />
              <div className="absolute bottom-[-4px] right-[-4px] w-2 h-2 bg-[#0A0A0A] rounded-full border border-neutral-900" />
              
              <div className="flex justify-between border-b border-dashed border-neutral-900 pb-2">
                <span>Enterprise Lead</span>
                <span className="text-white font-extrabold">{contactName.toUpperCase() || "CORPORATE LEAD"}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 text-left text-neutral-300">
                <div className="flex flex-col gap-0.5">
                  <span className="text-neutral-500 text-[6px]">Initiative category</span>
                  <span className="font-black">PRIME DIAGNOSTICS</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-neutral-500 text-[6px]">Tier classification</span>
                  <span className="font-black text-white">{revenueTier} scale</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-dashed border-neutral-900 pt-2.5 text-[6.5px] tracking-wide text-neutral-500">
                <span>Receipt Verification</span>
                <span className="text-white font-extrabold">#PRIME-5510</span>
              </div>
            </div>

            <button 
              onClick={() => onNavigate("home")}
              className="py-3 px-5 bg-white hover:bg-neutral-200 text-black text-[8px] font-sans font-black uppercase tracking-widest w-full mt-2"
            >
              Return Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
