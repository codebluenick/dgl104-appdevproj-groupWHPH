// client/tests/taskRoutes.test.js
const request = require('supertest');
const express = require('express');
const taskRoutes = require('../../server/src/routes/taskRoutes'); // Adjust path
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use('/api/tasks', taskRoutes);

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/stms-test'); // Use your Mongo test DB
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/tasks', () => {
  it('should return 200 and an array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
