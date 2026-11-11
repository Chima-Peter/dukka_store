"use client";

import { FiSearch } from "react-icons/fi";
import SearchSuggestion from "./search_suggestion";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
    const router = useRouter();
    const [search_query, setSearchQuery] = useState<string>("");
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

    const turnOnSuggestion = () => setShowSuggestion(true);
    const turnOffSuggestion = () => {
        setTimeout(() => setShowSuggestion(false), 200);
    };

    const collectSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setShowSuggestion(true);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const q = search_query.trim();
        if (!q) return;
        setShowSuggestion(false);
        router.push(`/search/${encodeURIComponent(q)}`);
    };

    return (
        <form
            noValidate
            onSubmit={handleSubmit}
            className="relative flex w-full border border-[#E4E7E7] bg-white font-urbanist transition-colors focus-within:border-[#0D523F] min-[1050px]:w-[360px] xl:w-[440px] 2xl:w-[520px]"
        >
            <input
                onFocus={turnOnSuggestion}
                onBlur={turnOffSuggestion}
                onChange={collectSearchQuery}
                value={search_query}
                type="search"
                name="search"
                id="search"
                placeholder="Search products"
                autoComplete="off"
                className="h-11 w-full bg-transparent px-4 text-[15px] text-[#031815] outline-none placeholder:text-[#888B8B] xl:h-12 xl:text-[16px]"
            />
            <button
                type="submit"
                aria-label="Search"
                className="flex shrink-0 items-center justify-center bg-[#FEB100] px-4 text-[#031815] transition-colors hover:bg-[#0D523F] hover:text-white xl:px-5"
            >
                <FiSearch className="h-5 w-5" />
            </button>
            {showSuggestion && <SearchSuggestion query={search_query} />}
        </form>
    );
};

export default SearchBar;
