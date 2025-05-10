import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// ROUTE HANDLER
const tourController = {
  checkID: (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);
    if (req.params.id * 1 > tours.length) {
      return res.status(404).json({ status: 'fail', message: 'Invalid ID' });
    }
    next();
  },

  checkBody: (req, res, next) => {
    console.log('Checking body');
    if (!req.body.name || !req.body.price) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'Missing name or price' });
    }
    next();
  },

  getAllTours: (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours: tours,
      },
    });
  },

  getTour: (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    res.status(200).json({
      status: 'success',

      data: {
        tour: tour,
      },
    });
  },

  createTour: (req, res) => {
    //   console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).json({
          status: 'success',
          data: {
            tours: newTour,
          },
        });
      }
    );
  },

  updateTour: (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: '<Updated router here>',
      },
    });
  },

  deleteTour: (req, res) => {
    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
};

export { tourController };
