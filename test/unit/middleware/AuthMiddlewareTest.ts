import { expect } from 'chai';
import sinon from 'sinon';
import express from "express";
import { allowRoles } from '../../../src/middleware/AuthMiddleware';
import { UserRole, JwtToken } from '../../../src/models/JwtToken';
import "core-js/stable/atob";
import jwt from 'jsonwebtoken';

describe('Authorization Middleware', function () {
  afterEach(() => {
      sinon.restore();
  });

  describe('allowRoles', function () {
      it('should render notLoggedIn view and return 401 status, when user is NOT logged in', async () => {

        const req = {
          session: { token: '' }
      };

      const res = {
          status: sinon.stub().returnsThis(),
          send: sinon.stub().returnsThis(),
          redirect: sinon.stub().returnsThis()

      };

      const next = sinon.stub();

      const middleware = allowRoles([UserRole.Admin, UserRole.User]);

      await middleware(req as unknown as express.Request, res as unknown as express.Response, next);

      expect((res.status as sinon.SinonStub).calledWith(401)).to.be.true;
      expect(req.session.token).to.equal('');
      expect(res.send.calledOnce).to.be.true;
      expect(res.send.calledWith('Not logged in')).to.be.true;
  });
  it('should render notAuthorised view and return 403 status, when a user is logged in with User permission, but they try to access admin permission content', async () => {

    const secretKey = 'SUPER_SECRET';
    const validJwtToken = jwt.sign({ Role: UserRole.User }, secretKey, { expiresIn: '8h' });
  
    const req = {
        session: { token: validJwtToken}
    };
  
    const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      redirect: sinon.stub().returnsThis()
  };

  const next = sinon.stub();

  const middleware = allowRoles([UserRole.Admin]);

  await middleware(req as unknown as express.Request, res as unknown as express.Response, next);

  expect((res.status as sinon.SinonStub).calledWith(403)).to.be.true;
  expect(res.send.calledOnce).to.be.true;
  expect(res.send.calledWith('User role not authorised for this action')).to.be.true;
  });
  it('should call next if user role is allowed', async () => {
    const secretKey = 'SUPER_SECRET';
    const validJwtToken = jwt.sign({ Role: UserRole.Admin }, secretKey, { expiresIn: '8h' });

    const req = {
        session: { token: validJwtToken }
    };

    const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub().returnsThis(),
        redirect: sinon.stub().returnsThis()
    };

    const next = sinon.stub();

    const middleware = allowRoles([UserRole.Admin]);

    await middleware(req as unknown as express.Request, res as unknown as express.Response, next);

    expect(res.status.notCalled).to.be.true;
    expect(res.send.notCalled).to.be.true;
    expect(next.calledOnce).to.be.true;
  });
  });
});
