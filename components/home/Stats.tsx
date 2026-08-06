import {
    Users,
    Heart,
    Building2,
    Activity,
} from "lucide-react";

const stats = [
    {
        title: "Registered Donors",
        value: "5,000+",
        description: "Verified blood donors",
        icon: Users,
        color: "bg-red-100 text-red-600",
    },
    {
        title: "Blood Requests",
        value: "1,250+",
        description: "Emergency requests served",
        icon: Heart,
        color: "bg-rose-100 text-rose-600",
    },
    {
        title: "Hospitals",
        value: "120+",
        description: "Partner hospitals",
        icon: Building2,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Lives Saved",
        value: "8,500+",
        description: "Through successful donations",
        icon: Activity,
        color: "bg-green-100 text-green-600",
    },
];

export default function Stats() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-16 text-center">
                    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                        Community Impact
                    </span>

                    <h2 className="mt-5 text-4xl font-bold text-slate-900">
                        Together We Save Lives
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                        Thousands of generous donors, hospitals, and volunteers
                        work together every day to help patients receive the blood
                        they urgently need.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    {stats.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div
                                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${item.color}`}
                                >
                                    <Icon size={30} />
                                </div>

                                <h3 className="text-4xl font-bold text-slate-900">
                                    {item.value}
                                </h3>

                                <p className="mt-2 text-lg font-semibold text-slate-700">
                                    {item.title}
                                </p>

                                <p className="mt-2 text-sm text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}