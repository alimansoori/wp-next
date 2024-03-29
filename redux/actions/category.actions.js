import {categoryConstants} from "./constants";
import SEARCH_CATEGORIES from '../../gql/queries/search-categories';
import client from "../../components/ApolloClient";
import {copy} from "../../functions";
import {initializeApollo} from "../../components/Apollo";

// function toTree(list, parent = 0) {
//     var map = {}, node, roots = [], i, newList = {};

//     for (i = 0; i < list.length; i += 1) {
//         newList[list[i].id] = list[i];
//     }

//     for (i = 0; i < list.length; i += 1) {
//         var array = [];
//         node = list[i]
//         if (node.parent === parent) {
//             let children = toTree(list, list[i].id);
//             list[i]['children'] = children;
//             roots[list[i].id] = list[i];
//             delete list[list[i]];
//         }
//     }
//     return {
//         current: parent > 0 ? newList[parent] : null,
//         back: (parent > 0) ? newList[newList[parent].parent] : null,
//         children: roots
//     };
// }
// function toTreeBySlug(list, slug = '', activeId = null) {
//     var node, roots = [], i, newList = {}, parent = 0;

//     for (i = 0; i < list.length; i += 1) {
//         newList[list[i].id] = list[i];
//         if (list[i].slug === slug) {
//             parent = list[i].id;
//         }
//     }

//     for (i = 0; i < list.length; i += 1) {
//         node = list[i]
//         if (list[i].id === activeId) { list[i].active = true; }
//         if (node.parent === parent) {
//             let children = toTree(list, list[i].id);
//             list[i]['children'] = children;
//             roots[list[i].id] = list[i];
//             delete list[list[i]];
//         }
//     }
//     return {
//         current: parent > 0 ? newList[parent] : null,
//         back: parent > 0 ? newList[newList[parent].parent] : null,
//         children: roots
//     };
// }
// function toTreeBySlugModify(categorySidebar, slug = '', data) {
//     var result = categorySidebar;

//     if (categorySidebar.children.length === 0) {
//         result = toTreeBySlug(data, categorySidebar.back.slug, categorySidebar.current.id)
//     }

//     return result;
// }

// export const getCategories = (params, slug = '') => {

//     return async (dispatch) => {

//         dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });

//         try {
//             const res = await axios.get(`/products/categories`, {
//                 params: {
//                     per_page: 100
//                 }
//             });

//             if (res.status === 200) {
//                 console.log(
//                     toTreeBySlugModify(
//                         toTreeBySlug(res.data, encodeURIComponent(slug).toLowerCase()),
//                         encodeURIComponent(slug).toLowerCase(),
//                         res.data
//                     )
//                 );
//                 dispatch({
//                     type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
//                     payload: {
//                         categories: res.data,
//                         categoriesSidebar: toTreeBySlugModify(
//                             toTreeBySlug(res.data, encodeURIComponent(slug).toLowerCase()),
//                             encodeURIComponent(slug).toLowerCase(),
//                             res.data
//                         )
//                     }
//                 });
//             }
//         } catch (error) {
//             console.log(error)
//             if (error.response.status === 400) {
//                 dispatch({
//                     type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
//                     payload: {
//                         error: error.response.data.message
//                     }
//                 });
//             }
//         }
//     }
// }

export const searchCategories = (filterQueries = {}) => {
    return async (dispatch, getState) => {
        dispatch({
            type: categoryConstants.SEARCH_CATEGORY_REQUEST
        });

        const apolloClient = initializeApollo()
        try {
            const {searchInput} = getState().category;
            const result = await apolloClient.query({
                query: SEARCH_CATEGORIES,
                variables: {
                    ...searchInput
                }
            });

            const {productCategories} = result.data;

            dispatch({
                type: categoryConstants.SEARCH_CATEGORY_SUCCESS,
                payload: {
                    categories: productCategories.edges,
                }
            });
        } catch (error) {
            dispatch({
                type: categoryConstants.SEARCH_CATEGORY_FAILURE,
                payload: {
                    error: error.response.data.message
                }
            });
        }
    }
};

export const catFilters = (categorySlug, categories) => {
    return async (dispatch, getState) => {
        let currentCategory = null

        if (!categorySlug || (typeof categories !== "undefined" && !categories.length)) {
            currentCategory = {
                node: {
                    title: 'همه کتاب‌ها',

                }
            }
        } else {
            currentCategory = categories?.find(cat => {
                return cat.node.slug === categorySlug
            })
        }

        let slugs = currentCategory?.node?.uri ? currentCategory.node.uri.split("/") : undefined

        if (Array.isArray(slugs) && slugs.length) {
            slugs = slugs.filter(e => (e !== "" && e !== "product-category"))
        }
        dispatch({
            type: categoryConstants.CATEGORY_FILTERS_BY_SLUGS,
            payload: {
                categoriesFilter: typeof categories !== "undefined" ? renderSlugs(slugs, categories) : {
                    isRoot: false,
                    activeId: null,
                    node: []
                },
                currentCategory: currentCategory
            }
        });
    }
};

export const categoriesBySlugs = (slugs = [], categories) => {
    return async (dispatch, getState) => {
        // console.log(getState().category.categories);
        // var categories = copy(getState().category.categories);
        // console.log(categories);

        dispatch({
            type: categoryConstants.SEARCH_CATEGORY_FILTER,
            payload: {
                categoriesFilter: recurciveCat(categories, slugs)
            }
        });

    }
};

const recurciveCat = (list, slugs = [], activeCatId = null) => {
    let node = {
        current: null,
        children: []
    };

    try {
        list
            .forEach(function (cat) {
                if (!slugs.length && !cat.node.parent) {
                    var cd = cat;
                    cd.child = list.filter(function (cat2) {
                        return (cat2.node.parent ? cat2.node.parent.node.databaseId : 0) === cd.node.databaseId
                    });
                    return node.children.push(cd);
                }
                if (slugs.length > 0 && cat.node.parent && decodeURIComponent(cat.node.parent.node.slug) === slugs[slugs.length - 1]) {
                    var cd = cat;
                    cd.child = list.filter(function (cat2) {
                        if (cat2.node.databaseId !== activeCatId) {
                            cat2.active = false;
                        }
                        return (cat2.node.parent ? cat2.node.parent.node.databaseId : 0) === cd.node.databaseId
                    });
                    node.current = cat.node.parent;
                    return node.children.push(cd);
                } else if (slugs.length > 0 && cat.node.parent && decodeURIComponent(cat.node.slug) === slugs[slugs.length - 1]) {
                    var cd = cat;
                    cd.child = list.filter(function (cat2) {
                        return (cat2.node.parent ? cat2.node.parent.node.databaseId : 0) === cd.node.databaseId
                    });
                    if (decodeURIComponent(cd.node.slug) === slugs[slugs.length - 1] && !cd.child.length) {
                        cd.active = true;

                        slugs.pop();
                        const data = recurciveCat(list, slugs, cd.node.databaseId);
                        node.children = data.children;
                        node.current = data.current;
                        throw "End";
                    }
                }
            })
    } catch (e) {
    }


    return node;
}


// const recurciveCat1 = (list, parent) => {
//     let node = [];
//     list
//         .filter(function (d) { return (d.node.parent ? d.node.parent.databaseId : 0) === parent })
//         .forEach(function (d) {
//             var cd = d;
//             cd.child = recurciveCat1(list, d.node.databaseId);
//             return node.push(cd);
//         })
//     return node;
// }

const renderSlugs = (slugs, categories) => {
    const catToTree = toTree(categories)

    let node = [];
    let activeId = null;
    let isRoot = false;
    if (typeof slugs === 'undefined' || !catToTree) {
        node = catToTree.filter((cat) => {
            return !cat.node.parentDatabaseId
        });

        return {
            isRoot: true,
            activeId,
            node: node
        }
    }

    for (let i = 0; i < slugs.length; i += 1) {
        let catFind = catToTree.find((cat) => {
            return cat.node.slug === slugs[i]
        })

        if (typeof catFind === "undefined") {
            continue
        }

        if (
            typeof catFind.children !== "undefined" &&
            typeof catFind.children === 'object' &&
            catFind.children.length
        ) {
            node.push(catFind)
        } else {
            activeId = catFind.node.databaseId

            if (!catFind.node.parentDatabaseId) {
                node = catToTree.filter((cat) => {
                    return cat.node.parentDatabaseId === catFind.node.parentDatabaseId
                });

                if (!catFind.node.parentDatabaseId) {
                    isRoot = true
                }
            }
        }
    }

    // console.log('Node', node)

    return {
        isRoot: isRoot,
        activeId: activeId,
        node: node
    }
}

const toTree = (list) => {
    var map = {}, node, roots = [], i;

    let newList = [...list]

    for (i = 0; i < newList.length; i += 1) {
        map[newList[i].node.databaseId] = i; // initialize the map
        // Object.preventExtensions(list[i])
        newList[i] = {
            ...newList[i],
            children: []
        };
    }

    for (i = 0; i < newList.length; i += 1) {
        node = newList[i].node;
        if (node.parentDatabaseId && newList[map[node.parentDatabaseId]]) {
            newList[map[node.parentDatabaseId]].children.push(newList[i]);
        }
        roots.push(newList[i]);
    }
    return roots;
}