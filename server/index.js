import express from 'express' //server
import mongoose from 'mongoose' //database and crud operations
import cors from 'cors' //eliminate cross origin issues
import dotenv from 'dotenv'

import userRoutes from '../server/routes/users.js'
import questionRoutes from '../server/routes/Questions.js'

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))
app.use(cors());

app.get('/',(req, res) => {
    res.send("This is a stack overflow clone API")
})

app.use('/user', userRoutes)
app.use('questions', questionRoutes)

const PORT = process.env.PORT || 5000

const CONNECTION_URL = process.env.CONNECTION_URL
mongoose.connect( CONNECTION_URL, { useNewUrlParser: true,
            useUnifiedTopology: true })
.then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
.catch((err)=>console.log(err.message))