const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const renderSigninPage = (req, res) => {
  res.render("signin", { error: "", success: "" });
};

// const signupUser = (req, res) => {
//   let error = {};
//   if (req.body.password === "") {
//     res.render("signin", {
//       error: { signupPassword: "Password can not be empty" },
//       success: "",
//     });
//   } else if (req.body.email === "") {
//     res.render("signin", {
//       error: { signupEmail: "Email can not be empty" },
//       success: "",
//     });
//   } else if (req.body.userName === "") {
//     res.render("signin", {
//       error: { signupUserName: "Username can not be empty" },
//       success: "",
//     });
//   } else {
//     const salt = 12;
//     let hashedPassword = bcrypt.hashSync(req.body.password, salt);
//     let userObj = {
//       ...req.body,
//       password: hashedPassword,
//     };

//     let newUser = new userModel(userObj);
//     newUser
//       .save()
//       .then(() => {
//         res.render("signin", {
//           error: "",
//           success: "User is saved and you can log in now",
//         });
//       })
//       .catch((err) => console.log(err));
//   }
// };

const signupUser = (req, res) => {
  let error = {};

  if (req.body.password === "") {
    error.signupPassword = "Password can not be empty";
  } else if (req.body.email === "") {
    error.signupEmail = "Email can not be empty";
  } else if (req.body.userName === "") {
    error.signupUserName = "Username can not be empty";
  }
  console.log(req.body);
  if (Object.keys(error).length > 0) {
    // There are errors, render the signin page with the error object
    res.render("signin", {
      error: error,
      success: "",
    });
  } else {
    const salt = 12;
    let hashedPassword = bcrypt.hashSync(req.body.password, salt);
    let userObj = {
      ...req.body,
      password: hashedPassword,
    };

    let newUser = new userModel(userObj);
    newUser
      .save()
      .then(() => {
        res.render("signin", {
          error: "",
          success: "User is saved and you can log in now",
        });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  }
};

const loginUser = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    res.render("signin", {
      error: "User does not exist. Please register first",
      success: "",
    });
  } else {
    let isCorrectPassword = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isCorrectPassword) {
      res.render("signin", {
        error: "Password is not correct",
        success: "",
      });
    } else {
      let userInfoForToken = {
        id: user._id,
        username: user.userName,
        email: user.email,
      };
      let userToken = jwt.sign({ userInfoForToken }, process.env.ENCRYPT_KEY);
      res.cookie("isLoggedIn", true);
      res.cookie("jwt", userToken);
      res.redirect("/home");
    }
  }
};

const logOut = (req, res) => {
  res.cookie("isLoggedIn", false);
  res.clearCookie("jwt");
  res.redirect("/");
};

module.exports = {
  renderSigninPage,
  signupUser,
  loginUser,
  logOut,
};
