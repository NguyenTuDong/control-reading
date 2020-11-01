const bodyParser = require("body-parser")
const app = require("express")()
import data from '../data/data.json'

app.use(bodyParser.json())
app.get("/all", (req, res) => {
  res.json(data)
})
app.get('/novels', (req, res) => {
  let result = Object.values(data.novels).map((novel) => {
    let { chapters, ...filter } = novel;
    return filter;
  })
  res.json(result)
})
app.get('/novels/:novelId', (req, res) => {
  res.json(data.novels[req.params.novelId])
})
app.get('/novels/:novelId/chapters', (req, res) => {
  res.json(Object.values(data.novels[req.params.novelId].chapters))
})
app.get('/novels/:novelId/chapters/:chapterId', (req, res) => {
  res.json(data.novels[req.params.novelId].chapters[req.params.chapterId])
})

module.exports = app