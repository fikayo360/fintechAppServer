import express, { Express } from 'express'
import userRoute from './api/v1/routes/userRoute'
import transactionRoute from './api/v1/routes/transactionRoute'
import walletRoute from './api/v1/routes/walletRoute'
import contributionRoute from './api/v1/routes/contributionRoute'
import notificationRoute from './api/v1/routes/notification'
import campaignRoute from './api/v1/routes/campaignRoute'
import limiter from './config/rate-limiting'
import {compression} from './config/compression'
import haltOnTimedout from './api/v1/middlewares/haltOntimeout'
import timeout from './config/timeout'
import logger from './config/logger'

const cors = require('cors');
require('dotenv').config();

const app: Express = express()
const PORT = 5000

app.use(timeout(60000))
app.use(cors());
app.use(haltOnTimedout)
app.use(express.json());
app.use(haltOnTimedout)
app.use(express.json());
app.use(haltOnTimedout)
app.use(limiter)
app.use(haltOnTimedout)
app.use(compression())
app.use(haltOnTimedout)

app.use('/api/v1/user', userRoute);      
app.use('/api/v1/transaction',transactionRoute)   
app.use('/api/v1/wallet',walletRoute)                                 
app.use('/api/v1/campaign',campaignRoute)
app.use('/api/v1/contribution',contributionRoute)
app.use('/api/v1/notification',notificationRoute)

app.listen(PORT, () => {
  logger.info(`app listening on ${PORT}`)
})



export default app