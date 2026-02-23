import React from "react";
import { Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer id="contact-us" className="bg-slate-950 text-slate-400 py-16 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-4 mb-6">
                            <img src="/ramp.jpg" alt="Govt Logo" className="w-12 h-12 bg-white rounded-lg p-1" />
                            <h2 className="text-2xl font-black text-white">RAMP Telangana</h2>
                        </div>
                        <p className="text-slate-500 max-w-sm mb-6">Raising and Accelerating MSME Performance. Empowering Telangana's industrial future.</p>
                        <div className="flex gap-4">
                            <a href="mailto:contact@ramp.telangana.gov.in" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition text-white"><Mail className="w-4 h-4" /></a>
                            <a href="tel:1800-123-4567" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition text-white"><Phone className="w-4 h-4" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:text-blue-400 transition">About RAMP</a></li>
                            <li><a href="/interventions" className="hover:text-blue-400 transition">Interventions</a></li>
                            <li><a href="/schemes" className="hover:text-blue-400 transition">Schemes</a></li>
                            <li><a href="/resources" className="hover:text-blue-400 transition">Resources</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Terms of Use</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition">Accessibility</a></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
                    <p>&copy; 2026 Directorate of Industries, Govt of Telangana. All rights reserved.</p>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <span>Developed by</span>
                        <span className="text-blue-400 font-bold bg-blue-900/30 px-2 py-1 rounded">Metaversedu</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
