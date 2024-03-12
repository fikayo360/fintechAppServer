
import { filterBankList } from "./api/v1/helpers/filterBankList";
const ytKey = process.env.YOUTUBE_KEY 
const jw = process.env.PORT
let jwlt = process.env.JWT_LIFETIME as number|string


console.log(jw)