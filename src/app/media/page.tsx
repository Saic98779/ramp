"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Play, Image as ImageIcon } from 'lucide-react';

const photos = [
    { src: "/slider-1.jpeg", alt: "RAMP Workshop Event" },
    { src: "/slider-2.jpeg", alt: "CM Conference" },
    { src: "/slider-3.jpeg", alt: "MSME Inauguration" },
    { src: "/slider-4.jpeg", alt: "State Government Panel" },
    { src: "/slider-5.jpeg", alt: "RAMP Delegation" },
    { src: "/slider-6.jpeg", alt: "Innovation Award" },
];

export default function MediaPage() {
    return (
        <main className="min-h-[80vh] bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="w-full max-w-7xl">
                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Media Gallery</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Explore glimpses from our milestone events, implementation drives, and press snapshots from across the state.
                    </p>
                </div>

                {/* Photo Gallery Grid */}
                <div id="photos" className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <ImageIcon className="w-6 h-6 text-blue-600" />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Photos</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {photos.map((photo, idx) => (
                            <div key={idx} className="group relative aspect-video bg-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-200 cursor-pointer">
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <span className="text-white font-medium text-sm">{photo.alt}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Videos Section */}
                <div id="videos" className="bg-white rounded-3xl p-12 border border-slate-200 text-center shadow-sm">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Play className="w-8 h-8 ml-1" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-3">Video Highlights</h2>
                    <p className="text-slate-500 max-w-md mx-auto mb-8">Tutorials, official coverage, and strategic overviews will be uploaded directly to our official YouTube channel.</p>
                    <button className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-colors">
                        Go to Official Channel
                    </button>
                </div>

            </div>
        </main>
    );
}
