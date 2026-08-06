import Link from "next/link";
import {
    UserPlus,
    UserCheck,
    Search,
    HeartHandshake,
    ArrowRight,
} from "lucide-react";

const steps = [
    {
        number: "01",
        title: "Create an Account",
        description:
            "Sign up for Life-Link and verify your email to become part of the blood donation community.",
        icon: UserPlus,
    },
    {
        number: "02",
        title: "Complete Your Profile",
        description:
            "Add your blood group, phone number, location, and availability to help patients find you.",
        icon: UserCheck,
    },
    {
        number: "03",
        title: "Search or Request",
        description:
            "Patients can search for nearby donors, while donors can browse urgent blood requests.",
        icon: Search,
    },
    {
        number: "04",
        title: "Save Lives",
        description:
            "Connect with donors or patients and make every donation count toward saving lives.",
        icon: HeartHandshake,
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}
                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                        Simple Process
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
                        How Life-Link Works
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Our platform is designed to connect blood donors and patients
                        quickly, securely, and efficiently during emergencies.
                    </p>

                </div>

                {/* Timeline */}
                <div className="relative mt-20">

                    <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 rounded-full bg-red-100 lg:block" />

                    <div className="space-y-12">

                        {steps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.number}
                                    className={`flex flex-col items-center gap-8 lg:flex-row ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                                        }`}
                                >
                                    {/* Content */}
                                    <div className="w-full lg:w-1/2">

                                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">

                                            <span className="text-sm font-bold text-red-600">
                                                STEP {step.number}
                                            </span>

                                            <h3 className="mt-3 text-3xl font-bold text-slate-900">
                                                {step.title}
                                            </h3>

                                            <p className="mt-4 leading-8 text-slate-600">
                                                {step.description}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Icon */}
                                    <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-red-600 text-white shadow-xl">
                                        <Icon size={38} />
                                    </div>

                                    <div className="hidden lg:block lg:w-1/2" />
                                </div>
                            );
                        })}

                    </div>

                </div>

                {/* CTA */}

                <div className="mt-20 text-center">

                    <Link
                        href="/signup"
                        className="inline-flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-red-700"
                    >
                        Join Life-Link Today

                        <ArrowRight size={20} />
                    </Link>

                </div>

            </div>
        </section>
    );
}