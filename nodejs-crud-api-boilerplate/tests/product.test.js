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

describe('Product Endpoints', () => {
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

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 99.99,
        category: 'Test Category',
        stock: 10,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'Test Product');
  });

  it('should get all products', async () => {
    const res = await request(app)
      .get('/products');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get a product by ID', async () => {
    const product = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 99.99,
        category: 'Test Category',
        stock: 10,
      });

    const res = await request(app)
      .get(`/products/${product.body._id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Test Product');
  });

  it('should update a product by ID', async () => {
    const product = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 99.99,
        category: 'Test Category',
        stock: 10,
      });

    const res = await request(app)
      .put(`/products/${product.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Updated Product',
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'Updated Product');
  });

  it('should delete a product by ID', async () => {
    const product = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 99.99,
        category: 'Test Category',
        stock: 10,
      });

    const res = await request(app)
      .delete(`/products/${product.body._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Product deleted');
  });
});
