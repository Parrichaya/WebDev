const Review = require('../models/review');

exports.addReview = (req, res, next) => {
    const company_name = req.body.company_name;
    const pros = req.body.pros;
    const cons = req.body.cons;
    const rating = req.body.rating;

    Review.create({
        company_name: company_name,
        pros: pros,
        cons: cons,
        rating: rating
    })
    .then((newReview) => {
        console.log('Review added!');
        res.status(201).json({newReviewDetail: newReview});
    })
    .catch(err => console.log(err));
} 


exports.searchCompany = (req, res, next) => {
    const company_name = req.body.company_name;
    Review.findAll({ where: {company_name},attributes: ['pros', 'cons', 'rating'] })
        .then((reviews) => {
            if (reviews.length === 0) {
                res.status(404).json({ message: "No reviews found" });
            } else {
                res.status(200).json({ company_name, reviews: reviews });
            }
        })
        .catch(err => console.log(err));
}