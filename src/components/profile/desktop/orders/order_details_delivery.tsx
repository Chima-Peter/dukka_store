"use client"


import { IoIosStar } from "react-icons/io"
import { useState } from "react"
import formatCustomDate from "@/utils/delivery_date_formatter"
import { IoLocationOutline } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa6";
import { motion } from 'framer-motion'

const OrderDetailsDelivery = () => {
    const [reviewFormData, setReviewFormData] = useState<{ star: number }>({
            star: 0
    })

    const [isOpen, setIsOpen] = useState(false);

    const collectStars = (value: number) => {
        setReviewFormData({ ...reviewFormData, star: value })
    }
    return (
        <section className="py-4 flex flex-col gap-8 w-[100%] font-urbanist px-2">
            <div className="flex items-center justify-between px-4">
                <p className="font-[300] text-[18px] tracking-wide">
                    Rate your delivery
                </p>
                <div className="flex gap-0">
                    {Array.from({ length: 5 }, (_, index: number) => (
                        <button key={index} onClick={() => collectStars(index + 1)}>
                            <IoIosStar  className={`w-[20px] h-[20px] ${index + 1 <= reviewFormData.star ? 'text-[#FEB100]' : 'text-[#888B8B]'}`} />
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2 px-4">
                <p className="text-[16px] font-[500]">
                    Your order was
                </p>
                <h5 className="font-[600] text-[20px]">
                    Delivered status
                </h5>
                <p  className="text-[16px] font-[500]">
                    on {formatCustomDate(new Date())}
                </p>
                <p className="text-[#646767] font-[400] text-[16px]">
                    Last updates on {formatCustomDate(new Date())}
                </p>
            </div>

            <div className="flex gap-6 px-7">
                <div className="bg-[#0D523F] w-[1px] h-[80px] translate-y-0" />
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-start gap-1 relative">
                        <div className="w-[21px] flex items-center justify-center h-[21px] border-[1.4px] border-[#0D523F] rounded-md absolute -left-[35px] top-0">
                            <div className="w-[14px] h-[14px] rounded-md bg-[#0D523F] border border-[#0D523F]" />
                        </div>
                        <h5 className="text-[18px] font-[500]">
                            Vendor address
                        </h5>
                        <p className="text-[16px] font-[300] text-[#646767]">
                            start {formatCustomDate(new Date())}
                        </p>
                    </div>

                    <div className="flex flex-col items-start gap-1 relative">
                        <div className="w-[21px] flex items-center justify-center h-[21px] border-[1.4px] border-[#0D523F] rounded-md absolute -left-[35px] top-0">
                            <IoLocationOutline className="w-[14px] h-[14px] rounded-md" />
                        </div>
                        <h5 className="text-[18px] font-[500]">
                            User address
                        </h5>
                        <p className="text-[16px] font-[300] text-[#646767]">
                            end {formatCustomDate(new Date())}
                        </p>
                    </div>
                </div>
            </div>

            {/* TIMELINE DROPDOWN */}
            <section className="flex flex-col gap-4">
            {/* Dropdown Button */}
                <div
                    className="py-4 border-y border-y-[#ADB1B1] bg-[#FFFFFF] flex px-6 items-center justify-between cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h5 className="text-[18px] text-[#021411] font-[500]">
                        Order timeline
                    </h5>
                    <motion.button
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}>
                        <FaAngleDown className="w-[21px] h-[13px]" />
                    </motion.button>
                </div>

                {/* Animated Dropdown */}
                <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                    <div className="flex gap-6 px-7 py-4">
                        <div className="bg-[#0D523F] w-[1px] h-[396px] translate-y-0" />
                        <div className="flex flex-col gap-6">
                            
                            <div className="flex flex-col items-start gap-1 relative">
                                <div className="w-[21px] flex items-center justify-center h-[21px] border-[1.4px] border-[#0D523F] rounded-md absolute -left-[35px] top-0">
                                    <div className="w-[14px] h-[14px] rounded-md bg-[#0D523F] border border-[#0D523F]" />
                                </div>
                                <h5 className="text-[18px] font-[500]">Order received</h5>
                                <p className="text-[16px] font-[300] text-[#646767]">
                                    Start {new Date().toLocaleString()}
                                </p>
                            </div>

                            
                            <div className="flex flex-col items-start gap-1 relative">
                                <div className="w-[21px] flex items-center justify-center h-[21px] border-[1.4px] border-[#0D523F] rounded-md absolute -left-[35px] top-0">
                                    <div className="w-[14px] h-[14px] rounded-md bg-[#0D523F] border border-[#0D523F]" />
                                </div>
                                <h5 className="text-[18px] font-[500]">Order packaged</h5>
                                <p className="text-[16px] font-[300] text-[#646767]">
                                    End {new Date().toLocaleString()}
                                </p>
                            </div>

                            
                            <div className="flex flex-col items-start gap-1 relative">
                                <div className="w-[21px] flex items-center justify-center h-[21px] border-[1.4px] border-[#0D523F] rounded-md absolute -left-[35px] top-0">
                                    <div className="w-[14px] h-[14px] rounded-md bg-[#0D523F] border border-[#0D523F]" />
                                </div>
                                <h5 className="text-[18px] font-[500]">Rider at the vendor</h5>
                                <p className="text-[16px] font-[300] text-[#646767]">
                                    End {new Date().toLocaleString()}
                                </p>
                            </div>

                            
                            <div className="flex flex-col items-start gap-1 relative">
                                <div className="w-[21px] flex items-center justify-center h-[21px] border-[1.4px] border-[#0D523F] rounded-md absolute -left-[35px] top-0">
                                    <div className="w-[14px] h-[14px] rounded-md bg-[#0D523F] border border-[#0D523F]" />
                                </div>
                                <h5 className="text-[18px] font-[500]">Rider picked the order</h5>
                                <p className="text-[16px] font-[300] text-[#646767]">
                                    End {new Date().toLocaleString()}
                                </p>
                            </div>

                            
                            <div className="flex flex-col items-start gap-1 relative">
                                <div className="w-[21px] flex items-center justify-center h-[21px] border-[1.4px] border-[#0D523F] rounded-md absolute -left-[35px] top-0">
                                    <div className="w-[14px] h-[14px] rounded-md bg-[#0D523F] border border-[#0D523F]" />
                                </div>
                                <h5 className="text-[18px] font-[500]">Order enroute</h5>
                                <p className="text-[16px] font-[300] text-[#646767]">
                                    End {new Date().toLocaleString()}
                                </p>
                            </div>
                            {/* User Address */}
                            <div className="flex flex-col items-start gap-1 relative">
                                <div className="w-[21px] flex items-center justify-center h-[21px] border-[1.4px] border-[#0D523F] rounded-md absolute -left-[35px] top-0">
                                    <IoLocationOutline className="w-[14px] h-[14px] rounded-md" />
                                </div>
                                <h5 className="text-[18px] font-[500]">Order delivered</h5>
                                <p className="text-[16px] font-[300] text-[#646767]">
                                    End {new Date().toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>
        </section>
    )
}

export default OrderDetailsDelivery