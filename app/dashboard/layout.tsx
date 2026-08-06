import Link from "next/link";
import {
    ArrowRight,
    Heart,
    Users,
    Hospital,
    Droplets,
} from "lucide-react";

export default function HomePage() {
    return (
        <main className="min-h-screen bg-white text-slate-900">

            {/* Hero */}
            <section className="bg-gradient-to-r from-red-600 to-rose-500 text-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

                    <h1 className="max-w-4xl text-5xl font-extrabold leading-tight lg:text-6xl">
                        Save Lives Through Blood Donation
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-red-100">
                        Life-Link connects blood donors, patients, and hospitals
                        to make emergency blood donation faster and easier.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/signup"
                            className="rounded-xl bg-white px-6 py-3 font-semibold text-red-600 transition hover:scale-105"
                        >
                            Join Life-Link
                        </Link>

                        <Link
                            href="/blood-requests"
                            className="flex items-center gap-2 rounded-xl border border-white px-6 py-3 font-semibold transition hover:bg-white hover:text-red-600"
                        >
                            Find Blood
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                </div>
            </section>

            {/* Stats */}

            <section className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    icon={<Users size={30} />}
                    title="Registered Donors"
                    value="5,000+"
                />

                <StatCard
                    icon={<Droplets size={30} />}
                    title="Blood Requests"
                    value="1,200+"
                />

                <StatCard
                    icon={<Hospital size={30} />}
                    title="Hospitals"
                    value="120+"
                />

                <StatCard
                    icon={<Heart size={30} />}
                    title="Lives Saved"
                    value="8,000+"
                />

            </section>

            {/* Why Choose */}

            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-7xl px-6">

                    <h2 className="text-center text-4xl font-bold">
                        Why Choose Life-Link?
                    </h2>

                    <div className="mt-14 grid gap-8 md:grid-cols-3">

                        <FeatureCard
                            title="Fast Emergency Matching"
                            description="Find compatible blood donors quickly during emergencies."
                        />

                        <FeatureCard
                            title="Verified Donors"
                            description="Every donor profile is verified and protected."
                        />

                        <FeatureCard
                            title="Nearby Hospitals"
                            description="Locate nearby hospitals and blood banks easily."
                        />

                    </div>

                </div>
            </section>

            {/* CTA */}

            <section className="bg-red-600 py-20 text-white">
                <div className="mx-auto max-w-5xl px-6 text-center">

                    <h2 className="text-4xl font-bold">
                        Become a Hero Today ❤️
                    </h2>

                    <p className="mt-5 text-lg text-red-100">
                        Your single donation can save multiple lives.
                    </p>

                    <Link
                        href="/signup"
                        className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-semibold text-red-600 transition hover:scale-105"
                    >
                        Register as Donor
                    </Link>

                </div>
            </section>

        </main>
    );
}

function StatCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border p-8 text-center shadow-sm">
            <div className="mb-4 flex justify-center text-red-600">
                {icon}
            </div>

            <h3 className="text-4xl font-bold">
                {value}
            </h3>

            <p className="mt-2 text-slate-500">
                {title}
            </p>
        </div>
    );
}

function FeatureCard({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold">
                {title}
            </h3>

            <p className="mt-4 text-slate-600">
                {description}
            </p>
        </div>
    );
}