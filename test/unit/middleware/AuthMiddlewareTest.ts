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
      it('should redirect to loginForm.html page when user is NOT logged in', async () => {
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

      expect(res.redirect.calledOnce).to.be.true;
      expect(res.redirect.calledWith('/loginForm.html')).to.be.true;
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
  
  it('should redirect to loginForm.html page when user has an invalid token', async () => {
    const invalidJwtToken = 'INVALID.TOKEN.HERE';

    const req = {
        session: { token: invalidJwtToken }
    } as any;

    const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.stub().returnsThis(),
        redirect: sinon.stub().returnsThis()
    } as any;

    const next = sinon.stub();

    const middleware = allowRoles([UserRole.Admin]);

    await middleware(req as unknown as express.Request, res as unknown as express.Response, next);

    expect(res.redirect.calledOnce).to.be.true;
    expect(res.redirect.calledWith('/loginForm.html')).to.be.true;
});

it('should render not authorised view and return 403 status, when user is logged in with a valid token but has an unauthorized role', async () => {
  const secretKey = 'SUPER_SECRET';
  const validJwtToken = jwt.sign({ Role: UserRole.User }, secretKey, { expiresIn: '8h' });

  const req = {
      session: { token: validJwtToken }
  } as any;

  const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      redirect: sinon.stub().returnsThis()
  } as any;

  const next = sinon.stub();

  const middleware = allowRoles([UserRole.Admin]);

  await middleware(req as unknown as express.Request, res as unknown as express.Response, next);

  expect((res.status as sinon.SinonStub).calledWith(403)).to.be.true;
  expect(res.send.calledOnce).to.be.true;
  expect(res.send.calledWith('User role not authorised for this action')).to.be.true;
  expect(res.redirect.called).to.be.false;
});
it('should call next() when user is logged in with a valid token and has an authorized role', async () => {
  const secretKey = 'SUPER_SECRET';
  const validJwtToken = jwt.sign({ Role: UserRole.Admin }, secretKey, { expiresIn: '8h' });

  const req = {
      session: { token: validJwtToken }
  } as any;

  const res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub().returnsThis(),
      redirect: sinon.stub().returnsThis()
  } as any;

  const next = sinon.stub();

  const middleware = allowRoles([UserRole.Admin]);

  await middleware(req as unknown as express.Request, res as unknown as express.Response, next);

  expect(next.calledOnce).to.be.true;
  expect(res.status.called).to.be.false;
  expect(res.send.called).to.be.false;
  expect(res.redirect.called).to.be.false;
});


  });
});

