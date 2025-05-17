import Tour from '../models/tourModel.js';
import qs from 'qs';
// ROUTE HANDLER
const transformQuery = (query) => {
  const transformedQuery = {};

  for (const key in query) {
    // Use regex to match keys with the format: field[operator]
    const match = key.match(/(\w+)\[(\w+)\]/);

    if (match) {
      const field = match[1]; // Extract the field (e.g., "duration")
      const operator = `$${match[2]}`; // Extract the operator (e.g., "gte") and add "$"

      // Initialize the field if it doesn't exist
      if (!transformedQuery[field]) {
        transformedQuery[field] = {};
      }

      // Convert value to number if it's numeric
      const value = isNaN(query[key]) ? query[key] : Number(query[key]);

      // Assign the value under the MongoDB operator
      transformedQuery[field][operator] = value;
    } else {
      // Handle simple key-value pairs
      const value = isNaN(query[key]) ? query[key] : Number(query[key]);
      transformedQuery[key] = value;
    }
  }

  return transformedQuery;
};

const tourController = {
  getAllTours: async (req, res) => {
    try {
      const queryObj = { ...req.query };
      const excludedFields = ['page', 'sort', 'limit', 'fields'];
      excludedFields.forEach((el) => delete queryObj[el]);
      console.log(queryObj);

      const parsedQuery = transformQuery(queryObj);
      console.log(parsedQuery);

      //{ 'duration[gte]': '5', difficulty: 'easy' }
      //{ duration: {$gte: '5'}, difficulty: 'easy' }
      // const query = Tour.find({ difficulty: 'easy', duration: { $gte: '5' } });
      const query = Tour.find(parsedQuery);
      // EXECUTE QUERY
      const tours = await query;

      // SEND RESPONSE
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

  deleteTour: async (req, res) => {
    try {
      await Tour.findByIdAndDelete(req.params.id);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      res.status(400).json({ status: 'fail', message: 'Cannot delete' });
    }
  },
};

export { tourController };
