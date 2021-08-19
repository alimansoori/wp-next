import GET_CART from "../../gql/queries/get-cart";
import GET_CUSTOMER from "../../gql/queries/get-customer";
import GET_VIEWER from "../../gql/queries/get-viewer";

export async function commonQueries(apolloClient) {
    // const viewer = await getViewerQuery(apolloClient, context)

    await apolloClient.query({
        query: GET_CART,
    });

    // Customer
    // let variables = {}
    // if (viewer) {
    //     variables = {
    //         customerId: viewer.databaseId,
    //         id: viewer.id
    //     }
    // }
    // await apolloClient.query({
    //     query: GET_CUSTOMER,
    //     variables
    // });
}

export async function getViewerQuery(apolloClient, context) {
    // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGFzdGFuYWEucHJvamVrdC5pciIsImlhdCI6MTYyODEyMjM5OSwibmJmIjoxNjI4MTIyMzk5LCJleHAiOjE2MjgxMjUzOTksImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.kPLvVTtFDNSzzsWRYbGrwhVfSb3jl4XCI87Ho9UpbY4';
    const query = await apolloClient.query({
        query: GET_VIEWER,
        // context: {
        //     headers: {
        //         Authorization: `Bearer ${token}`,
        //     },
        // },
    });


    const {viewer} = query.data
    return viewer
}