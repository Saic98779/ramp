import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-8 sm:p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[size:24px_24px]"></div>
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 transition-colors font-medium relative z-10">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 relative z-10">About RAMP</h1>
                    <p className="text-lg text-blue-100/90 leading-relaxed max-w-2xl relative z-10">
                        Raising and Accelerating MSME Performance (RAMP) is a flagship programme of the Ministry of Micro, Small and Medium Enterprises (MoMSME), Government of India, launched in June 2022. RAMP is a central sector scheme aimed at strengthening the MSME ecosystem and empower millions of enterprises across the country.
                    </p>
                </div>

                <div className="p-8 sm:p-12 space-y-12">
                    <section id="overview" className="scroll-mt-24">
                        <h2 className="text-2xl font-black text-slate-900 mb-4 border-b border-slate-100 pb-4">Telangana – The State of Innovation</h2>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
                            <p>
                                Telangana has emerged as a hub for MSME growth and innovation, backed by strong infrastructure, progressive policies, and a proactive government. The state hosts nearly 2.6 million MSMEs, with 56% in rural areas and 44% in urban centers, collectively employing over 4 million people.
                            </p>
                            <p>
                                To further strengthen this ecosystem, the Government has introduced the <strong>Telangana MSME Policy 2024</strong>, designed to attract investments and ensure sustainable industrial growth. Key initiatives include:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 text-slate-700">
                                <li><strong>TG-iPASS</strong> – Seamless business reforms for faster approvals</li>
                                <li><strong>T-IDEA & T-PRIDE</strong> – Schemes promoting entrepreneurship and inclusivity</li>
                                <li><strong>T-TAP</strong> – Support for Textile enterprises.</li>
                                <li><strong>Telangana Industrial Health Clinic Limited (TIHCL)</strong> – Support for distressed enterprises</li>
                            </ul>
                            <p className="mt-6 font-medium text-slate-800">
                                With these initiatives, Telangana continues to empower entrepreneurs and reinforce its position as India’s State of Innovation.
                            </p>
                            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                                <p className="text-blue-900 font-medium">
                                    Telangana signed the Letter of Undertaking (LoU) with the Ministry of MSME, Government of India on 20th July 2022. It submitted its Strategic Investment Plan (SIP) on 31st October 2023 and RPC approved projects worth Rs. 117.35 Cr for Telangana.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section id="objectives" className="scroll-mt-24">
                        <h2 className="text-2xl font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">Objectives</h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Enhance MSME competitiveness and resilience",
                                "Improve access to finance, technology, and markets",
                                "Promote sustainable and green practices",
                                "Foster entrepreneurship and job creation",
                                "Strengthen institutional capacity and state-level collaboration"
                            ].map((obj, i) => (
                                <li key={i} className="bg-white p-4 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 flex items-start gap-4 hover:border-blue-200 transition-colors">
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                        <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
                                    </div>
                                    <span className="text-slate-700 font-medium leading-tight pt-1.5">{obj}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section id="sub-schemes" className="scroll-mt-24">
                        <h2 className="text-2xl font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">Sub-Schemes under RAMP</h2>
                        <div className="space-y-4">
                            {[
                                { title: "MSME TEAM Initiative", desc: "Supports digital marketing adoption to expand market reach" },
                                { title: "MSE GIFT Scheme", desc: "Facilitates green investment and concessional financing for clean technologies" },
                                { title: "MSE SPICE Scheme", desc: "Promotes circular economy practices with capital subsidy support" },
                                { title: "MSE ODR Scheme", desc: "Provides speedy, technology-driven dispute resolution for delayed payments" }
                            ].map((scheme, i) => (
                                <div key={i} className="p-5 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all">
                                    <h3 className="font-bold text-blue-900 text-lg mb-1">{scheme.title}</h3>
                                    <p className="text-slate-600">{scheme.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
