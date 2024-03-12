import app from '../../../index'
const request = require('supertest')

describe('POST new contribution',()=>{
    it('should create a new contribution',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const contribution = {campaignId:"772b9479-f778-4329-9df6-0df984fe0bb3",amount:1000000}
        const res = await request(app).post('/api/v1/contribution/new').send(contribution).set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(201)
    })
})

describe('GET all campaign contribution',()=>{
    it('should create a new contribution',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const contribution = {campaignId:"772b9479-f778-4329-9df6-0df984fe0bb3",amount:1000000}
        const res = await request(app).get('/api/v1/contribution/all/772b9479-f778-4329-9df6-0df984fe0bb3').send(contribution).set('Authorization', `Bearer ${token}`)
        expect(res.body.length).toBeGreaterThan(0)
    })
})