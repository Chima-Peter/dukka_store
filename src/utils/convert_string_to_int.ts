const convertStringToInt = (str: string) => {
    return parseInt(str.replace(/,/g, ""), 10)
}

export default convertStringToInt