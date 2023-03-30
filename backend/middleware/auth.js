export const isAuthenticated = function (req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Not Authenticated" });
  }
  next();
};

export const isAdmin = function (req, res, next) {
  if (req.session.status !== "admin" || !req.session.userId) {
    return res.status(403).json({ error: "Not Authorized" });
  }
  next();
};
