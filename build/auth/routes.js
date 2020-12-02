"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/github', _passport["default"].authenticate('github')); //CALLBACK route:  GitHub will call this route after the
//OAuth authentication process is complete.
//req.isAuthenticated() tells us whether authentication was successful.

router.get('/github/callback', _passport["default"].authenticate('github', {
  failureRedirect: '/'
}), function (req, res) {
  console.log("auth/github/callback reached.");
  res.redirect('/'); //sends user back to login screen;
  //req.isAuthenticated() indicates status
}); //LOGOUT route: Use passport's req.logout() method to log the user out and
//redirect the user to the main app page. req.isAuthenticated() is toggled to false.

router.get('/logout', function (req, res) {
  console.log('/auth/logout reached. Logging out');
  req.logout();
  res.redirect('/');
}); //TEST route: Tests whether user was successfully authenticated.
//Should be called from the React.js client to set up app state.

router.get('/test', function (req, res) {
  console.log("auth/test reached.");
  var isAuth = req.isAuthenticated();

  if (isAuth) {
    console.log("User is authenticated");
    console.log("User record tied to session: " + JSON.stringify(req.user));
  } else {
    //User is not authenticated
    console.log("User is not authenticated");
  } //Return JSON object to client with results.


  res.json({
    isAuthenticated: isAuth,
    user: req.user
  });
}); //LOGIN route: Attempts to log in user using local strategy

router.post('/login', _passport["default"].authenticate('local', {
  failWithError: true
}), function (req, res) {
  console.log("/login route reached: successful authentication."); //Redirect to app's main page; the /auth/test route should return true

  res.status(200).send("Login successful");
}, function (err, req, res, next) {
  console.log("/login route reached: unsuccessful authentication");

  if (req.authError) {
    console.log("req.authError: " + req.authError);
    res.status(401).send(req.authError);
  } else {
    res.status(401).send("Unexpected error occurred when attempting to authenticate. Please try again.");
  } //Note: Do NOT redirect! Client will take over.

});
var _default = router;
exports["default"] = _default;