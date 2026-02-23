"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Download } from 'lucide-react';

const documents = [
    { name: "Strategic Investment Plan (SIP)", file: "/telangana_SIP.pdf", desc: "Complete 2024 SIP overview submitted to MoMSME." },
    { name: "Amended PIM (Sanction Docs)", file: "/amended-pim-03-01-2024.pdf", desc: "Official sanction and project implementation modifications." },
    { name: "TEAM Scheme Guidelines", file: "/Approved-msme-team-guidelines.pdf", desc: "Detailed operating guidelines for MSME TEAM initiative." },
    { name: "GIFT Scheme Circular", file: "/MSE-GIFT-Circular.pdf", desc: "Green Investment and concessional financing circular." },
    { name: "SPICE Scheme Guidelines", file: "/MSE-SPICE-english.pdf", desc: "Circular economy practices and capital subsidy mechanics." },
    { name: "ODR Scheme Guidelines", file: "/odr-guidelines.pdf", desc: "Technology-driven dispute resolution for MSMEs." }
];

export default function ResourcesPage() {
    return (
        <main className="min-h-[80vh] bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full max-w-7xl">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Resources & Downloads</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Download strategic documents, SIPs, sanction letters, and official scheme guidelines directly compiled for your convenience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {documents.map((doc, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{doc.name}</h3>
                            <p className="text-sm text-slate-500 flex-grow mb-6 leading-relaxed">{doc.desc}</p>
                            <a
                                href={doc.file}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-between w-full px-4 py-3 bg-slate-50 text-slate-700 font-bold rounded-xl hover:bg-blue-600 hover:text-white transition-all group/btn"
                            >
                                <span>Download PDF</span>
                                <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
