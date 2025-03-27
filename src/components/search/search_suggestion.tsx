"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const SearchSuggestion = () => {
    const router = useRouter()

    const [suggestions, setSuggestions] = useState(['Garri', 'Garri Ijebu', 'Garri Oyo', 'Garri Egba'])

    // when user clicks on a suggestion, navigate to search page of that suggestion
    const makeSearch = (suggestion: string) => {
        setSuggestions([suggestion])
        router.push(`/search/${suggestion}`) // simply to test build file
    }


    return (
        <div className="flex flex-col rounded-lg border border-white drop-shadow-xl w-[100%] lg:w-[400px] xl:w-[500px] 2xl:w-[600px] absolute top-12 bg-white">
            <h2 className="text-[16px] min-lg:text-lg xl:text-xl 2xl:text-2xl font-[400] text-[#888B8B] py-2 border-b-[1.3px] border-b-[#888B8B] px-4 uppercase">
                Suggestions
            </h2>
            <ul className="flex flex-col pb-8 w-[100%]">
                {
                    suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => makeSearch(suggestion)} className="text-[14px] min-lg:text-[16px] w-[100%] hover:bg-gray-200 font-normal py-2 px-4 tracking-wide cursor-pointer">
                            {suggestion}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SearchSuggestion