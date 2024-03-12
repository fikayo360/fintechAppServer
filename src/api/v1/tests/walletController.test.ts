import app from '../../../index'
const request = require('supertest')

describe("POST create new wallet",()=>{
    it('should create a new wallet',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlOGUzYWY0Yy1kMGI4LTQ4ODEtOGFlYi0zNTdkYWZiZTQ1MjMiLCJ1c2VybmFtZSI6InRlc3RVMSIsImlhdCI6MTcxMDIzMjgxOSwiZXhwIjoxNzEwMzE5MjE5fQ.atrtsdplJvaUP1U0zUQtkDGfHT6Xf4EyJPvflPiliJY'
        const res = await request(app).post('/api/v1/wallet/new').set('Authorization', `Bearer ${token}`)
        console.log(res);
        expect(res.statusCode).toBe(400)
    })
})

describe("POST deposit a specified amount",()=>{
    it('should deposit a specified ampunt',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const res = await request(app).post('/api/v1/wallet/deposit').send({amount:1000}).set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})

describe("POST transfer to wallet ",()=>{
    it('should transfer to new wallet',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const res = await request(app).post('/api/v1/wallet/transferWallet').send({amountSent:50,receiverId:'87e1c544-269e-4c05-95c7-cd94f5181f8c'}).set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})

