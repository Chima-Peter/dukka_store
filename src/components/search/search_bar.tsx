"use client"


import { FiSearch } from "react-icons/fi";
import SearchSuggestion from "./search_suggestion";
import { useState } from "react";
import { useRouter } from "next/navigation";



const SearchBar = () => {
    const router = useRouter()

    // state to collect search query
    const [search_query, setSearchQuery] = useState<string>('')

    // state to show suggestion box
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false)

    // when input is on focus, show suggestion box
    const turnOnSuggestion = () => {
        setShowSuggestion(true)
    }

    // when input is on blur, hide suggestion box. We delay it to allow for search clicks
    const turnOffSuggestion = () => {
        setTimeout(() => setShowSuggestion(false), 300)
    }

    // collect search query
    const collectSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (search_query.length === 0) {
            setShowSuggestion(false)
            setSearchQuery('')
            router.push(`/search/${search_query}`)
        }
    }


    return (
        <form noValidate onSubmit={handleSubmit} className="flex border rounded-md border-[#ADB1B1] focus-within:border-gray-50 focus-within:drop-shadow-sm w-[100%] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] font-urbanist relative">
            <input onFocus={turnOnSuggestion} onBlur={turnOffSuggestion} onChange={collectSearchQuery} value={search_query} type="search" name="search" id="search" placeholder="Search for products" autoComplete="off" className="w-[100%] min-lg:h-[100%] placeholder:text-[14px] xl:placeholder:text-[18px] 2xl:placeholder:text-[22px] text-[16px] focus:drop-shadow-md outline-none xl:text-[22px] 2xl:text-[28px] placeholder:tracking-wide h-[36px] min-lg:py-3 px-6  rounded-l-md" />
            <button type="submit" className="rounded-r-md bg-[#FEB100] min-lg:py-2 px-6">
                <FiSearch className="w-5 h-5 text-black xl:w-7 xl:h-7 2xl:w-10 2xl:h-10" />
            </button>
            {
                showSuggestion && <SearchSuggestion /> // display suggestion dynamically
            }
        </form>   
    )
}

export default SearchBar