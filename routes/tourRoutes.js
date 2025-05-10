import express from 'express';
const router = express.Router();
import { tourController } from '../controllers/tourController.js';

router.param('id', tourController.checkID);

// create a check body middleware functionn
// check if body contains the name and price property
// if not send back 400 (bad request)

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default router;
