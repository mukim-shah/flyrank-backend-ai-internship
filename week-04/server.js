const express = require("express");
const supabase = require("./supabase/client");
const authenticateToken = require("./middleware/authMiddleware");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return res.status(400).json({
      error: error.message,
    });
  }

  return res.status(201).json({
    user: data.user,
  });
});


// signup Route api
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.log("LOGIN ERROR:", error.message);

    return res.status(401).json({
      error: error.message,
    });
  }

  return res.status(200).json({
    access_token: data.session.access_token,
    refresh_token: data.session.refresh_token,
  });
});


//Public Route
app.get("/public/info", (req, res) => {
  res.status(200).json({
    message: "Welcome stranger! This info is public.",
  });
});

//authicate 
app.get("/protected/profile", authenticateToken, (req, res) => {
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    created_at: req.user.created_at,
  });
});

//authenticate Logout Route
app.post("/auth/logout", authenticateToken, async (req, res) => {
  const { error } = await supabase.auth.signOut({
    scope: "local",
  });

  if (error) {
    return res.status(401).json({
      error: error.message,
    });
  }

  return res.status(204).send();
});

// Dashboard protected route
app.get("/protected/dashboard", authenticateToken, (req, res) => {
  return res.status(200).json({
    message: "Welcome to your protected dashboard",
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "FlyRank Week 04 Auth API is running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Supabase client initialized successfully");
});