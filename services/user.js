const mongoose = require("mongoose");
const User = require("../models/user");
const { response } = require("express");

const user = mongoose.model(User);

createUser = (data, callback) => {
  user.create(data).then(
    (response) => {
      callback(null, response);
    },
    (error) => {
      callback(error, null);
    }
  );
};

findUser = (query, callback) => {
  user.findOne(query, callback);
};

updateUserById = (id, data, callback) => {
  user.findByIdAndUpdate(
    {
      _id: id,
    },
    data,
    (err, response) => {
      callback(err, response);
    }
  );
};
updateUser = (query, data, options, callback) => {
  user.findOneAndUpdate(query, data, options, (err, response) => {
    callback(err, response);
  });
};
deleteUser = (query, callback) => {
  user.deleteOne(query, callback);
};

module.exports = {
  createUser,
  findUser,
  updateUserById,
  updateUser,
  deleteUser,
};
