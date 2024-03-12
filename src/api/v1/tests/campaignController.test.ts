import app from '../../../index'
const request = require('supertest')

describe("POST create campaign",()=>{
    it("should create a new campaign",async()=>{
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
    const campaign = {title:'alal',description:'alal for the needy',campaignEnds:"2024-03-23T12:34:56.789Z",goal:3000}
    const res = await request(app).post('/api/v1/campaign/new').send(campaign).set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toBe(201)
    })
})

describe("GET single campaign",()=>{
    it("should get a single campaign",async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const res = await request(app).get('/api/v1/campaign/singleCampaign/772b9479-f778-4329-9df6-0df984fe0bb3').set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})

describe("GET all users campaigns",()=>{
    it("should get all campaigns",async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjM0NzM5LCJleHAiOjE3MTAzMjExMzl9._LAOrWrgxb-sEAemgupn-O_gv5IfI1jiFVaEmTOPcAY'
        const res = await request(app).get('/api/v1/campaign/allCampaigns').set('Authorization', `Bearer ${token}`)
        expect(res.body.length).toBeGreaterThan(0)
    })
})
