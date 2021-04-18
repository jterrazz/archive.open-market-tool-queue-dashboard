const Queue = require('bull');
const { setQueues, BullAdapter, router } = require('bull-board');
const app = require('express')();

const PORT = process.env.PORT || 8001;

/**
 * Queues
 */

const QueueIdentifier = {
    email: 'email',
    order: 'order',
};

const orderQueue = new Queue(QueueIdentifier.order, process.env.REDIS_URL);
const emailQueue = new Queue(QueueIdentifier.email, process.env.REDIS_URL);

setQueues([
    new BullAdapter(orderQueue),
    new BullAdapter(emailQueue),
]);

/**
 * Server
 */

app.use('/', router);

app.listen(PORT, () => {
    console.log(`application listening on port <${PORT}>`);
})
