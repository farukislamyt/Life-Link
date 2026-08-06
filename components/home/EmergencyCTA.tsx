import Link from "next/link";
import {
    Siren,
    Heart,
    ArrowRight,
    PhoneCall,
} from "lucide-react";

export default function EmergencyCTA() {
    return (
        <section className="bg-gradient-to-r from-red-700 via-red-600 to-rose-600 py-24 text-white">
            <div className="mx-auto max-w-7xl px-6">

                <div className="grid items-center gap-16 lg:grid-cols-2">

                    {/* Left */}

                    <div>

                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                            <Siren size={18} />
                            Emergency Blood Request
                        </div>

                        <h2 className="mt-8 text-5xl font-extrabold leading-tight">
                            Need Blood
                            <br />
                            Immediately?
                        </h2>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-red-100">
                            Create an emergency blood request and instantly notify nearby
                            compatible donors. Every second matters during emergencies.
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                href="/blood-requests/create"
                                className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-semibold text-red-600 transition hover:scale-105"
                            >
                                <Heart size={20} />
                                Request Blood
                            </Link>

                            <Link
                                href="/donors"
                                className="inline-flex items-center gap-3 rounded-xl border border-white px-8 py-4 font-semibold transition hover:bg-white hover:text-red-600"
                            >
                                Find Donor
                                <ArrowRight size={18} />
                            </Link>

                        </div>

                    </div>

                    {/* Right */}

                    <div className="rounded-3xl bg-white p-10 text-slate-900 shadow-2xl">

                        <div className="flex items-center gap-4">

                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">
                                <PhoneCall size={30} />
                            </div>

                            <div>

                                <h3 className="text-2xl font-bold">
                                    Emergency Support
                                </h3>

                                <p className="text-slate-500">
                                    Available 24 hours a day
                                </p>

                            </div>

                        </div>

                        <div className="mt-10 space-y-6">

                            <div className="rounded-2xl bg-red-50 p-5">
                                <h4 className="font-bold text-red-600">
                                    Fast Matching
                                </h4>

                                <p className="mt-2 text-sm text-slate-600">
                                    Automatically connect with nearby compatible blood donors.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-red-50 p-5">
                                <h4 className="font-bold text-red-600">
                                    Verified Community
                                </h4>

                                <p className="mt-2 text-sm text-slate-600">
                                    Every donor profile is verified before joining the platform.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-red-50 p-5">
                                <h4 className="font-bold text-red-600">
                                    Hospital Support
                                </h4>

                                <p className="mt-2 text-sm text-slate-600">
                                    Connect with hospitals and blood banks during emergencies.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}