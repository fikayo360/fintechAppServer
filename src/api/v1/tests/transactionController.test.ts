import app from "../../../index";
const request = require('supertest')

describe("POST new transaction",()=>{
    it("should create a new transaction",async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const res = await request(app).post('/api/v1/transaction/new').send({transactionType:'deposits',amountSent:100}).set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})

describe("GET fetch a user deposits",()=>{
    it("should fetch a users deposits",async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const res = await request(app).get('/api/v1/transaction/fetchDeposits').set('Authorization', `Bearer ${token}`)
        expect(res.body.length).toBeGreaterThan(0)
        console.log(res);
    })
})

describe("GET fetch a user withdrawals",()=>{
it("should fetch a users withdrawals",async()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
    const res = await request(app).get('/api/v1/transaction/fetchWithdrawals').set('Authorization', `Bearer ${token}`)
    expect(res.body.length).toBeGreaterThan(0)
})
})

    describe("GET fetch all transactions",()=>{
    it("should fetch all transactions",async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const res = await request(app).get('/api/v1/transaction/allTransactions').set('Authorization', `Bearer ${token}`)
        expect(res.body.length).toBeGreaterThan(0)
    })
})