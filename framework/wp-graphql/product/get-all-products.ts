import getAllProductsQueries from "../utils/queries/get-all-products";
import fetchApi from "../utils/fetch-api";

const getAllProducts = async (): Promise<any[]> => {
    const products = await fetchApi({query: getAllProductsQueries})

    return products.data
}

export default getAllProducts