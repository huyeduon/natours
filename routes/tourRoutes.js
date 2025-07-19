const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { authorization } = require("../middlewares/auth.middleware");

// const {
//   getAllCategory,
//   postCategory,
//   getCategoryById,
//   deleteCategoryById,
//   updateCategoryById,
// } = require("../controllers/category.controller");

// const { asyncHandle } = require("../utils/asyncHandle");

// // public routes
// router.get("/", asyncHandle(getAllCategory));
// router.get("/:id", asyncHandle(getCategoryById));

// router.use(authorization);

// // protected routes
// router.post("/", asyncHandle(postCategory));
// router.delete("/:id", asyncHandle(deleteCategoryById));
// router.put("/:id", asyncHandle(updateCategoryById));

// module.exports = router;
