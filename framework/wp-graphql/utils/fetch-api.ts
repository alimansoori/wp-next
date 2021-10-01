import clientConfig from "../../../client-config";

type FetcherParams = {
    query: string
}

type FetcherResult<T> = { data: T }

const fetchApi = async <T>({query}: FetcherParams): Promise<FetcherResult<T>> => {
    const url = clientConfig.graphqlUrl
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