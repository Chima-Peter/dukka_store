import Link from "next/link";
import { DetailsType } from "../../types/cart_type";
import ProductGridCard from "./product_grid_card";

interface ProductCollectionType {
    header: string;
    link: string;
    details: DetailsType[];
}

const ProductCollection = (props: ProductCollectionType) => {
    return (
        <section className="flex h-fit w-full flex-col gap-4 bg-white px-4 py-6 font-urbanist sm:px-6 md:gap-5 md:px-8 md:py-8 lg:px-12 xl:px-14 2xl:px-16">
            <div className="flex w-full items-end justify-between gap-4 border-b border-[#E8EBEB] pb-3">
                <div className="flex flex-col gap-0.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#888B8B]">
                        Catalog
                    </p>
                    <h2 className="text-[18px] font-semibold tracking-tight text-[#0D523F] md:text-[20px] xl:text-[22px]">
                        {props.header}
                    </h2>
                </div>
                <Link
                    href={props.link}
                    className="shrink-0 text-[13px] font-semibold text-[#0D523F] underline-offset-4 transition-colors hover:text-[#031815] hover:underline md:text-[14px]"
                >
                    See all
                </Link>
            </div>

            <div className="grid w-full grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {props.details.map((detail: DetailsType) => (
                    <div
                        key={detail.id || detail.title}
                        className="min-w-0"
                    >
                        <ProductGridCard detail={detail} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductCollection;
