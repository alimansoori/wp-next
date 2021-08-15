import {v4} from 'uuid';
import {parseCookies} from 'nookies';
import {NotificationManager} from 'react-notifications';

/**
 * Extracts and returns float value from a string.
 *
 * @param {string} string String
 * @return {any}
 */
export const getFloatVal = (string) => {

    let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue).toFixed(2)) : '';

};

/**
 * Add first product.
 *
 * @param {Object} product Product
 * @return {{totalProductsCount: number, totalProductsPrice: any, products: Array}}
 */
export const addFirstProduct = (product) => {

    let productPrice = getFloatVal(product.price);

    let newCart = {
        products: [],
        totalProductsCount: 1,
        totalProductsPrice: productPrice
    };

    const newProduct = createNewProduct(product, productPrice, 1);
    newCart.products.push(newProduct);

    localStorage.setItem('wp-next-cart', JSON.stringify(newCart));

    return newCart;
};

/**
 * Create a new product object.
 *
 * @param {Object} product Product
 * @param {Integer} productPrice Product Price
 * @param {Integer} qty Quantity
 * @return {{image: *, productId: *, totalPrice: number, price: *, qty: *, name: *}}
 */
export const createNewProduct = (product, productPrice, qty) => {

    return {
        productId: product.databaseId,
        image: product.image,
        name: product.name,
        price: productPrice,
        qty,
        totalPrice: parseFloat((productPrice * qty).toFixed(2))
    };

};

/**
 * Updates the existing cart with new item.
 *
 * @param {Object} existingCart Existing Cart.
 * @param {Object} product Product.
 * @param {Integer} qtyToBeAdded Quantity.
 * @param {Integer} newQty New Qty to be updated.
 * @return {{totalProductsCount: *, totalProductsPrice: *, products: *}}
 */
export const updateCart = (existingCart, product, qtyToBeAdded, newQty = false) => {

    const updatedProducts = getUpdatedProducts(existingCart.products, product, qtyToBeAdded, newQty);

    const addPrice = (total, item) => {
        total.totalPrice += item.totalPrice;
        total.qty += item.qty;

        return total;
    };

    // Loop through the updated product array and add the totalPrice of each item to get the totalPrice
    let total = updatedProducts.reduce(addPrice, {totalPrice: 0, qty: 0});

    const updatedCart = {
        products: updatedProducts,
        totalProductsCount: parseInt(total.qty),
        totalProductsPrice: parseFloat(total.totalPrice)
    };

    localStorage.setItem('wp-next-cart', JSON.stringify(updatedCart));

    return updatedCart;
};

/**
 * Get updated products array
 * Update the product if it exists else,
 * add the new product to existing cart,
 *
 * @param {Object} existingProductsInCart Existing product in cart
 * @param {Object} product Product
 * @param {Integer} qtyToBeAdded Quantity
 * @param {Integer} newQty New qty of the product (optional)
 * @return {*[]}
 */
export const getUpdatedProducts = (existingProductsInCart, product, qtyToBeAdded, newQty = false) => {

    // Check if the product already exits in the cart.
    const productExitsIndex = isProductInCart(existingProductsInCart, product.databaseId);

    // If product exits ( index of that product found in the array ), update the product quantity and totalPrice
    if (-1 < productExitsIndex) {
        let updatedProducts = existingProductsInCart;
        let updatedProduct = updatedProducts[productExitsIndex];

        // If have new qty of the product available, set that else add the qtyToBeAdded
        updatedProduct.qty = (newQty) ? parseInt(newQty) : parseInt(updatedProduct.qty + qtyToBeAdded);
        updatedProduct.totalPrice = parseFloat((updatedProduct.price * updatedProduct.qty).toFixed(2));

        return updatedProducts;
    } else {

        // If product not found push the new product to the existing product array.
        let productPrice = getFloatVal(product.price);
        const newProduct = createNewProduct(product, productPrice, qtyToBeAdded);
        existingProductsInCart.push(newProduct);

        return existingProductsInCart;
    }
};

/**
 * Returns index of the product if it exists.
 *
 * @param {Object} existingProductsInCart Existing Products.
 * @param {Integer} productId Product id.
 * @return {number | *} Index Returns -1 if product does not exist in the array, index number otherwise
 */
const isProductInCart = (existingProductsInCart, productId) => {

    const returnItemThatExits = (item, index) => {
        if (productId === item.databaseId) {
            return item;
        }
    };

    // This new array will only contain the product which is matched.
    const newArray = existingProductsInCart.filter(returnItemThatExits);

    return existingProductsInCart.indexOf(newArray[0]);
};

/**
 * Remove Item from the cart.
 *
 * @param {Integer} productId Product Id.
 * @return {any | string} Updated cart
 */
export const removeItemFromCart = (productId) => {

    const cookies = parseCookies()
    let existingCart = cookies['wp-next-cart'];
    existingCart = JSON.parse(existingCart);

    // If there is only one item in the cart, delete the cart.
    if (1 === existingCart.products.length) {

        localStorage.removeItem('wp-next-cart');
        return null;

    }

    // Check if the product already exits in the cart.
    const productExitsIndex = isProductInCart(existingCart.products, productId);

    // If product to be removed exits
    if (-1 < productExitsIndex) {

        const productTobeRemoved = existingCart.products[productExitsIndex];
        const qtyToBeRemovedFromTotal = productTobeRemoved.qty;
        const priceToBeDeductedFromTotal = productTobeRemoved.totalPrice;

        // Remove that product from the array and update the total price and total quantity of the cart
        let updatedCart = existingCart;
        updatedCart.products.splice(productExitsIndex, 1);
        updatedCart.totalProductsCount = updatedCart.totalProductsCount - qtyToBeRemovedFromTotal;
        updatedCart.totalProductsPrice = updatedCart.totalProductsPrice - priceToBeDeductedFromTotal;

        localStorage.setItem('wp-next-cart', JSON.stringify(updatedCart));
        return updatedCart;

    } else {
        return existingCart;
    }
};

/**
 * Returns cart data in the required format.
 * @param {String} data Cart data
 */
export const getFormattedCart = (data) => {
    console.log(data);

    let formattedCart = null;

    if (undefined === data || !data.cart.contents.nodes.length) {
        return formattedCart;
    }

    const givenProducts = data.cart.contents.nodes;

    // Create an empty object.
    formattedCart = {};
    formattedCart.products = [];
    let totalProductsCount = 0;

    for (let i = 0; i < givenProducts.length; i++) {
        const givenProduct = givenProducts[i].product.node;
        const product = {};
        const total = getFloatVal(givenProducts[i].total);

        product.productId = givenProduct.databaseId;
        product.cartKey = givenProducts[i].key;
        product.name = givenProduct.name;
        product.qty = givenProducts[i].quantity;
        product.price = total / product.qty;
        product.totalPrice = givenProducts[i].total;
        product.image = {
            sourceUrl: givenProduct.image.sourceUrl,
            srcSet: givenProduct.image.srcSet,
            title: givenProduct.image.title
        };

        totalProductsCount += givenProducts[i].quantity;

        // Push each item into the products array.
        formattedCart.products.push(product);
    }

    formattedCart.totalProductsCount = totalProductsCount;
    formattedCart.totalProductsPrice = data.cart.total;

    return formattedCart;

};

export const createCheckoutData = (order) => {
    const checkoutData = {
        clientMutationId: v4(),

        billing: {
            firstName: order.firstName,
            lastName: order.lastName,
            address1: order.address1,
            address2: order.address2,
            city: order.city,
            country: order.country,
            state: order.state,
            postcode: order.postcode,
            email: order.email,
            phone: order.phone,
            company: order.company,
        },
        shipping: {
            firstName: order.firstName,
            lastName: order.lastName,
            address1: order.address1,
            address2: order.address2,
            city: order.city,
            country: order.country,
            state: order.state,
            postcode: order.postcode,
            email: order.email,
            phone: order.phone,
            company: order.company,
        },
        shipToDifferentAddress: false,
        paymentMethod: order.paymentMethod,
        isPaid: false,
        transactionId: "hjkhjkhsdsdiui"
    };

    return checkoutData;
};

/**
 * Get the updated items in the below format required for mutation input.
 *
 * [
 * { "key": "33e75ff09dd601bbe6dd51039152189", "quantity": 1 },
 * { "key": "02e74f10e0327ad868d38f2b4fdd6f0", "quantity": 1 },
 * ]
 *
 * Creates an array in above format with the newQty (updated Qty ).
 *
 */
export const getUpdatedItems = (products, newQty, cartKey) => {

    // Create an empty array.
    const updatedItems = [];

    // Loop through the product array.
    products.map((cartItem) => {

        // If you find the cart key of the product user is trying to update, push the key and new qty.
        if (cartItem.key === cartKey) {

            updatedItems.push({
                key: cartItem.key,
                quantity: parseInt(newQty)
            });

            // Otherwise just push the existing qty without updating.
        } else {
            updatedItems.push({
                key: cartItem.key,
                quantity: cartItem.quantity
            });
        }
    });

    // Return the updatedItems array with new Qtys.
    return updatedItems;

};

export const variationIsCorrectInLocal = (variation, attrLocalName, attrId) => {
    if ('attributes' in variation && variation.attributes.nodes !== null) {
        for (let attr of variation.attributes.nodes) {
            if (attr.name === attrLocalName && attr.attributeId === attrId) {
                return true;
            }
        }
    }
    return false;
}

export function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export function uriToUse(uri) {
    uri = decodeURIComponent(uri);
    uri = uri.split('/');
    uri.splice(0, 1);
    uri.splice(0, 1);
    uri.splice(uri.length - 1, 1);

    return uri;
}

export function randomString() {
    return Math.random().toString(36).substring(7);
    ;
}

export function copy(array) {
    let arrayCopy = [];
    let i = -1;

    while (++i < array.length) {
        arrayCopy[i] = array[i];
    }
    return arrayCopy;
}

export function stringToNumber(str = 0) {
    if (!str) return 0;
    if (typeof str === 'number') return str.toLocaleString();


    let splitStr = str.split(/(\d+)/);

    splitStr = splitStr.filter(item => {
        return (item !== "£" && item !== 'تومان' && item !== '.' && item !== "" && item !== "00" && item !== ",");
    });

    return parseInt(splitStr.join("")).toLocaleString();
}

export function stringToNumber2(str = 0) {
    if (typeof str == 'number') return str.toLocaleString();


    let splitStr = str.split(/(\d+)/);

    splitStr = splitStr.filter(item => {
        return (item !== "£" && item !== 'تومان' && item !== '.' && item !== "" && item !== "00" && item !== ",");
    });

    return parseInt(splitStr.join(""));
}

export function getValueByKey(obj, key) {
    if (obj && (obj.hasOwnProperty(key))) {
        return obj[key]
    }
    return null;
}

export function orderBy(key = 1) {
    let orderBy = []

    switch (key) {
        case "1":
            orderBy.push({
                'field': 'DATE',
                'order': 'DESC'
            })
            break;
        case "2":
            orderBy.push({
                'field': 'DATE',
                'order': 'ASC'
            })
            break;
        case "3":
            orderBy.push({
                'field': 'PRICE',
                'order': 'DESC'
            })
            break;
        case "4":
            orderBy.push({
                'field': 'PRICE',
                'order': 'ASC'
            })
            break;
        case "5":
            orderBy.push({
                'field': 'RATING',
                'order': 'DESC'
            })
            break;

        default:
            orderBy.push({
                'field': 'DATE',
                'order': 'DESC'
            })
            break;
    }
    return orderBy
}

export function sortByArray(key = 1, array) {

    switch (key) {
        case "1":
            array.sort(function (a, b) {
                let c = new Date(a.node.date)
                let d = new Date(b.node.date)
                if (c < d) return 1;
                if (c > d) return -1;
                return 0;
            })
            break;
        case "2":
            array.sort(function (a, b) {
                let c = new Date(a.node.date)
                let d = new Date(b.node.date)
                if (c < d) return -1;
                if (c > d) return 1;
                return 0;
            })
            break;
        case "3":
            array.sort(function (a, b) {
                let c = parseInt(a.node.price)
                let d = parseInt(b.node.price)
                if (c < d) return 1;
                if (c > d) return -1;
                return 0;
            })
            break;
        case "4":
            array.sort(function (a, b) {
                let c = parseInt(a.node.price)
                let d = parseInt(b.node.price)
                if (c < d) return -1;
                if (c > d) return 1;
                return 0;
            })
            break;
        case "5":
            array.sort(function (a, b) {
                let c = parseInt(a.node.averageRating)
                let d = parseInt(b.node.averageRating)
                if (c < d) return 1;
                if (c > d) return -1;
                return 0;
            })
            break;

        default:
            array.sort(function (a, b) {
                let c = new Date(a.node.date)
                let d = new Date(b.node.date)
                if (c < d) return 1;
                if (c > d) return -1;
                return 0;
            })
            break;
    }
    return array
}

export function getTaxonomyFilter(category = undefined, publisher = undefined, writer = undefined, translator = undefined) {
    let taxonomyFilter = {}

    if (typeof category !== "undefined") {
        taxonomyFilter = {
            filters: [
                {
                    operator: "IN",
                    taxonomy: "PRODUCTCATEGORY",
                    terms: [category]
                }
            ],
            relation: 'AND'
        }
    }

    if (typeof publisher !== "undefined") {
        taxonomyFilter = {
            filters: [
                {
                    operator: "IN",
                    taxonomy: "PAPUBLISHER",
                    terms: [publisher]
                }
            ],
            relation: 'AND'
        }
    }
    if (typeof writer !== "undefined") {
        taxonomyFilter = {
            filters: [
                {
                    operator: "IN",
                    taxonomy: "PAWRITER",
                    terms: [writer]
                }
            ],
            relation: 'AND'
        }
    }
    if (typeof translator !== "undefined") {
        taxonomyFilter = {
            filters: [
                {
                    operator: "IN",
                    taxonomy: "PATRANSLATOR",
                    terms: [translator]
                }
            ],
            relation: 'AND'
        }
    }

    return taxonomyFilter
}

export function alertMessage(message, type = 'info') {
    switch (type) {
        case 'info':
            console.log(type)
            NotificationManager.info(message);
            break;
        case 'success':
            NotificationManager.success(message);
            break;
        case 'warning':
            NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
            break;
        case 'error':
            NotificationManager.error('Error message', 'Click me!', 5000, () => {
                alert('callback');
            });
            break;
    }
}