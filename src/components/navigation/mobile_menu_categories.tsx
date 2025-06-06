"use client"


import { motion } from 'framer-motion'
import useNavigationContext from "../../hooks/use_category_component";
import categories from "./categories_data";
import { FaChevronRight, FaWhatsapp } from "react-icons/fa6";
import { useState } from "react";
import { CategoryType } from "../../types/category_type";
import { IoIosMenu } from "react-icons/io";
import { IoMailOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import Link from 'next/link';
import { MdClose } from "react-icons/md"


const MobileMenuCategories = () => {
    const { showAllCategories, setShowAllCategories } = useNavigationContext()

    const [activeSub, setActiveSub] = useState<boolean>(false)

    // state to control which category to show on side based on user's choice
    const [subCategory, setSubCategory] = useState<CategoryType>(categories[0])

    const updateSubCategory = (index: number) => {
        setSubCategory(categories[index])
        setActiveSub(true)
    } 

      
    return (
       <motion.section  
        className="fixed top-[7rem] min-h-[50vh] left-0 w-[100%] py-4 bg-white flex flex-col gap-4 pb-32  overflow-y-auto scrollbar-hide"
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0, x: '-100%', display: "hidden" }}
        animate={{ opacity: showAllCategories ? 1 : 0, x: showAllCategories ? 0 : '-100%', display: showAllCategories ? "flex" : "hidden" }}
        >
          <section className="w-[100%] flex-col font-urbanist gap-6">
            <div className="flex flex-col">
                <div className="flex gap-2 bg-[#FDE0C7] py-3 items-center  px-4 sm:px-6 md:px-8">
                    {
                        activeSub ? 
                        <button onClick={() => setActiveSub(false)}>
                            <MdClose className="w-8 h-8 md:w-9 md:h-9" />
                        </button> : <button onClick={() => setActiveSub(true)}>
                            <IoIosMenu className="w-8 h-8 md:w-9 md:h-9" />
                        </button>
                    }
                    {
                        activeSub ? <h1 className="text-[20px] font-[400] tracking-wider">
                            {subCategory.category}
                        </h1> : <h1 className="text-[20px] font-[400] tracking-wider">
                            All category
                        </h1>
                    }
                </div>
                {
                    !activeSub && categories.map((category, index: number) => (
                        <button key={category.category} className="flex gap-4  py-3 px-14 sm:px-16 md:px-[72px] hover:bg-[#F6F6F6] border-b-[1px] border-b-[#ADB1B1] justify-between w-[100%] items-center" onClick={() => updateSubCategory(index)}>
                            <h2 className="text-[14px] xs:text-[16px] md:text-[18px] font-normal tracking-wide">
                                {category.category}
                            </h2>
                            <FaChevronRight className="w-3 h-3 min-lg:w-4 min-lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
                        </button>
                    ))
                }
            </div>
            <motion.div
                 className="overflow-y-auto scrollbar-hide justify-between  flex-col w-[100%] bg-white"
                 transition={{ duration: 0.5 }}
                initial={{ opacity: 0, x: '-100%', display: "hidden" }}
                animate={{  display: activeSub ? "flex" : "none", opacity: activeSub ? 1 : 0, x: activeSub ? 0 : '-100%'}}>
            {
                subCategory.subcategories.map((subcategory) => (
                    <Link 
                        href={`/category/${subcategory.name}`}
                        onClick={() => setShowAllCategories(false)} 
                        key={subcategory.name} className="gap-4  py-3 px-14 sm:px-16 md:px-[72px] hover:bg-[#F6F6F6] border-b-[1px] border-b-[#ADB1B1] w-[100%]">
                        {subcategory.name}
                    </Link>
                ))
            }
            </motion.div>
            <div className="w-[100%] flex flex-col gap-3 pt-6">
                <h1 className="font-[400] text-[20px] bg-[#FDE0C7] py-3 px-[43px] sm:px-[52px] md:px-[60px] tracking-wider">
                    Contact us
                </h1>
                <div className="flex flex-col  px-[43px] sm:px-[52px] md:px-[60px] gap-4">
                    <div className="flex gap-4 items-center">
                        <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full bg-[#0D3833]">
                            <IoMailOutline className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex font-urbanist gap-0 flex-col">
                            <p className="tracking-widest text-[16px] font-wide translate-y-[2px]">
                                Email support
                            </p>
                            <p className="text-[14px] font-[400] text-[#646767] tracking-wider">
                                support@mile12.store
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full bg-[#0D3833]">
                            <FiPhone className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex font-urbanist gap-0 flex-col">
                            <p className="tracking-widest text-[16px] font-wide translate-y-[2px]">
                                Phone support
                            </p>
                            <p className="text-[14px] font-[400] text-[#646767] tracking-wider">
                                08077577065,08066596873
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="w-[24px] h-[24px] flex justify-center items-center rounded-full bg-[#0D3833]">
                            <FaWhatsapp className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex font-urbanist gap-0 flex-col">
                            <p className="tracking-widest text-[16px] font-wide translate-y-[2px]">
                                Whatsapp support
                            </p>
                            <p className="text-[14px] font-[400] text-[#646767] tracking-wider">
                                08077577065,08066596873
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
       </motion.section>
    )
}

export default MobileMenuCategories