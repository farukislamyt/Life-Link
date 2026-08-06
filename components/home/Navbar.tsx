"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Donors", href: "/donors" },
    { name: "Blood Requests", href: "/blood-requests" },
    { name: "Hospitals", href: "/hospitals" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">

                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 text-2xl font-bold text-red-600"
                    >
                        <Heart
                            size={30}
                            className="fill-red-600 text-red-600"
                        />

                        <span>Life-Link</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 lg:flex">

                        {navLinks.map((item) => {

                            const active = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`font-medium transition-colors duration-200 ${active
                                            ? "text-red-600"
                                            : "text-slate-700 hover:text-red-600"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}

                    </nav>

                    {/* Desktop Buttons */}

                    <div className="hidden items-center gap-3 lg:flex">

                        <Link
                            href="/login"
                            className="rounded-xl border border-red-600 px-5 py-2 font-medium text-red-600 transition hover:bg-red-50"
                        >
                            Login
                        </Link>

                        <Link
                            href="/signup"
                            className="rounded-xl bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700"
                        >
                            Sign Up
                        </Link>

                    </div>

                    {/* Mobile Button */}

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
                        aria-label="Toggle navigation"
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                </div>

                {/* Mobile Menu */}

                {mobileOpen && (

                    <div className="border-t border-slate-200 bg-white lg:hidden">

                        <nav className="flex flex-col px-6 py-4">

                            {navLinks.map((item) => {

                                const active = pathname === item.href;

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`rounded-lg px-4 py-3 font-medium transition ${active
                                                ? "bg-red-50 text-red-600"
                                                : "text-slate-700 hover:bg-slate-100 hover:text-red-600"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}

                            <div className="mt-6 flex flex-col gap-3">

                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-xl border border-red-600 py-3 text-center font-medium text-red-600 transition hover:bg-red-50"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/signup"
                                    onClick={() => setMobileOpen(false)}
                                    className="rounded-xl bg-red-600 py-3 text-center font-medium text-white transition hover:bg-red-700"
                                >
                                    Sign Up
                                </Link>

                            </div>

                        </nav>

                    </div>

                )}

            </header>

            {/* Spacer for Fixed Navbar */}

            <div className="h-20" />
        </>
    );
}