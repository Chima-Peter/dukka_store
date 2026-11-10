"use client";

import { FiSearch } from "react-icons/fi";
import { useMemo, useState } from "react";
import { IoFilter } from "react-icons/io5";
import OrderTemplate from "./order_template_small";
import ProductCollection from "@/components/products/products_collection";
import Pagination from "@/components/ui/pagination";
import BackButton from "@/components/ui/back_button";
import { useGetOrdersQuery } from "@/redux/services/orders_api";
import { useGetProductsQuery } from "@/redux/services/catalog_api";
import { toOrdersType } from "@/utils/map_order";
import { toDetailsType, normalizeList } from "@/utils/map_product";
import { useActiveMarketId } from "@/hooks/use_active_market_id";

const OrdersSmall = () => {
    const { data: ordersPage } = useGetOrdersQuery();
    const ordersList = useMemo(
        () => (ordersPage?.items ?? []).map(toOrdersType),
        [ordersPage],
    );
    const marketId = useActiveMarketId();
    const { data: products } = useGetProductsQuery(
        { market_id: marketId, limit: 8 },
        { skip: !marketId },
    );
    const recommendations = normalizeList(products).map(toDetailsType);

    const [page, setPage] = useState<number>(1);
    const pageIndex = page * 10 - 10;
    const displayList = ordersList.slice(pageIndex, pageIndex + 10);

    const [orderQuery, setOrderQuery] = useState<string>("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [openFilters, setOpenFilters] = useState(false);
    const filterList = ["All", "Completed", "Cancelled"];

    const collectOrderQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOrderQuery(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setOrderQuery("");
    };

    const toggleFilterDisplay = () => {
        setOpenFilters(!openFilters);
    };

    const updateActiveFilter = (index: number) => {
        setActiveFilter(filterList[index]);
        setOpenFilters(false);
    };

    return (
        <main className="flex flex-col w-[100%] pt-[120px] gap-6 sm:pt-[130px] bg-[#F0F0F0] font-urbanist">
            <section className="w-[100%] h-fit flex flex-col gap-6 pb-4 pt-4 bg-white">
                <section className="bg-white px-4 sm:px-6 md:px-8 flex  justify-between relative w-[100%] items-center">
                    <BackButton />
                    <h1 className="text-[20px] md:text-[22px] font-[500] self-center">
                        Orders
                    </h1>
                    <p className="tracking-wide text-[16px] font-[400] text-[#646767]">
                        {ordersList.length} orders
                    </p>
                </section>
                <section className="bg-white px-4 sm:px-6 md:px-8 flex justify-between relative w-[100%] items-center">
                    <form
                        noValidate
                        onSubmit={handleSubmit}
                        className="flex border rounded-lg border-[#ADB1B1] focus-within:border-gray-100 focus-within:shadow-md w-[72%] sm:w-[77%] font-urbanist relative"
                    >
                        <input
                            onChange={collectOrderQuery}
                            value={orderQuery}
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Search for an order"
                            autoComplete="off"
                            className="w-[100%] text-[16px] md:text-[18px] focus:shadow-lg outline-none placeholder:tracking-wide h-[40px] md:h-[50px] px-6  rounded-l-lg"
                        />
                        <button
                            type="submit"
                            className="rounded-r-lg bg-[#F9F9F9] border-l border-l-[#ADB1B1] min-lg:py-2 px-6"
                        >
                            <FiSearch className="w-5 h-5 text-black xl:w-7 xl:h-7 2xl:w-10 2xl:h-10" />
                        </button>
                    </form>

                    <button
                        className="border border-[#ADB1B1] h-[40px] md:h-[50px] rounded-md bg-[#F9F9F9] w-[25%] sm:w-[20%] text-[16px] flex items-center gap-2 tracking-wide justify-center relative"
                        onClick={toggleFilterDisplay}
                    >
                        <IoFilter className="w-[14px] h-[14px]" />
                        Filter
                        {openFilters && (
                            <ul className="w-[150px] h-fit bg-[#F9F9F9] flex flex-col gap-1 p-1 shadow-md border-[1px] border-gray-300 rounded-md absolute top-11 right-0 md:top-[52px]">
                                {filterList.map((filter, index: number) => (
                                    <li
                                        key={filter}
                                        className={`w-[100%] py-3 hover:bg-[#FEB100] text-[16px] cursor-pointer border border-gray-300 rounded-md text-center tracking-wide font-[400] ${activeFilter === filter ? "bg-[#FEB100]" : "bg-white"} `}
                                        onClick={() => {
                                            updateActiveFilter(index);
                                        }}
                                    >
                                        {filter}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </button>
                </section>
                <section className="bg-white px-4 sm:px-6 md:px-8 flex w-[100%] flex-col flex-wrap md:flex-row gap-y-4 md:justify-between">
                    {displayList.map((order) => (
                        <OrderTemplate order={order} key={order.id} />
                    ))}
                    {displayList.length === 0 && (
                        <p className="text-sm text-gray-600 py-4">No orders yet.</p>
                    )}
                </section>
                {ordersList.length > 0 && (
                    <Pagination
                        itemsPerPage={10}
                        totalItems={ordersList.length}
                        onPageChange={setPage}
                    />
                )}
            </section>
            <ProductCollection
                header="Recommended for you"
                link="/category/all"
                details={recommendations}
            />
        </main>
    );
};

export default OrdersSmall;
