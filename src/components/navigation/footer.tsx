import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { IoLogoLinkedin } from "react-icons/io"
import { IoCallOutline } from "react-icons/io5"
import { MdOutlineMail } from "react-icons/md"
import Link from "next/link"
import Image from "next/image"




const Footer = () => {
    const getStartedLinks = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "My account",
            link: "/profile"
        },
        {
            name: "Cart",
            link: "/cart"
        },
        {
            name: "Wishlist",
            link: "/wishlist"
        },
        {
            name: "Sell on mile 12",
            link: "/mile12"
        },
        {
            name: "Special offer",
            link: "special-offer"
        }
    ]

    const siteInfoLinks = [
        {
            name: "FAQ's",
            link: "/faq"
        },
        {
            name: "Privacy policy",
            link: '/privacy-policy'
        },
        {
            name: "Return policy",
            link: "/return-policy"
        },
        {
            name: "Terms of service",
            link: "/terms-of-service"
        },
        {
            name: "Contact us",
            link: "/contact-us"
        },
        {
            name: "Report a problem",
            link: "/report"
        }
    ]



    return (
        <footer className="bg-black w-[100%] flex flex-col gap-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14 2xl:px-16 pt-14 pb-24 min-lg:pb-8 font-urbanist">
            <section className="flex w-[100%] justify-between flex-wrap gap-y-12 min-lg:gap-0">
                <div className="flex flex-col gap-4 w-[100%] sm:w-[48%] min-lg:w-[23%]">
                    <Image width={200} height={44} src="/logo.svg" alt="Melch.store" />
                    <p className="text-[#888B8B] font-normal tracking-wide leading-relaxed text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                        Mile 12 is your #1 Closest Online Naija Food Market place with amazing deals on all Naija food items you can think of
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-[100%] sm:w-[48%] min-lg:w-[23%]">
                    <h6 className="text-white text-xl min-lg:text-2xl xl:text-3xl 2xl:text-4xl font-extralight tracking-wide">
                        GET STARTED
                    </h6>
                    <ul className="flex flex-col gap-2">
                        {
                            getStartedLinks.map((field) => (
                                <Link key={field.name} href={field.link} className="text-[#888B8B] font-light tracking-wide leading-relaxed text-[14px] hover:text-white hover:font-semibold md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                                    {field.name}
                                </Link>
                            ))
                        }
                    </ul>
                </div>

                <div className="flex flex-col gap-4 w-[100%] sm:w-[48%] min-lg:w-[23%]">
                    <h6 className="text-white text-xl min-lg:text-2xl xl:text-3xl 2xl:text-4xl font-extralight tracking-wide">
                        SITE INFO
                    </h6>
                    <ul className="flex flex-col gap-2">
                        {
                            siteInfoLinks.map((field) => (
                                <Link key={field.name} href={field.link} className="text-[#888B8B] font-light tracking-wide leading-relaxed text-[14px] hover:text-white hover:font-semibold md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                                    {field.name}
                                </Link>
                            ))
                        }
                    </ul>
                </div>

                <div className="flex flex-col gap-4 w-[100%] sm:w-[48%] min-lg:w-[23%]">
                    <h6 className="text-white text-xl min-lg:text-2xl xl:text-3xl 2xl:text-4xl font-extralight tracking-wide">
                        CONNECT WITH US
                    </h6>
                    <div className="flex gap-4">
                        <FaFacebook className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-[#ADB1B1]" />
                        <FaInstagram className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-[#ADB1B1]" />
                        <IoLogoLinkedin className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-[#ADB1B1]" />
                        <FaTwitter className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-[#ADB1B1]" />
                    </div>
                    <div className="w-[100%] h-[1.5px] mt-2 bg-[#ADB1B1]" />
                    <h6 className="text-white text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-extralight tracking-wide lg:leading-loose">
                        SUBSCRIBE TO GET EXCLUSIVE DEALS
                    </h6>
                    <form noValidate className="flex border rounded-md border-[#ADB1B1] focus-within:border-gray-100 focus-within:drop-shadow-md font-urbanist">
                        <input type="email" name="text" id="text" placeholder="Your email" autoComplete="off" className="w-[100%] h-[100%] text-white placeholder:text-[14px] xl:placeholder:text-[18px] bg-black 2xl:placeholder:text-[22px] text-[16px] xl:text-[22px] 2xl:text-[28px] placeholder:tracking-wide py-3 px-6  rounded-l-md" />
                        <button type="submit" className="rounded-r-md bg-[#FEB100] py-2 px-4 fontsemibold tracking-wide leading-relaxed text-[16px] md:text-[18px] xl:text-[20px] 2xl:text-[22px]">
                            Send
                        </button>
                    </form>
                </div>

                <div className="flex flex-col gap-4 w-[100%] sm:w-[48%] min-lg:w-[23%]">
                    <h6 className="text-white text-xl min-lg:text-2xl xl:text-3xl 2xl:text-4xl font-extralight tracking-wide">
                        CONTACT US
                    </h6>
                    <ul className="flex flex-col gap-2">
                        <li className="flex gap-3 items-center">
                            <IoCallOutline className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-[#888B8B]" />
                            <Link href="tel:+23480123456789" className="text-[#888B8B] font-medium tracking-wide leading-relaxed text-[14px] hover:text-white hover:font-semibold md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                                +234-8012-345-6789
                            </Link>
                        </li>
                        <li className="flex gap-3 items-center">
                            <MdOutlineMail className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-10 2xl:h-10 text-[#888B8B]" />
                            <Link href="mailto:hellomile12@mile12.com" className="text-[#888B8B] font-medium tracking-wide leading-relaxed text-[14px] hover:text-white hover:font-semibold md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                                hellomile12@mile12.com
                            </Link>
                        </li>
                    </ul>
                </div>
            </section>

            <section className="w-[100%] items-center justify-between flex flex-col min-lg:flex-row">
                <p className="text-white font-normal tracking-wide leading-relaxed text-[14px] md:text-[16px] xl:text-[18px] 2xl:text-[20px]">
                    Copyright ©️2024 All right reserved | This website is managed by <span className="text-blue-400">archiTECHture</span> 
                </p>
                <div className="flex gap-4">
                    <Image width={57} height={17} src="/images/navigation/visa_card_icon.svg" alt="Visa card"  />
                    <Image width={57} height={17} src="/images/navigation/paypal_icon.svg" alt="Paypal"  />
                    <Image width={57} height={17} src="/images/navigation/mastercard_icon.svg" alt="Mastercard"  />
                    <Image width={57} height={17} src="/images/navigation/paystack_icon.svg" alt="Paystack"  />
                </div>
            </section>
        </footer>
    )
}

export default Footer