"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Legend
} from "recharts";
import {
    ArrowLeft,
    Building2,
    Users,
    Leaf,
    TrendingUp,
    MapPin,
    Download,
    Filter,
} from "lucide-react";

import * as topojson from "topojson-client";
import * as d3 from "d3-geo";

// --- Dummy Data ---

const kpiData = [
    { label: "Total MSMEs Registered", value: "2.6M+", growth: "+14.2%", icon: Building2, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Programs", value: "8", growth: "Ongoing", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Green Certified Units", value: "12,450", growth: "+32.5%", icon: Leaf, color: "text-teal-500", bg: "bg-teal-500/10" },
    { label: "YTD Growth Rate", value: "18.4%", growth: "vs Last Year", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
];

const sectorData = [
    { name: "Manufacturing", value: 45000 },
    { name: "Services", value: 85000 },
    { name: "Agri-business", value: 35000 },
    { name: "Education", value: 15000 },
    { name: "Others", value: 20000 },
];

const distributionData = [
    { name: "Micro", value: 75, color: "#3b82f6" },
    { name: "Small", value: 20, color: "#10b981" },
    { name: "Medium", value: 5, color: "#f59e0b" },
];

const trendData = [
    { month: "Jan", registrations: 4000, green: 240 },
    { month: "Feb", registrations: 4500, green: 300 },
    { month: "Mar", registrations: 5200, green: 450 },
    { month: "Apr", registrations: 4800, green: 400 },
    { month: "May", registrations: 6000, green: 550 },
    { month: "Jun", registrations: 7200, green: 680 },
];

export default function DashboardPage() {
    const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
    const [hoveredDistrict, setHoveredDistrict] = useState<any | null>(null);
    const [mapData, setMapData] = useState<any[]>([]);
    const [isLoadingMap, setIsLoadingMap] = useState(true);

    useEffect(() => {
        const fetchMap = async () => {
            try {
                const response = await fetch("/data/telangana.topojson");
                if (!response.ok) throw new Error("Failed to fetch map data");
                const data = await response.json();

                if (data && data.objects && data.objects.Telangana) {
                    // @ts-ignore
                    const geojson = topojson.feature(data, data.objects.Telangana) as any;
                    const features = geojson.features || [];

                    // Projection setup
                    const width = 600;
                    const height = 600;
                    const proj = d3.geoMercator().fitSize([width, height], geojson);
                    const pathGenerator = d3.geoPath().projection(proj);

                    const districtsWithPaths = features.map((feature: any) => {
                        const pathString = pathGenerator(feature);
                        return {
                            ...feature,
                            path: pathString || "",
                            total: Math.floor(Math.random() * 100000 + 10000).toLocaleString(),
                            growth: (Math.random() * 15 + 5).toFixed(1) + "%"
                        };
                    });

                    setMapData(districtsWithPaths);
                }
            } catch (error) {
                console.error("Error loading map data:", error);
            } finally {
                setIsLoadingMap(false);
            }
        };
        fetchMap();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
            {/* Header Area */}
            <div className="bg-white border-b border-slate-200 pt-8 pb-6 sticky top-[82px] z-40 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <a href="/" className="text-slate-400 hover:text-emerald-600 transition flex items-center gap-1 text-sm font-semibold">
                                <ArrowLeft className="w-4 h-4" /> Back to Home
                            </a>
                        </div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">MSME Intelligence Hub</h1>
                        <p className="text-sm text-slate-500 mt-1 font-medium">State-wide analytics and performance monitoring</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition shadow-sm">
                            <Filter className="w-4 h-4 text-slate-400" /> Filters
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition shadow-md">
                            <Download className="w-4 h-4" /> Export Report
                        </button>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 mt-8">
                {/* 1. KPI Summary Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {kpiData.map((kpi, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent to-transparent group-hover:from-emerald-500 group-hover:to-blue-500 transition-all opacity-0 group-hover:opacity-100" />
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.bg}`}>
                                    <kpi.icon className={`w-6 h-6 ${kpi.color}`} strokeWidth={2} />
                                </div>
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${idx === 1 ? 'bg-slate-100 text-slate-600' : 'bg-emerald-50 text-emerald-700'}`}>
                                    {kpi.growth}
                                </span>
                            </div>
                            <h3 className="text-slate-500 text-sm font-semibold mb-1 uppercase tracking-wide">{kpi.label}</h3>
                            <div className="text-3xl font-black text-slate-900 tracking-tight">{kpi.value}</div>
                        </motion.div>
                    ))}
                </div>

                {/* 2. Main Data Section */}
                <div className="grid lg:grid-cols-12 gap-6 mb-8">
                    <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col relative overflow-hidden min-h-[600px]">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Telangana District Map</h3>
                                <p className="text-xs text-slate-500">Official district boundaries & real-time distribution</p>
                            </div>
                            <div className="flex items-center bg-slate-100 rounded-lg p-1">
                                <button className="px-3 py-1.5 text-xs font-bold rounded-md bg-white text-slate-900 shadow-sm">MSME Count</button>
                                <button className="px-3 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:text-slate-900">Growth Rate</button>
                            </div>
                        </div>

                        <div className="flex-grow flex items-center justify-center bg-slate-50/30 p-4 relative">
                            {!isLoadingMap && mapData.length > 0 ? (
                                <div className="relative w-full h-[500px]">
                                    <svg viewBox="0 0 600 600" className="w-full h-full drop-shadow-lg">
                                        {mapData.map((d: any, i: number) => {
                                            const distName = d.properties?.Dist_Name || `district-${i}`;
                                            const isSelected = selectedDistrict === distName;
                                            const isHovered = hoveredDistrict?.properties?.Dist_Name === distName;

                                            return (
                                                <motion.path
                                                    key={distName}
                                                    d={d.path}
                                                    fill={isSelected ? '#10b981' : isHovered ? '#6ee7b7' : '#e2e8f0'}
                                                    stroke="#fff"
                                                    strokeWidth="1"
                                                    className="cursor-pointer transition-colors duration-200"
                                                    onMouseEnter={() => setHoveredDistrict(d)}
                                                    onMouseLeave={() => setHoveredDistrict(null)}
                                                    onClick={() => setSelectedDistrict(isSelected ? null : distName)}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ delay: Math.min(i * 0.01, 0.5) }}
                                                />
                                            );
                                        })}
                                    </svg>

                                    <AnimatePresence>
                                        {hoveredDistrict && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute top-4 right-4 bg-slate-900 text-white p-4 rounded-xl shadow-2xl border border-slate-700 pointer-events-none z-10 w-56"
                                            >
                                                <h4 className="font-bold text-base mb-2 border-b border-slate-700 pb-2">{hoveredDistrict.properties?.Dist_Name}</h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-slate-400">Total MSMEs:</span>
                                                        <span className="font-bold text-emerald-400">{hoveredDistrict.total}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-slate-400">Growth Rate:</span>
                                                        <span className="font-bold text-emerald-400">+{hoveredDistrict.growth}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading Analytics Map...</p>
                                </div>
                            )}

                            {selectedDistrict && (
                                <div className="absolute bottom-6 left-6 right-6 bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between shadow-lg border border-slate-700">
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-5 h-5 text-emerald-400" />
                                        <div>
                                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Filtered Analytics</p>
                                            <p className="font-bold text-lg">{selectedDistrict} District</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedDistrict(null)}
                                        className="text-xs bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all font-bold uppercase tracking-wider border border-slate-600"
                                    >
                                        Clear Filter
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col p-6 min-h-[600px]">
                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-slate-900">Sector Registration</h3>
                            <p className="text-xs text-slate-500">Distribution across key industries</p>
                        </div>
                        <div className="flex-grow w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sectorData} layout="vertical" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                    <XAxis type="number" hide />
                                    <YAxis
                                        dataKey="name"
                                        type="category"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
                                        width={100}
                                    />
                                    <RechartsTooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="value" fill="#10b981" radius={[0, 6, 6, 0]} barSize={24}>
                                        {sectorData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#10b981' : '#3b82f6'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* 3. Analytics Row */}
                <div className="grid lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col h-[400px]">
                        <div className="mb-2">
                            <h3 className="text-lg font-bold text-slate-900">Enterprise Scale</h3>
                            <p className="text-xs text-slate-500">Micro, Small, and Medium breakdown</p>
                        </div>
                        <div className="flex-grow flex items-center justify-center relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={distributionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={110}
                                        paddingAngle={2}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {distributionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        iconType="circle"
                                        formatter={(value, entry: any) => {
                                            const payload = entry?.payload;
                                            return <span className="text-sm font-semibold text-slate-700">{value} {payload ? `(${payload.value}%)` : ''}</span>;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
                                <span className="text-3xl font-black text-slate-900">100%</span>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Formalized</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 flex flex-col h-[400px]">
                        <div className="mb-6 flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Growth Trends</h3>
                                <p className="text-xs text-slate-500">Monthly registrations vs green transitions</p>
                            </div>
                            <select className="text-xs font-semibold border-none bg-slate-50 px-3 py-1.5 rounded-lg text-slate-700 outline-none">
                                <option>Last 6 Months</option>
                                <option>This Year</option>
                            </select>
                        </div>
                        <div className="flex-grow w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        yAxisId="left"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                                    />
                                    <YAxis
                                        yAxisId="right"
                                        orientation="right"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                                    />
                                    <RechartsTooltip
                                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend
                                        verticalAlign="top"
                                        align="right"
                                        iconType="circle"
                                        wrapperStyle={{ paddingBottom: '20px' }}
                                    />
                                    <Line
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey="registrations"
                                        name="New Registrations"
                                        stroke="#3b82f6"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                                    />
                                    <Line
                                        yAxisId="right"
                                        type="monotone"
                                        dataKey="green"
                                        name="Green Units"
                                        stroke="#10b981"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
