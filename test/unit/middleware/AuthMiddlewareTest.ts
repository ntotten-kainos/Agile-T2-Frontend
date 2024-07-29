import request from 'supertest';
import express from 'express';
import session from 'express-session';
import { allowRoles } from '../../../src/middleware/AuthMiddleware';
import { UserRole } from '../../../src/models/JwtToken';
import { expect } from 'chai';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'test_secret',
  resave: false,
  saveUninitialized: true,
}));

app.get('/protected', allowRoles([UserRole.Admin]), (req, res) => {
  res.status(200).send('Protected route');
});

describe('Authorization Middleware', () => {
  it('should allow access for users with valid roles', async () => {
    const token = Buffer.from(JSON.stringify({ Role: UserRole.Admin })).toString('base64');

    const response = await request(app)
      .get('/protected')
      .set('Cookie', `session.token=${token}`);
    
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Protected route');
  });

  it('should deny access for users without valid roles', async () => {
    const token = Buffer.from(JSON.stringify({ Role: UserRole.User })).toString('base64');

    const response = await request(app)
      .get('/protected')
      .set('Cookie', `session.token=${token}`);
    
    expect(response.status).to.equal(403);
    expect(response.text).to.equal('User role not authorised for this action');
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/protected');

    expect(response.status).to.equal(401);
    expect(response.text).to.equal('Not logged in');
  });
});
