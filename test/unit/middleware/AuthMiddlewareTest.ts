import request from 'supertest';
import express from 'express';
import session from 'express-session';
import { allowRoles } from '../../../src/middleware/AuthMiddleware';
import { UserRole, JwtToken } from '../../../src/models/JwtToken';
import { expect } from 'chai';
import sinon from 'sinon';
import jwtDecode from 'jwt-decode';


const app = express();
app.use(express.json());
app.use(session({
  secret: 'test_secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get('/protected', allowRoles([UserRole.Admin, UserRole.User]), (req, res) => {
  res.status(200).send('Protected route');
});

describe('Authorization Middleware', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should render not logged in view and return 401 status, when user is NOT logged in', async () => {
    const req = {
      session: { token: '' }, 
    } as any; 

    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      redirect: sinon.stub().returnsThis()
    } as any; 

    const next = sinon.stub();

    const middleware = allowRoles([UserRole.Admin, UserRole.User]);

    await middleware(req, res, next);

    expect((res.status as sinon.SinonStub).calledWith(401)).to.be.true;
    expect(req.session.token).to.equal('');
    expect(res.send.calledOnce).to.be.true;
    expect(res.send.calledWith('Not logged in')).to.be.true;
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).get('/protected');

    expect(response.status).to.equal(401);
    expect(response.text).to.equal('Not logged in');
  });
});
