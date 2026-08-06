import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function ProfileCompletionBanner() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (!profile) return null;

    const fields = [
        profile.full_name,
        profile.phone,
        profile.blood_type,
        profile.gender,
        profile.division,
        profile.district,
        profile.date_of_birth,
        profile.avatar_url,
    ];

    const completed = fields.filter(Boolean).length;
    const percentage = Math.round((completed / fields.length) * 100);

    if (percentage === 100) return null;

    return (
        <section className="rounded-2xl border border-yellow-300 bg-yellow-50 p-6 dark:border-yellow-700 dark:bg-yellow-900/20">
            <div className="flex items-start gap-4">
                <AlertTriangle className="mt-1 text-yellow-600" size={26} />

                <div className="flex-1">
                    <h2 className="text-lg font-bold text-yellow-900 dark:text-yellow-300">
                        Complete Your Profile
                    </h2>

                    <p className="mt-2 text-sm text-yellow-800 dark:text-yellow-200">
                        Your profile is currently{" "}
                        <span className="font-bold">{percentage}%</span> complete.
                        Completing your profile helps patients find you and unlocks all
                        Life-Link features.
                    </p>

                    <div className="mt-4 h-3 w-full rounded-full bg-yellow-200 dark:bg-yellow-800">
                        <div
                            className="h-3 rounded-full bg-yellow-500 transition-all"
                            style={{ width: `${percentage}%` }}
                        />
                    </div>

                    <Link
                        href="/profile"
                        className="mt-6 inline-flex rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
                    >
                        Complete Profile
                    </Link>
                </div>
            </div>
        </section>
    );
}