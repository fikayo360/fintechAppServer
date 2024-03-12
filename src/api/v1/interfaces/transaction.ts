interface Transaction{
    userId: string;
    transactionId:string;
    transactionType:string
    senderId:string;
    receiverId:string;
    amountSent:number;
}

export default Transaction