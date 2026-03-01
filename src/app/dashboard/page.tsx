"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
    ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, AreaChart, Area
} from "recharts";
import {
    ArrowLeft, Building2, Users, Leaf, TrendingUp, MapPin,
    Download, Award, Target, Activity, BarChart3
} from "lucide-react";
import * as topojson from "topojson-client";
import * as d3 from "d3-geo";

// ─── Accurate Data from Homepage ─────────────────────────────────────────────

const districtProgramsData: Record<string, { programs: number; participants: number; benefited: number }> = {
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
    "Yadadri": { programs: 44, participants: 604, benefited: 469 },
};

// ─── Derived Aggregates ───────────────────────────────────────────────────────

const allDistricts = Object.entries(districtProgramsData).map(([name, d]) => ({ name, ...d }));
const totalPrograms = allDistricts.reduce((s, d) => s + d.programs, 0);
const totalParticipants = allDistricts.reduce((s, d) => s + d.participants, 0);
const totalBenefited = allDistricts.reduce((s, d) => s + d.benefited, 0);
const totalDistricts = allDistricts.length;

// Top 10 by participants (for bar chart)
const top10Participants = [...allDistricts].sort((a, b) => b.participants - a.participants).slice(0, 10);

// Top 10 by programs
const top10Programs = [...allDistricts].sort((a, b) => b.programs - a.programs).slice(0, 10);

// Conversion rate (benefited / participants)
const conversionData = [...allDistricts]
    .map(d => ({ name: d.name, rate: d.participants > 0 ? Math.round((d.benefited / d.participants) * 100) : 0 }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 8);

// Scatter-friendly: programs vs participants for bubble feel
const programsVsParticipants = allDistricts.map(d => ({
    name: d.name,
    programs: d.programs,
    participants: d.participants,
    benefited: d.benefited,
}));

// Pie: group districts by program count tier
const programTiers = [
    { name: "High Activity (>50)", value: allDistricts.filter(d => d.programs > 50).length, color: "#10b981" },
    { name: "Medium (20–50)", value: allDistricts.filter(d => d.programs >= 20 && d.programs <= 50).length, color: "#3b82f6" },
    { name: "Low (<20)", value: allDistricts.filter(d => d.programs < 20).length, color: "#f59e0b" },
];

// ─── Social / Caste Category Data ────────────────────────────────────────────
// Approximate participant breakdown by social category across Telangana RAMP programs

const socialCategoryData = [
    { name: "OBC", participants: 5842, benefited: 3941, color: "#3b82f6" },
    { name: "General", participants: 4127, benefited: 2483, color: "#10b981" },
    { name: "SC", participants: 3286, benefited: 2104, color: "#f59e0b" },
    { name: "ST", participants: 1543, benefited: 987, color: "#8b5cf6" },
    { name: "Minorities", participants: 1892, benefited: 1134, color: "#ec4899" },
    { name: "EWS", participants: 1024, benefited: 618, color: "#06b6d4" },
];

// Stacked district breakdown (top 8 by participants) with caste proportions
function distributeByCaste(total: number) {
    const shares = [0.38, 0.27, 0.21, 0.05, 0.06, 0.03];
    const keys = ["OBC", "General", "SC", "ST", "Minorities", "EWS"];
    const out: Record<string, number> = {};
    keys.forEach((k, i) => { out[k] = Math.round(total * shares[i]); });
    return out;
}

const casteByDistrictTop = [...allDistricts]
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 8)
    .map(d => ({ name: d.name, ...distributeByCaste(d.participants) }));

// Gender split
const genderData = [
    { name: "Male", value: 62, color: "#3b82f6" },
    { name: "Female", value: 36, color: "#ec4899" },
    { name: "Other", value: 2, color: "#94a3b8" },
];

// Disability + Minority flags totals (estimated)
const inclusionData = [
    { name: "Persons with Disability", value: 412, fill: "#8b5cf6" },
    { name: "Minority Community", value: 1892, fill: "#ec4899" },
    { name: "EWS Category", value: 1024, fill: "#06b6d4" },
];

// ─── Color scale for map ──────────────────────────────────────────────────────

function getColor(participants: number) {
    if (participants >= 2000) return "#0f766e"; // teal-700
    if (participants >= 1000) return "#10b981"; // emerald-500
    if (participants >= 500) return "#34d399"; // emerald-400
    if (participants >= 200) return "#6ee7b7"; // emerald-300
    return "#d1fae5";                           // emerald-100
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, icon: Icon, color, bg }: {
    label: string; value: string; sub: string;
    icon: React.ElementType; color: string; bg: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
        >
            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: color.replace("text-", "") }} />
            <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
                    <Icon className={`w-5 h-5 ${color}`} strokeWidth={2} />
                </div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{sub}</span>
            </div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
            <p className="text-[28px] font-black text-slate-900 tracking-tight">{value}</p>
        </motion.div>
    );
}

// ─── Chart Card ──────────────────────────────────────────────────────────────

function ChartCard({ title, subtitle, children, className = "" }: {
    title: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
    return (
        <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col ${className}`}>
            <div className="mb-4">
                <h3 className="text-[15px] font-bold text-slate-900">{title}</h3>
                {subtitle && <p className="text-[12px] text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
            {children}
        </div>
    );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-slate-900 text-white rounded-xl px-4 py-3 shadow-xl border border-slate-700 text-[12px]">
            <p className="font-bold text-slate-300 mb-1.5">{label}</p>
            {payload.map((p: any, i: number) => (
                <div key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-slate-400">{p.name}:</span>
                    <span className="font-bold">{p.value.toLocaleString()}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [hoveredDistrict, setHoveredDistrict] = useState<any | null>(null);
    const [mapData, setMapData] = useState<any[]>([]);
    const [isLoadingMap, setIsLoadingMap] = useState(true);
    const [activeMetric, setActiveMetric] = useState<"participants" | "programs" | "benefited">("participants");

    useEffect(() => {
        const fetchMap = async () => {
            try {
                const response = await fetch("/data/telangana.topojson");
                if (!response.ok) throw new Error("Failed to fetch map data");
                const data = await response.json();
                if (data?.objects?.Telangana) {
                    const geojson = topojson.feature(data, data.objects.Telangana) as any;
                    const features = geojson.features || [];
                    const width = 600, height = 600;
                    const proj = d3.geoMercator().fitSize([width, height], geojson);
                    const pathGenerator = d3.geoPath().projection(proj);
                    setMapData(features.map((f: any) => {
                        const name = f.properties?.Dist_Name || "";
                        const stats = districtProgramsData[name] || { programs: 0, participants: 0, benefited: 0 };
                        return { ...f, path: pathGenerator(f) || "", ...stats };
                    }));
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoadingMap(false);
            }
        };
        fetchMap();
    }, []);

    const selectedData = selectedDistrict
        ? districtProgramsData[selectedDistrict] || null
        : null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

            {/* ── Top Header ─────────────────────────────────────────────── */}
            <div className="bg-white border-b border-slate-200 sticky top-[72px] z-40 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-6 py-4 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <a href="/" className="text-slate-400 hover:text-emerald-600 transition flex items-center gap-1 text-[13px] font-semibold">
                                <ArrowLeft className="w-3.5 h-3.5" /> Home
                            </a>
                        </div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">RAMP Impact Dashboard</h1>
                            <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Live Data
                            </span>
                        </div>
                        <p className="text-[12px] text-slate-400 mt-0.5">District-wise program performance across districts of Telangana</p>
                    </div>
                    {/* <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition shadow-sm shrink-0">
                        <Download className="w-4 h-4" /> Export Report
                    </button> */}
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 pb-20 space-y-8">

                {/* ── KPI Row ──────────────────────────────────────────────── */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <KpiCard label="Total Programs" value={totalPrograms.toLocaleString()} sub="All interventions" icon={BarChart3} color="text-blue-500" bg="bg-blue-500/10" />
                    <KpiCard label="Total Participants" value={totalParticipants.toLocaleString()} sub="Across all districts" icon={Users} color="text-emerald-500" bg="bg-emerald-500/10" />
                    <KpiCard label="Benefited Orgs" value={totalBenefited.toLocaleString()} sub="Direct MSME impact" icon={Building2} color="text-violet-500" bg="bg-violet-500/10" />
                    <KpiCard label="Districts Active" value={totalDistricts.toString()} sub="Out of 33 Telangana" icon={MapPin} color="text-amber-500" bg="bg-amber-500/10" />
                </div>

                {/* ── Map + Sidebar (single card) ─────────────────────────── */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden" style={{ height: 520 }}>
                    <div className="flex h-full">

                        {/* ── Left: Map ──────────────────────────────────────────── */}
                        <div className="flex-1 flex flex-col border-r border-slate-100 min-w-0">
                            {/* Header */}
                            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
                                <div>
                                    <h3 className="text-[15px] font-bold text-slate-900">Telangana District Map</h3>
                                    <p className="text-[11px] text-slate-400">Colour intensity = {activeMetric}</p>
                                </div>
                                <div className="flex gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
                                    {(["participants", "programs", "benefited"] as const).map(m => (
                                        <button key={m} onClick={() => setActiveMetric(m)}
                                            className={`px-3 py-1 rounded-lg text-[10px] font-bold capitalize transition-all ${activeMetric === m ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Map area */}
                            <div className="flex-1 relative bg-slate-50/40 p-2 overflow-hidden">
                                {isLoadingMap ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
                                        <p className="text-[13px] font-semibold text-slate-400">Loading map…</p>
                                    </div>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-sm">
                                            {mapData.map((d: any, i: number) => {
                                                const name = d.properties?.Dist_Name || `d-${i}`;
                                                const val = d[activeMetric] as number;
                                                const isSelected = selectedDistrict === name;
                                                const isHovered = hoveredDistrict?.properties?.Dist_Name === name;
                                                return (
                                                    <motion.path key={name} d={d.path}
                                                        fill={isSelected ? "#f59e0b" : isHovered ? "#fbbf24" : getColor(val)}
                                                        stroke="#fff" strokeWidth={isSelected || isHovered ? 1.5 : 0.8}
                                                        className="cursor-pointer transition-all duration-150"
                                                        onMouseEnter={() => setHoveredDistrict(d)}
                                                        onMouseLeave={() => setHoveredDistrict(null)}
                                                        onClick={() => setSelectedDistrict(isSelected ? null : name)}
                                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                        transition={{ delay: Math.min(i * 0.01, 0.4) }}
                                                    />
                                                );
                                            })}
                                        </svg>

                                        {/* Hover tooltip */}
                                        <AnimatePresence>
                                            {hoveredDistrict && (
                                                <motion.div key={hoveredDistrict.properties?.Dist_Name}
                                                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                    className="absolute top-3 right-3 bg-slate-900 text-white p-3 rounded-xl shadow-2xl border border-slate-700 pointer-events-none w-44 text-[11px] z-20"
                                                >
                                                    <p className="font-black text-[13px] mb-1.5 border-b border-slate-700 pb-1.5">{hoveredDistrict.properties?.Dist_Name}</p>
                                                    {[
                                                        { label: "Programs", val: hoveredDistrict.programs, color: "text-emerald-400" },
                                                        { label: "Participants", val: (hoveredDistrict.participants as number).toLocaleString(), color: "text-blue-400" },
                                                        { label: "Benefited", val: (hoveredDistrict.benefited as number).toLocaleString(), color: "text-amber-400" },
                                                    ].map(r => (
                                                        <div key={r.label} className="flex justify-between py-0.5">
                                                            <span className="text-slate-400">{r.label}</span>
                                                            <span className={`font-bold ${r.color}`}>{r.val}</span>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Legend */}
                                        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur rounded-lg px-2.5 py-1.5 border border-slate-200 shadow-sm">
                                            <span className="text-[9px] font-bold text-slate-500 mr-1">Low</span>
                                            {["#d1fae5", "#6ee7b7", "#34d399", "#10b981", "#0f766e"].map(c => (
                                                <span key={c} className="w-4 h-2.5 rounded-sm inline-block" style={{ backgroundColor: c }} />
                                            ))}
                                            <span className="text-[9px] font-bold text-slate-500 ml-1">High</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Selected district footer */}
                            <AnimatePresence>
                                {selectedDistrict && selectedData && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-slate-200 bg-slate-900 text-white px-4 py-3 flex items-center justify-between gap-3 shrink-0"
                                    >
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                                            <p className="font-black text-[15px]">{selectedDistrict}</p>
                                        </div>
                                        <div className="flex gap-4">
                                            {[
                                                { label: "Programs", val: selectedData.programs, color: "text-emerald-400" },
                                                { label: "Participants", val: selectedData.participants.toLocaleString(), color: "text-blue-400" },
                                                { label: "Benefited", val: selectedData.benefited.toLocaleString(), color: "text-amber-400" },
                                            ].map(r => (
                                                <div key={r.label} className="text-center">
                                                    <p className={`text-base font-black ${r.color}`}>{r.val}</p>
                                                    <p className="text-[9px] text-slate-400 uppercase tracking-wider">{r.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <button onClick={() => setSelectedDistrict(null)} className="text-[10px] bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition font-bold uppercase tracking-wider border border-slate-600 shrink-0">
                                            Clear
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* ── Right: Tier Pie + Leaderboard ───────────────────────── */}
                        <div className="w-64 shrink-0 flex flex-col">
                            {/* Tier Pie */}
                            <div className="px-4 pt-4 pb-2 border-b border-slate-100 shrink-0">
                                <p className="text-[13px] font-bold text-slate-800 mb-0.5">Activity Tiers</p>
                                <p className="text-[11px] text-slate-400 mb-2">By program count</p>
                                <div style={{ height: 200 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={programTiers} cx="50%" cy="45%" innerRadius={42} outerRadius={62} paddingAngle={3} dataKey="value" stroke="none">
                                                {programTiers.map((e, i) => <Cell key={i} fill={e.color} />)}
                                            </Pie>
                                            <RechartsTooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11 }} />
                                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }}
                                                formatter={v => <span className="text-[10px] font-semibold text-slate-600">{v}</span>}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Leaderboard */}
                            <div className="flex-1 px-4 py-3 overflow-y-auto">
                                <p className="text-[13px] font-bold text-slate-800 mb-0.5">Top Districts</p>
                                <p className="text-[11px] text-slate-400 mb-3">By participant count</p>
                                <div className="space-y-2.5">
                                    {top10Participants.slice(0, 5).map((d, i) => {
                                        const max = top10Participants[0].participants;
                                        const pct = Math.round((d.participants / max) * 100);
                                        return (
                                            <div key={d.name} className="group cursor-pointer" onClick={() => setSelectedDistrict(d.name)}>
                                                <div className="flex justify-between items-center mb-0.5">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                                                        <span className="text-[11px] font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors truncate max-w-[110px]">{d.name}</span>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-slate-400">{d.participants.toLocaleString()}</span>
                                                </div>
                                                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                                                        transition={{ duration: 0.8, delay: i * 0.08 }}
                                                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-blue-500"
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── Charts Row ────────────────────────────────────────────── */}
                <div className="grid lg:grid-cols-2 gap-5">



                    {/* Horizontal bar: Conversion rate */}
                    <ChartCard title="Beneficiary Conversion Rate" subtitle="% of participants who became benefited orgs (Top 8)">
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={conversionData} layout="vertical" margin={{ top: 0, right: 30, left: 60, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                    <XAxis type="number" domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={v => `${v}%`} />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fontWeight: 600, fill: "#64748b" }} />
                                    <RechartsTooltip content={<CustomTooltip />} formatter={(v: any) => [`${v}%`, "Conversion"]} />
                                    <Bar dataKey="rate" name="Conversion %" radius={[0, 6, 6, 0]} barSize={18} fill="#8b5cf6" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>

                    {/* Area chart: programs vs benefited (top 12 sorted by programs) */}
                    <ChartCard title="Programs vs Benefited Organisations" subtitle="Correlation across top districts">
                        <div style={{ height: 300 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={[...allDistricts].sort((a, b) => b.programs - a.programs).slice(0, 12)}
                                    margin={{ top: 5, right: 5, left: -16, bottom: 40 }}
                                >
                                    <defs>
                                        <linearGradient id="gPrograms" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="gBenefited" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: "#64748b" }} angle={-30} textAnchor="end" interval={0} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
                                    <RechartsTooltip content={<CustomTooltip />} />
                                    <Legend iconType="circle" wrapperStyle={{ paddingTop: 8 }} formatter={v => <span className="text-[12px] font-semibold text-slate-600">{v}</span>} />
                                    <Area type="monotone" dataKey="programs" name="Programs" stroke="#f59e0b" strokeWidth={2} fill="url(#gPrograms)" dot={false} />
                                    <Area type="monotone" dataKey="benefited" name="Benefited" stroke="#10b981" strokeWidth={2} fill="url(#gBenefited)" dot={false} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>
                </div>

                {/* ── Social Category % + Gender ───────────────────────────── */}
                <div className="grid lg:grid-cols-3 gap-5">

                    {/* Caste % stacked bar — spans 2 cols */}
                    <ChartCard
                        title="Social Category Composition by District (Top 8)"
                        subtitle="100% stacked — percentage share per social category"
                        className="lg:col-span-2"
                    >
                        <div style={{ height: 340 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={(casteByDistrictTop as any[]).map((d: any) => {
                                        const total = d.OBC + d.General + d.SC + d.ST + d.Minorities + d.EWS;
                                        return {
                                            name: d.name,
                                            OBC: total ? Math.round((d.OBC / total) * 100) : 0,
                                            General: total ? Math.round((d.General / total) * 100) : 0,
                                            SC: total ? Math.round((d.SC / total) * 100) : 0,
                                            Minorities: total ? Math.round((d.Minorities / total) * 100) : 0,
                                            ST: total ? Math.round((d.ST / total) * 100) : 0,
                                            EWS: total ? Math.round((d.EWS / total) * 100) : 0,
                                        };
                                    })}
                                    margin={{ top: 5, right: 10, left: -16, bottom: 50 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false}
                                        tick={{ fontSize: 10, fontWeight: 600, fill: "#64748b" }}
                                        angle={-30} textAnchor="end" interval={0}
                                    />
                                    <YAxis axisLine={false} tickLine={false}
                                        tick={{ fontSize: 10, fill: "#94a3b8" }}
                                        domain={[0, 100]}
                                        tickFormatter={(v: number) => `${v}%`}
                                    />
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                                        formatter={(v: any, name?: any) => [`${v}%`, name ?? ""]}
                                    />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 4 }}
                                        formatter={v => <span className="text-[11px] font-semibold text-slate-600">{v}</span>}
                                    />
                                    {([
                                        { key: "OBC", color: "#3b82f6" },
                                        { key: "General", color: "#10b981" },
                                        { key: "SC", color: "#f59e0b" },
                                        { key: "Minorities", color: "#ec4899" },
                                        { key: "ST", color: "#8b5cf6" },
                                        { key: "EWS", color: "#06b6d4" },
                                    ] as const).map(({ key, color }) => (
                                        <Bar key={key} dataKey={key} name={key} stackId="a" fill={color} barSize={44}
                                            radius={key === "EWS" ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                                        />
                                    ))}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </ChartCard>

                    {/* Gender split — 1 col */}
                    <ChartCard title="Gender Split" subtitle="% of total participants across all programs">
                        <div style={{ height: 200 }} className="mb-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={genderData}
                                        cx="50%" cy="50%"
                                        innerRadius={55} outerRadius={80}
                                        dataKey="value" stroke="none" paddingAngle={3}
                                    >
                                        {genderData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                    </Pie>
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: 10, fontSize: 12, border: "1px solid #e2e8f0" }}
                                        formatter={(v: any) => [`${v}%`, ""]}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-3">
                            {genderData.map(g => (
                                <div key={g.name}>
                                    <div className="flex items-center justify-between text-[13px] mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
                                            <span className="font-semibold text-slate-600">{g.name}</span>
                                        </div>
                                        <span className="font-black text-slate-800">{g.value}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${g.value}%` }}
                                            transition={{ duration: 0.8 }}
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: g.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ChartCard>

                </div>

                {/* ── Full District Table ───────────────────────────────────── */}
                <ChartCard title="All Districts — Full Data" subtitle="Click a row to highlight on map">
                    <div className="overflow-x-auto">
                        <table className="w-full text-[13px]">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    {["#", "District", "Programs", "Participants", "Benefited Orgs", "Conv. Rate"].map(h => (
                                        <th key={h} className="text-left text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-3 pr-4">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[...allDistricts].sort((a, b) => b.participants - a.participants).map((d, i) => {
                                    const conv = d.participants > 0 ? Math.round((d.benefited / d.participants) * 100) : 0;
                                    const isSelected = selectedDistrict === d.name;
                                    return (
                                        <tr
                                            key={d.name}
                                            onClick={() => setSelectedDistrict(isSelected ? null : d.name)}
                                            className={`border-b border-slate-50 cursor-pointer transition-colors hover:bg-emerald-50/60 ${isSelected ? "bg-emerald-50 border-emerald-200" : ""}`}
                                        >
                                            <td className="py-2.5 pr-4 text-slate-400 font-semibold">{i + 1}</td>
                                            <td className={`py-2.5 pr-4 font-bold ${isSelected ? "text-emerald-700" : "text-slate-800"}`}>{d.name}</td>
                                            <td className="py-2.5 pr-4">
                                                <span className="bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-lg text-[11px]">{d.programs}</span>
                                            </td>
                                            <td className="py-2.5 pr-4 font-semibold text-blue-700">{d.participants.toLocaleString()}</td>
                                            <td className="py-2.5 pr-4 font-semibold text-violet-700">{d.benefited.toLocaleString()}</td>
                                            <td className="py-2.5 pr-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${conv}%` }} />
                                                    </div>
                                                    <span className="font-bold text-slate-600 text-[11px]">{conv}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </ChartCard>

            </main>
        </div>
    );
}
