import express from 'express'
import dotenv from 'dotenv'
import mongoDBConnect from './db.js';
import router from './route/userRoute.js';
import cors from 'cors'

const app = express()

dotenv.config()

const port = 3000;

mongoDBConnect()

app.use(cors())

app.use(express.json())
app.use('/api', router)

app.get('/', (req, res)=>{
    res.send("Hello Word")
})

app.listen(port, ()=>{
    console.log(`Server is runnig on port ${port}`)
})