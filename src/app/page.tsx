import HomeHero from "@/components/home/home_hero";
import HomeCategoryStrip from "@/components/home/home_category_strip";
import HomeProductSections from "@/components/home/home_product_sections";

const HomePage = () => {
    return (
        <main className="flex w-full flex-col bg-[#F0F0F0] pt-[120px] sm:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px]">
            <HomeHero />
            <HomeCategoryStrip />
            <div className="flex w-full flex-col gap-6 pb-16 pt-6 md:gap-8 md:pt-8">
                <HomeProductSections />
            </div>
        </main>
    );
};

export default HomePage;
