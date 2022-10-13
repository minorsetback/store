export const Sort = (sort, data) => {
    if (data && data.length) {
        const products = [...data]
        const sortFilter = Object.fromEntries(Object.entries(sort.category).filter(([key, value]) => value === true));
        const sortFilterKeys = Object.keys(sortFilter)
        if (sort.sortBy === 'name') {
            products.sort(function (a, b) {
                var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
                if (nameA < nameB)
                    return -1
                if (nameA > nameB)
                    return 1
                return 0
            })
        }

        if (sort.sortBy === 'price') {
            products.sort(function (a, b) {
                return a.price - b.price
            })
        }

        if (sortFilterKeys.length > 0) {
            return products.filter((item) =>
                sortFilterKeys.some(category =>
                    String(item?.category) === String(category)
                )
            )
        }

        if (sortFilterKeys.length <= 0) {
            return products
        }
    }
}