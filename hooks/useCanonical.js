import { useRouter } from 'next/router'
import clientConfig from '../client-config'

function useCanonical(canonical) {
    const siteUrl = clientConfig.siteUrl
    const graphqlSiteUrl = clientConfig.graphqlSiteUrl
    return canonical.replace(graphqlSiteUrl, siteUrl)
}

export default useCanonical