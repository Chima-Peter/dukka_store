import HomeHero from "@/components/home/home_hero";
import HomeCategoryStrip from "@/components/home/home_category_strip";
import HomeProductSections from "@/components/home/home_product_sections";

const HomePage = () => {
    return (
        <main className="page-nav-offset flex w-full flex-col bg-dukka-canvas">
            <HomeHero />
            <HomeCategoryStrip />
            <div className="flex w-full flex-col gap-2 pb-16 pt-2 md:gap-4 md:pt-4">
                <HomeProductSections />
            </div>
        </main>
    );
};

export default HomePage;
