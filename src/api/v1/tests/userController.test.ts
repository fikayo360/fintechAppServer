
import app from "../../../index"
const request = require("supertest")
import { v4 as uuidv4 } from 'uuid';
let bcrypt = require('bcryptjs');

describe("POST create a new user",()=>{
    it("should create a new user",async () =>{
        const hashedPassword = bcrypt.hashSync('password', 10);
        const randomUser = {email:'tatata@gmail.com',username:'ttaa',password:hashedPassword,phonenumber:'07056070801'}
        console.log(randomUser);
        const res = await request(app).post('/api/v1/user/signup').send(randomUser)
        console.log(res.body);
        expect(res.statusCode).toBe(201)
    })
})


describe("POST sign in a user",()=>{
    it("sign in a user",async () =>{
        const randomUser = {username:'user5',password:'ipasse'}
        const res = await request(app).post('/api/v1/user/login').send(randomUser)
        console.log(res);
        expect(res.statusCode).toBe(200)
    })
})

describe("POST forgot password",()=>{
    it("should send reset token",async () =>{
        const randomUser = {email:'fikayoadele@gmail.com'}
        console.log(randomUser);
        const res = await request(app).post('/api/v1/user/forgot').send(randomUser)
        console.log(res.body);
        expect(res.statusCode).toBe(200)
    })
})

describe("POST changePassword",()=>{
    it("should change the password",async ()=>{
        const token = 'umussd'
        const email = 'fikayoadele@gmail.com'
        const newPassword = "ipassed"
        const user = {token, email, newPassword}
        const res = await request(app).post('/api/v1/user/change').send(user)
        console.log(res.body);
        expect(res.statusCode).toBe(200)
    })
})

it("should create a new user",async () =>{
    const hashedPassword = bcrypt.hashSync('password', 10);
    const randomUser = {email:'tatata@gmail.com',username:'ttaa',password:hashedPassword,phonenumber:'07056070801'}
    console.log(randomUser);
    const res = await request(app).post('/api/v1/user/signup').send(randomUser)
    console.log(res.body);
    expect(res.statusCode).toBe(201)
})

describe("GET follow a user",()=>{
    it("should follow a user",async()=>{
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjMwNzMwLCJleHAiOjE3MTAzMTcxMzB9.IW9XWI3d35bFWgaOmo3cBK3lgN4Fd3J_ywc714vz_jI'
        const res = await request(app).get('/api/v1/user/follow/ufser2').set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})

describe('GET search for a user', () => {
    it('should search for a specified user', async() => {    
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjMwNzMwLCJleHAiOjE3MTAzMTcxMzB9.IW9XWI3d35bFWgaOmo3cBK3lgN4Fd3J_ywc714vz_jI'
        const res = await request(app).get('/api/v1/user/search').query({username:'ufser2'}).set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})

describe('GET verify user', () => {
    it('should verify a specified user', async() => {    
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjMwNzMwLCJleHAiOjE3MTAzMTcxMzB9.IW9XWI3d35bFWgaOmo3cBK3lgN4Fd3J_ywc714vz_jI'
        const res = await request(app).get('/api/v1/user/verifyUser').set('Authorization', `Bearer ${token}`)
        console.log(res);
        expect(res.statusCode).toBe(200)
    })
})

describe('POST complete profile', () => {
    it('should complete a specified user profile', async() => {    
        const location = 'moscow'
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiN2IxOWVjZS00NmM4LTQwMDUtOTQyZi1iZjhlMDQxYjI0YTYiLCJ1c2VybmFtZSI6InVzZXI1IiwiaWF0IjoxNzEwMjMwNzMwLCJleHAiOjE3MTAzMTcxMzB9.IW9XWI3d35bFWgaOmo3cBK3lgN4Fd3J_ywc714vz_jI'
        const res = await request(app).post('/api/v1/user/completeProfile').send({location}).set('Authorization', `Bearer ${token}`)
        console.log(res);
        expect(res.statusCode).toBe(200)
    })
})