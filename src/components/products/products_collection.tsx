import Link from "next/link";
import { DetailsType } from "../../types/cart_type";
import ProductGridCard from "./product_grid_card";

interface ProductCollectionType {
    header: string;
    link: string;
    details: DetailsType[];
    showCatalogEyebrow?: boolean;
    showSeeAll?: boolean;
}

const ProductCollection = ({
    header,
    link,
    details,
    showCatalogEyebrow = false,
    showSeeAll = true,
}: ProductCollectionType) => {
    return (
        <section className="flex h-fit w-full flex-col gap-5 bg-dukka-canvas px-4 py-8 font-urbanist sm:px-6 md:gap-6 md:px-8 md:py-10 lg:px-12 xl:px-14 2xl:px-16">
            <div className="flex w-full items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    {showCatalogEyebrow && (
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dukka-muted">
                            Catalog
                        </p>
                    )}
                    <h2 className="text-[20px] font-semibold tracking-tight text-dukka-ink md:text-[22px] xl:text-[24px]">
                        {header}
                    </h2>
                    <p className="text-[13px] text-dukka-muted">
                        {details.length} {details.length === 1 ? "product" : "products"}
                    </p>
                </div>
                {showSeeAll && (
                    <Link
                        href={link}
                        className="shrink-0 text-[13px] font-semibold text-dukka-forest underline-offset-4 transition-colors hover:text-dukka-ink hover:underline md:text-[14px]"
                    >
                        See all
                    </Link>
                )}
            </div>

            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                {details.map((detail: DetailsType) => (
                    <div key={detail.id || detail.title} className="min-w-0">
                        <ProductGridCard detail={detail} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductCollection;
