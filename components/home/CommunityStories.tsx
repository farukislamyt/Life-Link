import Link from "next/link";
import {
    HeartHandshake,
    Users,
    Heart,
    ArrowRight,
} from "lucide-react";

const stories = [
    {
        title: "A Community That Saves Lives",
        description:
            "Every successful blood donation strengthens our community and gives hope to patients during emergencies.",
        icon: HeartHandshake,
    },
    {
        title: "Thousands of Generous Donors",
        description:
            "Life-Link connects volunteers who are ready to donate blood whenever someone is in urgent need.",
        icon: Users,
    },
    {
        title: "Every Donation Matters",
        description:
            "One blood donation can help save multiple lives. Together, we make emergency care faster and more accessible.",
        icon: Heart,
    },
];

export default function CommunityStories() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                        Community Impact
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
                        Together We Make a Difference
                    </h2>

                    <p className="mt-5 text-lg text-slate-600">
                        Life-Link brings together donors, hospitals, patients, and
                        volunteers to create a trusted blood donation network across
                        Bangladesh.
                    </p>

                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">

                    {stories.map((story) => {
                        const Icon = story.icon;

                        return (
                            <div
                                key={story.title}
                                className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                                    <Icon size={30} />
                                </div>

                                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                                    {story.title}
                                </h3>

                                <p className="mt-4 leading-7 text-slate-600">
                                    {story.description}
                                </p>
                            </div>
                        );
                    })}

                </div>

                <div className="mt-16 text-center">

                    <Link
                        href="/signup"
                        className="inline-flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700"
                    >
                        Become Part of the Community

                        <ArrowRight size={20} />
                    </Link>

                </div>

            </div>
        </section>
    );
}