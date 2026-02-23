"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronDown, Menu, X, Zap, Target,
    FileText, Image as ImageIcon, Video, Download, Info, Home, LayoutList, ListChecks,
    ArrowRight
} from "lucide-react";
import { interventions, schemes } from "@/lib/data";

const menuItems = [
    { id: "home", label: "Home Page", href: "/", icon: Home },
    {
        id: "about", label: "About RAMP", href: "/about", icon: Info,
        content: (
            <div className="p-6 grid grid-cols-2 gap-6 w-[500px]">
                <a href="/about" className="group p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition border border-transparent hover:border-blue-100 block">
                    <Info className="w-6 h-6 text-blue-600 mb-2" />
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-700">About RAMP</h4>
                    <p className="text-xs text-slate-500 mt-1">Raising and Accelerating MSME Performance overview.</p>
                </a>
                <a href="/about#objectives" className="group p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition border border-transparent hover:border-blue-100 block">
                    <ListChecks className="w-6 h-6 text-blue-600 mb-2" />
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-700">Objectives</h4>
                    <p className="text-xs text-slate-500 mt-1">Core pillars for strengthening institutions.</p>
                </a>
            </div>
        )
    },
    {
        id: "interventions", label: "Interventions", href: "/interventions", icon: LayoutList,
        content: (
            <div className="p-6 w-[800px]">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Strategic Pillars & Agencies</h3>
                <div className="grid grid-cols-3 gap-4">
                    {interventions.map(inv => (
                        <a key={inv.id} href={`/interventions#${inv.id}`} className="group p-3 rounded-lg hover:bg-slate-50 transition block">
                            <div className="flex items-center gap-3 mb-1">
                                <inv.icon className="w-5 h-5 text-blue-600" />
                                <h4 className="font-bold text-sm text-slate-800 group-hover:text-blue-700">{inv.title}</h4>
                            </div>
                            <p className="text-[11px] text-slate-500 pl-8">{inv.agency}</p>
                        </a>
                    ))}
                </div>
            </div>
        )
    },
    {
        id: "schemes", label: "MSME Schemes", href: "/schemes", icon: FileText,
        content: (
            <div className="p-6 w-[600px]">
                <div className="grid grid-cols-2 gap-4">
                    {schemes.slice(0, 6).map(scheme => (
                        <a key={scheme.name} href={scheme.link} target="_blank" rel="noreferrer" className="group p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition block">
                            <h4 className="font-bold text-sm text-slate-800 mb-1">{scheme.name}</h4>
                            <p className="text-xs text-slate-500 line-clamp-2">{scheme.benefit}</p>
                        </a>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                    <a href="/schemes" className="text-sm font-bold text-blue-600 hover:text-blue-800">View All Schemes &rarr;</a>
                </div>
            </div>
        )
    },
    {
        id: "resources", label: "Resources", href: "/resources", icon: Download
    },
    {
        id: "media", label: "Media", href: "/media", icon: ImageIcon,
        content: (
            <div className="p-6 grid grid-cols-2 gap-6 w-[400px]">
                <a href="/media#photos" className="group p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition border border-transparent hover:border-blue-100 block">
                    <ImageIcon className="w-6 h-6 text-blue-600 mb-2" />
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-700">Photos</h4>
                    <p className="text-xs text-slate-500 mt-1">Event galleries and impact imagery.</p>
                </a>
                <a href="/media#videos" className="group p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition border border-transparent hover:border-blue-100 block">
                    <Video className="w-6 h-6 text-blue-600 mb-2" />
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-700">Video Links</h4>
                    <p className="text-xs text-slate-500 mt-1">YouTube highlights and tutorials.</p>
                </a>
            </div>
        )
    },
    { id: "contact", label: "Contact Us", href: "/contact", icon: Info } // Note: Was Phone
];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <header className="bg-white/95 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm relative font-sans" onMouseLeave={() => setActiveMenu(null)}>
            <div className="w-full px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logos: RAMP Logo Prominent */}
                    <div className="flex items-center gap-4">
                        <a href="/" className="h-14 relative flex shrink-0 items-center justify-center">
                            <img src="/ramp.jpg" alt="RAMP Logo" className="h-[120%] object-contain" />
                        </a>
                        <div className="flex flex-col justify-center hidden sm:flex">
                            <span className="text-xl font-black text-slate-900 leading-tight tracking-tight">RAMP Telangana</span>
                            <span className="text-[11px] font-bold text-slate-500 leading-tight uppercase tracking-wider">Department of Industries and Commerce</span>
                        </div>
                        <div className="h-10 border-l border-slate-300 mx-2 hidden sm:block"></div>
                        <a href="/" className="h-14 relative flex shrink-0 items-center justify-center">
                            <img src="/TG.png" alt="Telangana Logo" className="h-12 w-auto object-contain" />
                        </a>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden xl:flex items-center h-full gap-3 justify-end flex-1 pl-8">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className="h-full flex items-center relative group"
                                onMouseEnter={() => setActiveMenu(item.content ? item.id : null)}
                            >
                                <a
                                    href={item.href || `#${item.id}`}
                                    className={`px-4 py-2.5 rounded-xl text-[15px] font-bold transition-all duration-300 ${activeMenu === item.id ? "text-blue-700 bg-blue-50/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)]" : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"} flex items-center gap-2.5 whitespace-nowrap`}
                                >
                                    {item.icon && (
                                        <item.icon className={`w-5 h-5 ${activeMenu === item.id ? 'text-blue-600 scale-110' : 'text-slate-400 group-hover:text-blue-500'} transition-all`} />
                                    )}
                                    {item.label}
                                    {item.content && <ChevronDown className={`w-4 h-4 ml-0.5 transition-transform ${activeMenu === item.id ? "rotate-180 text-blue-600" : "text-slate-400"}`} />}
                                </a>
                            </div>
                        ))}
                    </nav>

                    {/* Mobile Toggle */}
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="xl:hidden p-2 text-slate-700">
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
                {activeMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10, transition: { duration: 0.15 } }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl overflow-hidden z-50 flex justify-center"
                        onMouseEnter={() => setActiveMenu(activeMenu)}
                    >
                        {menuItems.find(m => m.id === activeMenu)?.content}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
