const express = require('express');
const { getReview, postReview } = require('../handlers/review-handler');
const router = express.Router();

router.get('/', getReview);
router.post('/', postReview);

module.exports = router;