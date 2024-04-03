const express = require("express")
const app = express()
const cors = require("cors")

app.use(
  cors({
    origin: "*"
  })
)

app.get("/", async(req, res) => {
  res.json({name: "Benny"})
})

app.listen(3001, () => {
  console.log('Proxy server started')
})
