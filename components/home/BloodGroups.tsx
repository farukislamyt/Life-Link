import Link from "next/link";
import { Droplets, ArrowRight } from "lucide-react";

const bloodGroups = [
    {
        type: "A+",
        canDonateTo: "A+, AB+",
        canReceiveFrom: "A+, A-, O+, O-",
        color: "bg-red-600",
    },
    {
        type: "A-",
        canDonateTo: "A+, A-, AB+, AB-",
        canReceiveFrom: "A-, O-",
        color: "bg-red-500",
    },
    {
        type: "B+",
        canDonateTo: "B+, AB+",
        canReceiveFrom: "B+, B-, O+, O-",
        color: "bg-rose-600",
    },
    {
        type: "B-",
        canDonateTo: "B+, B-, AB+, AB-",
        canReceiveFrom: "B-, O-",
        color: "bg-rose-500",
    },
    {
        type: "AB+",
        canDonateTo: "AB+",
        canReceiveFrom: "All Blood Groups",
        color: "bg-pink-600",
    },
    {
        type: "AB-",
        canDonateTo: "AB+, AB-",
        canReceiveFrom: "A-, B-, AB-, O-",
        color: "bg-pink-500",
    },
    {
        type: "O+",
        canDonateTo: "A+, B+, O+, AB+",
        canReceiveFrom: "O+, O-",
        color: "bg-red-700",
    },
    {
        type: "O-",
        canDonateTo: "Everyone",
        canReceiveFrom: "O-",
        color: "bg-red-800",
    },
];

export default function BloodGroups() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                        Blood Compatibility
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
                        Blood Groups
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Learn blood compatibility and quickly find the right donor
                        during an emergency.
                    </p>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    {bloodGroups.map((group) => (
                        <div
                            key={group.type}
                            className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div
                                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${group.color} text-white`}
                            >
                                <Droplets size={36} />
                            </div>

                            <h3 className="mt-6 text-center text-4xl font-bold">
                                {group.type}
                            </h3>

                            <div className="mt-6 space-y-4">

                                <div>
                                    <p className="text-sm font-semibold text-red-600">
                                        Can Donate To
                                    </p>

                                    <p className="mt-1 text-sm text-slate-600">
                                        {group.canDonateTo}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-red-600">
                                        Can Receive From
                                    </p>

                                    <p className="mt-1 text-sm text-slate-600">
                                        {group.canReceiveFrom}
                                    </p>
                                </div>

                            </div>

                            <Link
                                href={`/donors?bloodGroup=${encodeURIComponent(group.type)}`}
                                className="mt-8 inline-flex items-center gap-2 font-semibold text-red-600 hover:text-red-700"
                            >
                                Find Donors

                                <ArrowRight size={18} />
                            </Link>

                        </div>
                    ))}

                </div>

            </div>
        </section>
    );
}