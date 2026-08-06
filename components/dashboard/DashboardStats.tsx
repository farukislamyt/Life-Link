import { createClient } from "@/lib/supabase/server";
import {
    Heart,
    Droplets,
    Bell,
    Building2,
} from "lucide-react";

export default async function DashboardStats() {
    const supabase = await createClient();

    const [
        bloodRequests,
        donations,
        notifications,
        hospitals,
    ] = await Promise.all([
        supabase
            .from("blood_requests")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("donations")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("notifications")
            .select("*", { count: "exact", head: true }),

        supabase
            .from("hospitals")
            .select("*", { count: "exact", head: true }),
    ]);

    const stats = [
        {
            title: "Blood Requests",
            value: bloodRequests.count ?? 0,
            icon: Heart,
            color: "bg-red-500",
        },
        {
            title: "My Donations",
            value: donations.count ?? 0,
            icon: Droplets,
            color: "bg-emerald-500",
        },
        {
            title: "Notifications",
            value: notifications.count ?? 0,
            icon: Bell,
            color: "bg-yellow-500",
        },
        {
            title: "Hospitals",
            value: hospitals.count ?? 0,
            icon: Building2,
            color: "bg-blue-500",
        },
    ];

    return (
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg dark:bg-slate-900"
                    >
                        <div
                            className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${item.color}`}
                        >
                            <Icon className="text-white" size={28} />
                        </div>

                        <h2 className="text-sm text-slate-500">
                            {item.title}
                        </h2>

                        <p className="mt-2 text-3xl font-bold">
                            {item.value}
                        </p>
                    </div>
                );
            })}
        </section>
    );
}