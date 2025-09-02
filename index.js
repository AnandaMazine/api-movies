import express from "express";
const app = express();
import mongoose from "mongoose";
import Movie from "./models/Movies.js";
import movieRoutes from "./routes/movieRoutes.js";

mongoose.connect("mongodb://127.0.0.1:27017/movies");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/", movieRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/movies");

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json({ movies: movies });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

app.get("/", (req, res) => {
  const movies = [
    {
      title: "The Matrix",
      year: 1999,
      genre: "Ação",
      director: "Lana Wachowski",
      ageRating: 14,
    },
    {
      title: "The Matrix Reloaded",
      year: 2003,
      genre: "Ação",
      director: "Lana Wachowski",
      ageRating: 14,
    },
    {
      title: "The Matrix Revolutions",
      year: 2003,
      genre: "Ação",
      director: "Lana Wachowski",
      ageRating: 14,
    },
    {
      title: "The Matrix Resurrections",
      year: 2021,
      genre: "Ação",
      director: "Lana Wachowski",
      ageRating: 14,
    },
  ];
  res.json(movies);
});

const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  }
  console.log(`API rodando em http://localhost:${port}.`);
});
