"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Calendar, Clock, MapPin, User, Phone, ChevronLeft, ChevronRight,
    Loader2, Building2, Tag, AlertCircle, Filter, X, Zap, GraduationCap, RefreshCw
} from "lucide-react";

interface Program {
    programId: number;
    activityName: string;
    subActivityName: string;
    agencyName: string;
    programType?: string;
    programTitle: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    spocName: string;
    spocContactNo: number;
    programLocationName: string;
    status: string;
    overdue: boolean;
    kpi?: string;
}

const PAGE_SIZE = 10;

const STATUS_OPTS = [
    { label: "Upcoming Programs", value: "FuturePrograms" },
    { label: "Ongoing Programs", value: "OngoingPrograms" },
    { label: "Completed Programs", value: "CompletedPrograms" },
];

const statusColor = (status: string, overdue: boolean) => {
    if (overdue) return "bg-red-100 text-red-700 border-red-200";
    if (status?.toLowerCase().includes("scheduled")) return "bg-emerald-100 text-emerald-700 border-emerald-200";
    if (status?.toLowerCase().includes("ongoing")) return "bg-blue-100 text-blue-700 border-blue-200";
    if (status?.toLowerCase().includes("completed")) return "bg-slate-100 text-slate-600 border-slate-200";
    return "bg-amber-100 text-amber-700 border-amber-200";
};

function ProgramCard({ program, index }: { program: Program; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group bg-white rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
        >
            {/* Top accent bar */}
            <div className={`h-1 w-full ${program.overdue ? "bg-red-500" : "bg-gradient-to-r from-emerald-400 to-blue-500"}`} />

            <div className="p-6 flex flex-col flex-1 gap-4">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-3">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${statusColor(program.status, program.overdue)}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {program.overdue ? "Overdue" : program.status}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 rounded-lg px-2 py-1 border border-slate-100 shrink-0">
                            #{program.programId}
                        </span>
                    </div>
                    <h3 className="text-[17px] font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
                        {program.programTitle}
                    </h3>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        <GraduationCap className="w-3 h-3" />{program.activityName}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-violet-50 text-violet-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                        <Tag className="w-3 h-3" />{program.subActivityName}
                    </span>
                    {program.programType && (
                        <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">
                            <Zap className="w-3 h-3" />{program.programType}
                        </span>
                    )}
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dates</p>
                            <p className="text-[13px] font-semibold text-slate-700">{program.startDate} – {program.endDate}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Timing</p>
                            <p className="text-[13px] font-semibold text-slate-700">{program.startTime} – {program.endTime}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2.5 sm:col-span-2">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 mt-0.5">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</p>
                            <p className="text-[13px] font-semibold text-slate-700">{program.programLocationName}</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* Agency + SPOC */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                            <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700">{program.agencyName}</span>
                    </div>
                    <a
                        href={`tel:${program.spocContactNo}`}
                        className="flex items-center gap-2 text-[12px] font-semibold text-emerald-700 hover:text-emerald-900 transition-colors group/phone"
                    >
                        <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center group-hover/phone:bg-emerald-600 group-hover/phone:text-white transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">SPOC</p>
                            <p>{program.spocName}</p>
                        </div>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

export default function ProgramsPage() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(0);
    const [statusFilter, setStatusFilter] = useState("FuturePrograms");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const listRef = useRef<HTMLDivElement>(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 350);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchPrograms = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `http://metaverseedu.in/workflow1/agency/programs/by/status/-1?status=${statusFilter}&page=${page}&size=${PAGE_SIZE}&sort=programId%2Cdesc`
            );
            if (!res.ok) throw new Error("Failed to load programs");
            const json = await res.json();
            const raw: Program[] = json.data ?? [];
            setTotalElements(json.totalElements ?? raw.length);
            setTotalPages(json.totalPages ?? 1);
            setPrograms(raw);
        } catch (e: any) {
            setError(e.message ?? "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, [page, statusFilter]);

    // Client-side search filter
    const filtered = debouncedSearch.trim()
        ? programs.filter(p => {
            const q = debouncedSearch.toLowerCase();
            return (
                (p.programTitle?.toLowerCase() ?? "").includes(q) ||
                (p.agencyName?.toLowerCase() ?? "").includes(q) ||
                (p.subActivityName?.toLowerCase() ?? "").includes(q) ||
                (p.programLocationName?.toLowerCase() ?? "").includes(q) ||
                (p.activityName?.toLowerCase() ?? "").includes(q)
            );
        })
        : programs;

    const handleStatusChange = (val: string) => {
        setStatusFilter(val);
        setPage(0);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Banner */}
            <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 py-16 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-0 right-[20%] w-96 h-96 bg-blue-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 left-[10%] w-80 h-80 bg-emerald-500/15 rounded-full blur-[120px]" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-blue-200 text-xs font-bold mb-5 backdrop-blur-md"
                    >
                        <Zap className="w-3.5 h-3.5" /> RAMP Telangana &bull; Live Programs
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight"
                    >
                        Find Your <span className="text-emerald-400">Program</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-blue-200/80 text-base sm:text-lg max-w-2xl mx-auto mb-8"
                    >
                        Discover training programs, events, and capacity-building initiatives designed to supercharge your MSME growth.
                    </motion.p>

                    {/* Search bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative max-w-xl mx-auto"
                    >
                        <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search by program, agency, topic, or location..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/95 backdrop-blur border border-white/30 text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 text-[15px] shadow-xl"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Filters + Results */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10" ref={listRef}>
                {/* Status Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {STATUS_OPTS.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => handleStatusChange(opt.value)}
                            className={`px-5 py-2 rounded-xl font-semibold text-sm transition-all border ${statusFilter === opt.value
                                ? "bg-blue-900 text-white border-blue-900 shadow-md"
                                : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"
                                }`}
                        >
                            {opt.label}
                        </button>
                    ))}
                    <button
                        onClick={fetchPrograms}
                        className="ml-auto px-4 py-2 rounded-xl font-semibold text-sm bg-white border border-slate-200 text-slate-500 hover:text-emerald-600 hover:border-emerald-300 transition-all flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" /> Refresh
                    </button>
                </div>

                {/* Count */}
                {!loading && !error && (
                    <p className="text-sm text-slate-500 mb-5 font-medium">
                        Showing <span className="font-bold text-slate-800">{filtered.length}</span> programs
                        {debouncedSearch ? ` matching "${debouncedSearch}"` : ` • Page ${page + 1} of ${totalPages}`}
                    </p>
                )}

                {/* Loading */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
                        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                        <p className="font-semibold text-sm">Fetching programs...</p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-red-400" />
                        </div>
                        <p className="text-slate-600 font-semibold">{error}</p>
                        <button
                            onClick={fetchPrograms}
                            className="px-6 py-2.5 bg-blue-800 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && filtered.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-24 gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                            <Search className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-semibold">No programs found</p>
                        {debouncedSearch && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-emerald-600 text-sm font-bold hover:underline"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                )}

                {/* Grid */}
                {!loading && !error && filtered.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((prog, idx) => (
                                <ProgramCard key={prog.programId} program={prog} index={idx} />
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {/* Pagination — only show when not searching */}
                {!loading && !error && totalPages > 1 && !debouncedSearch && (
                    <div className="flex items-center justify-center gap-3 mt-12">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 0}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                            const p = page <= 3 ? i : page - 3 + i;
                            if (p >= totalPages) return null;
                            return (
                                <button
                                    key={p}
                                    onClick={() => handlePageChange(p)}
                                    className={`w-10 h-10 rounded-xl font-bold text-sm transition-all border ${p === page
                                        ? "bg-blue-900 text-white border-blue-900 shadow"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
                                        }`}
                                >
                                    {p + 1}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPages - 1}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
}
