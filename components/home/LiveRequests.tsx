import Link from "next/link";
import {
    MapPin,
    Calendar,
    Droplets,
    Clock,
    ArrowRight,
} from "lucide-react";

const requests = [
    {
        id: 1,
        blood: "A+",
        hospital: "Dhaka Medical College Hospital",
        location: "Dhaka",
        units: 2,
        urgency: "Critical",
        time: "2 hours ago",
    },
    {
        id: 2,
        blood: "O-",
        hospital: "Square Hospital",
        location: "Dhaka",
        units: 1,
        urgency: "High",
        time: "5 hours ago",
    },
    {
        id: 3,
        blood: "AB+",
        hospital: "Chattogram Medical College",
        location: "Chattogram",
        units: 3,
        urgency: "Medium",
        time: "Today",
    },
];

export default function LiveRequests() {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">

                    <div>

                        <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                            Emergency Requests
                        </span>

                        <h2 className="mt-5 text-4xl font-bold text-slate-900">
                            Active Blood Requests
                        </h2>

                        <p className="mt-4 max-w-2xl text-lg text-slate-600">
                            These are recent emergency blood requests. Once your database
                            is connected, this section will automatically display real
                            requests from Supabase.
                        </p>

                    </div>

                    <Link
                        href="/blood-requests"
                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                        View All Requests

                        <ArrowRight size={18} />
                    </Link>

                </div>

                <div className="mt-14 grid gap-8 lg:grid-cols-3">

                    {requests.map((request) => (

                        <div
                            key={request.id}
                            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                        >

                            <div className="flex items-center justify-between">

                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-2xl font-bold text-white">
                                    {request.blood}
                                </div>

                                <span
                                    className={`rounded-full px-4 py-2 text-sm font-semibold ${request.urgency === "Critical"
                                            ? "bg-red-100 text-red-600"
                                            : request.urgency === "High"
                                                ? "bg-orange-100 text-orange-600"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                >
                                    {request.urgency}
                                </span>

                            </div>

                            <h3 className="mt-8 text-2xl font-bold">
                                {request.hospital}
                            </h3>

                            <div className="mt-6 space-y-4 text-slate-600">

                                <div className="flex items-center gap-3">
                                    <MapPin size={18} />
                                    {request.location}
                                </div>

                                <div className="flex items-center gap-3">
                                    <Droplets size={18} />
                                    {request.units} Blood Unit(s)
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar size={18} />
                                    Emergency Request
                                </div>

                                <div className="flex items-center gap-3">
                                    <Clock size={18} />
                                    {request.time}
                                </div>

                            </div>

                            <Link
                                href={`/blood-requests/${request.id}`}
                                className="mt-8 inline-flex items-center gap-2 font-semibold text-red-600 hover:text-red-700"
                            >
                                View Details

                                <ArrowRight size={18} />
                            </Link>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}