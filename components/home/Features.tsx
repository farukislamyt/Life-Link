import {
    ShieldCheck,
    Bell,
    MapPinned,
    Smartphone,
    Search,
    Hospital,
    Clock,
    Users,
} from "lucide-react";

const features = [
    {
        title: "Verified Donors",
        description:
            "All donor profiles are verified to improve trust and reliability.",
        icon: ShieldCheck,
    },
    {
        title: "Instant Notifications",
        description:
            "Receive real-time alerts for blood requests and donation updates.",
        icon: Bell,
    },
    {
        title: "Location-Based Search",
        description:
            "Find nearby blood donors using division and district filtering.",
        icon: MapPinned,
    },
    {
        title: "Mobile Friendly",
        description:
            "Access Life-Link seamlessly on desktop, tablet, and mobile devices.",
        icon: Smartphone,
    },
    {
        title: "Advanced Search",
        description:
            "Search donors by blood group, location, and availability.",
        icon: Search,
    },
    {
        title: "Hospital Directory",
        description:
            "Browse hospitals and blood banks with complete contact details.",
        icon: Hospital,
    },
    {
        title: "24/7 Availability",
        description:
            "Life-Link is available around the clock for emergency situations.",
        icon: Clock,
    },
    {
        title: "Community Driven",
        description:
            "Connect donors, patients, volunteers, and hospitals on one platform.",
        icon: Users,
    },
];

export default function Features() {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto max-w-3xl text-center">
                    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                        Platform Features
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
                        Everything You Need
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Life-Link combines modern technology with healthcare to make
                        blood donation simple, secure, and efficient.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-xl"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                                    <Icon size={30} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold text-slate-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-600">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}