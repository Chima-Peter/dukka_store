"use client";

import ResponsiveDisplay from "@/utils/responsive_display";
import CartComponentLarge from "./cart_component_large";
import EmptyCart from "../../components/cart/empty_cart";
import ProductCollection from "../products/products_collection";
import CartComponentSmall from "./cart_component_small";
import { useAppSelector } from "@/redux/store";
import { useGetProductsQuery } from "@/redux/services/catalog_api";
import { useActiveMarketId } from "@/hooks/use_active_market_id";
import { toDetailsType, normalizeList } from "@/utils/map_product";

const CartUI = () => {
    const allProducts = useAppSelector((state) => state.cart);
    const marketId = useActiveMarketId();
    const { data } = useGetProductsQuery(
        { market_id: marketId, limit: 8 },
        { skip: !marketId },
    );
    const recommendations = normalizeList(data).map(toDetailsType);

    return (
        <main className="flex flex-col gap-8 w-[100%] pt-[120px] sm:pt-[120px] md:pt-[130px] lg:pt-[230px] xl:pt-[270px] 2xl:pt-[270px] bg-[#F0F0F0] font-urbanist">
            {allProducts?.cart?.length === 0 ? (
                <EmptyCart />
            ) : (
                <>
                    <ResponsiveDisplay minWidth={1000}>
                        <CartComponentLarge allProducts={allProducts} />
                    </ResponsiveDisplay>
                    <ResponsiveDisplay maxWidth={999}>
                        <CartComponentSmall allProducts={allProducts} />
                    </ResponsiveDisplay>
                </>
            )}
            <ProductCollection
                header="People also viewed"
                link="/category/all"
                details={recommendations}
            />
        </main>
    );
};

export default CartUI;
