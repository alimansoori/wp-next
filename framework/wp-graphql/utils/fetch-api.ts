import clientConfig from "../../../client-config";
import {ApiFetcherOptions, ApiFetcherResults} from "@common/types/api";

const fetchApi = async <T>({url, query}: ApiFetcherOptions): Promise<ApiFetcherResults<T>> => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query
        })
    })

    const {data, errors} = await res.json()

    if (errors) {
        throw new Error(errors[0].message ?? errors.message)
    }
    return { data }
}

export default fetchApi

// https://downloadly.ir/elearning/video-tutorials/nextjs-dev-to-deployment/