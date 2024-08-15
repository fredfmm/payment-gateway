import request from 'supertest';
import { expect } from 'chai';
import app from '../app.js';

describe('POST /payment', () => {
    it('should process payment successfully when payment succeeds', async () => {
        const orderId = 'order123';

        const res = await request(app)
            .post('/payment')
            .query({ orderId: orderId })
            .expect(200)
            .expect('Content-Type', /json/);

        expect(res.body).to.have.property('orderId', orderId);
        expect(res.body).to.have.property('success');
        expect(res.body).to.have.property('message');

        if (res.body.success) {
            expect(res.body.message).to.equal('Payment processed successfully');
        } else {
            expect(res.body.message).to.equal('Payment failed');
        }
    });

    it('should return failure when payment fails', async () => {
        const orderId = 'order123';

        const originalRandom = Math.random;
        Math.random = () => 0.1;

        const res = await request(app)
            .post('/payment')
            .query({ orderId: orderId })
            .expect(200)
            .expect('Content-Type', /json/);

        Math.random = originalRandom;

        expect(res.body).to.have.property('orderId', orderId);
        expect(res.body).to.have.property('success', false);
        expect(res.body.message).to.equal('Payment failed');
    });

    it('should process payment successfully when payment succeeds', async () => {
        const orderId = 'order123';

        const originalRandom = Math.random;
        Math.random = () => 0.5;

        const res = await request(app)
            .post('/payment')
            .query({ orderId: orderId })
            .expect(200)
            .expect('Content-Type', /json/);

        Math.random = originalRandom;

        expect(res.body).to.have.property('orderId', orderId);
        expect(res.body).to.have.property('success', true);
        expect(res.body.message).to.equal('Payment processed successfully');
    });
});
