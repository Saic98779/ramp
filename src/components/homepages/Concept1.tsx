"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
    ArrowRight, Cloud, TrendingUp, Cpu, MapPin, Factory, Leaf, Rocket, Globe,
    ChevronDown, ExternalLink, Menu, X, Shield, Zap, BarChart3, Users,
    Building2, Target, Award, Phone, Mail, ChevronRight, Search, FileText, Image as ImageIcon,
    Video, Download, Info, Home, LayoutList, ListChecks
} from "lucide-react";
import * as topojson from "topojson-client";
import * as d3 from "d3-geo";

const districtProgramsData: Record<string, { programs: number, participants: number, benefited: number }> = {
    "Adilabad": { programs: 22, participants: 457, benefited: 306 },
    "Bhadradri Kothagudem": { programs: 51, participants: 197, benefited: 13 },
    "Hanamkonda": { programs: 17, participants: 245, benefited: 109 },
    "Hyderabad": { programs: 330, participants: 2648, benefited: 1237 },
    "Jagtial": { programs: 20, participants: 425, benefited: 292 },
    "Jangaon": { programs: 22, participants: 361, benefited: 308 },
    "Jaya Shankar": { programs: 26, participants: 418, benefited: 311 },
    "Jogulamba Gadwal": { programs: 58, participants: 249, benefited: 44 },
    "Kamareddy": { programs: 8, participants: 499, benefited: 262 },
    "Karimnagar": { programs: 24, participants: 300, benefited: 212 },
    "Khammam": { programs: 53, participants: 359, benefited: 338 },
    "Komaram Bheem": { programs: 18, participants: 222, benefited: 197 },
    "Mancherial": { programs: 21, participants: 310, benefited: 265 },
    "Mahabubabad": { programs: 48, participants: 141, benefited: 111 },
    "Mahbubnagar": { programs: 74, participants: 445, benefited: 343 },
    "Medak": { programs: 39, participants: 290, benefited: 238 },
    "Malkajgiri": { programs: 101, participants: 2650, benefited: 2212 },
    "Mulugu": { programs: 19, participants: 428, benefited: 296 },
    "Nagarkurnool": { programs: 49, participants: 475, benefited: 229 },
    "Nalgonda": { programs: 22, participants: 767, benefited: 417 },
    "Narayanpet": { programs: 59, participants: 175, benefited: 74 },
    "Nirmal": { programs: 24, participants: 337, benefited: 204 },
    "Nizamabad": { programs: 24, participants: 410, benefited: 363 },
    "Peddapalle": { programs: 50, participants: 1012, benefited: 854 },
    "Rajanna Sircilla": { programs: 20, participants: 261, benefited: 232 },
    "Rangareddy": { programs: 83, participants: 759, benefited: 513 },
    "Sangareddy": { programs: 32, participants: 780, benefited: 412 },
    "Siddipet": { programs: 18, participants: 476, benefited: 380 },
    "Suryapet": { programs: 29, participants: 176, benefited: 150 },
    "Vikarabad": { programs: 13, participants: 510, benefited: 216 },
    "Wanaparthy": { programs: 49, participants: 184, benefited: 111 },
    "Warangal": { programs: 19, participants: 224, benefited: 109 },
    "Yadadri": { programs: 44, participants: 604, benefited: 469 }
};

/* --- Animated Counter Hook --- */
function useCountUp(end: number, duration: number = 2000, inView: boolean) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!inView || hasAnimated.current) return;
        hasAnimated.current = true;
        let startTimestamp: number | null = null;
        const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [end, duration, inView]);
    return count;
}

function StatBlock({ value, suffix, label, delay, icon: Icon }: { value: number; suffix: string; label: string; delay: number; icon?: React.ElementType }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useCountUp(value, 2200, isInView);
    return (
        <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className="text-center group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col items-center">
            {Icon && (
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
            )}
            <div className="text-5xl md:text-6xl font-black text-blue-900 mb-3 tracking-tight">
                {count.toLocaleString()}<span className="text-emerald-500">{suffix}</span>
            </div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{label}</div>
        </motion.div>
    );
}

/* --- Data --- */
import { interventions, schemes, partners } from "@/lib/data";

/* --- Bento Card Component --- */
function BentoCard({ card, index }: { card: typeof interventions[0]; index: number }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const Icon = card.icon;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group cursor-pointer h-full"
            style={{ perspective: 1000 }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => {
                window.location.href = `/interventions#${card.id}`;
            }}
            onFocus={() => setIsFlipped(true)}
            onBlur={() => setIsFlipped(false)}
        >
            <div
                className="relative w-full h-full min-h-[290px] transition-transform duration-700"
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
            >
                {/* Front */}
                <div
                    className="absolute inset-0 rounded-2xl bg-white border border-slate-200/80 p-7 flex flex-col shadow-sm hover:shadow-xl transition-shadow"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className={`w-14 h-14 ${card.bgLight} rounded-xl flex items-center justify-center mb-5`}>
                        <Icon className={`w-7 h-7 ${card.textColor}`} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3 leading-snug">{card.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed flex-grow">{card.desc}</p>
                    <div className="mt-4 flex items-center text-xs font-semibold text-slate-400 gap-1">
                        <span>Hover to explore</span>
                        <ChevronRight className="w-3 h-3" />
                    </div>
                </div>

                {/* Back */}
                <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} p-7 flex flex-col text-white shadow-xl`}
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5 backdrop-blur-sm">
                        <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-lg font-bold mb-3 leading-snug">{card.title}</h4>
                    <div className="text-sm text-white/90 leading-relaxed flex-grow">
                        <p className="mb-2">Agency: {card.agency}</p>
                        <div className="flex gap-2 items-center">
                            {card.logo && <img src={card.logo} className="h-6 w-auto object-contain bg-white rounded p-1" />}
                            {card.logo2 && <img src={card.logo2} className="h-6 w-auto object-contain bg-white rounded p-1" />}
                        </div>
                    </div>
                    <button className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90 hover:text-white transition group-hover:underline">
                        Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

/* --- Mega Menu Data --- */
// menuItems removed, moved to Navbar

/* --- Main Concept Component --- */
export default function Concept1() {
    const [mapData, setMapData] = useState<any[]>([]);
    const [hoveredDistrict, setHoveredDistrict] = useState<any | null>(null);
    const [isLoadingMap, setIsLoadingMap] = useState(true);

    useEffect(() => {
        const fetchMap = async () => {
            try {
                const response = await fetch("/data/telangana.topojson");
                if (!response.ok) throw new Error("Failed");
                const data = await response.json();
                if (data && data.objects && data.objects.Telangana) {
                    // @ts-ignore
                    const geojson = topojson.feature(data, data.objects.Telangana) as any;
                    const features = geojson.features || [];
                    const width = 600;
                    const height = 600;
                    const proj = d3.geoMercator().fitSize([width, height], geojson);
                    const pathGenerator = d3.geoPath().projection(proj);

                    const districtsWithPaths = features.map((feature: any) => {
                        const distName = feature.properties.Dist_Name;
                        const stats = districtProgramsData[distName] || { programs: 0, participants: 0, benefited: 0 };
                        return {
                            ...feature,
                            path: pathGenerator(feature),
                            ...stats
                        };
                    });
                    setMapData(districtsWithPaths);
                }
            } catch (e) { console.error(e); }
            finally { setIsLoadingMap(false); }
        };
        fetchMap();
    }, []);

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    /* --- BACKGROUND SLIDER HOOK --- */
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroSlides = [
        "/slider-1.jpeg",
        "/slider-2.jpeg",
        "/slider-3.jpeg",
        "/slider-4.jpeg",
        "/slider-5.jpeg",
        "/slider-6.jpeg"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">

            {/* --- HERO SECTION --- */}
            <section ref={heroRef} id="hero" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
                {/* Background Layers */}
                <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900" />
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${heroSlides[currentSlide]}')` }}
                        />
                    </AnimatePresence>
                    {/* Animated Mesh Grid */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </motion.div>

                {/* Floating Orbs */}
                <div className="absolute top-20 left-[10%] w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[200px]" />

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold mb-6 backdrop-blur-md">
                        World Bank Supported &bull; Central Sector Scheme
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-[#ff9933] mb-6 leading-[1.08] drop-shadow-sm">
                        Supercharge Your Growth:<br />
                        <span className="text-white">
                            The RAMP Telangana Initiative
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl text-[#138808] mb-10 max-w-3xl mx-auto font-black shadow-2xl bg-white/95 backdrop-blur-md px-8 py-5 rounded-2xl border border-slate-100/50">
                        Empowering MSMEs with targeted interventions, rapid formalization, technology, funding, and global access.
                    </motion.p>
                </div>
            </section>

            {/* --- IMPACT TICKER --- */}
            <section className="relative py-20 bg-slate-50 border-y border-slate-200 overflow-hidden">
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        <StatBlock value={2038} suffix="" label="Total Awareness Programs" delay={0} icon={Target} />
                        <StatBlock value={20012} suffix="" label="Total Participants" delay={0.15} icon={Users} />
                        <StatBlock value={12182} suffix="" label="Organizations Benefited" delay={0.3} icon={Building2} />
                    </div>
                </div>
            </section>

            {/* --- INTERVENTIONS MEGA-GRID --- */}
            <section id="interventions" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Core Interventions</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">The RAMP Advantage: Transforming MSMEs through specific, targeted programs with definitive outcomes.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {interventions.map((inv, idx) => (
                            <BentoCard key={inv.id} card={inv} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- INTERACTIVE MSME DASHBOARD --- */}
            <section id="dashboard" className="py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
                {/* Decorative Orbs */}
                <div className="absolute top-0 right-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-[10%] w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px]" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/60 text-blue-300 text-xs font-bold mb-6 border border-blue-700/40 backdrop-blur">
                                <BarChart3 className="w-3.5 h-3.5" /> Feature Highlight
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
                                Impact
                            </h2>
                            <p className="text-xl text-blue-200/70 mb-8 leading-relaxed">
                                Access <span className="text-white font-semibold">real-time visual dashboards</span> for district-wise and sector-wise insights. Track MSME performance, scheme utilization, and green adoption metrics all in one place.
                            </p>

                            <div className="space-y-4 mb-10">
                                {[
                                    "District-wise MSME registration progress",
                                    "Sector-wise scheme utilization analytics",
                                    "Green technology adoption tracking",
                                    "Real-time program impact monitoring",
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                        </div>
                                        <span className="text-blue-100/80 text-sm font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => window.location.href = '/dashboard'}
                                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-900/40 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center"
                            >
                                Explore Dashboard
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Interactive Telangana Map Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative lg:h-[650px] bg-slate-900/40 rounded-3xl border border-slate-700/50 p-4 sm:p-8 backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
                        >
                            {isLoadingMap ? (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Interactive Map...</p>
                                </div>
                            ) : (
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* Interaction Hint */}
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none whitespace-nowrap">
                                        <div className="flex items-center  gap-2 px-3  rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interactive Map: Hover to explore</span>
                                        </div>
                                    </div>

                                    <svg viewBox="0 0 600 600" className="w-full h-full max-h-[600px] drop-shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                                        {mapData.map((d: any, i: number) => {
                                            const isHovered = hoveredDistrict?.properties?.Dist_Name === d.properties.Dist_Name;
                                            return (
                                                <motion.path
                                                    key={d.properties.Dist_Name || i}
                                                    d={d.path}
                                                    fill={isHovered ? "#10b981" : "#334155"}
                                                    stroke={isHovered ? "#fff" : "#475569"}
                                                    strokeWidth={isHovered ? "2" : "0.5"}
                                                    className="cursor-pointer transition-colors duration-200"
                                                    onMouseEnter={() => setHoveredDistrict(d)}
                                                    onMouseLeave={() => setHoveredDistrict(null)}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: Math.min(i * 0.01, 0.4) }}
                                                />
                                            );
                                        })}
                                    </svg>

                                    <AnimatePresence>
                                        {hoveredDistrict && (
                                            <motion.div
                                                key={hoveredDistrict.properties.Dist_Name}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute top-0 right-0 sm:top-4 sm:right-4 bg-slate-900/95 border border-slate-700 p-5 rounded-2xl backdrop-blur-md shadow-2xl z-20 w-full sm:w-64 pointer-events-none"
                                            >
                                                <h4 className="text-xl font-black text-white mb-4 border-b border-slate-700 pb-2">
                                                    {hoveredDistrict.properties.Dist_Name}
                                                </h4>
                                                <div className="space-y-3">
                                                    {[
                                                        { label: "Programs", val: hoveredDistrict.programs, color: "text-emerald-400" },
                                                        { label: "Participants", val: hoveredDistrict.participants.toLocaleString(), color: "text-blue-400" },
                                                        { label: "Benefited Organizations", val: hoveredDistrict.benefited.toLocaleString(), color: "text-amber-400" }
                                                    ].map((stat) => (
                                                        <div
                                                            key={stat.label}
                                                            className="flex justify-between items-center text-sm"
                                                        >
                                                            <span className="text-slate-400 font-medium">{stat.label}:</span>
                                                            <span className={`${stat.color} font-black text-lg`}>{stat.val}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Stats Summary Tooltip */}
                                    <div className="absolute bottom-4 left-4 bg-slate-800/80 border border-slate-700 p-4 rounded-xl backdrop-blur text-[10px] hidden sm:block">
                                        <p className="text-slate-400 uppercase tracking-tighter font-bold mb-1">Impact Summary</p>
                                        <div className="flex gap-4">
                                            <div className="flex flex-col"><span className="text-emerald-400 font-bold text-xs">HYD: 330</span><span className="text-[8px] text-slate-500 uppercase">Programs</span></div>
                                            <div className="flex flex-col"><span className="text-blue-400 font-bold text-xs">MED: 2650</span><span className="text-[8px] text-slate-500 uppercase">Participants</span></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- SCHEME DISCOVERY HUB --- */}
            <section id="scheme-hub" className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-3">MSME Scheme Hub</h2>
                            <p className="text-slate-500">Discover and access central and state schemes.</p>
                        </div>
                        <div className="mt-4 md:mt-0 relative w-full md:w-72">
                            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input type="text" placeholder="Search schemes..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {schemes.map((scheme, i) => (
                            <a key={scheme.name} href={scheme.link} target="_blank" rel="noreferrer" className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all group flex flex-col h-full">
                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <scheme.icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg mb-2">{scheme.name}</h3>
                                <p className="text-sm text-slate-500 flex-grow mb-4">{scheme.benefit}</p>
                                <div className="text-sm font-bold text-blue-600 flex items-center">
                                    Access Portal <ExternalLink className="w-4 h-4 ml-1" />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PARTNERS LOGO STRIP --- */}
            <section className="py-16 bg-white border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 text-center mb-8">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Implementing Partners & Institutions</h3>
                </div>
                <div className="overflow-hidden relative flex max-w-7xl mx-auto">
                    <div className="flex animate-marquee hover:[animation-play-state:paused] gap-12 items-center px-4">
                        {[...partners, ...partners, ...partners].map((p, i) => (
                            <div key={i} className="flex flex-col items-center opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all shrink-0">
                                {p.logo ? (
                                    <img src={p.logo} alt={p.name} className="h-10 w-auto object-contain mb-2" />
                                ) : (
                                    <p.icon className="w-10 h-10 text-slate-800 mb-2" />
                                )}
                                <span className="text-xs font-bold text-slate-800">{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}

            {/* --- FLOATING ACTION BUTTONS --- */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
                <button className="h-12 px-6 bg-white text-blue-700 font-bold rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.1)] border border-blue-100 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 text-sm max-w-fit self-end group">
                    <Search className="w-4 h-4 group-hover:scale-110 transition-transform" /> <span className="hidden sm:inline">Find Your Program</span>
                </button>
                <button className="h-14 px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all flex items-center gap-2 text-sm max-w-fit self-end group">
                    <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" /> <span>Register Yourself</span>
                </button>
            </div>
        </div>
    );
}
