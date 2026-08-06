import Link from "next/link";
import {
    ArrowRight,
    HeartHandshake,
    Droplets,
    ShieldCheck,
} from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-500 to-rose-600 pt-36 pb-24 text-white">

            {/* Background circles */}
            <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">

                {/* Left */}
                <div>

                    <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
                        ❤️ Save Lives Through Blood Donation
                    </span>

                    <h1 className="mt-8 text-5xl font-extrabold leading-tight lg:text-7xl">
                        Donate Blood.
                        <br />
                        Save Lives.
                    </h1>

                    <p className="mt-6 max-w-xl text-lg text-red-100">
                        Life-Link connects blood donors, hospitals and patients,
                        making emergency blood donation faster, safer and easier
                        across Bangladesh.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <Link
                            href="/signup"
                            className="rounded-xl bg-white px-7 py-4 font-semibold text-red-600 transition hover:scale-105"
                        >
                            Become a Donor
                        </Link>

                        <Link
                            href="/blood-requests"
                            className="flex items-center gap-2 rounded-xl border border-white px-7 py-4 font-semibold transition hover:bg-white hover:text-red-600"
                        >
                            Find Blood
                            <ArrowRight size={18} />
                        </Link>

                    </div>

                    <div className="mt-12 flex flex-wrap gap-8">

                        <div className="flex items-center gap-3">
                            <HeartHandshake size={28} />
                            <div>
                                <p className="font-bold">Verified Donors</p>
                                <p className="text-sm text-red-100">
                                    Trusted community
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <ShieldCheck size={28} />
                            <div>
                                <p className="font-bold">Secure Platform</p>
                                <p className="text-sm text-red-100">
                                    Protected user data
                                </p>
                            </div>
                        </div>

                    </div>

                </div>

                {/* Right */}
                <div className="flex justify-center">

                    <div className="w-full max-w-md rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">

                        <div className="mb-6 flex items-center gap-3">
                            <Droplets
                                size={36}
                                className="text-red-600"
                            />

                            <div>
                                <h2 className="text-xl font-bold">
                                    Emergency Blood Needed
                                </h2>

                                <p className="text-sm text-slate-500">
                                    Search donors instantly
                                </p>
                            </div>
                        </div>

                        <form className="space-y-4">

                            <select className="w-full rounded-xl border p-3">
                                <option>Select Blood Group</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                                <option>O+</option>
                                <option>O-</option>
                            </select>

                            <input
                                type="text"
                                placeholder="District"
                                className="w-full rounded-xl border p-3"
                            />

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700"
                            >
                                Search Donors
                            </button>

                        </form>

                        <div className="mt-8 grid grid-cols-3 gap-4 text-center">

                            <div>
                                <h3 className="text-2xl font-bold text-red-600">
                                    5K+
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Donors
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-red-600">
                                    120+
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Hospitals
                                </p>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-red-600">
                                    8K+
                                </h3>

                                <p className="text-xs text-slate-500">
                                    Lives Saved
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}