import Link from 'next/link';

export default function SchemesPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-12 rounded-3xl shadow-xl max-w-7xl w-full text-center border border-slate-100">
                <h1 className="text-4xl font-black text-slate-900 mb-6">MSME Schemes Hub</h1>
                <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                    Access and apply for key central and state schemes like Udyam, ZED certification, LEAN manufacturing, TReDS, and the ONDC network.
                </p>
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">
                    &larr; Back to Home
                </Link>
            </div>
        </main>
    );
}
