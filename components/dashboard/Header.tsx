"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        if (dark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [dark]);

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
            {/* Search */}
            <div className="hidden w-full max-w-md items-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 lg:flex dark:border-slate-700 dark:bg-slate-800">
                <Search size={18} className="text-slate-500" />

                <input
                    type="text"
                    placeholder="Search..."
                    className="ml-3 w-full bg-transparent outline-none"
                />
            </div>

            {/* Right Side */}
            <div className="ml-auto flex items-center gap-4">
                {/* Notification */}
                <button className="relative rounded-full bg-slate-100 p-3 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
                    <Bell size={20} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                </button>

                {/* Theme */}
                <button
                    onClick={() => setDark(!dark)}
                    className="rounded-full bg-slate-100 p-3 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                    {dark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* User */}
                <div className="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-2 dark:bg-slate-800">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white">
                        F
                    </div>

                    <div className="hidden lg:block">
                        <h3 className="font-semibold">Faruk Islam</h3>

                        <p className="text-sm text-slate-500">
                            Blood Donor
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}