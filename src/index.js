import path from 'path'
import express from 'express'
import ECDHAlgorithm from './ecdhAlgo'
const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, '../../public')))
app.use(express.json())

app.get('favicon.ico', (req, res) => {
    res.status(204)
})

app.get('/public', (req, res) => {
    let ecdh = new ECDHAlgorithm()
    res.send({
        public: ecdh.public
    })
})

app.post('/transfer', (req, res) => {
    console.log('This is cool')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
})