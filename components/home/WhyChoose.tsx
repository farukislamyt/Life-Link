import {
    ShieldCheck,
    HeartHandshake,
    Clock3,
    MapPin,
    BellRing,
    Hospital,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Verified Donors",
        description:
            "All donor profiles are verified to improve trust and reliability during emergencies.",
    },
    {
        icon: Clock3,
        title: "24/7 Emergency Support",
        description:
            "Create urgent blood requests anytime and connect with nearby donors quickly.",
    },
    {
        icon: MapPin,
        title: "Location-Based Search",
        description:
            "Find compatible blood donors based on division and district for faster response.",
    },
    {
        icon: HeartHandshake,
        title: "Community Driven",
        description:
            "Connect generous donors, patients, volunteers, and hospitals on one platform.",
    },
    {
        icon: BellRing,
        title: "Instant Notifications",
        description:
            "Receive notifications about new blood requests and important updates instantly.",
    },
    {
        icon: Hospital,
        title: "Hospital Network",
        description:
            "Browse hospitals and blood banks to locate emergency blood services nearby.",
    },
];

export default function WhyChoose() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto max-w-3xl text-center">
                    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                        Why Life-Link
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
                        Why Choose Life-Link?
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        We make blood donation faster, safer, and more reliable by
                        connecting donors, patients, hospitals, and volunteers through
                        a secure digital platform.
                    </p>
                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 transition group-hover:bg-red-600 group-hover:text-white">
                                    <Icon size={30} />
                                </div>

                                <h3 className="mt-6 text-2xl font-bold text-slate-900">
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