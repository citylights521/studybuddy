// api routes show all back-end routes for accessing the DB and user authentication 

var db = require("../models");
// Requiring our models and passport as we've configured it
var passport = require("../config/passport");

module.exports = function (app) {
  //  modal 1 user information on click is sent to DB Table 1: User Info (create account)
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.Users.create(req.body).then(function (userData) {
      res.json(userData)
      // res.sendStatus(200);
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
  // modal 2 user survey results on click are sent to Table 2: User Search in DB (new or additional) (survey).
  app.post("/api/submitSurvey", function (req, res) {
    // res.json(req.body)
    db.Survey.create(req.body).then(function () {
      res.sendStatus(200);
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  });

  // user updates a survey
  app.put("/api/submitSurvey", function (req, res) {
    db.Survey.update(req.body).then(function () {
      res.json(dbSurvey);
    });
  });

<<<<<<< HEAD
  // ????? get matches for user for user search (match results) page. TODO: update db.Example per handlebars specifications 
  app.get("/api/getMatches", function (req, res) {
    db.Example.findAll(res.user).then(function (dbExamples) {
      // need proper route to html page showing the matches NOT dbExamples
      res.json(dbExamples);
    });
  });
=======
>>>>>>> 0e8bc0d5f2a0de6977ca6cfe11907b2cf933bf3d

  // user clicks to favorite a profile and this information is sent to Table 3: Favorites in DB (favorites).
  app.post("/api/updateFavorite", function (req, res) {
    db.Users.findAll({ where: { id: req.user.id } }).then(userthing => {
      userthing[0].addFriend(req.body.id);
      res.json(userthing[0])
    });
    // db.favorite.create(req.body).then(function (dbFavorites) {
    //   res.json(dbFavorites);
    // });
  });

<<<<<<< HEAD
  // user clicks on favorites and is presented with a list of all of the people they have marked as favorites. TODO: update db.Example per handlebars specifications 
  app.get("/api/getFavorites", function (req, res) {
    db.favorites.findAll(res.user).then(function (dbExamples) {
      // need proper route to html page showing user's favorites NOT dbExamples
      res.json(dbfavorites);
    });
  });
=======

>>>>>>> 0e8bc0d5f2a0de6977ca6cfe11907b2cf933bf3d
  // user updates favorites
  app.put("/api/updateFavorite", function (req, res) {
    db.favorites.update(res.user, res.userID, res.favoriteId).then(function (dbfavorites) {
      res.json(dbfavorites);
    });
  });


  // --------------------------------------------------
  //user authentication routes aka log in/log out route(s) ?????

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/");
  });


  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
