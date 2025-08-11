import { Button } from "@/components/ui/button.js";
import { Link } from "@inertiajs/react";
import { useEffect } from "react";

export default function Welcome() {
    useEffect(() => {
        const card = document.querySelector(".bottom-card");
        const elements = document.querySelectorAll(".check-overlap");

        if (!card) return;

        const cardRect = card.getBoundingClientRect();

        elements.forEach((el) => {
            const elRect = el.getBoundingClientRect();
            if (elRect.bottom > cardRect.top) {
                el.classList.add("hidden");
            }
        });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-white">
            {/* Mobile layout */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/images/pattern.png')",
                    backgroundRepeat: "repeat-y",
                    backgroundSize: "contain",
                    opacity: 0.08,
                }}
            />
            <div className="flex flex-col md:hidden pb-[220px]">
                {" "}
                <div className="relative flex flex-col justify-center items-center text-center px-6 py-10 space-y-8 overflow-hidden">
                    <div className="relative z-10 space-y-4 check-overlap">
                        <h2 className="text-lg font-playfair text-zinc-700 tracking-wide"></h2>
                        <h1 className="text-3xl font-lato font-bold text-zinc-800 leading-tight">
                            CMHealth <br /> Medical Check-Up
                        </h1>
                        <p className="max-w-md mx-auto text-zinc-600 text-base leading-relaxed">
                            Easily access your medical check-up reports —
                            anytime, anywhere. Enjoy speed and security you can
                            trust.
                        </p>
                    </div>

                    <img
                        src="/images/cmh.jpeg"
                        alt="CMHealth illustration"
                        className="relative z-10 mask mask-heart w-32 h-32 object-cover shadow-md check-overlap"
                    />
                </div>
                {/* Fixed bottom white card */}
                <div
                    className="fixed bottom-0 left-0 w-full flex flex-col justify-center items-center text-center px-6 py-10 bg-[#fffffe] rounded-t-[32px] md:rounded-none transition-all duration-300 overflow-hidden bottom-card"
                    style={{
                        paddingBottom: `calc(env(safe-area-inset-bottom) + 2rem)`,
                    }}
                >
                    <div className="relative z-10 w-full max-w-sm space-y-6 pt-6">
                        <Link
                            href="/login-employee"
                            className="w-full bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white font-semibold text-lg py-1 rounded-[16px] shadow-lg transform hover:scale-[1.02] transition-all duration-300 text-center block"
                        >
                            Login
                        </Link>
                        <p className="text-base text-zinc-600">
                            <Link href="/login" className="hover:underline">
                                Login sebagai{" "}
                                <span className="font-medium text-zinc-800">
                                    PIC
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:flex min-h-screen flex-col justify-center items-center text-center px-6 py-10 bg-gradient-to-br from-blue-100 via-white to-blue-50 relative overflow-hidden">
                {/* Optional decorative pattern */}

                <div
                    className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-repeat"
                    style={{ backgroundSize: "auto 80px" }}
                ></div>

                <div className="max-w-lg space-y-8 relative z-10">
                    <div className="space-y-4 animate-fadeInUp">
                        {/* <h2 className="text-xl md:text-xl font-playfair text-zinc-600 tracking-wide">
                            Welcome to
                        </h2> */}
                        <h1 className="text-3xl md:text-5xl font-lato font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-500 leading-tight">
                            CMHealth <br /> Medical Check-Up
                        </h1>
                        <p className="text-zinc-700 text-base md:text-lg leading-relaxed">
                            Easily access your medical check-up reports —
                            anytime, anywhere. Enjoy speed and security you can
                            trust.
                        </p>
                    </div>

                    <img
                        src="/images/cmh.jpeg"
                        alt="CMHealth illustration"
                        className="mask mask-heart w-36 h-36 md:w-44 md:h-44 object-cover shadow-lg mx-auto ring-4 ring-white hover:scale-105 transition-transform duration-300"
                    />

                    <Link
                        href="/login-employee"
                        className="w-full bg-gradient-to-r from-blue-500 to-sky-400 hover:from-blue-600 hover:to-sky-500 text-white font-semibold text-lg py-1 rounded-[16px] shadow-lg transform hover:scale-[1.02] transition-all duration-300 text-center block"
                    >
                        Login
                    </Link>

                    <p className="text-base text-zinc-600">
                        <Link href="/login" className="hover:underline">
                            Login sebagai{" "}
                            <span className="font-medium text-zinc-800">
                                PIC
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
