const { Session } = require("../models/sessionModel");

const sessionController = {};

sessionController.setSSIDCookie = async (req, res, next) => {
  const { success, data } = res.locals.user;
  if (success === true) {
    console.log("id set cookie", data._id);
    try {
      res.cookie("ssid", data._id);
      res.locals.sessionID = data._id;
      return next();
    } catch (err) {
      return next({
        log: "props not passed into setCookie.login",
        message: "props not passed into setCookie.login",
      });
    }
  }
  return next();
};

sessionController.logout = async (req, res, next) => {
  const cookieID = req.cookies.ssid;
  res.clearCookie("ssid");
  if (cookieID) {
    try {
      await Session.deleteMany({ cookieID });
    } catch (err) {
      next({
        log: "Unable to delete session id",
        message: "Unable to delete session id",
        err,
      });
    }
  }
  return next();
};

sessionController.startSession = async (req, res, next) => {
  const { success, data } = res.locals.user;
  if (success === true) {
    console.log("start sess res locals users", res.locals.user);
    try {
      //create a session with cookieID
      const sessiondata = await Session.create({ cookieID: data._id });
      console.log(sessiondata);
      res.locals.sessionID = data._id;
      //invoke middleware
      return next();
    } catch (err) {
      console.log(err);
      return next({
        log: "props not passed into startsession.login",
        message: "props not passed into startsession.login",
      });
    }
  }
  return next();
};

sessionController.isLoggedIn = async (req, res, next) => {
  console.log("req cookies", req.cookies);
  console.log("req cookies ssid", req.cookies.ssid);
  const isLoggedIn = req.cookies && req.cookies.ssid;

  if (!isLoggedIn) {
    console.log("is false");
    res.locals.isLoggedIn = false;
    return next();
  } else {
    try {
      const { ssid } = req.cookies;
      const sessioninfo = await Session.findOne({ cookieID: ssid });
      console.log("session info", sessioninfo);
      if (sessioninfo.cookieID) {
        console.log("cookieid", sessioninfo.cookieID);
        res.locals.users = ssid;
        res.locals.isLoggedIn = true;
      } else {
        res.locals.users = ssid;
        res.locals.isLoggedIn = false;
      }

      return next();
    } catch (err) {
      return next({
        log: "props not passed into isLoggedIn.login",
        message: "props not passed into isLoggedIn.login",
      });
    }
  }
};

module.exports = { sessionController };
