import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import ProfileCard from "@/components/dashboard/ProfileCard";
import ProfileCompletionBanner from "@/components/dashboard/ProfileCompletionBanner";
import DashboardStats from "@/components/dashboard/DashboardStats";

const actions = [
    {
        title: "Request Blood",
        href: "/blood-requests/create",
        description: "Create an emergency blood request.",
    },
    {
        title: "Find Donor",
        href: "/donors",
        description: "Search for available blood donors.",
    },
    {
        title: "Become Donor",
        href: "/profile",
        description: "Complete your donor profile.",
    },
    {
        title: "Nearby Hospitals",
        href: "/hospitals",
        description: "Browse nearby hospitals and blood banks.",
    },
];

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="space-y-8">
            {/* Profile */}
            <ProfileCard />

            {/* Profile Completion */}
            <ProfileCompletionBanner />

            {/* Statistics */}
            <DashboardStats />

            {/* Quick Actions */}
            <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                        Quick Actions
                    </h2>

                    <span className="text-sm text-slate-500">
                        Frequently used shortcuts
                    </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {actions.map((action) => (
                        <Link
                            key={action.title}
                            href={action.href}
                            className="rounded-xl border border-slate-200 p-5 transition hover:border-red-500 hover:bg-red-50 dark:border-slate-700 dark:hover:bg-slate-800"
                        >
                            <h3 className="font-semibold">
                                {action.title}
                            </h3>

                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {action.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Recent Activity */}
            <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                        Recent Activity
                    </h2>

                    <Link
                        href="/notifications"
                        className="text-sm font-medium text-red-600 hover:underline"
                    >
                        View All
                    </Link>
                </div>

                <div className="space-y-4">
                    <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                        <h3 className="font-semibold">
                            No recent activity
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Your donations, blood requests, and notifications will appear here.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}