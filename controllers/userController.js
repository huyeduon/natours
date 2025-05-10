import express from 'express';

const userController = {
  getAllUsers: (req, res) => {
    res
      .status(500)
      .json({ status: 'error', message: 'This route is not yet implemented.' });
  },

  getUser: (req, res) => {
    res
      .status(500)
      .json({ status: 'error', message: 'This route is not yet implemented.' });
  },

  createUser: (req, res) => {
    res
      .status(500)
      .json({ status: 'error', message: 'This route is not yet implemented.' });
  },

  updateUser: (req, res) => {
    res
      .status(500)
      .json({ status: 'error', message: 'This route is not yet implemented.' });
  },

  deleteUser: (req, res) => {
    res
      .status(500)
      .json({ status: 'error', message: 'This route is not yet implemented.' });
  },
};

export { userController };
