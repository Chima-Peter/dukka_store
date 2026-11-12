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
            className="relative flex w-full border border-dukka-line bg-dukka-canvas font-urbanist transition-colors focus-within:border-dukka-forest min-[1050px]:w-full"
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
                className="h-10 w-full bg-transparent px-4 text-[14px] text-dukka-ink outline-none placeholder:text-dukka-muted xl:h-11 xl:text-[15px]"
            />
            <button
                type="submit"
                aria-label="Search"
                className="flex shrink-0 items-center justify-center bg-dukka-amber px-3.5 text-dukka-ink transition-colors hover:bg-dukka-forest hover:text-white"
            >
                <FiSearch className="h-4 w-4" />
            </button>
            {showSuggestion && <SearchSuggestion query={search_query} />}
        </form>
    );
};

export default SearchBar;
