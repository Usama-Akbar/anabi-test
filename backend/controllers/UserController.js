const User = require("../utils/Schema/UserSchema");
const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(process.env.DATABASE_URI);
const { ObjectId } = require("mongodb");
module.exports = {
  usersList: async function (req, res, next) {
    try {
      const users = await client
        .db(process.env.DATA_BASE)
        .collection("users")
        .find()
        .toArray();
      if (users.length === 0) {
        res.json({
          message: "No Users found!",
          result: true,
        });
      } else {
        res.json({ users, result: true });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
  specificUser: async function (req, res, next) {
    try {
      const userName = req.params.id;
      const user = await client
        .db(process.env.DATA_BASE)
        .collection("users")
        .findOne({ userName: userName });
      if (user === null) {
        res.json({
          message: "User not found!",
          result: true,
        });
      } else {
        res.json({ user, result: true });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
  addUser: async function (req, res, next) {
    try {
      const { error } = User.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        // Retrieve all validation errors
        const errorDetails = error.details.map((err) => {
          return {
            field: err.path[0],
            message: err.message,
          };
        });

        return res.status(400).json({ errors: errorDetails });
      }
      const user = {
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        emailAdress: req.body.emailAdress,
        DateOfBirth: req.body.DateOfBirth,
        FullName: req.body.FullName,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const userName = req.body.userName;
      const Checkuser = await client
        .db(process.env.DATA_BASE)
        .collection("users")
        .findOne({ userName: userName });
      if (Checkuser === null) {
        const result = await client
          .db(process.env.DATA_BASE)
          .collection("users")
          .insertOne(user);
        res.json({ user, result: true });
      } else {
        res.json({
          message: "User Name is already exist!",
          result: false,
        });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
  updateUser: async function (req, res, next) {
    try {
      const { error } = User.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        // Retrieve all validation errors
        const errorDetails = error.details.map((err) => {
          return {
            field: err.path[0],
            message: err.message,
          };
        });

        return res.status(400).json({ errors: errorDetails });
      }
      const user = {
        userName: req.body.userName,
        phoneNumber: req.body.phoneNumber,
        emailAdress: req.body.emailAdress,
        DateOfBirth: req.body.DateOfBirth,
        FullName: req.body.FullName,
        updatedAt: new Date(),
      };
      const id = req.params.id;
      const result = await client
        .db(process.env.DATA_BASE)
        .collection("users")
        .updateOne({ _id: new ObjectId(id) }, { $set: user });
      if (result.matchedCount === 1) {
        res.json({
          message: "User updated successfully!",
          result: true,
        });
      } else {
        res.json({
          message: "User not found!",
          result: false,
        });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
  deleteUser: async function (req, res, next) {
    try {
      const id = req.params.id;
      const result = await client
        .db(process.env.DATA_BASE)
        .collection("users")
        .deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1) {
        res.json({
          message: "User deleted successfully!",
          result: true,
        });
      } else {
        res.json({
          message: "User not found!",
          result: false,
        });
      }
    } catch (e) {
      console.log("ERROR is", e);
      res.status(500).json({
        message:
          "There was a problem in retriving the users list, please try again.",
        result: false,
      });
    }
  },
};
