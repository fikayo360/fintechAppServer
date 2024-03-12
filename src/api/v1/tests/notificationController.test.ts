import app from '../../../index'
const request = require('supertest')

describe('POST new notification',()=>{
    it('should create a new notification',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const notification = {message:"notification created yall",category:"deposits"}
        const res = await request(app).post('/api/v1/notification/new').send(notification).set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(201)
    })
})

describe('GET all user notifications',()=>{
    it('should create a new contribution',async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const res = await request(app).get('/api/v1/notification/allNotifications/deposits').set('Authorization', `Bearer ${token}`)
        expect(res.body.length).toBeGreaterThan(0)
    })
})