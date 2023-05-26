import request from 'supertest';
import { app } from '../../app'; 

it('return 201 on successful singup', async () => {
    return request(app)
            .post('/api/users/signup')
            .send({email: 'test@email.com', password: 'password'}).expect(201);
})


it('return 400 invalid email', async () => {
    return request(app)
            .post('/api/users/signup')
            .send({email: 'csacsa', password: 'password'}).expect(400);
})

it('return 400 missing email, password', async () => {
    await request(app)
            .post('/api/users/signup')
            .send({email: 'accc@email.com'}).expect(400);

    await request(app)
            .post('/api/users/signup')
            .send({password: '1111'}).expect(400);
})

it('It not allow duplicate email', async () => {
    await request(app)
            .post('/api/users/signup')
            .send({email: 'accc@email.com', password: '111111111'}).expect(201);

    await request(app)
            .post('/api/users/signup')
            .send({email: 'accc@email.com', password: '111111111'}).expect(400);

})