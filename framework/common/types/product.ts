export type Maybe<T> = T | null;

export interface ProductImage {
    alt?: Maybe<string> | undefined,
    url: Maybe<string> | undefined,
    title?: Maybe<string> | undefined
}

export interface Product {
    id: string,
    databaseId: number,
    name: Maybe<string> | undefined,
    description: Maybe<string> | undefined,
    slug: Maybe<string> | undefined,
    image: Maybe<ProductImage> | undefined,
    images: Maybe<ProductImage>[] | null
}