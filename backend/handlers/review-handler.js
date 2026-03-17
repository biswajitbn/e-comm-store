const Review = require("../db/review");

//get reviews for specific product

const getReview = async (req,res) =>{
    try{
        const { productId } = req.query;
        const reviews = await Review.find({ productId });
        res.json(reviews);
    }
    catch(err){
        res.status(500).json({ error: 'failed to fetch reviews'});
    }
};


//post a new review 

const postReview = async (req,res) => {
    try{
        const { productId, name, rating, comment } = req.body;
        const review = new Review({ productId, name, rating, comment });
        await review.save();
        res.status(201).json(review);
    }
    catch(err){
        res.status(500).json({ error: 'failed to post review '});
    }
};

module.exports = {
    getReview,
    postReview,
}