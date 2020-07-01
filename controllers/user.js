const userService = require("../services/user");

// class to destructure req.body
class User {
  constructor(userData) {
    this.username = userData.username || "";
    this.firstName = userData.firstName || "";
    this.lastName = userData.lastName || "";
    this.dob = userData.dob || "";
    this.address = userData.address || "";
    this.phone = userData.phone || "";
    this.role = userData.role || "";
  }
}

create = (req, res) => {
  const body = new User(req.body);
  if (!body.username) {
    res.status(400).send("User name is missing");
    return;
  }
  userService.createUser(body, (error, response) => {
    if (response) {
      res.status(201).send(response);
    } else if (error) {
      res.status(400).send(error);
    }
  });
};

find = (req, res) => {
  const params = req.params || {};
  const query = {
    username: params.username,
  };
  if (!query) {
    res.status(400).send("Bad Request");
    return;
  }
  userService.findUser(query, (error, response) => {
    if (error) {
      res.status(404).send(error);
      return;
    }
    if (response) {
      res.status(200).send(response);
      return;
    }
    if (!response) {
      res.status(204).send("No Data Found");
    }
  });
};

updateById = (req, res) => {
  const body = req.body;

  if (!body.id) {
    res.status(400).send("Id is missing");
    return;
  }
  const updateData = body.data || {};
  userService.updateUserById(body.id, updateData, (err, response) => {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }
  });
};

update = (req, res) => {
  const body = req.body;
  const query = body.query;
  const data = body.data;
  const options = body.options;
  if (!query) {
    res.status(400).send("Bad request");
    return;
  }

  userService.updateUser(query, data, options, (err, response) => {
    if (response) {
      res.status(200).send(response);
    } else if (err) {
      res.status(400).send(err);
    }
  });
};

remove = (req, res) => {
  const body = req.body || {};
  const query = body.query;
  if (!query) {
    res.status(400).send("Bad Request");
    return;
  }
  userService.deleteUser(query, function (error, response) {
    if (error) {
      res.status(400).send(error);
      return;
    }
    if (response) {
      if (response.n === 1 && response.ok === 1) {
        res.status(202).send(body);
      }
      if (response.n === 0 && response.ok === 1) {
        res.status(204).send({
          message: "No data found",
        });
      }
    }
  });
};

module.exports = {
  create,
  find,
  update,
  updateById,
  remove,
};
