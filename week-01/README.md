# Week 01 – Simple Express Backend

## 🎯 Objective

Build the smallest possible backend server with two JSON endpoints using Express.js.

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- JavaScript

---

## 📂 Project Structure

```text
week-01/
│
├── server.js      # Standalone Express server
├── routes.js      # Express Router (used in multi-week architecture)
├── README.md
└── screenshots/
```

---

## 🚀 Run the Project

### Option 1 – Run Week 01 Independently

```bash
npm install
npm run week1
```

### Option 2 – Run as Part of the Multi-Week Project

From the project root:

```bash
npm start
```

Then access Week 01 at:

```text
http://localhost:3000/week-01
```

---

## 🌐 API Endpoints

### GET /

Returns:

```json
{
  "success": true,
  "message": "Hello FlyRank!"
}
```

---

### GET /about

Returns:

```json
{
  "name": "Mukim Shah",
  "role": "Backend AI Engineering Intern",
  "company": "FlyRank AI",
  "goal": "Building AI Automation Solutions"
}
```

---

## 📝 Notes

- **server.js** is the standalone version of the Week 01 assignment and can be used independently.
- **routes.js** exports an Express Router and is used when combining multiple internship weeks into a single Express application.
- Keeping both files helps demonstrate both standalone Express applications and modular Express Router architecture.

---

## 📚 What I Learned

- Setting up a Node.js project
- Installing Express.js
- Creating API routes
- Returning JSON responses
- Organizing project structure
- Using npm scripts
- Understanding Express Router
- Building a modular Express application
- Git basics (init, add, commit)

---

## 👨‍💻 Author

**Mukim Shah**

Backend AI Engineering Intern – FlyRank AI