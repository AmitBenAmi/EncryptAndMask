import path from 'path'
import express from 'express'
import ECDHAlgorithm from './ecdhAlgo'
const app = express()
const port = 3000
const ecdh = new ECDHAlgorithm()

app.use(express.static(path.join(__dirname, '../../public')))
app.use(express.json())

app.get('favicon.ico', (req, res) => {
    res.status(204)
})

app.get('/publicKey', (req, res) => {
    res.send({
        public: ecdh.public
    })
})

app.post('/transfer', (req, res) => {
    console.info('This is cool')
})

app.listen(port, () => {
    console.info(`Listening on port ${port}.`)
})