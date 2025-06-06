import ResponsiveDisplay from "@/utils/responsive_display"
import { categoryData, fish_and_stock_product } from "@/utils/sample_data"
import ProductCollection from "../products/products_collection"
import ByCategoryLarge from "./by_category_large"
import ByCategorySmall from "./by_category_small"

const CategoryUI = ({subCategory} : {subCategory: string}) => {

    return (
            <main className="flex flex-col gap-8 w-[100%]  pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-main">
                <ResponsiveDisplay minWidth={1000}>
                    <ByCategoryLarge header={subCategory || ''} details={categoryData} key={'large'} link={`/category/${subCategory}`} caller="category" />
                </ResponsiveDisplay>
                <ResponsiveDisplay maxWidth={999}>
                    <ByCategorySmall header={subCategory || ''} details={categoryData} key={'small'} caller="category" />
                </ResponsiveDisplay>
                <ProductCollection header="You might also like" link="/category/fish and stock" details={fish_and_stock_product} />
            </main>
        )
}

export default CategoryUI