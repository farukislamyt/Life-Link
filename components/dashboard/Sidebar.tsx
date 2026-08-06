"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    User,
    HeartPulse,
    Droplets,
    History,
    Bell,
    Building2,
    FileText,
    Settings,
    LogOut,
} from "lucide-react";

const menuItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Profile",
        href: "/profile",
        icon: User,
    },
    {
        title: "Blood Requests",
        href: "/blood-requests",
        icon: HeartPulse,
    },
    {
        title: "Find Donor",
        href: "/donors",
        icon: Droplets,
    },
    {
        title: "My Donations",
        href: "/donations",
        icon: History,
    },
    {
        title: "Notifications",
        href: "/notifications",
        icon: Bell,
    },
    {
        title: "Hospitals",
        href: "/hospitals",
        icon: Building2,
    },
    {
        title: "Reports",
        href: "/reports",
        icon: FileText,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-72 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col">
            {/* Logo */}
            <div className="border-b border-slate-200 p-6 dark:border-slate-800">
                <Link href="/dashboard">
                    <h1 className="text-2xl font-bold text-red-600">
                        🩸 Life-Link
                    </h1>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2 p-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${active
                                    ? "bg-red-600 text-white"
                                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                                }`}
                        >
                            <Icon size={20} />
                            <span>{item.title}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="border-t border-slate-200 p-4 dark:border-slate-800">
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20">
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
        </aside>
    );
}