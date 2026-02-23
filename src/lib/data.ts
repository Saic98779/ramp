import {
    BarChart3, MapPin, Cpu, Factory, TrendingUp, Leaf, Users, Rocket, Target,
    Award, Shield, Building2, FileText, Globe, Cloud
} from "lucide-react";

export const interventions = [
    { id: "database", title: "Consolidated MSME DB", desc: "Unified MSME Intelligence Hub for real-time visual dashboards and insights.", icon: BarChart3, agency: "Directorate of Industries", logo: null, color: "from-blue-500 to-blue-600", bgLight: "bg-blue-50", textColor: "text-blue-600" },
    { id: "edc", title: "Setting up of Enterprise Development Centre at DICs", desc: "Your Local Business Growth Partner in all 33 Districts for mentoring and market research.", icon: MapPin, agency: "NiMSME", logo: "/ni-msme.jpeg", color: "from-orange-500 to-orange-600", bgLight: "bg-orange-50", textColor: "text-orange-600" },
    { id: "design", title: "Center of Design Excellence", desc: "Future-Proofing Manufacturing with technology roadmaps for thrust sectors.", icon: Cpu, agency: "IIT Hyderabad", logo: null, color: "from-violet-500 to-violet-600", bgLight: "bg-violet-50", textColor: "text-violet-600" },
    { id: "import", title: "Import Substitution & Export", desc: "Identifying 20 products to manufacture locally and handholding 50 MSMEs for exports.", icon: Factory, agency: "TGTPC", logo: null, color: "from-rose-500 to-rose-600", bgLight: "bg-rose-50", textColor: "text-rose-600" },
    { id: "revival", title: "Reviving Distressed MSMEs", desc: "MSME Health Clinic & Turnaround Support preventing NPA status for 108 sick MSMEs.", icon: TrendingUp, agency: "TIHCL", logo: "/tihcl.jpeg", color: "from-emerald-500 to-emerald-600", bgLight: "bg-emerald-50", textColor: "text-emerald-600" },
    { id: "green", title: "Greening MSMEs", desc: "Helping 2,000+ MSMEs adopt low-carbon technologies and green financing.", icon: Leaf, agency: "RICH", logo: "/rich.jpeg", color: "from-teal-500 to-teal-600", bgLight: "bg-teal-50", textColor: "text-teal-600" },
    { id: "shg", title: "SHGs & Startups to MSMEs", desc: "Promoting self-help groups and grassroots startups into formal MSME sectors.", icon: Users, agency: "ALEAP", logo: "/aleap.jpeg", color: "from-cyan-500 to-cyan-600", bgLight: "bg-cyan-50", textColor: "text-cyan-600" },
    { id: "women", title: "Women Acceleration Program", desc: "Supporting 140 women-owned startups to achieve 2x business growth.", icon: Rocket, agency: "WE Hub", logo: "/we-hub.jpeg", color: "from-fuchsia-500 to-fuchsia-600", bgLight: "bg-fuchsia-50", textColor: "text-fuchsia-600" },
    { id: "benchmark", title: "Benchmarking Studies", desc: "Benchmarking technology gaps in thrust sectors like Plastics, Auto, and Tooling.", icon: Target, agency: "CITD, CIPET", logo: "/CITD.jpeg", logo2: "/cipet.jpeg", color: "from-indigo-500 to-indigo-600", bgLight: "bg-indigo-50", textColor: "text-indigo-600" },
];

export const schemes = [
    { name: "Udyam Registration", benefit: "Official recognition & access to all Govt subsidies.", link: "https://udyamregistration.gov.in", icon: Award },
    { name: "ZED", benefit: "Zero Defect Zero Effect certification for quality and environment.", link: "https://zed.msme.gov.in", icon: Shield },
    { name: "LEAN", benefit: "Enhance productivity through LEAN manufacturing practices.", link: "https://lean.msme.gov.in", icon: TrendingUp },
    { name: "PMS", benefit: "Procurement and Marketing Support for enhanced marketability.", link: "https://msme.gov.in/procurement-and-marketing-support-scheme", icon: Target },
    { name: "CGTMSE", benefit: "Collateral-free credit for your business expansion.", link: "https://cgtmse.in", icon: Building2 },
    { name: "TReDS", benefit: "Resolve delayed payments by discounting invoices.", link: "https://mjsme.gov.in/treds", icon: FileText },
    { name: "ONDC", benefit: "Take your products to a national digital marketplace.", link: "https://ondc.org", icon: Globe },
    { name: "GeM Portal", benefit: "Sell your products directly to Government departments.", link: "https://gem.gov.in", icon: Cloud },
];

export const partners = [
    { name: "TIHCL", icon: Shield, logo: "/tihcl.jpeg" },
    { name: "CIPET", icon: Cpu, logo: "/cipet.jpeg" },
    { name: "CITD", icon: Target, logo: "/CITD.jpeg" },
    { name: "NiMSME", icon: Award, logo: "/ni-msme.jpeg" },
    { name: "TGTPC", icon: Factory, logo: null },
    { name: "RICH", icon: Leaf, logo: "/rich.jpeg" },
    { name: "WE HUB", icon: Rocket, logo: "/we-hub.jpeg" },
    { name: "IIT Hyderabad", icon: Building2, logo: null },
    { name: "ALEAP", icon: Users, logo: "/aleap.jpeg" },
    { name: "Directorate of Industries", icon: Globe, logo: null },
];
