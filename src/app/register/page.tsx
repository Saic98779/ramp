"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Mail, Phone, MapPin, Building2, Shield, ChevronRight, ChevronLeft,
    CheckCircle2, Loader2, AlertCircle, Zap, FileText, Heart
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const TELANGANA_DISTRICTS = [
    "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon",
    "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar",
    "Khammam", "Komaram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial",
    "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda",
    "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla",
    "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad",
    "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri",
];

const MANDALS_BY_DISTRICT: Record<string, string[]> = {
    "Hyderabad": ["Amberpet", "Asifnagar", "Bahadurpura", "Bandlaguda", "Charminar", "Golconda", "Himayatnagar", "Khairatabad", "Musheerabad", "Nampally", "Secunderabad", "Tirumalagiri"],
    "Rangareddy": ["Abdullapurmet", "Chevella", "Ibrahimpatnam", "Kandukur", "Maheshwaram", "Manchal", "Moinabad", "Rajendranagar", "Serilingampally", "Shamshabad", "Shankarpally", "Vikarabad"],
    "Medchal-Malkajgiri": ["Bachupally", "Ghatkesar", "Keesara", "Medchal", "Malkajgiri", "Shamirpet"],
    "Karimnagar": ["Boinpally", "Choppadandi", "Gangadhara", "Huzurabad", "Jammikunta", "Karimnagar", "Korutla", "Veenavanka"],
    "Warangal Urban": ["Atmakur", "Geesugonda", "Hanamkonda", "Inavolu", "Warangal"],
    "Nizamabad": ["Armoor", "Balkonda", "Banswada", "Bodhan", "Dichpally", "Jakranpally", "Kamareddy", "Nizamabad", "Varni"],
    "Khammam": ["Bonakal", "Chintakani", "Kallur", "Khammam", "Kothagudem", "Madhira", "Manuguru", "Sathupally", "Wyra"],
    "Nalgonda": ["Bhongir", "Devarakonda", "Miryalaguda", "Nalgonda", "Nakrekal", "Suryapet"],
    "Adilabad": ["Adilabad", "Asifabad", "Bellampalli", "Bhainsa", "Boath", "Chennur", "Khanapur", "Mancherial", "Nirmal", "Utnoor"],
    "Mahbubnagar": ["Achampet", "Gadwal", "Kalwakurthy", "Kollapur", "Mahbubnagar", "Narayanpet", "Wanaparthy"],
    "Sangareddy": ["Andole", "Jharasangam", "Kondapur", "Narayankhed", "Patancheru", "Sangareddy", "Zaheerabad"],
    "Siddipet": ["Dubbak", "Gajwel", "Husnabad", "Komuravelli", "Siddipet"],
    "Kamareddy": ["Banswada", "Bhiknoor", "Domakonda", "Kamareddy", "Yellareddy"],
    "Medak": ["Andole", "Dubbak", "Medak", "Narsapur", "Ramayampet", "Toopran"],
    "Vikarabad": ["Bantwaram", "Kodangal", "Mominpet", "Peddemul", "Tandur", "Vikarabad"],
    "Nagarkurnool": ["Achampet", "Kalwakurthy", "Kollapur", "Nagarkurnool", "Urkonda"],
    "Wanaparthy": ["Atmakur", "Kothakota", "Pebbair", "Wanaparthy"],
    "Narayanpet": ["Damaragidda", "Kosgi", "Makthal", "Narayanpet"],
    "Jogulamba Gadwal": ["Alampur", "Gadwal", "Ieeja", "Manopad", "Rajoli"],
    "Peddapalli": ["Dharmaram", "Julapally", "Manthani", "Peddapalli", "Ramagundam", "Sultanabad"],
    "Jagtial": ["Dharmapuri", "Ibrahimpatnam", "Jagtial", "Korutla", "Metpally", "Pegadapally"],
    "Jangaon": ["Bachannapet", "Devaruppula", "Ghanpur", "Jangaon", "Lingalaghanpur", "Raghunathpally"],
    "Rajanna Sircilla": ["Boinpally", "Chandurthi", "Ellanthakunta", "Konaraopeta", "Sircilla", "Vemulawada"],
    "Bhadradri Kothagudem": ["Aswapuram", "Bhadrachalam", "Burgampahad", "Cherla", "Kothagudem", "Manuguru", "Palwancha"],
    "Mahabubabad": ["Bayyaram", "Dornakal", "Garla", "Gudur", "Kesamudram", "Mahabubabad", "Narsimhulapet", "Thorrur"],
    "Jayashankar Bhupalpally": ["Bhupalpally", "Chityal", "Ghanapur", "Kataram", "Mahadevpur", "Mogullapally"],
    "Mulugu": ["Eturunagaram", "Govindaraopet", "Mangapet", "Mulugu", "Tadvai", "Venkatapuram", "Wazeedu"],
    "Yadadri Bhuvanagiri": ["Alair", "Bhongir", "Bibinagar", "Bhuvanagiri", "Choutuppal", "Mothkur", "Ramannapet", "Thurkapally", "Yadagirigutta"],
    "Suryapet": ["Atmakur", "Chivvemla", "Garidepally", "Huzurnagar", "Kodad", "Mellachervu", "Mothey", "Munagala", "Neredcherla", "Suryapet", "Thirumalagiri"],
    "Nirmal": ["Bhainsa", "Dilawarpur", "Khanapur", "Kubeer", "Laxmanchanda", "Mamda", "Mudhole", "Nirmal", "Sarangapur", "Tanur"],
    "Mancherial": ["Bellampalli", "Chennur", "Hajipur", "Jaipur", "Kannepally", "Kotapally", "Luxettipet", "Mancherial", "Naspur", "Tandur"],
    "Komaram Bheem": ["Asifabad", "Bejjur", "Dahegaon", "Jainoor", "Kagaznagar", "Kerameri", "Penchikalpet", "Rebbena", "Sirpur", "Tiryani"],
    "Warangal Rural": ["Atmakur", "Chityal", "Narsampet", "Parkal", "Sangem", "Shayampet", "Wardhannapet"],
};

const MSME_SECTORS = [
    "Crop and Animal Production, Hunting and Related Service Activities",
    "Manufacture of Food Products",
    "Manufacture of Beverages",
    "Manufacture of Textiles",
    "Manufacture of Leather and Related Products",
    "Manufacture of Wood and Products of Wood and Cork, Except Furniture",
    "Manufacture of Paper and Paper Products",
    "Manufacture of Chemical and Chemical Products",
    "Manufacture of Pharmaceuticals, Medicinal Chemical and Botanical Products",
    "Manufacture of Rubber and Plastic Products",
    "Manufacture of Other Non-Metallic Mineral Products",
    "Manufacture of Basic Metals",
    "Manufacture of Fabricated Metal Products, Except Machinery and Equipment",
    "Manufacture of Electrical Equipment",
    "Manufacture of Machinery and Equipment N.E.C.",
    "Other Manufacturing",
    "Waste Collection, Treatment and Disposal Activities; Materials Recovery",
    "Warehousing and Support activities for Transportation",
];

const RAMP_WORKSHOPS = [
    "RAMP Programs",
    "Enterpreneur & Skill Development Program (ESDP)",
    "Business Development Service (BDS)",
    "Zero Defect Zero Effect Product (ZED)",
    "Intellectual Property Rights (IPR)",
    "Reverse Buyers Sellers Meet (RBSM)",
    "Udyam Registration",
    "Vendor Development Program (VDP)",
    "Green Packaging / Branding Workshops",
    "TReDS",
    "National Research Development Corporation",
    "National Stock Exchange",
    "National Productivity Council",
];

const SOCIAL_CATEGORIES = ["General", "OBC", "SC", "ST", "EWS"];
const GENDERS = ["Male", "Female", "Transgender", "Prefer not to say"];

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
    rampWorkshop: string;
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    email: string;
    phone: string;
    aadhaarNo: string;
    udhyamRegistrationNo: string;
    socialCategory: string;
    minorities: boolean;
    disability: boolean;
    designation: string;
    organization: string;
    sector: string;
    address: string;
    district: string;
    mandal: string;
}

const INITIAL_FORM: FormData = {
    rampWorkshop: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    aadhaarNo: "",
    udhyamRegistrationNo: "",
    socialCategory: "",
    minorities: false,
    disability: false,
    designation: "",
    organization: "",
    sector: "",
    address: "",
    district: "",
    mandal: "",
};

// ─── Step Config ──────────────────────────────────────────────────────────────

const STEPS = [
    { id: 1, label: "Personal Info", icon: User, desc: "Your basic details" },
    { id: 2, label: "Contact & Identity", icon: Phone, desc: "Contact & ID numbers" },
    { id: 3, label: "Organization", icon: Building2, desc: "Business information" },
    { id: 4, label: "Location", icon: MapPin, desc: "District & address" },
    { id: 5, label: "Review & Submit", icon: CheckCircle2, desc: "Confirm your registration" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
    return (
        <label className="block text-[13px] font-semibold text-slate-600 mb-1.5">
            {children} {required && <span className="text-red-500">*</span>}
        </label>
    );
}

function Input({
    id, value, onChange, placeholder, type = "text", maxLength, disabled
}: {
    id: string; value: string; onChange: (v: string) => void;
    placeholder?: string; type?: string; maxLength?: number; disabled?: boolean;
}) {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition disabled:bg-slate-50 disabled:text-slate-400"
        />
    );
}

function Select({
    id, value, onChange, options, placeholder
}: {
    id: string; value: string; onChange: (v: string) => void;
    options: string[]; placeholder?: string;
}) {
    return (
        <select
            id={id}
            value={value}
            onChange={e => onChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition appearance-none cursor-pointer"
        >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
    );
}

function Toggle({
    id, label, checked, onChange, desc
}: {
    id: string; label: string; checked: boolean; onChange: (v: boolean) => void; desc?: string;
}) {
    return (
        <div
            className={`flex items-center justify-between p-4 rounded-xl border transition cursor-pointer select-none ${checked ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"}`}
            onClick={() => onChange(!checked)}
        >
            <div>
                <p className="text-[13px] font-semibold text-slate-700">{label}</p>
                {desc && <p className="text-[12px] text-slate-400 mt-0.5">{desc}</p>}
            </div>
            <div className={`w-11 h-6 rounded-full transition-all flex items-center px-0.5 ${checked ? "bg-emerald-500" : "bg-slate-200"}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
            </div>
        </div>
    );
}

function ReviewRow({ label, value }: { label: string; value: string | boolean }) {
    if (typeof value === "boolean") {
        return (
            <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                <span className="text-[13px] text-slate-500">{label}</span>
                <span className={`text-[13px] font-bold ${value ? "text-emerald-600" : "text-slate-400"}`}>{value ? "Yes" : "No"}</span>
            </div>
        );
    }
    return (
        <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
            <span className="text-[13px] text-slate-500">{label}</span>
            <span className="text-[13px] font-bold text-slate-800 max-w-[55%] text-right">{value || "—"}</span>
        </div>
    );
}

// ─── STEP PANELS ─────────────────────────────────────────────────────────────

function Step1({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <Label required>First Name</Label>
                    <Input id="firstName" value={form.firstName} onChange={v => set({ firstName: v })} placeholder="e.g. Ravi" />
                </div>
                <div>
                    <Label required>Last Name</Label>
                    <Input id="lastName" value={form.lastName} onChange={v => set({ lastName: v })} placeholder="e.g. Kumar" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <Label required>Age</Label>
                    <Input id="age" value={form.age} onChange={v => set({ age: v.replace(/\D/, "") })} placeholder="e.g. 35" type="number" />
                </div>
                <div>
                    <Label required>Gender</Label>
                    <Select id="gender" value={form.gender} onChange={v => set({ gender: v })} options={GENDERS} placeholder="Select gender" />
                </div>
            </div>
            <div>
                <Label required>RAMP Workshop / Program</Label>
                <Select
                    id="rampWorkshop"
                    value={form.rampWorkshop}
                    onChange={v => set({ rampWorkshop: v })}
                    options={RAMP_WORKSHOPS}
                    placeholder="Select a RAMP Program"
                />
            </div>
            <div>
                <Label required>Social Category</Label>
                <Select id="socialCategory" value={form.socialCategory} onChange={v => set({ socialCategory: v })} options={SOCIAL_CATEGORIES} placeholder="Select category" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <Toggle
                    id="minorities"
                    label="Minority Community"
                    desc="Belonging to a religious minority"
                    checked={form.minorities}
                    onChange={v => set({ minorities: v })}
                />
                <Toggle
                    id="disability"
                    label="Person with Disability"
                    desc="Divyangjan (PwD) category"
                    checked={form.disability}
                    onChange={v => set({ disability: v })}
                />
            </div>
        </div>
    );
}

function Step2({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <Label required>Email Address</Label>
                    <Input id="email" value={form.email} onChange={v => set({ email: v })} placeholder="you@example.com" type="email" />
                </div>
                <div>
                    <Label required>Phone Number</Label>
                    <Input id="phone" value={form.phone} onChange={v => set({ phone: v.replace(/\D/, "") })} placeholder="10-digit mobile number" maxLength={10} />
                </div>
            </div>
            <div>
                <Label>Aadhaar Number</Label>
                <Input
                    id="aadhaarNo"
                    value={form.aadhaarNo}
                    onChange={v => set({ aadhaarNo: v.replace(/\D/, "") })}
                    placeholder="12-digit Aadhaar number"
                    maxLength={12}
                />
                <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1"><Shield className="w-3 h-3" /> Your Aadhaar data is securely handled and not shared.</p>
            </div>
            <div>
                <Label>Udyam Registration Number</Label>
                <Input
                    id="udhyamRegistrationNo"
                    value={form.udhyamRegistrationNo}
                    onChange={v => set({ udhyamRegistrationNo: v })}
                    placeholder="e.g. UDYAM-TS-00-0000000"
                />
                <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1"><FileText className="w-3 h-3" /> Available on udyamregistration.gov.in</p>
            </div>
        </div>
    );
}

function Step3({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
    return (
        <div className="space-y-5">
            <div>
                <Label required>Designation</Label>
                <Input id="designation" value={form.designation} onChange={v => set({ designation: v })} placeholder="e.g. Proprietor, CEO, Manager" />
            </div>
            <div>
                <Label required>Organization Name</Label>
                <Input id="organization" value={form.organization} onChange={v => set({ organization: v })} placeholder="Your business / enterprise name" />
            </div>
            <div>
                <Label required>Sector</Label>
                <Select id="sector" value={form.sector} onChange={v => set({ sector: v })} options={MSME_SECTORS} placeholder="Select sector" />
            </div>
        </div>
    );
}

function Step4({ form, set }: { form: FormData; set: (f: Partial<FormData>) => void }) {
    const mandals = form.district ? (MANDALS_BY_DISTRICT[form.district] ?? []) : [];
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                    <Label required>District</Label>
                    <Select
                        id="district"
                        value={form.district}
                        onChange={v => set({ district: v, mandal: "" })}
                        options={TELANGANA_DISTRICTS}
                        placeholder="Select district"
                    />
                </div>
                <div>
                    <Label required>Mandal</Label>
                    {mandals.length > 0 ? (
                        <Select
                            id="mandal"
                            value={form.mandal}
                            onChange={v => set({ mandal: v })}
                            options={mandals}
                            placeholder="Select mandal"
                        />
                    ) : (
                        <Input
                            id="mandal"
                            value={form.mandal}
                            onChange={v => set({ mandal: v })}
                            placeholder={form.district ? "Enter mandal name" : "Select a district first"}
                            disabled={!form.district}
                        />
                    )}
                </div>
            </div>
            <div>
                <Label required>Full Address</Label>
                <textarea
                    id="address"
                    value={form.address}
                    onChange={e => set({ address: e.target.value })}
                    placeholder="House/Plot No., Street, Area, City..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 text-[14px] font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                />
            </div>
        </div>
    );
}

function Step5({ form }: { form: FormData }) {
    const sections = [
        {
            title: "Personal Details",
            icon: User,
            color: "bg-blue-50 text-blue-600",
            rows: [
                { label: "Name", value: `${form.firstName} ${form.lastName}` },
                { label: "Age", value: form.age },
                { label: "Gender", value: form.gender },
                { label: "Category", value: form.socialCategory },
                { label: "Minority", value: form.minorities },
                { label: "Disability", value: form.disability },
            ]
        },
        {
            title: "Contact & Identity",
            icon: Phone,
            color: "bg-emerald-50 text-emerald-600",
            rows: [
                { label: "Email", value: form.email },
                { label: "Phone", value: form.phone },
                { label: "Aadhaar", value: form.aadhaarNo ? `****${form.aadhaarNo.slice(-4)}` : "" },
                { label: "Udyam No.", value: form.udhyamRegistrationNo },
            ]
        },
        {
            title: "Organization",
            icon: Building2,
            color: "bg-violet-50 text-violet-600",
            rows: [
                { label: "Designation", value: form.designation },
                { label: "Organization", value: form.organization },
                { label: "Sector", value: form.sector },
            ]
        },
        {
            title: "Location",
            icon: MapPin,
            color: "bg-amber-50 text-amber-600",
            rows: [
                { label: "District", value: form.district },
                { label: "Mandal", value: form.mandal },
                { label: "Address", value: form.address },
            ]
        },
    ];

    return (
        <div className="space-y-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[13px] text-blue-700 font-medium">
                    Please review your information carefully before submitting. You will be registered for <strong>{form.rampWorkshop || "the selected program"}</strong>.
                </p>
            </div>
            {sections.map(sec => {
                const Icon = sec.icon;
                return (
                    <div key={sec.title} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="flex items-center gap-2.5 px-5 py-3 border-b border-slate-100 bg-slate-50/60">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${sec.color}`}>
                                <Icon className="w-4 h-4" />
                            </div>
                            <h4 className="text-[13px] font-bold text-slate-700 uppercase tracking-wider">{sec.title}</h4>
                        </div>
                        <div className="px-5 py-1">
                            {sec.rows.map(r => <ReviewRow key={r.label} label={r.label} value={r.value as string | boolean} />)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Validate per step ────────────────────────────────────────────────────────

function validate(step: number, form: FormData): string | null {
    if (step === 1) {
        if (!form.firstName.trim()) return "First name is required.";
        if (!form.lastName.trim()) return "Last name is required.";
        if (!form.age || Number(form.age) < 18 || Number(form.age) > 100) return "Please enter a valid age (18–100).";
        if (!form.gender) return "Please select gender.";
        if (!form.rampWorkshop.trim()) return "Program / Workshop ID is required.";
        if (!form.socialCategory) return "Please select a social category.";
    }
    if (step === 2) {
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email || !emailRe.test(form.email)) return "Please enter a valid email address.";
        if (!form.phone || form.phone.length !== 10) return "Please enter a valid 10-digit phone number.";
        if (form.aadhaarNo && form.aadhaarNo.length !== 12) return "Aadhaar number must be 12 digits.";
    }
    if (step === 3) {
        if (!form.designation.trim()) return "Designation is required.";
        if (!form.organization.trim()) return "Organization name is required.";
        if (!form.sector) return "Please select a sector.";
    }
    if (step === 4) {
        if (!form.district) return "Please select a district.";
        if (!form.mandal.trim()) return "Mandal is required.";
        if (!form.address.trim()) return "Address is required.";
    }
    return null;
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<FormData>(INITIAL_FORM);
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const set = (partial: Partial<FormData>) => setForm(prev => ({ ...prev, ...partial }));

    const handleNext = () => {
        const err = validate(step, form);
        if (err) { setError(err); return; }
        setError(null);
        setStep(s => s + 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBack = () => {
        setError(null);
        setStep(s => s - 1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        setError(null);
        try {
            const payload = {
                rampWorkshop: form.rampWorkshop,
                firstName: form.firstName,
                lastName: form.lastName,
                age: Number(form.age),
                gender: form.gender,
                email: form.email,
                phone: form.phone,
                aadhaarNo: form.aadhaarNo,
                udhyamRegistrationNo: form.udhyamRegistrationNo,
                socialCategory: form.socialCategory,
                minorities: form.minorities,
                disability: form.disability,
                designation: form.designation,
                organization: form.organization,
                sector: form.sector,
                address: form.address,
                district: form.district,
                mandal: form.mandal,
            };
            const res = await fetch("https://metaverseedu.in/workflow1/ramp/enrollments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                const errJson = await res.json().catch(() => ({}));
                throw new Error(errJson.message ?? `Error ${res.status}`);
            }
            setSuccess(true);
        } catch (e: any) {
            setError(e.message ?? "Submission failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    // ── Success screen ──────────────────────────────────────────────────────
    if (success) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center"
                >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-3">You're Registered!</h2>
                    <p className="text-slate-500 text-[15px] mb-2">
                        Welcome, <strong>{form.firstName} {form.lastName}</strong>!
                    </p>
                    <p className="text-slate-400 text-[14px] mb-8">
                        Your registration for <strong>{form.rampWorkshop}</strong> has been submitted successfully. Check your email at <strong>{form.email}</strong> for confirmation.
                    </p>
                    <div className="flex flex-col gap-3">
                        <a
                            href="/programs"
                            className="block w-full py-3.5 bg-gradient-to-r from-blue-900 to-blue-800 text-white font-bold rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all text-[15px]"
                        >
                            Browse More Programs
                        </a>
                        <a
                            href="/"
                            className="block w-full py-3.5 border border-slate-200 text-slate-600 font-semibold rounded-2xl hover:bg-slate-50 transition text-[15px]"
                        >
                            Back to Home
                        </a>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentStep = STEPS[step - 1];
    const StepIcon = currentStep.icon;

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero — compact split layout */}
            <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 px-4 overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
                <div className="absolute top-0 right-0 w-[500px] h-full bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-6xl mx-auto py-8 sm:py-10 flex flex-col sm:flex-row items-center gap-8">
                    {/* Left: copy */}
                    <div className="flex-1 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-[11px] font-bold mb-4 backdrop-blur-md">
                            <Zap className="w-3 h-3" /> RAMP Telangana &bull; MSME Registration
                        </div>
                        <h1 className="text-2xl sm:text-[32px] font-black text-white leading-tight tracking-tight mb-2">
                            Register <span className="text-emerald-400">Yourself</span>
                        </h1>
                        <p className="text-blue-200/70 text-sm max-w-sm mb-5">
                            Join Telangana&apos;s MSME growth network — unlock training, mentorship &amp; funding.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { icon: "🎓", text: "Free Training Programs" },
                                { icon: "🤝", text: "Mentorship Access" },
                                { icon: "💰", text: "Scheme Eligibility" },
                                { icon: "📍", text: "District-Level Support" },
                            ].map(b => (
                                <span key={b.text} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/10 text-blue-100 text-[11px] font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                                    <span>{b.icon}</span> {b.text}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right: compact stats */}
                    <div className="shrink-0 w-full sm:w-auto grid grid-cols-2 gap-3">
                        {[
                            { value: "33", label: "Districts Covered", color: "text-emerald-400" },
                            { value: "9", label: "Core Interventions", color: "text-blue-300" },
                            { value: "2000+", label: "MSMEs Supported", color: "text-amber-300" },
                            { value: "Free", label: "Registration", color: "text-rose-300" },
                        ].map(stat => (
                            <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center backdrop-blur-sm">
                                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                                <p className="text-[11px] text-blue-200/60 font-semibold mt-0.5">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Step Indicator */}
            <div className="bg-white border-b border-slate-100 shadow-sm sticky top-[72px] z-40">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-1">
                        {STEPS.map((s, i) => {
                            const SIcon = s.icon;
                            const isActive = s.id === step;
                            const isDone = s.id < step;
                            const isFuture = s.id > step;

                            const handleStepClick = () => {
                                if (isFuture) return; // can't skip ahead
                                if (isActive) return; // already here
                                setError(null);
                                setStep(s.id);
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            };

                            return (
                                <React.Fragment key={s.id}>
                                    <button
                                        type="button"
                                        onClick={handleStepClick}
                                        disabled={isFuture}
                                        title={isFuture ? "Complete previous steps first" : s.label}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all shrink-0 outline-none
                                            ${isActive
                                                ? "bg-blue-900 text-white shadow ring-2 ring-blue-300/40"
                                                : isDone
                                                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer"
                                                    : "bg-slate-100 text-slate-500 cursor-not-allowed border border-slate-200/80"}
                                        `}
                                    >
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[12px] font-black transition-all
                                            ${isActive ? "bg-white/20" :
                                                isDone ? "bg-emerald-500 text-white" :
                                                    "bg-slate-200 text-slate-400"}
                                        `}>
                                            {isDone ? <CheckCircle2 className="w-4 h-4" /> : isFuture ? <span>{s.id}</span> : <SIcon className="w-3.5 h-3.5" />}
                                        </div>
                                        <span className={`text-[12px] font-bold hidden sm:block`}>{s.label}</span>
                                    </button>
                                    {i < STEPS.length - 1 && (
                                        <div className={`h-px flex-1 min-w-[12px] transition-colors duration-300 ${s.id < step ? "bg-emerald-400" : "bg-slate-200"}`} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Form Body */}
            <div className="max-w-2xl mx-auto px-4 py-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.25 }}
                    >
                        {/* Card */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                            {/* Card Header */}
                            <div className="flex items-center gap-4 px-7 py-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
                                <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center shadow-md">
                                    <StepIcon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Step {step} of {STEPS.length}</p>
                                    <h2 className="text-[20px] font-black text-slate-900">{currentStep.label}</h2>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="px-7 py-7">
                                {step === 1 && <Step1 form={form} set={set} />}
                                {step === 2 && <Step2 form={form} set={set} />}
                                {step === 3 && <Step3 form={form} set={set} />}
                                {step === 4 && <Step4 form={form} set={set} />}
                                {step === 5 && <Step5 form={form} />}
                            </div>
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-3 mt-4 px-5 py-3.5 bg-red-50 border border-red-200 rounded-2xl"
                                >
                                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                                    <p className="text-[13px] font-semibold text-red-700">{error}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-6 gap-4">
                            {step > 1 ? (
                                <button
                                    onClick={handleBack}
                                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-slate-200 bg-white text-slate-700 font-bold text-[14px] hover:bg-slate-50 hover:border-slate-300 transition"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                            ) : (
                                <div />
                            )}

                            {step < STEPS.length ? (
                                <button
                                    onClick={handleNext}
                                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-800 text-white font-bold text-[14px] hover:shadow-lg hover:-translate-y-0.5 transition-all ml-auto"
                                >
                                    Continue <ChevronRight className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={submitting}
                                    className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-[14px] hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5 transition-all ml-auto disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                    ) : (
                                        <><CheckCircle2 className="w-4 h-4" /> Submit Registration</>
                                    )}
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
