import React from "react";

function Footer() {
    return (
        <footer className="w-full bg-primary mt-auto border-t-2 border-secondary">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-black">
                    {/* Platform Identity */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Nepwork</h3>
                        <p className="text-sm opacity-90">
                            Connecting Nepali Talent with Global Opportunities
                        </p>
                        <div className="flex space-x-3 text-xl">
                            <span>🇳🇵</span>
                            <span>🚀</span>
                            <span>💻</span>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold">Top Skills</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            {[
                                "IT & Software",
                                "Content Writing",
                                "Translation",
                                "Graphic Design",
                                "Digital Marketing",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="hover:text-danger transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Freelancers */}
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold">
                            For Freelancers
                        </h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            {[
                                "Create Profile",
                                "Find Jobs",
                                "Skill Tests",
                                "Community Forum",
                                "Learning Hub",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="hover:text-danger transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Clients */}
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold">For Clients</h4>
                        <ul className="space-y-2 text-sm opacity-90">
                            {[
                                "Post Project",
                                "Browse Talent",
                                "Payment Protection",
                                "Business Solutions",
                                "Help Center",
                            ].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className="hover:text-danger transition-colors"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2">
                        <h4 className="text-lg font-semibold">Contact</h4>
                        <div className="text-sm space-y-2 opacity-90">
                            <p>Dillibazar, Kathmandu</p>
                            <p>Phone: +977-9841XXXXXX</p>
                            <p>Email: support@nepwork.com</p>
                            <div className="pt-2">
                                <p>Office Hours:</p>
                                <p>Sun-Fri: 9AM - 5PM NPT</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-secondary mt-8 pt-4">
                    <div className="flex flex-col md:flex-row justify-between items-center text-black">
                        <div className="flex space-x-4 mb-4 md:mb-0 text-sm">
                            {["About Us", "Careers", "Press", "Partners"].map(
                                (item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="hover:text-danger transition-colors"
                                    >
                                        {item}
                                    </a>
                                ),
                            )}
                        </div>

                        <div className="text-center text-sm opacity-90">
                            <p>
                                Payment Partner:
                                <span className="ml-2">
                                    {["eSewa"].join(" | ")}
                                </span>
                            </p>
                            <p className="mt-1">Registered VAT: xxxxxxxxx</p>
                        </div>
                    </div>

                    <div className="mt-4 text-center text-sm opacity-90">
                        <p>
                            © {new Date().getFullYear()} Nepwork - Proudly
                            Nepali Platform
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
