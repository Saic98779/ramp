"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
    ChevronDown, Menu, X,
    FileText, Image as ImageIcon, Video, Download, Info, Home, LayoutList, ListChecks, Phone,
} from "lucide-react";
import { interventions, schemes } from "@/lib/data";

const menuItems = [
    { id: "home", label: "Home", href: "/", icon: Home },
    {
        id: "about", label: "About RAMP", href: "/about", icon: Info,
        content: (
            <div className="p-6 grid grid-cols-2 gap-6 w-[500px]">
                <a href="/about" className="group p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition border border-transparent hover:border-emerald-100 block">
                    <Info className="w-5 h-5 text-emerald-600 mb-2" strokeWidth={1.5} />
                    <h4 className="font-semibold text-slate-800 group-hover:text-emerald-700">About RAMP</h4>
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
        id: "interventions", label: "Interventions", href: "/interventions", icon: LayoutList,
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
        id: "schemes", label: "MSME Schemes", href: "/schemes", icon: FileText, highlight: true,
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
                    <a href="/#schemes" className="text-[14px] font-semibold text-emerald-600 hover:text-emerald-800 transition-colors">View All Schemes &rarr;</a>
                </div>
            </div>
        )
    },
    { id: "resources", label: "Resources", href: "/resources", icon: Download },
    {
        id: "media", label: "Media", href: "/media", icon: ImageIcon,
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
    { id: "contact", label: "Contact Us", href: "/contact", icon: Phone }
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <React.Fragment>
            {/* Top Utility Bar - Institutional Layer */}
            <div className="bg-slate-50 border-b border-slate-200 h-9 hidden md:flex items-center">
                <div className="max-w-[1320px] w-full mx-auto px-6 flex justify-between items-center text-[13px] text-slate-600 font-medium">
                    <div className="flex items-center gap-4">
                        {/* <span className="text-slate-500 font-semibold tracking-wide">Directorate of Industries</span>
                        <div className="w-px h-3 bg-slate-300"></div>
                        <a href="tel:1800-123-4567" className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 transition-colors font-bold">
                            <Phone className="w-3.5 h-3.5" />
                            <span>Helpline: 1800-123-4567</span>
                        </a> */}
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="hover:text-slate-900 transition-colors">Skip to main content</button>
                        <div className="w-px h-3 bg-slate-300"></div>
                        <button className="hover:text-slate-900 transition-colors">A-</button>
                        <button className="hover:text-slate-900 transition-colors">A</button>
                        <button className="hover:text-slate-900 transition-colors">A+</button>
                        <div className="w-px h-3 bg-slate-300"></div>
                        <button className="hover:text-slate-900 transition-colors">EN | TE</button>
                    </div>
                </div>
            </div>

            {/* Main Navbar - Portal Layer */}
            <header
                className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : "border-b border-slate-200"}`}
                onMouseLeave={() => setHoveredMenu(null)}
            >
                {/* Increased vertical padding: h-[76px] -> py-4 resulting in robust height */}
                <div className="max-w-[1440px] w-full mx-auto px-6">
                    <div className="flex items-center justify-between py-4 min-h-[82px]">

                        {/* Left Section: RAMP Logo, Title, then Govt Logo */}
                        <div className="flex items-center gap-6 shrink-0 pr-8 border-r border-slate-100">
                            {/* RAMP Logo */}
                            <a href="/" className="h-[46px] flex shrink-0 items-center justify-center">
                                <img src="/ramp.jpg" alt="RAMP Logo" className="h-full object-contain" />
                            </a>

                            {/* Text Label */}
                            <div className="flex flex-col justify-center shrink-0">
                                <span className="text-[20px] font-semibold text-slate-900 leading-tight">RAMP Telangana</span>
                                <span className="text-[13px] text-slate-500 opacity-80 leading-tight mt-1">Directorate of Industries</span>
                            </div>

                            {/* Govt of TS Logo & Text */}
                            <div className="h-[46px] flex shrink-0 items-center gap-3 border-l border-slate-100 pl-6 ml-2">
                                <img src="/TG.png" alt="Telangana State Emblem" className="h-[40px] w-auto object-contain" />
                                <div className="flex flex-col justify-center shrink-0">
                                    <span className="text-[13px] font-bold text-slate-800 leading-tight">Government of</span>
                                    <span className="text-[13px] font-bold text-slate-800 leading-tight">Telangana</span>
                                </div>
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
                                                    <span className="text-xs text-slate-400">Expandable section</span>
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
