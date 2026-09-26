const supabase = require("../supabase/client");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }

  req.user = data.user;
  req.accessToken = token;

  next();
};

module.exports = authenticateToken;