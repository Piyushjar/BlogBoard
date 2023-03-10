const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const cloudinary = require("./utils/cloudinary");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const multer = require("multer");
const PostModel = require("./models/Post");
const uploadMiddleware = multer({ dest: "uploads/" });
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = "ifeagiafiaeubipegipahfeaohofhdkjbzhiefhbalirgbrbhaif";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
// app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(
  // "mongodb+srv://Piyush:blogger02@cluster0.tag5odk.mongodb.net/testbiiVQ88aLjLtQQQJ"
  "mongodb+srv://team:b2I5co7htaRSTLwK@cluster0.nh9ed9w.mongodb.net/test"
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json("User doesn't exists.");
  const passOk = bcrypt.compareSync(password, user.password);
  if (passOk) {
    //login
    jwt.sign({ username, id: user._id }, secret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json({
        id: user._id,
        username,
      });
    });
  } else {
    res.status(400).json("Wrong Credentials.❌");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (error, info) => {
    if (error) throw error;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logged out successfully.");
});

app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  // Upload the file to Cloudinary
  const image = await cloudinary.uploader.upload(
    req.file.path,
    { folder: "covers" },
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Upload failed");
      }
    }
  );
  // const { originalname, path } = req.file;
  // const parts = originalname.split(".");
  // const extension = parts[parts.length - 1];
  // const newPath = path + "." + extension;
  // fs.renameSync(path, newPath);
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (error, info) => {
    if (error) res.status(400).json("Wrong credentials.");
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: image.secure_url,
      cover_id: image.public_id,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  // let newPath = null;
  // if (req.file) {
  //   const { originalname, path } = req.file;
  //   const parts = originalname.split(".");
  //   const extension = parts[parts.length - 1];
  //   newPath = path + "." + extension;
  //   fs.renameSync(path, newPath);
  // }
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (error, info) => {
    if (error) return res.status(400).json("Wrong credentials");
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the author.");
    }
    //delete old image
    let oldImage = null,
      newImage = null;
    if (req.file) {
      oldImage = await cloudinary.uploader.destroy(
        postDoc.cover_id,
        (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).send("Upload failed");
          }
        }
      );
      newImage = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "covers" },
        (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).send("Upload failed");
          }
        }
      );
    }
    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newImage?.secure_url ? newImage.secure_url : postDoc.cover,
      cover_id: newImage?.public_id ? newImage.secure_url : postDoc.cover_id,
      author: info.id,
    });
    res.json(postDoc);
  });
});

app.delete("/post/:id", async (req, res) => {
  // cloudinary image delete
  const { id } = req.params;
  const post = await Post.findById(id);
  console.log(post);
  if (!post) return res.status(400).json("post does not exist");
  const image = await cloudinary.uploader.destroy(
    post.cover_id,
    (error, result) => {
      if (error) {
        console.error(error);
        res.status(500).send("Upload failed");
      }
    }
  );
  post.delete();
  res.status(200).json("post successfully deleted");
});

app.listen(4000, console.log("Listening 🚀"));
