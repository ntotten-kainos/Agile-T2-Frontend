import * as ApplicationController from '../../../src/controllers/ApplicationController'
import sinon from 'sinon';
import { expect } from 'chai';

describe('ApplicationController', function () {

    afterEach(() => {
        sinon.restore();
    });

    describe('getApplicationForm', function () {

        it.only('should render applicationForm', async () => {
            const req = {};
            const res = { render: sinon.spy() };

            await ApplicationController.getApplicationForm(req as any, res as any);

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('applicationForm')).to.be.true;
        })
    })
})