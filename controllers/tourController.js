import Tour from '../models/tourModel.js';

// ROUTE HANDLER
const tourController = {
  getAllTours: async (req, res) => {
    try {
      const tours = await Tour.find();
      res.status(200).json({
        results: tours.length,
        data: {
          tours: tours,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  },

  getTour: async (req, res) => {
    try {
      const tour = await Tour.findById(req.params.id);
      // Tour.findOne({_id: req.params.id})
      res.status(200).json({
        status: 'success',
        data: {
          tour: tour,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err,
      });
    }
  },

  createTour: async (req, res) => {
    try {
      const newTour = await Tour.create(req.body);

      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: 'Invalid data sent' });
    }
  },

  updateTour: async (req, res) => {
    try {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: 'success',
        data: {
          tour: tour,
        },
      });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: 'Invalid data sent' });
    }
  },

  deleteTour: (req, res) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
};

export { tourController };
