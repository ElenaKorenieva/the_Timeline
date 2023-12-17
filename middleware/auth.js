const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const isAuth = (req, res, next) => {
  if (req.body.email === "") {
    res.render("signin", {
      error: {
        signupEmail: "Email can not be empty"
      },
      success: "",
    });
  } else {
    next();
  }
};

const isLoggedInUser = (req, res, next) => {
  if (req.cookies.isLoggedIn === "true") {
    jwt.verify(req.cookies.jwt, process.env.ENCRYPT_KEY, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data.userInfoForToken);
        res.locals.userName = data.userInfoForToken.username;
        res.locals.email = data.userInfoForToken.email;
        res.locals.id = data.userInfoForToken.id;
        console.log(res.locals);
        next();
      }
    });
  } else {
    res.redirect("/");
  }
};

const checkUserLogIn = (req, res, next) => {
  if (req.cookies.isLoggedIn === "true") {
    res.redirect("/home");
  } else {
    next();
  }
};

module.exports = {
  isAuth,
  isLoggedInUser,
  checkUserLogIn,
};
