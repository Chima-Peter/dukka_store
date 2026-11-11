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
        <section className="flex h-fit w-full flex-col gap-6 bg-white px-4 py-8 font-urbanist sm:px-6 md:gap-8 md:px-8 md:py-10 lg:px-12 min-lg:py-12 xl:px-14 2xl:px-16">
            <div className="flex w-full items-end justify-between gap-4 border-b border-[#E8EBEB] pb-4">
                <div className="flex flex-col gap-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#888B8B]">
                        Catalog
                    </p>
                    <h2 className="text-[22px] font-semibold tracking-tight text-[#0D523F] md:text-2xl xl:text-[28px]">
                        {props.header}
                    </h2>
                </div>
                <Link
                    href={props.link}
                    className="shrink-0 text-[14px] font-semibold text-[#0D523F] underline-offset-4 transition-colors hover:text-[#031815] hover:underline md:text-[16px]"
                >
                    See all
                </Link>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
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
