import Link from 'next/link';
import { ArrowLeft, Database, Target, TrendingUp, BarChart3, Building2, Server, HeartPulse, Activity, Search, Microscope, Briefcase, MapPin, Factory, Leaf, Zap, Users, Globe, Cpu } from 'lucide-react';

export default function InterventionsPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-8 sm:p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:24px_24px]"></div>
                    <Link href="/#interventions" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors font-medium relative z-10">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 relative z-10">Core Interventions</h1>
                    <p className="text-lg text-blue-100/90 leading-relaxed max-w-2xl relative z-10">
                        Detailed insights into the specific, targeted programs driving the transformation of Telangana's MSME ecosystem through the RAMP initiative.
                    </p>
                </div>

                <div className="p-8 sm:p-12 space-y-16">
                    {/* T1: Consolidated MSME Database */}
                    <section id="database" className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                <Database className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">T1 Intervention</h2>
                                <h3 className="text-3xl font-black text-slate-900">Consolidated MSME Database</h3>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 rounded-2xl p-6 mb-8 border border-blue-100/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Building2 className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Implementing Agency</p>
                                    <p className="text-slate-800 font-medium">Commissioner of Industries</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-4 py-2 bg-white rounded-xl shadow-sm text-sm font-bold text-slate-700 border border-slate-100 flex items-center gap-2">
                                    Project Outlay: <span className="text-blue-700">Rs. 4.46 Cr</span>
                                </span>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10 space-y-4">
                            <h4 className="text-xl font-bold text-slate-900">Overview</h4>
                            <p>
                                Telangana is home to over 2.6 million MSMEs, employing more than 4 million people across rural (56%) and urban (44%) regions. These enterprises are the backbone of innovation and economic growth in the state.
                            </p>
                            <p>
                                Currently, MSME data in Telangana is scattered across various departments and systems. This lack of a unified, verified database leads to duplication of efforts, inconsistent statistics, and hinders effective policymaking, inter-departmental coordination and better synergic results. Under the Raising and Accelerating MSME Performance (RAMP) initiative, the Department of Industries, Govt of Telangana is building a Consolidated MSME Database to unify and validate MSME data across departments.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-emerald-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Objectives</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Unified Data Integration", desc: "Merge diverse data sources using Udyam registration as the reference." },
                                        { title: "Streamlined Information Sharing", desc: "Enable seamless data exchange across departments." },
                                        { title: "Expanded Outreach", desc: "Monitor MSME schemes and program reach across sectors and districts." },
                                        { title: "Improved Traceability", desc: "Reduce duplication and enhance data accuracy." },
                                        { title: "Smart Validation", desc: "Use visual cues and system prompts to resolve data discrepancies." },
                                        { title: "Informed Decision-Making", desc: "Provide real-time dashboards and downloadable reports." },
                                        { title: "Auto-Integration & Scalability", desc: "Future-ready architecture for real-time API-based data ingestion and dynamic updates." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600"><strong className="text-slate-800">{item.title}:</strong> {item.desc}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <TrendingUp className="w-6 h-6 text-amber-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Expected Impact</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "A synchronized MSME data system across departments",
                                        "Enhanced policymaking and collaboration",
                                        "Real-time visual dashboards for district-wise, sector-wise insights",
                                        "Increased awareness and formalization through Udyam registration",
                                        "Support incipient sickness of MSMEs through seamless information sharing to TIHCL",
                                        "Leverage the power aggregation for sourcing raw materials / quality certifications / marketing interventions.",
                                        "Offer financial intervention through interactions with all financial institutions, including NBFCs.",
                                        "Promote and support startup ecosystem."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden">
                            <Server className="w-48 h-48 absolute -right-8 -bottom-8 text-white/5" />
                            <h4 className="text-xl font-bold mb-6 relative z-10">Core Targets</h4>
                            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300">
                                        <Database className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Deliverable</p>
                                        <p className="font-bold text-lg">Real time MSME Database</p>
                                    </div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Udyam Registrations Target</p>
                                        <p className="font-bold text-lg">6 Lakh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Project-5: Revival of distressed MSMEs */}
                    <section id="revival" className="scroll-mt-24 pt-16 border-t border-slate-100">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                                <HeartPulse className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-amber-600 uppercase tracking-widest mb-1">Project 5</h2>
                                <h3 className="text-3xl font-black text-slate-900">Revival of Distressed MSMEs</h3>
                            </div>
                        </div>

                        <div className="bg-amber-50/50 rounded-2xl p-6 mb-8 border border-amber-100/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src="/tihcl.jpeg" alt="TIHCL" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-200 p-1" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Implementing Agency</p>
                                    <p className="text-slate-800 font-medium">Telangana Industrial Health Clinic (TIHCL)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-4 py-2 bg-white rounded-xl shadow-sm text-sm font-bold text-slate-700 border border-slate-100 flex items-center gap-2">
                                    Project Outlay: <span className="text-amber-700">Rs. 28.18 Cr</span>
                                </span>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10 space-y-4">
                            <h4 className="text-xl font-bold text-slate-900">Overview</h4>
                            <p>
                                The Telangana Industrial Health Clinic (TIHCL) has been instrumental in providing support to sick and stressed micro and small industries in the State through financial and non-financial assistance. TIHCL is early stage assistants, offering financial and non-financial intervention, jumps into action at first stage of sickness.
                            </p>
                            <p>
                                TIHCL has limited capacity, both in terms of outreach and coverage of the entire State. TIHCL, especially in the post pandemic scenario has not been able to cater to the rising number of MSMEs which need financial and business support to prevent being NPA. Target groups is Micro and Small Manufacturing Units located within the State of Telangana for lending purposes. All MSMEs for extending non-financial initiatives, including conducting workshops for upgradation of skill sets of Entrepreneurs / Units.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-emerald-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Objectives</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "To enhance accessibility of TIHCLs services by a larger number of stressed MSEs.",
                                        "Reviving and rehabilitating stressed micro and small manufacturing enterprises.",
                                        "Extend consultancy services in the areas of Diagnostics, Techno Economic Viability (TEV) studies, Restructure of loans etc.",
                                        "Strengthen capacities of MSMEs through awareness, skill development and knowledge sharing.",
                                        "Facilitate more partnerships with financial institutions to cater to MSMEs."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <TrendingUp className="w-6 h-6 text-blue-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Expected Impact</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Revival of stressed / incipient stress units.",
                                        "Upgrading of skill sets of TIHCL Staff",
                                        "Upgrading of skill sets of DIC Staff / Entrepreneurs",
                                        "On Boarding into TReDS, ONDC, Udyam Portal, GeM Portal, etc.",
                                        "Benefiting the Units / Entrepreneurs with the extension of various consultancy services in improving the quality and quantity of their Business Operations."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 mb-10">
                            <div className="flex items-center gap-3 mb-6">
                                <Activity className="w-6 h-6 text-purple-500" />
                                <h4 className="text-lg font-bold text-slate-900">How it works</h4>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    "Conducting awareness programs",
                                    "Sourcing of applications digitally",
                                    "Scrutinization using application",
                                    "Unit visit to understand difficulties",
                                    "Approval by the committee",
                                    "Disbursement of loan online",
                                    "Post loan monitoring",
                                    "Handhold support to MSMEs"
                                ].map((step, i) => (
                                    <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 text-center flex items-center justify-center shadow-sm">
                                        {i + 1}. {step}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden">
                            <HeartPulse className="w-48 h-48 absolute -right-8 -bottom-8 text-white/5" />
                            <h4 className="text-xl font-bold mb-6 relative z-10">Core Targets</h4>
                            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-300">
                                        <Building2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Debt financing</p>
                                        <p className="font-bold text-lg">108 Sick MSMEs</p>
                                    </div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">NSE listings</p>
                                        <p className="font-bold text-lg">2 MSMEs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Project-10.II: Benchmarking study */}
                    <section id="benchmark" className="scroll-mt-24 pt-16 border-t border-slate-100">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                                <Microscope className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">Project 10.II</h2>
                                <h3 className="text-3xl font-black text-slate-900">Benchmarking Study of Technological Gaps</h3>
                            </div>
                        </div>

                        <div className="bg-indigo-50/50 rounded-2xl p-6 mb-8 border border-indigo-100/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    <img src="/CITD.jpeg" alt="CITD" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-200 p-1 relative z-10" />
                                    <img src="/cipet.jpeg" alt="CIPET" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-200 p-1 relative z-0" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Implementing Agency</p>
                                    <p className="text-slate-800 font-medium">Central Institute of Petrochemicals Engineering & Technology (CIPET) / CITD</p>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10 space-y-4">
                            <h4 className="text-xl font-bold text-slate-900">Rationale</h4>
                            <p>
                                MSMEs often face challenges investing in modern technology and face significant technology gaps, hindering their competitiveness and growth. These technology gaps result in operational inefficiencies and limit their ability to adapt to changing market demands, ultimately affecting overall productivity and profitability. The challenges arise due to lack of awareness, limited capacity of the MSMEs to invest in technology adoption, high cost of skilled manpower and getting right incentives for such investment.
                            </p>
                            <p>
                                This intervention is to assess the current technology gaps in the thrust sectors dominated by the presence of MSMEs vis a vis better performing states as well as international benchmarks.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-emerald-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Objectives</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "To assess the current state of technology being used in the trust Sectors dominated by the presence of MSMEs in Telangana State.",
                                        "Comparison of Technology Upgradations / Advancements in the better performing States and also with International standards.",
                                        "Providing technology roadmap for the concerned thrust sectors.",
                                        "To recommend policy prescription for the Government to support MSMEs to improve their operational efficiency, productivity, and competitiveness through technology adoption."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Search className="w-6 h-6 text-blue-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Activities to be Carried Out</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Identification of 10 potential thrust sectors.",
                                        "Conduct orientation programs at identified clusters.",
                                        "Study of existing Technology at identified clusters.",
                                        "Benchmark study of latest technology.",
                                        "Cost benefit analysis for advanced technology adoptable in three different scales.",
                                        "Compilation of Comprehensive Report and Technology roadmap.",
                                        "Validation of findings of the study with stake holders.",
                                        "Submission of final Benchmark Study Report and Technology Roadmap."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <h4 className="text-lg font-bold text-slate-900 mb-4">Targeted Thrust Sectors</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Plastics / Polymers",
                                        "Mould / Die Machining & Manufacturing",
                                        "Rubber Products",
                                        "Recycling, Waste Management & Biodegradable",
                                        "Packaging",
                                        "Welding & Fabrication",
                                        "Casting & Foundry",
                                        "Composites",
                                        "Electronic Components, Fan & Battery",
                                        "Mechanical, Civil & Product Design"
                                    ].map((sector, i) => (
                                        <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm">{sector}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <TrendingUp className="w-6 h-6 text-indigo-500" />
                                    <h4 className="text-lg font-bold text-indigo-900">Intended Outcome</h4>
                                </div>
                                <p className="text-indigo-800 text-sm leading-relaxed mb-4">
                                    The benchmarking study report will be prepared which will be instrumental for adoption of cutting-edge technology by the manufacturing units to improve the operational efficiency, productivity and competitiveness. This report will be submitted to the Government for necessary policy interventions to support the MSMEs.
                                </p>
                                <p className="text-indigo-800 text-sm leading-relaxed">
                                    The Study report will include the recommendations for the best technological solutions for sectors balancing cost and capacity of MSMEs in three different scales so as to have the options to adopt as found suitable and affordable as well.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* EDC: Enterprise Development Centre */}
                    <section id="edc" className="scroll-mt-24 pt-16 border-t border-slate-100">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                                <MapPin className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-1">EDCs</h2>
                                <h3 className="text-3xl font-black text-slate-900">Setting up of Enterprise Development Centre at DICs</h3>
                            </div>
                        </div>

                        <div className="bg-orange-50/50 rounded-2xl p-6 mb-8 border border-orange-100/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src="/ni-msme.jpeg" alt="NiMSME" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-200 p-1" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Implementing Agency</p>
                                    <p className="text-slate-800 font-medium">National Institute for MSME (NiMSME)</p>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10">
                            <h4 className="text-xl font-bold text-slate-900">Project Overview</h4>
                            <p>
                                The project aims to strengthen the institutional capacity of District Industry Centres (DICs) by establishing Enterprise Development Centres (EDCs) across Telangana. These centers will serve as comprehensive support hubs for MSMEs, offering physical and virtual services to enhance competitiveness, promote entrepreneurship, and facilitate access to markets and finance.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-emerald-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Objectives</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Provide end-to-end support services to MSMEs.",
                                        "Facilitate entrepreneurship development through training and mentoring.",
                                        "Enable market access and financial linkages.",
                                        "Promote inclusion, especially for women entrepreneurs.",
                                        "Ensure regulatory compliance and value chain integration.",
                                        "Establish EDCs as self-sustaining entities in the long run."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Activity className="w-6 h-6 text-blue-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Activities to be Carried Out</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Establishment of EDCs in 33 districts with Manager and Assistant Manager.",
                                        "Entrepreneurship training and mentoring programs.",
                                        "Market research and business planning support.",
                                        "Facilitation of buyer-seller meets, OEM linkages.",
                                        "Financial literacy and scheme awareness sessions.",
                                        "Regulatory and compliance assistance.",
                                        "Integration with platforms like Udyog Sahayak, ONDC, TreDS.",
                                        "Outreach and awareness programs for MSMEs."
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                                            <p className="text-sm text-slate-600">{step}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <h4 className="text-lg font-bold text-slate-900 mb-4">Targeted Thrust Areas</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Competitiveness & Capacity Building",
                                        "Entrepreneurship & Inclusion",
                                        "Market Linkages",
                                        "Financial Access",
                                        "Digital Enablement & Innovation",
                                        "Gender & Green Enterprise"
                                    ].map((sector, i) => (
                                        <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm">{sector}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <TrendingUp className="w-6 h-6 text-orange-500" />
                                    <h4 className="text-lg font-bold text-orange-900">Expected Outcomes</h4>
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Enhanced service delivery capacity of DICs.",
                                        "Increased MSME competitiveness and sustainability.",
                                        "Improved access to finance and markets.",
                                        "Strengthened ecosystem for entrepreneurship, especially rural women.",
                                        "Reduction in delayed payments."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-orange-800">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Import Substitution */}
                    <section id="import" className="scroll-mt-24 pt-16 border-t border-slate-100">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shrink-0">
                                <Factory className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-rose-600 uppercase tracking-widest mb-1">Import Substitution</h2>
                                <h3 className="text-3xl font-black text-slate-900">MSME Manufacturing Expansion</h3>
                            </div>
                        </div>

                        <div className="bg-rose-50/50 rounded-2xl p-6 mb-8 border border-rose-100/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Building2 className="w-5 h-5 text-rose-500" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Implementing Agency</p>
                                    <p className="text-slate-800 font-medium">Telangana State Trade Promotion Corporation Ltd (TSTPC)</p>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10">
                            <h4 className="text-xl font-bold text-slate-900">Project Overview</h4>
                            <p>
                                Despite Telangana’s impressive industrial growth, its share of manufacturing in industrial GVA remains lower than that of other leading industrial states. This project aims to leverage the state's industrial momentum to boost manufacturing through targeted import substitution, thereby enhancing employment and MSME competitiveness.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-emerald-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Objectives</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Identify 20 products across 4-5 sectors with high potential for local manufacturing.",
                                        "Develop a roadmap for import substitution to meet domestic demand.",
                                        "Build capacities of 100 MSMEs across 20 clusters.",
                                        "Analyze NIC 4-digit industries based on end-use classification."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Activity className="w-6 h-6 text-blue-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Activities to be Carried Out</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Sector & Product Identification via NIC 4-digit and HS 6-digit concordance.",
                                        "Cluster Development: Select 100 MSMEs and provide technical/financial support.",
                                        "Roadmap Creation: Sector-specific localization and supply chain integration strategies.",
                                        "Capacity Building: Workshops and regulatory guidance.",
                                        "Impact Assessment: Measure import dependence reduction and employment generation."
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                                            <p className="text-sm text-slate-600">{step}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <h4 className="text-lg font-bold text-slate-900 mb-4">Targeted Thrust Areas</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Electronics and IT Hardware",
                                        "Engineering and Capital Goods",
                                        "FMCG and Domestic Appliances",
                                        "Health and Life Sciences",
                                        "Plastic and Polymers"
                                    ].map((sector, i) => (
                                        <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm">{sector}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <TrendingUp className="w-6 h-6 text-rose-500" />
                                    <h4 className="text-lg font-bold text-rose-900">Expected Outcomes</h4>
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Enhanced manufacturing share in Telangana’s industrial GVA.",
                                        "Reduced import dependence in identified sectors.",
                                        "Increased employment through MSME manufacturing.",
                                        "Strengthened MSME clusters with sustainable production capabilities.",
                                        "Contribution to national goals of self-reliance."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-rose-800">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Project 6a/6b Green / Energy */}
                    <section id="green" className="scroll-mt-24 pt-16 border-t border-slate-100">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-slate-900">Energy Efficiency & Greening MSMEs</h3>
                            </div>
                        </div>

                        <div className="bg-emerald-50/50 rounded-2xl p-6 mb-8 border border-emerald-100/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src="/rich.jpeg" alt="RICH" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-200 p-1" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Implementing Agency</p>
                                    <p className="text-slate-800 font-medium">Research and Innovation Circle Hyderabad (RICH)</p>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10 space-y-4">
                            <h4 className="text-xl font-bold text-slate-900">Mapping of Energy Intensive MSME Clusters</h4>
                            <p>
                                This project aims to enhance energy efficiency among MSMEs in Telangana by mapping energy-intensive clusters and identifying opportunities for green technology adoption. The initiative will reduce operational costs, improve environmental sustainability, and support policy formulation through data-driven insights. Phase I collects baseline data from DISCOMs, Phase II charts energy intensity (kWh/ton), and Phase III prepares policy insights.
                            </p>

                            <h4 className="text-xl font-bold text-slate-900 mt-8">Green Pioneer Support Program</h4>
                            <p>
                                Building on the energy mapping, the Green Pioneer initiative will empower over 2,000 MSMEs to transition to low-carbon operations, improve resource efficiency, and enhance climate-resilience.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-emerald-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Key Objectives</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Develop a spatial energy intensity map of MSME clusters.",
                                        "Encourage 2,000+ MSMEs to adopt green tech and reduce GHG emissions.",
                                        "Foster innovation and product development through sustainable practices.",
                                        "Ensure MSMEs are compliant with environmental regulations.",
                                        "Develop a Green MSME Dashboard to monitor clean tech adoption."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                                    <h4 className="text-lg font-bold text-emerald-900">Expected Outcomes</h4>
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Comprehensive energy intensity dashboard for MSMEs.",
                                        "Significant reduction in energy and water consumption.",
                                        "Lower operational costs and improved efficiency.",
                                        "Strengthened resilience to climate and market risks.",
                                        "Scalable model for green MSME transformation."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-emerald-800">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Women Acceleration Program */}
                    <section id="women" className="scroll-mt-24 pt-16 border-t border-slate-100">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-fuchsia-50 flex items-center justify-center text-fuchsia-600 shrink-0">
                                <Users className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-fuchsia-600 uppercase tracking-widest mb-1">Inclusivity</h2>
                                <h3 className="text-3xl font-black text-slate-900">Women Acceleration Program</h3>
                            </div>
                        </div>

                        <div className="bg-fuchsia-50/50 rounded-2xl p-6 mb-8 border border-fuchsia-100/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img src="/we-hub.jpeg" alt="WE HUB" className="w-12 h-12 rounded-lg object-contain bg-white border border-slate-200 p-1" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Implementing Agency</p>
                                    <p className="text-slate-800 font-medium">WE HUB</p>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10 space-y-4">
                            <h4 className="text-xl font-bold text-slate-900">Project Overview</h4>
                            <p>
                                Many women-led startups and Self-Help Groups (SHGs) face significant challenges in transitioning from informal nano enterprises to formal micro or small enterprises (MSEs). Common barriers include limited access to finance, insufficient business and management skills, and weak market linkages. Without targeted support, these entrepreneurs often struggle to scale their ventures and unlock their full potential.
                            </p>
                            <p>
                                To address these challenges, the program aims to empower SHGs and women-led startups by providing a comprehensive support package that includes:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Capacity building through training and mentorship</li>
                                <li>Financial assistance to enable business growth</li>
                                <li>Market linkages to expand reach and improve sustainability</li>
                            </ul>
                            <p className="mt-4">
                                This initiative is designed to help women entrepreneurs evolve into resilient and scalable MSEs.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-fuchsia-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Objectives</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Enhance the socio-economic standards of SHG members in the state.",
                                        "Nurture entrepreneurial skills from basic to advanced levels of SHGs.",
                                        "Transform the SHGs/startups to certified MSEs.",
                                        "Create a cadre of trade counsellors to handhold the SHGs in their exports journey.",
                                        "Provide platforms to SHGs to diversify into export markets."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <TrendingUp className="w-6 h-6 text-emerald-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Expected Impact</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Enterprise Development", desc: "Build capacity of 1,500 SHGs and 500 startups to formal MSMEs, reaching 15,500 beneficiaries." },
                                        { title: "Formalization", desc: "Ensure all are registered on the Udyam portal." },
                                        { title: "Credit Linkages", desc: "Connect at least 500 MSMEs to CGTMSE for collateral-free loans." },
                                        { title: "Public Procurement", desc: "Enable 6,000 MSMEs to participate in public procurement systems." },
                                        { title: "Digital Commerce", desc: "Ensure 100% integration with digital e-commerce platforms." },
                                        { title: "Trade Support Network", desc: "Establish 100 trained trade counsellors to support MSMEs." },
                                        { title: "Export Promotion", desc: "Strengthen linkages in Food Processing, Garments, Handicrafts, & Electronics to reach 15% exporting MSMEs." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600"><strong className="text-slate-800">{item.title}:</strong> {item.desc}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden">
                            <Users className="w-48 h-48 absolute -right-8 -bottom-8 text-white/5" />
                            <h4 className="text-xl font-bold mb-6 relative z-10">Core Targets & Budget</h4>
                            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-300">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Physical Target</p>
                                        <p className="font-bold text-lg">1,500 SHGs & 500 Startups</p>
                                    </div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                                        <BarChart3 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Budget Allocation</p>
                                        <p className="font-bold text-lg">14.27 Crores</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Identification & Development of MSME Export Champions */}
                    <section id="export-champions" className="scroll-mt-24 pt-16 border-t border-slate-100">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                                <Globe className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-cyan-600 uppercase tracking-widest mb-1">Global Reach</h2>
                                <h3 className="text-3xl font-black text-slate-900">MSME Export Champions</h3>
                            </div>
                        </div>

                        <div className="bg-cyan-50/50 rounded-2xl p-6 mb-8 border border-cyan-100/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Building2 className="w-5 h-5 text-cyan-500" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Implementing Agency</p>
                                    <p className="text-slate-800 font-medium">Telangana State Trade Promotion Corporation Ltd (TSTPC)</p>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10">
                            <h4 className="text-xl font-bold text-slate-900">Project Overview</h4>
                            <p>
                                This project aims to identify and support MSMEs in Telangana with high export potential, helping them navigate complex international trade requirements and become competitive players in global markets. Through targeted handholding and the development of sector-specific export guides, the initiative will demystify export procedures and empower MSMEs to scale internationally.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-cyan-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Objectives</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Identify MSMEs with export potential from Telangana’s thrust sectors.",
                                        "Provide comprehensive handholding support to 50 MSMEs annually.",
                                        "Develop sector-specific export guides and ready reckoners to simplify export procedures.",
                                        "Facilitate MSMEs’ access to market intelligence, certifications, and credit."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Activity className="w-6 h-6 text-cyan-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Activities Planned</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        "Identify 50 Export-Ready MSMEs annually.",
                                        "Handholding Support: Market research, buyer discovery, product packaging.",
                                        "Development of Export Guides: Create simplified ready reckoners.",
                                        "Financial Assistance: Support for marketing, testing, and packaging for one year."
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</div>
                                            <p className="text-sm text-slate-600">{step}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <h4 className="text-lg font-bold text-slate-900 mb-4">Targeted Thrust Areas</h4>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Chemicals",
                                        "Electricals",
                                        "Pharmaceuticals and Drug Formulations",
                                        "Spices",
                                        "Metals",
                                        "Defence Manufacturing"
                                    ].map((sector, i) => (
                                        <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm">{sector}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <TrendingUp className="w-6 h-6 text-cyan-600" />
                                    <h4 className="text-lg font-bold text-cyan-900">Expected Outcomes</h4>
                                </div>
                                <ul className="space-y-3">
                                    {[
                                        "Increased number of MSMEs entering export markets.",
                                        "Improved understanding of international trade compliance among MSMEs.",
                                        "Enhanced competitiveness and global visibility of Telangana’s MSMEs.",
                                        "Contribution to Telangana’s export growth and global integration."
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-cyan-800">{item}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Center of Design Excellence (CoDE) */}
                    <section id="design" className="scroll-mt-24 pt-16 border-t border-slate-100">
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                            <div className="w-16 h-16 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                                <Cpu className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-violet-600 uppercase tracking-widest mb-1">Collaboration Hub</h2>
                                <h3 className="text-3xl font-black text-slate-900">Center of Design Excellence</h3>
                            </div>
                        </div>

                        <div className="bg-violet-50/50 rounded-2xl p-6 mb-8 border border-violet-100/50 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Building2 className="w-5 h-5 text-violet-500" />
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Implementing Agency</p>
                                    <p className="text-slate-800 font-medium">IIT Hyderabad (Conceptualized by State Dept of Industries)</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-4 py-2 bg-white rounded-xl shadow-sm text-sm font-bold text-slate-700 border border-slate-100 flex items-center gap-2">
                                    Project Outlay: <span className="text-violet-700">Rs. 5.85 Cr</span>
                                </span>
                            </div>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-10 space-y-4">
                            <h4 className="text-xl font-bold text-slate-900">Overview</h4>
                            <p>
                                The Government of Telangana recognizes the growing significance of design-driven solutions in enhancing the competitiveness and export potential of firms. Currently, MSMEs and startups lack a formal platform to collaborate with institutions for product innovation or to access design services. To address this gap, the proposed Center of Design Excellence aims to connect design professionals with industry needs.
                            </p>
                            <p>
                                The State Department of Industries envisions fostering a collaborative ecosystem between industry and academia to drive the development of innovative products across Telangana. Centre of Design Excellence (CoDE) aims to empower small and medium enterprises (MSMEs) by integrating design and technology to create sustainable, high-quality products. The center will offer customized workshops, expert consultations, networking opportunities, and support for design-led research and development.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-10">
                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <Target className="w-6 h-6 text-violet-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Objectives</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Design Innovation", desc: "Expert design consultations, hands-on workshops, and prototyping facilities." },
                                        { title: "Collaborative Ecosystem", desc: "Partnerships among MSMEs, designers, and domain experts." },
                                        { title: "Technology Enablement", desc: "Support MSMEs in adopting advanced technologies." },
                                        { title: "Skill Development", desc: "Bridge skill gaps by nurturing design talent via training." },
                                        { title: "Global Market Readiness", desc: "Elevate UI/UX and product design standards to boost export potential." },
                                        { title: "Brand Telangana Promotion", desc: "Amplify the 'Made in Telangana' brand through storytelling and visibility." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600"><strong className="text-slate-800">{item.title}:</strong> {item.desc}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                                <div className="flex items-center gap-3 mb-6">
                                    <TrendingUp className="w-6 h-6 text-emerald-500" />
                                    <h4 className="text-lg font-bold text-slate-900">Expected Impact</h4>
                                </div>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Education & Skill Dev", desc: "Short-term courses & 8 workshops (3D Printing, Wood working, UI/UX, IPR) reaching a cohort of 25 MSME members." },
                                        { title: "Consultancy", desc: "Scale-up and branding services to at least 5 industries/MSMEs. Streams include Graphic, Product, Film, UI/UX." },
                                        { title: "Startup Incubation", desc: "4 start-ups incubated with minimal support for development, plus training sessions." },
                                        { title: "Events & Promotion", desc: "Host 1 major and 1 minor design event for center awareness." },
                                        { title: "Craft Documentation", desc: "Two craft rejuvenation workshops through design intervention exercises." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600"><strong className="text-slate-800">{item.title}:</strong> {item.desc}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white rounded-2xl p-8 relative overflow-hidden">
                            <Cpu className="w-48 h-48 absolute -right-8 -bottom-8 text-white/5" />
                            <h4 className="text-xl font-bold mb-6 relative z-10">Core Targets</h4>
                            <div className="grid sm:grid-cols-2 gap-6 relative z-10">
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-300">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Beneficiaries</p>
                                        <p className="font-bold text-lg">520 MSMEs</p>
                                    </div>
                                </div>
                                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Impact Span</p>
                                        <p className="font-bold text-lg">Cross-sector Innovation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
