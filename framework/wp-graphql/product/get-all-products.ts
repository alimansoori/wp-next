import {fetchApi, normalizeProduct, getAllProductsQueries} from "../utils"
import {RootQueryToProductConnection} from '../schema'
import { Product } from "@common/types/product"

type ReturnType = {
    products: RootQueryToProductConnection
}

const getAllProducts = async (): Promise<Product[]> => {
    const {data} = await fetchApi<ReturnType>({query: getAllProductsQueries})

    return data.products.edges?.map((edge) => {
        // @ts-ignore
        return normalizeProduct(edge?.node)
    }) ?? [];
}

export default getAllProducts