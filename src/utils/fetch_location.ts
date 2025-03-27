

const fetchLocation = async () => {
    const apis = [
        "https://ipwho.is/",
        "https://api.ipgeolocation.io/ipgeo?apiKey=YOUR_API_KEY",
        "http://ip-api.com/json"
    ];

    for (const api of apis) {
        try {
            const response = await fetch(api, { next: { revalidate: 86400 } }); // cache results for one day
            if (!response.ok) throw new Error("API failed");

            const data = await response.json();
            if (data && data.country) { // Check if response is valid
                return data
            }
        } catch (error) {
            console.warn(`Failed with ${api}, trying next...`, error);
        }
    }
    
    console.error("All APIs failed!");
    return null;
};


export default fetchLocation
