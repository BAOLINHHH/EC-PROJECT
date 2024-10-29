// controllers/AuthorController.js
import Author from "../models/authorModel.js";

// @desc     Create author
// @route    POST api/authors
// @access   Public
const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc     Fetch all authors
// @route    GET api/authors
// @access   Public
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc     Get authors by ID
// @route    GET api/authors/:id
// @access   Public
const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc     Update authors by ID
// @route    PUT api/authors/:id
// @access   Public
const updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc     Delete authors by ID
// @route    DELETE api/authors/:id
// @access   Public
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Exporting functions
export { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor };