import logger from "../../../config/logger"
import { bankList } from "./bankList"

export const filterBankList = (bankName:string) => {
    try{
        const filteredItem:any = bankList.filter((item):any => item.name === bankName)
        if(filteredItem.length === 0) {
            logger.error('no bank found in bank list')
        }
        const code = filteredItem[0].code
        return code
    }catch(error){
        return "bank not found"
    }
}

