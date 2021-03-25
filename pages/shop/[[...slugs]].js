import React, { useEffect } from "react";

const Shop = (props) => {


    useEffect(() => {

    }, []);

    return (
        <>
        <div>
            Slugs: {props.products}
        </div>
        </>
    )
}

export const getServerSideProps = async (context) => {

    let products = null;
    const { slugs } = context.query
    const id = slugs ? slugs : context.query.id;

    // try {
    //     const result = await client.query({
    //         query: GET_PRODUCTS,
    //         // variables: { id }
    //     });
    //     products = result.data.products
    // } catch (e) {
    //     console.error(e)
    // }

    return {
        props: {
            products: id
        }
    }
}

export default Shop;