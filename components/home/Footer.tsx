import Link from "next/link";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaGithub,
} from "react-icons/fa";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-white">
            <div className="mx-auto max-w-7xl px-6 py-20">

                <div className="grid gap-12 lg:grid-cols-4">

                    {/* Brand */}
                    <div>

                        <div className="flex items-center gap-3">
                            <Heart
                                size={32}
                                className="fill-red-600 text-red-600"
                            />

                            <h2 className="text-3xl font-bold">
                                Life-Link
                            </h2>
                        </div>

                        <p className="mt-6 leading-8 text-slate-400">
                            Connecting blood donors, patients, hospitals, and volunteers
                            to save lives through fast and secure blood donation.
                        </p>

                        <div className="mt-8 flex gap-4">

                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="rounded-xl bg-slate-800 p-3 transition hover:bg-red-600"
                            >
                                <FaFacebookF size={20} />
                            </Link>

                            <Link
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="rounded-xl bg-slate-800 p-3 transition hover:bg-red-600"
                            >
                                <FaInstagram size={20} />
                            </Link>

                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="rounded-xl bg-slate-800 p-3 transition hover:bg-red-600"
                            >
                                <FaLinkedinIn size={20} />
                            </Link>

                            <Link
                                href="https://github.com/farukislamyt"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="rounded-xl bg-slate-800 p-3 transition hover:bg-red-600"
                            >
                                <FaGithub size={20} />
                            </Link>

                        </div>

                    </div>

                    {/* Quick Links */}
                    <div>

                        <h3 className="text-xl font-bold">
                            Quick Links
                        </h3>

                        <div className="mt-6 space-y-4">

                            <Link
                                href="/"
                                className="block text-slate-400 transition hover:text-red-500"
                            >
                                Home
                            </Link>

                            <Link
                                href="/donors"
                                className="block text-slate-400 transition hover:text-red-500"
                            >
                                Find Donors
                            </Link>

                            <Link
                                href="/blood-requests"
                                className="block text-slate-400 transition hover:text-red-500"
                            >
                                Blood Requests
                            </Link>

                            <Link
                                href="/hospitals"
                                className="block text-slate-400 transition hover:text-red-500"
                            >
                                Hospitals
                            </Link>

                            <Link
                                href="/about"
                                className="block text-slate-400 transition hover:text-red-500"
                            >
                                About Us
                            </Link>

                        </div>

                    </div>

                    {/* Support */}
                    <div>

                        <h3 className="text-xl font-bold">
                            Support
                        </h3>

                        <div className="mt-6 space-y-4">

                            <Link
                                href="/faq"
                                className="block text-slate-400 transition hover:text-red-500"
                            >
                                FAQ
                            </Link>

                            <Link
                                href="/privacy"
                                className="block text-slate-400 transition hover:text-red-500"
                            >
                                Privacy Policy
                            </Link>

                            <Link
                                href="/terms"
                                className="block text-slate-400 transition hover:text-red-500"
                            >
                                Terms & Conditions
                            </Link>

                            <Link
                                href="/contact"
                                className="block text-slate-400 transition hover:text-red-500"
                            >
                                Contact
                            </Link>

                        </div>

                    </div>

                    {/* Contact */}
                    <div>

                        <h3 className="text-xl font-bold">
                            Contact
                        </h3>

                        <div className="mt-6 space-y-5">

                            <div className="flex items-start gap-3">
                                <Mail
                                    size={20}
                                    className="mt-1 text-red-500"
                                />

                                <span className="text-slate-400">
                                    support@lifelink.com
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <Phone
                                    size={20}
                                    className="mt-1 text-red-500"
                                />

                                <span className="text-slate-400">
                                    +880 1700-000000
                                </span>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={20}
                                    className="mt-1 text-red-500"
                                />

                                <span className="text-slate-400">
                                    Dhaka, Bangladesh
                                </span>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="mt-16 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
                    © {year} <span className="font-semibold text-white">Life-Link</span>.
                    All rights reserved.
                </div>

            </div>
        </footer>
    );
}