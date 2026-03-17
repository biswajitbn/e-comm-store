export interface Product{
isFavorite: any;
    _id?: string,
    name: String,
    shortDescription: String,
    description: String,
    price: Number,
    discount: Number,
    images: string[],
    categoryId: string,
    isFeatured: boolean,
    isNew: boolean,
}