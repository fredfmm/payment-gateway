import express from 'express';

const app = express();
const port = 3001;

app.use(express.json());

app.post('/payment', (req, res) => {
    const { orderId } = req.query;

    const paymentSuccess = Math.random() > 0.2;

    if (paymentSuccess) {
        res.json({
            orderId: orderId,
            success: true,
            message: 'Payment processed successfully'
        });
    } else {
        res.json({
            orderId: orderId,
            success: false,
            message: 'Payment failed'
        });
    }
});

app.listen(port, () => {
    console.log(`Payment Gateway running on http://localhost:${port}`);
});

export default app;
