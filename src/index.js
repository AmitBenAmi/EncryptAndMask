import path from 'path'
import express from 'express'
import * as dh from './dhAlgo'
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../../public')))

app.get('favicon.ico', (req, res) => {
    res.status(204)
})

app.get('/public', (req, res) => {
    res.send(dh.getDHPublic())
})

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})