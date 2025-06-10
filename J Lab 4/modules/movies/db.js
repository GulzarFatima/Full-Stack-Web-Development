import mongoose from "mongoose";

const dbUrl = 'mongodb://127.0.0.1:27017/moviesdb';

//Schema and model
const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String
});

const Movie = mongoose.model("Movie", MovieSchema); //if you have a pre-existing collection that you want to associate with this model, put a comma after MovieSchema and identify your collection name in quotes

await mongoose.connect(dbUrl);

//MONGODB FUNCTIONS
/* async function connect() {
  await mongoose.connect(dbUrl); //connect to mongodb
} */

//Get all movies from the movies collection
async function getMovies() {
  return await Movie.find({}); //return array for find all
}
//Function to initialize the movies collection with some data
async function initializeMovies() {
  const movies = [
    { title: "Joker", year: 2019, rating: "R" },
    { title: "Finding Nemo", year: 2003, rating: "G" },
    { title: "Deadpool", year: 2016, rating: "R" } 
  ];
  await Movie.insertMany(movies);
}
//updateOne
async function updateMovieRating(title, newRating) {
  await Movie.updateOne({ title }, { $set: { rating: newRating } });
}
//deleteMany
async function deleteMoviesByRating(rating) {
  await Movie.deleteMany({ rating });
}

export default {
  getMovies,
  initializeMovies,
  updateMovieRating,
  deleteMoviesByRating
};