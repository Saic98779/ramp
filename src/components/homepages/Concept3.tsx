"use client";

import React, { useState } from "react";
import {
    UserCircle2,
    Factory,
    Landmark,
    ArrowRight,
    ClipboardList,
    MapPin,
    Megaphone,
    CheckCircle,
    PlayCircle,
    Download,
    LayoutGrid,
    Users,
    ArrowUpRight,
    Sparkles,
    TrendingUp,
    LineChart,
    Target,
    FileText
} from "lucide-react";

type Persona = "artisan" | "msme" | "officer" | null;

export default function Concept3() {
    const [activePersona, setActivePersona] = useState<Persona>("msme"); // Default selected for immediate rich UI
    const [activeSubTab, setActiveSubTab] = useState<number>(0);

    const personaContent = {
        artisan: {
            title: "ALEAP Founders & Artisans",
            tagline: "Breaking barriers, building legacies.",
            description: "A customized pathway to formalize your craft, gain institutional mentoring, and connect to global supply chains through the state apparatus.",
            theme: "from-[#8B4513] to-[#D2691E]", // Warm amber/terracotta
            bg: "bg-[#FFF8F0]",
            accent: "text-[#D2691E]",
            tabs: [
                {
                    title: "ALEAP Support Grid",
                    icon: <Sparkles className="w-5 h-5" />,
                    content: "The flagship capacity building program by ALEAP. We take 45 women-led enterprises per district through a dramatic 6-month scale-up incubator, focusing on B2B procurement, financial literacy, and digital market linkages."
                },
                {
                    title: "Centre of Design Excellence",
                    icon: <LayoutGrid className="w-5 h-5" />,
                    content: "Elevate your product's appeal. Legacy artisans and rural startups receive high-end design interventions from state-sponsored experts to make products export-ready."
                },
                {
                    title: "Local Mentorship Grid",
                    icon: <Users className="w-5 h-5" />,
                    content: "Get paired directly with successfully scaled founders in your district. Access to real-world knowledge, navigating local regulations, and securing early funding."
                }
            ]
        },
        msme: {
            title: "Formal scale-up Enterprise",
            tagline: "Precision tools for exponential growth.",
            description: "You already have the foundation. RAMP Telangana provides the strategic leverage to enter public markets, audit for sustainability, and secure massive alternative lines of credit.",
            theme: "from-teal-800 to-teal-950",
            bg: "bg-teal-50",
            accent: "text-teal-800",
            tabs: [
                {
                    title: "NSE Emerge Capital",
                    icon: <TrendingUp className="w-5 h-5" />,
                    content: "Stop relying solely on bank loans. We facilitate the stringent onboarding process required for high-performing, formal MSMEs to list on the NSE EMERGE platform, unlocking vast public capital."
                },
                {
                    title: "Greening Interventions",
                    icon: <CheckCircle className="w-5 h-5" />,
                    content: "Subsidized energy audits for heavy manufacturing. We cover the cost of certifying your facility under the ZED (Zero Defect, Zero Effect) scheme, lowering long-term infrastructural overhead."
                },
                {
                    title: "TIHCL Support",
                    icon: <Landmark className="w-5 h-5" />,
                    content: "Facing distress? The Telangana Industrial Health Clinic acts as a financial shock-absorber. We provide equity support and restructuring guidance to prevent enterprise collapse."
                }
            ]
        },
        officer: {
            title: "State & District Administrators",
            tagline: "Managing the deployment matrix.",
            description: "Your portal for tracking the ₹118 Crore state allocation, managing your local Enterprise Development Center (EDC), and syncing Udyam data.",
            theme: "from-indigo-900 to-slate-900",
            bg: "bg-indigo-50",
            accent: "text-indigo-800",
            tabs: [
                {
                    title: "EDC Administration",
                    icon: <MapPin className="w-5 h-5" />,
                    content: "Oversee the daily operations of your District Industries Center's new EDC node. Track walk-ins, application resolutions, and schedule local capacity building workshops."
                },
                {
                    title: "Unified Data Sync",
                    icon: <ClipboardList className="w-5 h-5" />,
                    content: "Direct access to the new formal MSME data lake. Automatically sync state-level registrations securely with central Udyam metrics to disburse benefits faster."
                },
                {
                    title: "SIP Dashboard",
                    icon: <Target className="w-5 h-5" />,
                    content: "Monitor FY24-27 budgetary compliance. View real-time graphs on fund utilization and demographic tracking mandated by the World Bank SIP."
                }
            ]
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans text-neutral-900 pb-0">

            {/* Narrative Navbar */}
            <nav className="absolute top-0 w-full z-50 py-6 px-4 sm:px-6 lg:px-8 transition-colors">
                <div className="max-w-[90rem] mx-auto flex items-center justify-between border-b border-white/20 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-teal-950 font-black text-2xl shadow-xl">
                            R
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-wide uppercase font-serif">
                                RAMP <span className="text-teal-200">TS</span>
                            </h1>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 block mt-1">Ecosystem Navigator</span>
                        </div>
                    </div>
                    <div className="hidden lg:flex gap-10 text-white/90 font-bold tracking-widest text-sm uppercase">
                        <a href="#" className="hover:text-white transition">The Philosophy</a>
                        <a href="#" className="hover:text-white transition">Success Stories</a>
                        <a href="#" className="hover:text-white transition">Document Library</a>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition text-sm font-bold text-white uppercase tracking-widest shadow-inner border border-white/20">
                            Log In
                        </button>
                    </div>
                </div>
            </nav>

            {/* Massive Immersive Hero */}
            <section className="relative min-h-[95vh] flex flex-col items-center pt-40 pb-32 overflow-hidden bg-teal-950">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542361345-89e58247f2d5?q=80&w=2070&auto=format&fit=crop')] opacity-[0.15] bg-cover bg-center mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/80 to-teal-900/50"></div>

                <div className="relative z-10 max-w-[90rem] mx-auto px-4 w-full flex flex-col items-center">
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-200 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                            The ₹118 Crore Initiative
                        </div>
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 font-serif leading-[0.9]">
                            Ecosystems.<br />
                            <span className="italic font-light text-teal-300">Not Silos.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-teal-100/80 max-w-2xl mx-auto font-medium leading-relaxed">
                            Tell us where you fit within Telangana's economic fabric, and we'll instantly generate your institutional roadmap.
                        </p>
                    </div>

                    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button
                            onClick={() => { setActivePersona("artisan"); setActiveSubTab(0); }}
                            className={`flex flex-col p-8 rounded-3xl border-2 transition-all duration-500 text-left ${activePersona === "artisan" ? "border-amber-500 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.2)] scale-[1.02]" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${activePersona === "artisan" ? "bg-amber-500 text-black" : "bg-white/10 text-white/50"}`}>
                                <Users className="w-7 h-7" />
                            </div>
                            <h3 className={`font-black text-2xl mb-2 font-serif ${activePersona === "artisan" ? "text-amber-400" : "text-white"}`}>Founder<br />& Artisan</h3>
                            <p className={`text-sm tracking-wide font-medium mt-auto ${activePersona === "artisan" ? "text-amber-200/70" : "text-white/40"}`}>ALEAP Supported</p>
                        </button>

                        <button
                            onClick={() => { setActivePersona("msme"); setActiveSubTab(0); }}
                            className={`flex flex-col p-8 rounded-3xl border-2 transition-all duration-500 text-left ${activePersona === "msme" ? "border-teal-400 bg-teal-400/10 shadow-[0_0_30px_rgba(45,212,191,0.2)] scale-[1.02]" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${activePersona === "msme" ? "bg-teal-400 text-teal-950" : "bg-white/10 text-white/50"}`}>
                                <Factory className="w-7 h-7" />
                            </div>
                            <h3 className={`font-black text-2xl mb-2 font-serif ${activePersona === "msme" ? "text-teal-300" : "text-white"}`}>Formal<br />Enterprise</h3>
                            <p className={`text-sm tracking-wide font-medium mt-auto ${activePersona === "msme" ? "text-teal-200/70" : "text-white/40"}`}>Ready to Scale</p>
                        </button>

                        <button
                            onClick={() => { setActivePersona("officer"); setActiveSubTab(0); }}
                            className={`flex flex-col p-8 rounded-3xl border-2 transition-all duration-500 text-left ${activePersona === "officer" ? "border-indigo-400 bg-indigo-400/10 shadow-[0_0_30px_rgba(129,140,248,0.2)] scale-[1.02]" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${activePersona === "officer" ? "bg-indigo-400 text-indigo-950" : "bg-white/10 text-white/50"}`}>
                                <Landmark className="w-7 h-7" />
                            </div>
                            <h3 className={`font-black text-2xl mb-2 font-serif ${activePersona === "officer" ? "text-indigo-300" : "text-white"}`}>District<br />Administrator</h3>
                            <p className={`text-sm tracking-wide font-medium mt-auto ${activePersona === "officer" ? "text-indigo-200/70" : "text-white/40"}`}>SPIU & EDCs</p>
                        </button>
                    </div>
                </div>
            </section>

            {/* Massive Dynamic Experience Area */}
            <section className="relative z-20 pb-24 -mt-16 transition-all duration-700 min-h-[600px]">
                {activePersona ? (
                    <div className="max-w-[85rem] mx-auto px-4">
                        <div className={`bg-gradient-to-br ${personaContent[activePersona].theme} rounded-[3rem] p-10 md:p-16 shadow-2xl text-white transform transition-all duration-700 animate-in fade-in slide-in-from-bottom-12 relative overflow-hidden`}>
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                            <div className="flex flex-col lg:flex-row gap-16 relative z-10">
                                {/* Left Column: Context */}
                                <div className="lg:w-1/3 border-r border-white/10 pr-8">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-white/10 px-3 py-1.5 rounded border border-white/20 mb-6 inline-block">Your Tailored Horizon</span>
                                    <h3 className="text-5xl font-black font-serif mb-4 leading-[1.1] text-white">{personaContent[activePersona].title}</h3>
                                    <p className="text-xl font-medium text-white/80 italic mb-8 border-l-4 border-white/30 pl-4">"{personaContent[activePersona].tagline}"</p>
                                    <p className="text-white/70 text-lg leading-relaxed mb-10">
                                        {personaContent[activePersona].description}
                                    </p>

                                    <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:-translate-y-1 shadow-2xl transition-all flex items-center justify-center gap-2">
                                        Start Journey <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>

                                {/* Right Column: Deep Dive Tabs */}
                                <div className="lg:w-2/3 flex flex-col">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-white/50 mb-6">Explore Key Interventions</h4>
                                    <div className="flex gap-4 mb-8 overflow-x-auto pb-4 hide-scrollbar">
                                        {personaContent[activePersona].tabs.map((tab, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveSubTab(idx)}
                                                className={`shrink-0 px-6 py-4 rounded-xl font-bold flex items-center gap-3 transition-all ${activeSubTab === idx ? 'bg-white text-black shadow-xl shadow-white/10' : 'bg-black/20 text-white hover:bg-black/40 border border-white/10'}`}
                                            >
                                                {tab.icon} {tab.title}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="bg-black/20 border border-white/10 rounded-3xl p-10 flex-grow relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-[800ms] ease-out pointer-events-none"></div>
                                        <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed font-serif relative z-10">
                                            {personaContent[activePersona].tabs[activeSubTab].content}
                                        </blockquote>

                                        <div className="mt-12 flex justify-between items-end relative z-10 pt-8 border-t border-white/10">
                                            <div>
                                                <div className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Status</div>
                                                <div className="font-medium text-white">Accepting Applications</div>
                                            </div>
                                            <button className="text-white font-black hover:text-white/70 transition flex items-center uppercase tracking-widest text-xs gap-2">
                                                Full Guidelines <ArrowUpRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-[85rem] mx-auto px-4 opacity-0 pointer-events-none">
                        {/* hidden block maintaining height */}
                        <div className="h-[600px] bg-red-500 rounded-[3rem]"></div>
                    </div>
                )}
            </section>

            {/* RAMP Ecosystem Matrix (Universal Section) */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20 max-w-4xl mx-auto">
                        <h3 className="text-[10px] font-black tracking-[0.3em] text-teal-600 uppercase mb-4 bg-teal-50 px-4 py-2 rounded-full inline-block border border-teal-100">Scale Together</h3>
                        <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 uppercase tracking-tighter leading-[0.9]">
                            The <span className="text-teal-600">Telangana</span><br />MSME Matrix.
                        </h2>
                        <p className="text-xl text-slate-500 font-medium">No single institution can solve every bottleneck. The Strategic Investment Plan synchronizes multiple state assets under one robust, trackable umbrella.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: 'State Project Implementing Unit (SPIU)', desc: 'The apex body managing World Bank fund allocation and tracking overall progress.', icon: <CheckCircle className="w-6 h-6" /> },
                            { title: 'Enterprise Dev Centers (EDCs)', desc: 'Physical hubs across all 33 districts providing localized, offline handholding and claim settlement.', icon: <MapPin className="w-6 h-6" /> },
                            { title: 'ALEAP Support', desc: 'Specialized incubator driving cohort-based growth for female founders and startups.', icon: <Users className="w-6 h-6" /> },
                            { title: 'National Stock Exchange (NSE)', desc: 'Providing the EMERGE pathway for proven formal MSMEs to raise massive public capital.', icon: <TrendingUp className="w-6 h-6" /> }
                        ].map((partner, idx) => (
                            <div key={idx} className="bg-[#FAFAFA] border border-slate-200 p-8 rounded-3xl hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                                <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center text-teal-600 mb-6">
                                    {partner.icon}
                                </div>
                                <h4 className="font-black text-xl text-slate-900 mb-3 leading-tight">{partner.title}</h4>
                                <p className="text-sm font-medium text-slate-500 leading-relaxed">{partner.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Background decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-slate-50 border border-slate-100 rounded-full -z-10 blur-[100px] pointer-events-none"></div>
            </section>

            {/* Stories From The Ground (Immersive) */}
            <section className="py-32 bg-teal-950 text-white relative border-y border-teal-900">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-5xl md:text-7xl font-serif font-black mb-16 max-w-4xl tracking-tight leading-[0.9]">
                        Impact felt across the districts.
                    </h2>

                    <div className="grid lg:grid-cols-12 gap-8">
                        {/* Massive Feature Story */}
                        <div className="lg:col-span-8 group cursor-pointer">
                            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl shadow-teal-950/50">
                                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" alt="Handloom worker" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:bg-teal-500 transition-colors shadow-2xl">
                                        <PlayCircle className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <div className="absolute bottom-12 left-12 right-12 z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="bg-teal-600 text-white text-[10px] uppercase font-black tracking-widest px-3 py-1.5 rounded-sm">ALEAP Cohort 1</span>
                                        <span className="text-white/60 font-bold text-xs uppercase tracking-widest"><MapPin className="w-3 h-3 inline pb-0.5" /> Warangal District</span>
                                    </div>
                                    <h4 className="text-4xl lg:text-5xl font-serif font-black leading-tight max-w-3xl drop-shadow-md">"The RAMP mentoring gave our rural handloom unit the digital linkages needed to export directly."</h4>
                                </div>
                            </div>
                        </div>

                        {/* Resources sidebar */}
                        <div className="lg:col-span-4 flex flex-col gap-8">
                            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 flex-grow hover:bg-white/10 transition">
                                <h4 className="text-xl font-black mb-8 flex items-center gap-3 uppercase tracking-tight"><FileText className="w-6 h-6 text-teal-400" /> SPIU Disclosures</h4>
                                <ul className="space-y-6">
                                    {[
                                        { name: "First State MSME Policy", meta: "PDF • 4.5MB" },
                                        { name: "SIP Roadmap Targets FY24-27", meta: "PDF • 12MB" },
                                        { name: "Greening Audit Applications", meta: "Form A • 1MB" }
                                    ].map((doc, i) => (
                                        <li key={i} className="border-b border-white/10 pb-5 hover:border-teal-400 transition cursor-pointer group">
                                            <span className="block font-medium text-lg mb-1 group-hover:text-teal-300 transition-colors">{doc.name}</span>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{doc.meta}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full mt-10 py-5 bg-teal-800 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-teal-700 transition shadow-lg">View Central Repository</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Massive Footer */}
            <footer className="bg-[#050505] pt-32 pb-16 text-neutral-400">
                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 pb-24 mb-12">
                    <div className="text-center max-w-4xl mx-auto mb-24">
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.9]">Elevate Your Enterprise.</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button className="px-10 py-5 bg-teal-600 text-white font-black uppercase tracking-widest text-sm rounded-full hover:bg-teal-500 transition shadow-lg shadow-teal-900/50">Find your EDC</button>
                            <button className="px-10 py-5 bg-transparent border-2 border-white/20 text-white font-black uppercase tracking-widest text-sm rounded-full hover:border-white transition">Check Eligibility</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 font-medium">
                        <div>
                            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-4">The Initiative</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="hover:text-teal-400 transition">About RAMP TS</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">State Project Unit (SPIU)</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">World Bank Mandate</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">SIP Disclosures</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-4">Pathways</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="hover:text-teal-400 transition">For ALEAP Founders</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">For Formal MSMEs</a></li>
                                <li><a href="#" className="hover:text-white/50 text-white/30 cursor-not-allowed">For Artisans (Soon)</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">SPIU Admin Login</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-4">Interventions</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="hover:text-teal-400 transition">ALEAP Cohorts</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">NSE Emerge Listing</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">Green Auditing</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">Design Excellence</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-white/10 pb-4">Support</h4>
                            <ul className="space-y-4">
                                <li><a href="#" className="hover:text-teal-400 transition">EDC District Directory</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">Call Center Protocol</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">Grievance Portal</a></li>
                                <li><a href="#" className="hover:text-teal-400 transition">FAQ</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-600">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white">R</div>
                        <span>Implemented by Directorate of Industries, TS.</span>
                    </div>
                    <div>
                        Designed by <span className="text-teal-700">Metaversedu</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
