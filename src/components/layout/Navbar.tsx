"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
    ChevronDown, Menu, X,
    FileText, Image as ImageIcon, Video, Download, Info, Home, LayoutList, ListChecks, Phone,
} from "lucide-react";
import { interventions, schemes } from "@/lib/data";

const translations = {
    EN: {
        home: "Home",
        about: "About RAMP",
        interventions: "Interventions",
        schemes: "MSME Schemes",
        resources: "Resources",
        media: "Media",
        contact: "Contact Us",
        skip: "Skip to main content",
        governance: "Directorate of Industries",
        portal: "RAMP Telangana",
        sublabel: "Directorate of Industries",
        all_schemes: "View All Schemes",
        expandable: "Expandable section"
    },
    TE: {
        home: "హోమ్",
        about: "ర్యాంప్ గురించి",
        interventions: "జోక్యాలు",
        schemes: "MSME పథకాలు",
        resources: "వనరులు",
        media: "మీడియా",
        contact: "సంప్రదించండి",
        skip: "ప్రధాన కంటెంట్‌కు వెళ్లండి",
        governance: "పరిశ్రమల డైరెక్టరేట్",
        portal: "ర్యాంప్ తెలంగాణ",
        sublabel: "పరిశ్రమల డైరెక్టరేట్",
        all_schemes: "అన్ని పథకాలను చూడండి",
        expandable: "విస్తరించదగిన విభాగం"
    }
};

const getMenuItems = (lang: "EN" | "TE") => [
    { id: "home", label: translations[lang].home, href: "/", icon: Home },
    {
        id: "about", label: translations[lang].about, href: "/about", icon: Info,
        content: (
            <div className="p-6 grid grid-cols-2 gap-6 w-[500px]">
                <a href="/about" className="group p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100 block">
                    <Info className="w-5 h-5 text-emerald-600 mb-2" strokeWidth={1.5} />
                    <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700">{translations[lang].about}</h4>
                    <p className="text-sm text-slate-500 mt-1">Raising and Accelerating MSME Performance overview.</p>
                </a>
                <a href="/about#objectives" className="group p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100 block">
                    <ListChecks className="w-5 h-5 text-emerald-600 mb-2" strokeWidth={1.5} />
                    <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700">Objectives</h4>
                    <p className="text-sm text-slate-500 mt-1">Core pillars for strengthening institutions.</p>
                </a>
            </div>
        )
    },
    {
        id: "interventions", label: translations[lang].interventions, href: "/interventions", icon: LayoutList,
        content: (
            <div className="p-6 w-[800px]">
                <h3 className="text-sm font-semibold text-slate-400 capitalize tracking-wide mb-4">Strategic Pillars & Agencies</h3>
                <div className="grid grid-cols-3 gap-4">
                    {interventions.map(inv => (
                        <a key={inv.id} href={`/interventions#${inv.id}`} className="group p-3 rounded-lg hover:bg-slate-50 transition block">
                            <div className="flex items-center gap-3 mb-1">
                                <inv.icon className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                                <h4 className="font-semibold text-[15px] text-slate-800 group-hover:text-emerald-700">{inv.title}</h4>
                            </div>
                            <div className="flex items-center gap-2 pl-8 mt-1.5">
                                {inv.logo && <img src={inv.logo} alt={inv.agency} className="h-5 w-auto object-contain" />}
                                {inv.logo2 && <img src={inv.logo2} alt={inv.agency} className="h-5 w-auto object-contain" />}
                                <span className="text-[13px] text-slate-500 line-clamp-1">{inv.agency}</span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "schemes", label: translations[lang].schemes, href: "/schemes", icon: FileText, highlight: true,
        content: (
            <div className="p-6 w-[700px]">
                <div className="grid grid-cols-2 gap-4">
                    {schemes.slice(0, 8).map(scheme => (
                        <a key={scheme.name} href={scheme.link} target="_blank" rel="noreferrer" className="group p-4 rounded-xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition block">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 rounded-lg bg-emerald-100/50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                    <scheme.icon className="w-4 h-4" strokeWidth={2} />
                                </div>
                                <h4 className="font-semibold text-[15px] text-slate-800">{scheme.name}</h4>
                            </div>
                            <p className="text-[13px] text-slate-500 line-clamp-2 pl-11">{scheme.benefit}</p>
                        </a>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                    <a href="/#schemes" className="text-[14px] font-semibold text-emerald-600 hover:text-emerald-800 transition-colors">{translations[lang].all_schemes} &rarr;</a>
                </div>
            </div>
        )
    },
    { id: "resources", label: translations[lang].resources, href: "/resources", icon: Download },
    {
        id: "media", label: translations[lang].media, href: "/media", icon: ImageIcon,
        content: (
            <div className="p-6 grid grid-cols-2 gap-6 w-[400px]">
                <a href="/media#photos" className="group p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100 block">
                    <ImageIcon className="w-5 h-5 text-emerald-600 mb-2" strokeWidth={1.5} />
                    <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700">Photos</h4>
                    <p className="text-sm text-slate-500 mt-1">Event galleries and impact imagery.</p>
                </a>
                <a href="/media#videos" className="group p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100 block">
                    <Video className="w-5 h-5 text-emerald-600 mb-2" strokeWidth={1.5} />
                    <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700">Video Links</h4>
                    <p className="text-sm text-slate-500 mt-1">YouTube highlights and tutorials.</p>
                </a>
            </div>
        )
    },
    { id: "contact", label: translations[lang].contact, href: "/contact", icon: Phone }
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [fontSizeScale, setFontSizeScale] = useState(1);
    const [lang, setLang] = useState<"EN" | "TE">("EN");
    const [visitorCount, setVisitorCount] = useState<number | null>(null);
    const pathname = usePathname();

    const menuItems = getMenuItems(lang);
    const t = translations[lang];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const BASE = "https://metaverseedu.in/workflow1/visitor-count";
        const fetchCount = () =>
            fetch(`${BASE}/get`)
                .then(r => r.json())
                .then(data => {
                    const count = data?.data?.totalCount ?? data?.totalCount ?? data?.count ?? null;
                    if (count !== null) setVisitorCount(Number(count));
                })
                .catch(() => {/* silently ignore */ });

        // Increment on every visit, then refresh the display count
        fetch(`${BASE}/update`, { method: "PUT" })
            .catch(() => {/* ignore update errors */ })
            .finally(() => fetchCount());
    }, []);

    // Accessibility: Reset Font Size
    const resetFontSize = () => {
        setFontSizeScale(1);
        document.documentElement.style.setProperty('--font-scale', '1');
    };

    // Accessibility: Adjust Font Size
    const adjustFontSize = (increment: number) => {
        setFontSizeScale(prev => {
            const newScale = Math.round(Math.min(Math.max(prev + increment, 0.8), 1.2) * 10) / 10;
            document.documentElement.style.setProperty('--font-scale', newScale.toString());
            return newScale;
        });
    };

    // Accessibility: Skip to Content
    const scrollToMain = () => {
        const interventions = document.getElementById("interventions");
        if (interventions) {
            interventions.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Language Toggle
    const toggleLang = () => {
        setLang(prev => (prev === "EN" ? "TE" : "EN"));
    };

    return (
        <React.Fragment>
            {/* Top Utility Bar - Institutional Layer */}
            <div className={`bg-slate-50 border-b border-slate-200 h-9 hidden md:flex items-center z-[60] 
                ${fontSizeScale !== 1 ? "sticky top-0 shadow-sm" : ""}`}>
                <div className="w-full px-5 flex justify-between items-center text-[13px] text-slate-600 font-medium no-scale">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                            <span className="text-[12px]">Visitors: <strong className="text-slate-700">{visitorCount !== null ? visitorCount.toLocaleString() : "…"}</strong></span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={scrollToMain} className="hover:text-slate-900 transition-colors cursor-pointer">{t.skip}</button>
                        <div className="w-px h-3 bg-slate-300"></div>
                        <button onClick={() => adjustFontSize(-0.1)} className={`hover:text-slate-900 transition-colors cursor-pointer ${fontSizeScale < 1 ? "font-bold text-emerald-700" : ""}`}>A-</button>
                        <button onClick={resetFontSize} className={`hover:text-slate-900 transition-colors cursor-pointer ${fontSizeScale === 1 ? "font-bold text-emerald-700" : ""}`}>A</button>
                        <button onClick={() => adjustFontSize(0.1)} className={`hover:text-slate-900 transition-colors cursor-pointer ${fontSizeScale > 1 ? "font-bold text-emerald-700" : ""}`}>A+</button>
                        <div className="w-px h-3 bg-slate-300"></div>
                        <button onClick={toggleLang} className="hover:text-slate-900 transition-colors cursor-pointer font-bold">
                            <span className={lang === "EN" ? "text-emerald-700" : ""}>EN</span> | <span className={lang === "TE" ? "text-emerald-700" : ""}>TE</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Navbar - Portal Layer */}
            <header
                className={`bg-white sticky z-50 transition-all duration-300 
                    ${fontSizeScale !== 1 ? "top-9 shadow-md" : "top-0"} 
                    ${scrolled ? "shadow-md" : "border-b border-slate-200"}`}
                onMouseLeave={() => setHoveredMenu(null)}
            >
                {/* Increased vertical padding: h-[76px] -> py-4 resulting in robust height */}
                <div className="w-full pl-5 pr-4 sm:pr-8">
                    <div className="flex items-center justify-between py-4 min-h-[82px] pl-0">

                        {/* Left Section: RAMP Logo, Title, then Govt Logo */}
                        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                            {/* RAMP Logo */}
                            <a href="/" className="h-[36px] sm:h-[52px] flex shrink-0 items-center">
                                <img src="/ramp.jpg" alt="RAMP Logo" className="h-full object-contain" />
                            </a>

                            {/* Telangana Logo */}
                            <div className="h-[32px] sm:h-[46px] flex items-center border-l border-slate-100 pl-3 sm:pl-5 ml-1">
                                <img src="/TG.png" alt="Telangana State Emblem" className="h-full w-auto object-contain" />
                            </div>

                            {/* RAMP Telangana Text and Directorate info */}
                            <div className="flex flex-col justify-center shrink-0 ml-1">
                                <span className="text-[17px] sm:text-[22px] font-bold text-slate-900 leading-tight tracking-tight">{t.portal}</span>
                                <span className="text-[12px] sm:text-[14px] text-slate-500 font-medium leading-tight">{t.sublabel}</span>
                            </div>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center h-full gap-[6px] justify-end flex-1 pl-8 flex-nowrap">
                            {menuItems.map((item) => {
                                const isHovered = hoveredMenu === item.id;
                                const isCurrentPage = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');
                                const isHighlighted = item.highlight;

                                return (
                                    <div
                                        key={item.id}
                                        className="h-full flex items-center relative group shrink-0"
                                        onMouseEnter={() => setHoveredMenu(item.content ? item.id : null)}
                                    >
                                        <a
                                            href={item.href || `#${item.id}`}
                                            className={`px-4 py-2 inline-flex items-center gap-[6px] h-full relative transition duration-150 text-[15px]
                                                ${isCurrentPage ? "text-emerald-700 font-semibold" :
                                                    isHighlighted ? "text-emerald-600 font-semibold hover:text-emerald-700" :
                                                        "text-slate-600 font-medium hover:text-emerald-700 hover:font-semibold"}
                                            `}
                                        >
                                            <span className="relative z-10 flex items-center gap-[6px] h-full">
                                                {item.label}
                                                {item.content && (
                                                    <ChevronDown
                                                        className={`w-[14px] h-[14px] transition-transform duration-200 mt-0.5
                                                            ${isHovered ? "rotate-180 text-emerald-600" : "text-slate-400"}`}
                                                        strokeWidth={2.5}
                                                    />
                                                )}
                                            </span>

                                            {/* Bottom Border Indicator - STRICTLY for Active Page OR Hover */}
                                            <span className={`absolute bottom-[-16px] left-0 w-full h-[3px] bg-emerald-600 transition-transform duration-200 origin-bottom rounded-t-sm
                                                ${isCurrentPage ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100 opacity-80"}
                                            `}></span>
                                        </a>
                                    </div>
                                )
                            })}
                        </nav>

                        {/* Mobile Toggle */}
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-slate-700 ml-auto">
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                    {hoveredMenu && (
                        <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl overflow-hidden z-50 flex justify-center"
                            onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                        >
                            {menuItems.find(m => m.id === hoveredMenu)?.content}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden border-t border-slate-100 bg-white overflow-hidden shadow-inner"
                        >
                            <nav className="flex flex-col px-4 py-2">
                                {menuItems.map(item => {
                                    const isCurrentPage = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/');

                                    return (
                                        <div key={item.id} className="border-b border-slate-50 last:border-0 relative">
                                            <a href={item.href} className={`block py-4 text-[15px] transition-colors
                                            ${isCurrentPage ? "text-emerald-700 font-bold" :
                                                    item.highlight ? "text-emerald-600 font-semibold" : "text-slate-700 font-medium hover:text-emerald-600"}
                                        `}>
                                                {item.label}
                                            </a>
                                            {item.content && (
                                                <div className="pl-4 pb-4">
                                                    <span className="text-xs text-slate-400">{t.expandable}</span>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </React.Fragment>
    );
}
