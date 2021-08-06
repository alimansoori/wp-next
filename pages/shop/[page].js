import Shop, {getStaticProps} from './index'

export default Shop
export {getStaticProps}

export const getStaticPaths = async () => {
    return {
        fallback: false,
        paths: [
            {
                params: {page: "1"}
            },
            {
                params: {page: "2"}
            },
            {
                params: {page: "3"}
            }
        ]
    }
}