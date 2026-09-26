const express = require("express");
const supabase = require("./supabase/client");
require("dotenv").config();

const app = express();

app.use(express.json());

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
app.get("/protected/profile", async (req, res) => {
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

  return res.status(200).json({
    message: "Token received successfully",
    token,
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