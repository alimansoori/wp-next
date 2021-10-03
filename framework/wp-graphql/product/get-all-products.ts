import {fetchApi, normalizeProduct, getAllProductsQueries} from "../utils"
import {RootQueryToProductConnection} from '../schema'
import { Product } from "@common/types/product"
import {getConfig} from "@framework/api/config";
import {ApiConfig} from "@common/types/api";

type ReturnType = {
    products: RootQueryToProductConnection
}

const getAllProducts = async (config: ApiConfig): Promise<Product[]> => {
    const {data} = await config.fetch<ReturnType>({
        url: config.apiUrl,
        query: getAllProductsQueries
    })

    return data.products.edges?.map((edge) => {
        // @ts-ignore
        return normalizeProduct(edge?.node)
    }) ?? [];
}

export default getAllProducts