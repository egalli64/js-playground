
(window => {
    const itemTypes = ['Electronics', 'Book', 'Clothing', 'Food']

    function myLibrary() {
        const catalog = createRandomCatalog(100)

        return {
            searchProductById: searchProductById,
            searchProductsByPrice: searchProductsByPrice,
            searchProductsByType: searchProductsByType,
            searchAllProducts: searchAllProducts
        }

        function searchProductsByType(type) {
            return new Promise((resolve, reject) => {
                if (!itemTypes.includes(type)) {
                    reject('Invalid Type: ' + type)
                }
                else {
                    let results = []
                    for (let item of catalog)
                        if (item.type == type)
                            results.push(item)
                    resolve(results)
                }
            })
        }

        function searchProductsByPrice(price, delta) {
            return new Promise((resolve, reject) => {
                if (!isFinite(price)) {
                    reject('Invalid Price: ' + price)
                }
                else {
                    let results = []
                    for (let item of catalog) {
                        if (Math.abs(item.price - price) < delta)
                            results.push(item)
                    }
                    if (results.length)
                        resolve(results)
                    else
                        reject('No item in the specified interval')
                }
            })
        }

        function searchProductById(id) {
            return new Promise((resolve, reject) => {
                for (let item of catalog) {
                    if (item.id == id)
                        resolve(item)
                }
                reject('Invalid ID: ' + id)
            })
        }

        function searchAllProducts() {
            return new Promise((resolve, reject) => setTimeout(() => resolve(catalog), 0))
        }

        function createRandomCatalog(size) {
            let results = []
            for (let i = 0; i < size; i++)
                results.push({
                    id: i,
                    price: (Math.random() * 500).toFixed(2),
                    type: itemTypes[Math.floor(Math.random() * 4)]
                })
            return results
        }
    }

    if (typeof (window.api) === 'undefined') {
        window.api = myLibrary()
    }

})(window)
