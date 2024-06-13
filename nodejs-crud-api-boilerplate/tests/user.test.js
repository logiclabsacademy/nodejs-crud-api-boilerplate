const request = require('supertest');
const app = require('../app');
const { connect, close, clear } = require('./setup');

beforeAll(async () => {
  await connect();
});

afterEach(async () => {
  await clear();
});

afterAll(async () => {
  await close();
});

describe('User Endpoints', () => {
  let token;

  beforeEach(async () => {
    await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123',
      });

    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
      });

    token = res.body.token;
  });

  it('should get the current user', async () => {
    const res = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('email', 'testuser@example.com');
  });

  it('should update the current user', async () => {
    const res = await request(app)
      .put('/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'updateduser',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('username', 'updateduser');
  });

  it('should delete the current user', async () => {
    const res = await request(app)
      .delete('/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User deleted');
  });
});
