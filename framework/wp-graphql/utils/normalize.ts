import {
    Maybe,
    MediaItem,
    Product as WPProduct,
    ProductToMediaItemConnection
} from "../schema"

import {Product, ProductImage} from "@common/types/product"

export function normalizeProduct(productNode: WPProduct): Product  {

    const {
        id,
        databaseId,
        name,
        description,
        slug,
        image,
        galleryImages,
        ...rest
    } = productNode

    return {
        id,
        databaseId,
        description,
        name,
        slug,
        image: image ? normalizeProductImage(image) : null,
        images: normalizeProductImages(galleryImages)
    }
}

export function normalizeProductImages(images: Maybe<ProductToMediaItemConnection> | undefined): Maybe<ProductImage>[] | null {

    return images?.edges?.map((edge) => (
        normalizeProductImage(edge?.node)
    )) ?? null

}

export function normalizeProductImage(node: Maybe<MediaItem> | undefined): Maybe<ProductImage> {
    return {
        alt: node?.altText,
        url: node?.sourceUrl,
        title: node?.title
    }
}
