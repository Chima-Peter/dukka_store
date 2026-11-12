import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    const getStartedLinks = [
        { name: "Home", link: "/" },
        { name: "Shop", link: "/category/all" },
        { name: "My account", link: "/profile" },
        { name: "Cart", link: "/cart" },
    ];

    const year = new Date().getFullYear();

    return (
        <footer className="flex w-full flex-col gap-10 bg-dukka-ink px-4 pb-24 pt-14 font-urbanist sm:px-6 md:px-8 min-lg:pb-8 lg:px-12 xl:px-14 2xl:px-16">
            <section className="flex w-[100%] flex-wrap justify-between gap-y-12 min-lg:gap-0">
                <div className="flex w-[100%] flex-col gap-4 sm:w-[48%] min-lg:w-[28%]">
                    <Image
                        width={140}
                        height={36}
                        src="/logo-light.svg"
                        alt="Dukka"
                    />
                    <p className="text-[14px] font-normal leading-relaxed tracking-wide text-[#888B8B] md:text-[16px]">
                        Dukka.Store is your marketplace for premium products
                        across markets — shop with live pricing and fast
                        delivery.
                    </p>
                </div>

                <div className="flex w-[100%] flex-col gap-4 sm:w-[48%] min-lg:w-[20%]">
                    <h6 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white">
                        Get started
                    </h6>
                    <ul className="flex flex-col gap-2">
                        {getStartedLinks.map((field) => (
                            <Link
                                key={field.name}
                                href={field.link}
                                className="text-[14px] font-light leading-relaxed tracking-wide text-[#888B8B] hover:font-semibold hover:text-white md:text-[16px]"
                            >
                                {field.name}
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className="flex w-[100%] flex-col gap-4 sm:w-[48%] min-lg:w-[22%]">
                    <h6 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white">
                        Connect
                    </h6>
                    <div className="flex gap-4">
                        <FaFacebook className="h-6 w-6 text-[#ADB1B1]" />
                        <FaInstagram className="h-6 w-6 text-[#ADB1B1]" />
                        <IoLogoLinkedin className="h-6 w-6 text-[#ADB1B1]" />
                        <FaTwitter className="h-6 w-6 text-[#ADB1B1]" />
                    </div>
                    <p className="text-[14px] text-[#888B8B]">@dukkastore</p>
                </div>

                <div className="flex w-[100%] flex-col gap-4 sm:w-[48%] min-lg:w-[24%]">
                    <h6 className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white">
                        Contact us
                    </h6>
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-3">
                            <MdOutlineMail className="h-5 w-5 shrink-0 text-[#888B8B]" />
                            <Link
                                href="mailto:hello@dukka.store?subject=Dukka%20inquiry"
                                className="text-[14px] font-medium tracking-wide text-[#888B8B] hover:font-semibold hover:text-white md:text-[16px]"
                            >
                                hello@dukka.store
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://www.dukka.store"
                                className="text-[14px] font-medium tracking-wide text-[#888B8B] hover:font-semibold hover:text-white md:text-[16px]"
                            >
                                www.dukka.store
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="mailto:hello@dukka.store?subject=Dukka%20inquiry"
                                className="inline-flex w-fit bg-dukka-amber px-4 py-2.5 text-[14px] font-semibold text-dukka-ink transition-colors hover:bg-white"
                            >
                                Contact us
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="flex w-[100%] flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 min-lg:flex-row">
                <p className="text-[14px] font-normal tracking-wide text-white md:text-[16px]">
                    Copyright ©{year} Dukka.Store. All rights reserved.
                </p>
                <Image
                    width={57}
                    height={17}
                    src="/images/navigation/paystack_icon.svg"
                    alt="Paystack"
                />
            </section>
        </footer>
    );
};

export default Footer;
