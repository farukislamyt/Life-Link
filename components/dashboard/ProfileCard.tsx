import { createClient } from "@/lib/supabase/server";
import { User, MapPin, Droplets } from "lucide-react";

export default async function ProfileCard() {
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

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-slate-900">
            <div className="flex items-center gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-3xl font-bold text-white">
                    {profile?.full_name?.charAt(0) ?? "U"}
                </div>

                <div>
                    <h2 className="text-2xl font-bold">
                        {profile?.full_name || "Unknown User"}
                    </h2>

                    <p className="text-slate-500">
                        {user.email}
                    </p>
                </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                    <Droplets className="text-red-600" />
                    <div>
                        <p className="text-sm text-slate-500">
                            Blood Group
                        </p>

                        <p className="font-semibold">
                            {profile?.blood_type ?? "Not Added"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                    <MapPin className="text-blue-600" />
                    <div>
                        <p className="text-sm text-slate-500">
                            Division
                        </p>

                        <p className="font-semibold">
                            {profile?.division ?? "Not Added"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-slate-100 p-4 dark:bg-slate-800">
                    <User className="text-green-600" />
                    <div>
                        <p className="text-sm text-slate-500">
                            District
                        </p>

                        <p className="font-semibold">
                            {profile?.district ?? "Not Added"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}