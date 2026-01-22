const Product = require("../db/product");
const mongoose = require('mongoose');

async function addProduct(model){
    let product = new Product({
        ...model,
    });
    await product.save();
    return product.toObject();
}

async function updateProduct(id,model){
    await Product.findByIdAndUpdate(id,model);
}

async function deleteProduct(id){
    await Product.findByIdAndDelete(id);
}

async function getAllProducts(){
    let products = await Product.find();
    return products.map(x => x.toObject());
}

async function getProduct(id){
    let product = await Product.findById(id);
    return product.toObject();
}

async function getNewProducts(){
    let newProducts = await Product.find({
        isNewProduct: true,
    })
    return newProducts.map(x=> x.toObject());
}

async function getFeaturedProducts(){
    let featuredProducts = await Product.find({
        isFeature: true,
    })
    return featuredProducts.map(x=> x.toObject());
}

async function getProductForListing(searchTerm, categoryId, sortBy, sortOrder, brandId, pageSize, page) {
    if(!sortBy){
        sortBy = 'price';
    }

    if(sortOrder === 'asc'){
        sortOrder = 1;
    } else if(sortOrder === 'desc'){
        sortOrder = -1;
    } else {
        sortOrder = -1;
    }

    page = page && page > 0 ? page : 1;
    pageSize = pageSize && pageSize > 0 ? pageSize : 1000;

    let queryFilter = {};
    if(searchTerm){
        queryFilter.$or = [
            { name: { $regex: '.*' + searchTerm + '.*', $options: 'i' } },
            { shortDescription: { $regex: '.*' + searchTerm + '.*', $options: 'i' } }
        ];
    }
    if(categoryId && mongoose.Types.ObjectId.isValid(categoryId)){
        queryFilter.categoryId = new mongoose.Types.ObjectId(categoryId);
    }
    if(brandId && mongoose.Types.ObjectId.isValid(brandId)){
        queryFilter.brandId = new mongoose.Types.ObjectId(brandId);
    }

    const products = await Product.find(queryFilter)
        .sort({ [sortBy]: sortOrder })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

    const totalCount = await Product.countDocuments(queryFilter);

    return {
        products: products.map(x => x.toObject()),
        totalCount
    };
}

async function getProductSuggestions(term) {
    try {
        const products = await Product.find({
            name: { $regex: term, $options: "i" }
        }).limit(5); // top 5 matches

        return { data: products.map(p => p.name) };
    } catch (err) {
        return { error: err.message };
    }
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProduct,
    getNewProducts,
    getFeaturedProducts,
    getProductForListing,
    getProductSuggestions,
};