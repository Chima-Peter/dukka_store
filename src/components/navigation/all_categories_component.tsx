"use client"

import Link from 'next/link';
import { motion } from 'framer-motion'
import useNavigationContext from "../../hooks/use_category_component";
import categories from './categories_data'
import { FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import { CategoryType } from "../../types/category_type";

const AllCategoryComponent = () => {
    const { setShowAllCategories } = useNavigationContext()

    // state to control which category to show on side based on user's choice
    const [subCategory, setSubCategory] = useState<CategoryType>(categories[0])
      
     // function to close category when user moves mouse outside categories component, clicks on parent component or selects any of the categories
    const closeCategories = () => {
        setShowAllCategories(false)
    }

    const updateSubCategory = (index: number) => {
        setSubCategory(categories[index])
    } 

      
    return (
       <motion.section  
        className="w-[100%] min-h-[100vh] backdrop-brightness-90 fixed py-[15%] flex justify-center overflow-hidden z-50"
        transition={{ duration: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        >
          <section className="w-[90%] rounded-xl bg-white h-[70vh] flex justify-between font-urbanist gap-4 z-50" onMouseLeave={closeCategories}>
            <div className="flex flex-col w-fit max-w-[35%] bg-[#F6F6F6] rounded-l-lg">
                {
                    categories.map((category, index: number) => (
                        <button key={category.category} className="flex gap-4  py-6 px-6 hover:bg-gray-200 justify-between w-[100%] items-center" onMouseMove={() => updateSubCategory(index)}>
                            <h2 className="min-lg:text-[16px] lg:text-[20px] xl:text-[22px] 2xl:text-[24px] font-normal tracking-wide">
                                {category.category}
                            </h2>
                            <FaChevronRight className="w-3 h-3 min-lg:w-4 min-lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6" />
                        </button>
                    ))
                }
            </div>
            <div className="overflow-y-auto customScroll flex justify-between  gap-y-12 w-[70%] flex-wrap pt-6 pb-10">
            {
                subCategory.subcategories.map((category) => (
                    <div key={category.name} className="flex flex-col gap-6 w-[100%] xs:w-[48%] sm:w-[30%] h-fit">
                        <h2 className="text-[22px] xl:text-[24px] 2xl:text-[26px] font-semibold tracking-wide">
                            {category.name}
                        </h2>
                        <ul className="flex flex-col gap-4">
                            {
                                category.products.map((sub) => (
                                    <Link key={sub.name} href={sub.name} className="text-[#888B8B] text-[18px] xl:text-[20px] 2xl:text-[22px] hover:text-[#FEB100] font-medium">
                                        {sub.name}
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>
                ))
            }
            </div>
        </section> 
        <section className='w-[100vw] h-[100vh] min-h-[100vh] fixed top-0 left-0 z-40' onClick={closeCategories} />
       </motion.section>
    )
}

export default AllCategoryComponent