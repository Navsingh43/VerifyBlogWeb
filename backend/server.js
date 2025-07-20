// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const mysql = require('mysql');
// const session = require('express-session');
// const cookieParser = require('cookie-parser');

// const app = express();
// const port = 5000;

// app.use(bodyParser.json());
// app.use(cookieParser());

// app.use(cors({
//   origin: 'http://localhost:3000', // Frontend address
//   credentials: true, // Allow sending cookies
// }));



// app.use(session({
//   secret: 'your_secret_key', // Replace with a secret key
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false, // Set to true if using HTTPS, false for local development
//     maxAge: 1000 * 60 * 60 * 24, // 24 hours or as required
//   }
// }));

// const dbConfig = {
//   host: 'localhost',
//   user: 'root',
//   password: 'mypass1234',
//   database: 'nodejs',
//   port: 3307,
// };

// const connection = mysql.createConnection(dbConfig);

// connection.connect(err => {
//   if (err) {
//     console.error('Error connecting to the database:', err);
//     return;
//   }
//   console.log('Connected to MySQL');
// });

// // Get all blogs
// app.get('/blogs', (req, res) => {
//   const query = 'SELECT * FROM blogs';
//   connection.query(query, (err, results) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send('Internal Server Error');
//     } else {
//       res.status(200).json(results);
//     }
//   });
// });

// // Get blog by slug
// app.get('/blogs/:slug', (req, res) => {
//   const blogSlug = req.params.slug;
//   const query = 'SELECT * FROM blogs WHERE SLUG = ?';

//   connection.query(query, [blogSlug], (err, results) => {
//     if (err) {
//       console.error('Error fetching blog:', err);
//       res.status(500).send('Internal Server Error');
//     } else if (results.length > 0) {
//       const blog = results[0];
//       res.json(blog);
//     } else {
//       res.status(404).send('Blog not found');
//     }
//   });
// });

// // Get blog by category
// app.get('/categories/:category', (req, res) => {
//   const category = req.params.category;
//   const query = 'SELECT * FROM blogs WHERE category = ?';

//   connection.query(query, [category], (err, results) => {
//     if (err) {
//       console.error('Error fetching blog:', err);
//       res.status(500).send('Internal Server Error');
//     } else if (results.length > 0) {
//       res.json(results);  // Return all blogs matching the category
//     } else {
//       res.status(404).send('No blogs found for this category');
//     }
//   });
// });


// // Like blog post
// app.post("/blogs/:slug/like", (req, res) => {
//   const slug = req.params.slug;
//   let likedBlogs = req.cookies.likedBlogs || [];

//   // If already liked, reject it
//   if (likedBlogs.includes(slug)) {
//     return res.status(400).json({ message: "You already liked this blog." });
//   }

//   // Update database
//   connection.query("UPDATE blogs SET LIKES = LIKES + 1 WHERE SLUG = ?", [slug]);

//   // Save updated liked blogs in cookie
//   likedBlogs.push(slug);
//   res.cookie("likedBlogs", likedBlogs, { maxAge: 30 * 24 * 60 * 60 * 1000 }); // store for 30 days

//   res.sendStatus(200);
// });



// // Dislike blog post
// app.post("/blogs/:slug/dislike", (req, res) => {
//   const slug = req.params.slug;
//   let dislikedBlogs = req.cookies.dislikedBlogs || [];

//   if (dislikedBlogs.includes(slug)) {
//     return res.status(400).json({ message: "You already disliked this blog." });
//   }

//   connection.query("UPDATE blogs SET DISLIKES = DISLIKES + 1 WHERE SLUG = ?", [slug]);

//   dislikedBlogs.push(slug);
//   res.cookie("dislikedBlogs", dislikedBlogs, { maxAge: 30 * 24 * 60 * 60 * 1000 });

//   res.sendStatus(200);
// });



// // Add a comment
// app.post("/blogs/:slug/comments", (req, res) => {
//   const { text } = req.body;
//   connection.query("INSERT INTO comments (slug, text) VALUES (?, ?)", [req.params.slug, text], (err, result) => {
//     if (err) return res.status(500).send(err);
//     res.json({ text });
//   });
// });



// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql'); // 👈 using original callback-based mysql
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  }
}));

// Database connection
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'mypass1234',
  database: 'nodejs',
  port: 3307,
};
const connection = mysql.createConnection(dbConfig);
connection.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Routes

// Get all blogs
app.get('/blogs', (req, res) => {
  connection.query('SELECT * FROM blogs', (err, results) => {
    if (err) return res.status(500).send('Internal Server Error');
    res.status(200).json(results);
  });
});

// Get blog by slug
app.get('/blogs/:slug', (req, res) => {
  const slug = req.params.slug;

  // First, fetch the blog
  connection.query('SELECT * FROM blogs WHERE SLUG = ?', [slug], (err, blogResults) => {
    if (err) return res.status(500).send('Internal Server Error');
    if (blogResults.length === 0) return res.status(404).send('Blog not found');

    const blog = blogResults[0];

    // Then, fetch the comments related to the same slug
    connection.query('SELECT * FROM comments WHERE slug = ? ORDER BY createdAt ASC', [slug], (err, commentResults) => {
      if (err) return res.status(500).send('Error fetching comments');

      // Attach comments to the blog object
      blog.comments = commentResults;

      // Send the combined response
      res.json(blog);
    });
  });
});


// Get blogs by category
app.get('/categories/:category', (req, res) => {
  const category = req.params.category;
  connection.query('SELECT * FROM blogs WHERE category = ?', [category], (err, results) => {
    if (err) return res.status(500).send('Internal Server Error');
    if (results.length > 0) res.json(results);
    else res.status(404).send('No blogs found for this category');
  });
});

// Like blog post
app.post("/blogs/:slug/like", (req, res) => {
  const slug = req.params.slug;
  let likedBlogs = req.cookies.likedBlogs || [];
  let dislikedBlogs = req.cookies.dislikedBlogs || [];

  if (!Array.isArray(likedBlogs)) likedBlogs = [];
  if (!Array.isArray(dislikedBlogs)) dislikedBlogs = [];

  if (dislikedBlogs.includes(slug)) {
    connection.query("UPDATE blogs SET DISLIKES = DISLIKES - 1 WHERE SLUG = ?", [slug]);
    connection.query("UPDATE blogs SET LIKES = LIKES + 1 WHERE SLUG = ?", [slug]);
    dislikedBlogs = dislikedBlogs.filter(blog => blog !== slug);
    likedBlogs.push(slug);
    res.cookie("dislikedBlogs", dislikedBlogs, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  } else if (likedBlogs.includes(slug)) {
    return res.status(400).json({ message: "You already liked this blog." });
  } else {
    connection.query("UPDATE blogs SET LIKES = LIKES + 1 WHERE SLUG = ?", [slug]);
    likedBlogs.push(slug);
  }

  res.cookie("likedBlogs", likedBlogs, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.sendStatus(200);
});

// Dislike blog post
app.post("/blogs/:slug/dislike", (req, res) => {
  const slug = req.params.slug;
  let likedBlogs = req.cookies.likedBlogs || [];
  let dislikedBlogs = req.cookies.dislikedBlogs || [];

  if (!Array.isArray(likedBlogs)) likedBlogs = [];
  if (!Array.isArray(dislikedBlogs)) dislikedBlogs = [];

  if (likedBlogs.includes(slug)) {
    connection.query("UPDATE blogs SET LIKES = LIKES - 1 WHERE SLUG = ?", [slug]);
    connection.query("UPDATE blogs SET DISLIKES = DISLIKES + 1 WHERE SLUG = ?", [slug]);
    likedBlogs = likedBlogs.filter(blog => blog !== slug);
    dislikedBlogs.push(slug);
    res.cookie("likedBlogs", likedBlogs, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  } else if (dislikedBlogs.includes(slug)) {
    return res.status(400).json({ message: "You already disliked this blog." });
  } else {
    connection.query("UPDATE blogs SET DISLIKES = DISLIKES + 1 WHERE SLUG = ?", [slug]);
    dislikedBlogs.push(slug);
  }

  res.cookie("dislikedBlogs", dislikedBlogs, { maxAge: 30 * 24 * 60 * 60 * 1000 });
  res.sendStatus(200);
});

// Add comment to blog post
app.post("/blogs/:slug/comments", (req, res) => {
  const slug = req.params.slug;
  const { content, commenterName } = req.body;

  connection.query("SELECT id FROM blogs WHERE SLUG = ?", [slug], (err, results) => {
    if (err) {
      console.error("Error finding blog:", err);
      return res.status(500).send("Server error");
    }

    if (results.length === 0) {
      return res.status(404).send("Blog not found");
    }

    const blogID = results[0].id;

    connection.query(
      "INSERT INTO comments (blogID, content, commenterName, createdAt, slug) VALUES (?, ?, ?, NOW(),?)",
      [blogID, content, commenterName, slug],
      (err, insertResult) => {
        if (err) {
          console.error("Error inserting comment:", err);
          return res.status(500).send("Server error");
        }

        connection.query(
          "SELECT id, blogID, content, commenterName, createdAt FROM comments WHERE id = ?",
          [insertResult.insertId],
          (err, commentResults) => {
            if (err) {
              console.error("Error fetching new comment:", err);
              return res.status(500).send("Server error");
            }

            res.status(200).json(commentResults[0]);
          }
        );
      }
    );
  });
});

// Debug route to test cookies
app.get("/set-test-cookie", (req, res) => {
  res.cookie("testCookie", "HelloWorld", {
    httpOnly: false,
    maxAge: 1000 * 60 * 5,
  });
  res.send("Test cookie set!");
});


app.get("/search", (req, res) => {
  console.log("I am jatt");
  const query = req.query.query;

  if (!query) return res.status(400).json({ message: "Missing query param" });

  connection.query(
    "SELECT * FROM blogs WHERE SLUG LIKE ? OR CONTENT LIKE ?",
    [`%${query}%`, `%${query}%`],
    (err, results) => {
      if (err) {
        console.error("DB error", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.json(results);
    }
  );
});


app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
  connection.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting contact message:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Message received!" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
