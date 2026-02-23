"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    Cloud,
    TrendingUp,
    Cpu,
    MapPin,
    Factory,
    Leaf,
    Rocket,
    Globe,
    ChevronDown,
    ExternalLink,
    Menu,
    X,
    Shield,
    Zap,
    BarChart3,
    Users,
    Building2,
    Target,
    Award,
    Phone,
    Mail,
    ChevronRight,
} from "lucide-react";

/* ──────────────────── Animated Counter Hook ──────────────────── */
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
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [end, duration, inView]);

    return count;
}

/* ──────────────────── Stat Counter Component ──────────────────── */
function StatBlock({ value, suffix, label, delay, icon: Icon }: { value: number; suffix: string; label: string; delay: number; icon?: React.ElementType }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useCountUp(value, 2200, isInView);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay }}
            className="text-center group flex flex-col items-center"
        >
            {Icon && (
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform group-hover:bg-emerald-400/20">
                    <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
            )}
            <div className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight flex items-center gap-1 leading-none">
                <span>{count.toLocaleString()}</span><span className="text-amber-400">{suffix}</span>
            </div>
            <div className="text-sm font-semibold text-blue-200 uppercase tracking-widest">{label}</div>
        </motion.div>
    );
}

/* ──────────────────── Bento Card Data ──────────────────── */
const supportCards = [
    {
        icon: Cloud,
        title: "Smart Data & Formalization",
        front: "Consolidating data across departments for seamless scheme monitoring.",
        back: "Unified MSME database across all state departments. Streamlined Udyam registration driving the 6 Lakh registration target.",
        color: "from-blue-500 to-blue-600",
        bgLight: "bg-blue-50",
        textColor: "text-blue-600",
    },
    {
        icon: TrendingUp,
        title: "Turnaround for Stressed Units",
        front: "Debt financing for 108 sick MSMEs to prevent NPA status, led by TIHCL.",
        back: "Targeted financial intervention for distressed manufacturing units. TIHCL-led revival preventing NPA classification.",
        color: "from-emerald-500 to-emerald-600",
        bgLight: "bg-emerald-50",
        textColor: "text-emerald-600",
    },
    {
        icon: Cpu,
        title: "Tech Upgradation",
        front: "Benchmarking tech gaps in thrust sectors (Plastics, Auto, Electronics).",
        back: "CIPET and CITD led technology benchmarking across key sectors: Plastics, Automotive & Electronics.",
        color: "from-violet-500 to-violet-600",
        bgLight: "bg-violet-50",
        textColor: "text-violet-600",
    },
    {
        icon: MapPin,
        title: "Enterprise Development Centres",
        front: "NIMSME setting up EDCs in 33 districts for end-to-end handholding.",
        back: "Physical facilitation centers at every District Industries Centre offering scheme counseling, application assistance & training.",
        color: "from-orange-500 to-orange-600",
        bgLight: "bg-orange-50",
        textColor: "text-orange-600",
    },
    {
        icon: Factory,
        title: "Import Substitution",
        front: "TSTPC empowering 100 MSMEs to manufacture 20 identified products locally.",
        back: "Strategic initiative to reduce import dependency. 100 MSMEs receive support to manufacture 20 critical products domestically.",
        color: "from-rose-500 to-rose-600",
        bgLight: "bg-rose-50",
        textColor: "text-rose-600",
    },
    {
        icon: Leaf,
        title: "Green Pioneer Support",
        front: "RICH mapping energy intensity and helping 2,000+ MSMEs transition to low-carbon operations.",
        back: "Comprehensive energy auditing and decarbonization roadmap. 2,000+ MSMEs targeted for green technology adoption.",
        color: "from-teal-500 to-teal-600",
        bgLight: "bg-teal-50",
        textColor: "text-teal-600",
    },
    {
        icon: Rocket,
        title: "Women Acceleration Program",
        front: "WE HUB supporting 140 women-owned startups over 4 years to achieve 2x business growth.",
        back: "140 women-owned startups across 4 cohorts. Mentorship, market access & funding linkages targeting 2x revenue growth.",
        color: "from-fuchsia-500 to-fuchsia-600",
        bgLight: "bg-fuchsia-50",
        textColor: "text-fuchsia-600",
    },
    {
        icon: Globe,
        title: "Export Champions",
        front: "TSTPC handholding 50 MSMEs annually to navigate international trade.",
        back: "50 MSMEs per year receive end-to-end export facilitation including sector-specific trade guides & compliance support.",
        color: "from-cyan-500 to-cyan-600",
        bgLight: "bg-cyan-50",
        textColor: "text-cyan-600",
    },
];

/* ──────────────────── Partners Data ──────────────────── */
const partners = [
    { name: "Commissioner of Industries", icon: Building2 },
    { name: "TIHCL", icon: Shield },
    { name: "CIPET", icon: Cpu },
    { name: "CITD", icon: Target },
    { name: "NIMSME", icon: Award },
    { name: "TSTPC", icon: Factory },
    { name: "RICH", icon: Leaf },
    { name: "WE HUB", icon: Rocket },
];

/* ──────────────────── Bento Card Component ──────────────────── */
function BentoCard({ card, index }: { card: typeof supportCards[0]; index: number }) {
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
            className="group perspective-1000 cursor-pointer"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <div
                className={`relative w-full min-h-[280px] transition-transform duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-white border border-slate-200/80 p-7 flex flex-col shadow-sm hover:shadow-xl transition-shadow">
                    <div className={`w-14 h-14 ${card.bgLight} rounded-xl flex items-center justify-center mb-5`}>
                        <Icon className={`w-7 h-7 ${card.textColor}`} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-3 leading-snug">{card.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed flex-grow">{card.front}</p>
                    <div className="mt-4 flex items-center text-xs font-semibold text-slate-400 gap-1">
                        <span>Hover to explore</span>
                        <ChevronRight className="w-3 h-3" />
                    </div>
                </div>

                {/* Back */}
                <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br ${card.color} p-7 flex flex-col text-white shadow-xl`}>
                    <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-5 backdrop-blur-sm">
                        <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-lg font-bold mb-3 leading-snug">{card.title}</h4>
                    <p className="text-sm text-white/90 leading-relaxed flex-grow">{card.back}</p>
                    <button className="mt-4 flex items-center gap-2 text-sm font-bold text-white/90 hover:text-white transition">
                        Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════════════════════ */
export default function Concept2() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden">
            {/* ═══ STICKY NAVBAR ═══ */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-50 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/20">
                            R
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                                RAMP <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600">Telangana</span>
                            </h1>
                            <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold mt-0.5">
                                Ministry of MSME &bull; Govt. of Telangana
                            </p>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
                        <a href="#impact" className="hover:text-blue-700 transition">Impact</a>
                        <a href="#programs" className="hover:text-blue-700 transition">Programs</a>
                        <a href="#dashboard" className="hover:text-blue-700 transition">Dashboard</a>
                        <a href="#partners" className="hover:text-blue-700 transition">Partners</a>
                        <a href="#cta" className="hover:text-blue-700 transition">Get Started</a>
                        <button className="ml-2 px-5 py-2.5 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm">
                            Register on Udyam
                        </button>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 text-slate-700"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-slate-100 px-6 py-6 space-y-4 shadow-xl"
                    >
                        <a href="#impact" className="block text-sm font-bold text-slate-700 hover:text-blue-700">Impact</a>
                        <a href="#programs" className="block text-sm font-bold text-slate-700 hover:text-blue-700">Programs</a>
                        <a href="#dashboard" className="block text-sm font-bold text-slate-700 hover:text-blue-700">Dashboard</a>
                        <a href="#partners" className="block text-sm font-bold text-slate-700 hover:text-blue-700">Partners</a>
                        <button className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-800 text-white font-bold rounded-xl shadow-lg text-sm">
                            Register on Udyam
                        </button>
                    </motion.div>
                )}
            </header>

            {/* ═══ SECTION 1: HERO AREA ═══ */}
            <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
                {/* Background Layers */}
                <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900" />
                    <div
                        className="absolute inset-0 opacity-20 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2000')",
                        }}
                    />
                    {/* Animated Mesh Grid */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
                </motion.div>

                {/* Floating Orbs */}
                <div className="absolute top-20 left-[10%] w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[200px]" />

                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold mb-8 backdrop-blur-md"
                    >
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        World Bank Supported &bull; Central Sector Scheme
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-[1.08]"
                    >
                        Supercharge Your Business:
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
                            The RAMP Telangana Initiative
                        </span>
                    </motion.h2>

                    {/* Sub-headline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-lg md:text-2xl text-blue-100/80 mb-10 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Empowering <span className="text-white font-bold">2.6 million MSMEs</span> with technology, funding, and global market access.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <button className="group h-14 px-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all flex items-center justify-center w-full sm:w-auto text-lg">
                            Find Your Program
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="h-14 px-10 bg-white/10 text-white font-bold border border-white/20 rounded-2xl hover:bg-white/20 flex items-center justify-center w-full sm:w-auto text-lg transition-all backdrop-blur-sm">
                            <Zap className="w-5 h-5 mr-2" />
                            Register on Udyam
                        </button>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="mt-16"
                    >
                        <div className="flex flex-col items-center gap-2 text-blue-300/50">
                            <span className="text-xs font-semibold uppercase tracking-widest">Scroll to explore</span>
                            <ChevronDown className="w-5 h-5 animate-bounce" />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══ SECTION 2: THE IMPACT COUNTER ═══ */}
            <section id="impact" className="relative py-20 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:24px_24px]" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        <StatBlock value={2600000} suffix="+" label="MSMEs in Telangana" delay={0} icon={Building2} />
                        <StatBlock value={4000000} suffix="+" label="Jobs Supported" delay={0.15} icon={Users} />
                        <StatBlock value={33} suffix="" label="District Enterprise Centres" delay={0.3} icon={MapPin} />
                        <StatBlock value={2000} suffix="+" label="MSMEs for Green Tech" delay={0.45} icon={Leaf} />
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 3: HOW WE SUPPORT YOU (Interactive Bento Grid) ═══ */}
            <section id="programs" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4 border border-blue-100">
                            <BarChart3 className="w-3.5 h-3.5" /> 8 Strategic Pillars
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
                            How We Support You
                        </h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            Discover the right program for your business. Hover over each card to explore target goals and outcomes.
                        </p>
                    </motion.div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {supportCards.map((card, idx) => (
                            <BentoCard key={idx} card={card} index={idx} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 4: INTERACTIVE MSME DASHBOARD ═══ */}
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
                                Make Informed Decisions
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

                        {/* Dashboard Mockup */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            {/* Glow behind */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-3xl blur-2xl" />

                            {/* Browser Chrome Mockup */}
                            <div className="relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
                                {/* Browser Top Bar */}
                                <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-700/50">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                    </div>
                                    <div className="flex-1 text-center">
                                        <div className="inline-flex items-center gap-2 bg-slate-800 rounded-lg px-4 py-1.5 text-xs text-slate-400 font-mono">
                                            <div className="w-3 h-3 text-emerald-400">🔒</div>
                                            dashboard.ramp-telangana.gov.in
                                        </div>
                                    </div>
                                </div>

                                {/* Dashboard Image */}
                                <img
                                    src="/msme_dashboard_mockup.png"
                                    alt="RAMP Telangana MSME Dashboard showing district-wise analytics and sector insights"
                                    className="w-full h-auto"
                                    onError={(e) => {
                                        // Fallback gradient if image not available
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                        if (target.parentElement) {
                                            const fallback = document.createElement('div');
                                            fallback.className = 'w-full aspect-[16/10] bg-gradient-to-br from-blue-900 via-slate-800 to-emerald-900 flex items-center justify-center';
                                            fallback.innerHTML = '<div class="text-center"><div class="text-6xl mb-4">📊</div><div class="text-white font-bold text-xl">Interactive MSME Dashboard</div><div class="text-blue-300/60 text-sm mt-2">Real-time analytics & insights</div></div>';
                                            target.parentElement.appendChild(fallback);
                                        }
                                    }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 5: IMPLEMENTING PARTNERS (Trust Carousel) ═══ */}
            <section id="partners" className="py-20 bg-white overflow-hidden border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] mb-2">
                            Implementing Partners
                        </p>
                        <h2 className="text-3xl font-extrabold text-slate-900">Trusted by Telangana&apos;s Finest Institutions</h2>
                    </motion.div>
                </div>

                {/* Marquee Row 1 */}
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

                    <div className="flex animate-marquee items-center gap-8">
                        {[...partners, ...partners].map((partner, i) => {
                            const Icon = partner.icon;
                            return (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 bg-slate-50 hover:bg-blue-50 px-8 py-5 rounded-2xl border border-slate-200/80 hover:border-blue-200 transition-all whitespace-nowrap shadow-sm hover:shadow-md flex-shrink-0 group"
                                >
                                    <div className="w-11 h-11 rounded-xl bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center transition-colors">
                                        <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm">{partner.name}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══ SECTION 6: FINAL CTA & FOOTER ═══ */}
            {/* CTA Banner */}
            <section id="cta" className="py-24 bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:32px_32px]" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-8 border border-amber-500/30 backdrop-blur">
                        <Zap className="w-3.5 h-3.5" /> Join the Movement
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                        Don&apos;t Get Left Behind.
                    </h2>
                    <p className="text-xl text-blue-200/70 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join the formal economy and unlock government support today. Over <span className="text-white font-semibold">2.6 million MSMEs</span> are already part of the Telangana ecosystem.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <button className="group h-16 px-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-1 transition-all flex items-center justify-center w-full sm:w-auto text-lg">
                            Register on Udyam Now
                            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="h-16 px-12 bg-white/10 text-white font-bold border border-white/20 rounded-2xl hover:bg-white/20 flex items-center justify-center w-full sm:w-auto text-lg transition-all backdrop-blur-sm">
                            <Phone className="w-5 h-5 mr-2" />
                            Contact SPIU
                        </button>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {[
                            { label: "Udyam Portal", href: "#" },
                            { label: "TReDS", href: "#" },
                            { label: "ONDC", href: "#" },
                            { label: "GeM Portal", href: "#" },
                            { label: "Grievance Redressal", href: "#" },
                            { label: "Scheme Guidelines", href: "#" },
                        ].map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-blue-300/80 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition backdrop-blur-sm"
                            >
                                {link.label}
                                <ExternalLink className="w-3 h-3" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 text-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-slate-800/80">
                        {/* Brand */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg">
                                    R
                                </div>
                                <span className="font-black text-xl text-white">RAMP Telangana</span>
                            </div>
                            <p className="mb-6 max-w-sm text-base leading-relaxed text-slate-500">
                                Raising and Accelerating MSME Performance. Implemented by the State Project Implementing Unit (SPIU) under the Directorate of Industries, Govt. of Telangana.
                            </p>
                            <div className="flex items-center gap-4">
                                <a href="#" className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                                    <span className="text-sm font-bold">X</span>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                                    <span className="text-xs font-bold">In</span>
                                </a>
                                <a href="#" className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                                    <Mail className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h5 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">Portals</h5>
                            <ul className="space-y-3">
                                {["Udyam Registration", "TReDS Platform", "GeM Marketplace", "ONDC Network"].map((l, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:text-white transition flex items-center gap-1">
                                            {l}
                                            <ExternalLink className="w-3 h-3 opacity-50" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Programs */}
                        <div>
                            <h5 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">Programs</h5>
                            <ul className="space-y-3">
                                {["WE Hub Acceleration", "NSE EMERGE", "Green Audits", "Export Champions", "EDC Locator"].map((l, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:text-white transition">{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h5 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">Support</h5>
                            <ul className="space-y-3">
                                {["Grievance Redressal", "Scheme Guidelines", "Call Center", "FAQs", "Privacy Policy", "Accessibility"].map((l, i) => (
                                    <li key={i}>
                                        <a href="#" className="hover:text-white transition">{l}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
                        <p>&copy; 2026 Directorate of Industries, Telangana. All rights reserved.</p>
                        <p className="font-semibold">
                            Developed by <span className="text-blue-400">Metaversedu</span>
                        </p>
                    </div>
                </div>
            </footer>

            {/* ═══ STICKY MOBILE CTA ═══ */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-3 z-40 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                <button className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center text-sm">
                    Find Your Program
                    <ArrowRight className="w-4 h-4 ml-2" />
                </button>
            </div>
        </div>
    );
}
