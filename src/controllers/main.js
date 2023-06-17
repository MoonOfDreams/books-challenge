const bcryptjs = require("bcryptjs");
const { Op } = require("sequelize");
const db = require("../database/models");

const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: "authors" }],
    })
      .then((books) => {
        res.render("home", { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: async (req, res) => {
    let libro = await db.Book.findByPk(req.params.id, {
      include: [{ association: "authors" }],
    });
    let autores = libro.authors.map((autor) => {
      return autor.name;
    });
    res.render("bookDetail", { libro, autores });
  },
  bookSearch: (req, res) => {
    res.render("search", { libros: [] });
  },
  bookSearchResult: async (req, res) => {
    let libros = await db.Book.findAll({
      where: {
        title: { [Op.like]: "%" + req.body.title + "%" },
      },
      include: [{ association: "authors" }],
    });
    res.render("search", { libros });
  },
  deleteBook: (req, res) => {
    // Implement delete book
    res.render("home");
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render("authors", { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    // Implement books by author
    res.render("authorBooks");
  },
  register: (req, res) => {
    res.render("register");
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category,
    })
      .then(() => {
        res.redirect("/");
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render("login");
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render("home");
  },
  edit: (req, res) => {
    // Implement edit book
    res.render("editBook", { id: req.params.id });
  },
  processEdit: (req, res) => {
    // Implement edit book
    res.render("home");
  },
};

module.exports = mainController;
