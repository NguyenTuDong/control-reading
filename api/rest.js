const bodyParser = require("body-parser")
const app = require("express")()
import data from '../data/data.json'

app.use(bodyParser.json())
app.get("/all", (req, res) => {
  res.json(data)
})
app.get('/books', (req, res) => {
  let result = Object.values(data.books).map((novel) => {
    let { chapters, ...filter } = novel;
    return filter;
  })
  res.json(result)
})
app.get('/books/:bookId', (req, res) => {
  res.json(data.books[req.params.bookId])
})
app.get('/books/:bookId/chapters', (req, res) => {
  let result = Object.values(data.books[req.params.bookId].chapters).map((chapter) => {
    let { body, ...x } = chapter;
    return x;
  })
  res.json(result)
})
app.get('/books/:bookId/chapters/:chapterId', (req, res) => {
  let { bookId, chapterId } = req.params;
  let book = data.books[bookId];
  let chapter = book.chapters[chapterId];
  let prev = "";
  let next = "";
  if (chapterId > 1) {
    prev = `/books/${bookId}/${parseInt(chapterId) - 1}`
  }
  if (chapterId < Object.keys(book.chapters).length) {
    next = `/books/${bookId}/${parseInt(chapterId) + 1}`
  }
  let result = {
    bookTitle: book.title,
    prev,
    next,
    ...chapter,
  }
  res.json(result)
})

module.exports = app