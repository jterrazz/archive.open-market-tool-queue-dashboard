const Queue = require('bull');
const { setQueues, BullAdapter, router } = require('bull-board');
const app = require('express')();
const Redis = require('ioredis');

const PORT = process.env.PORT || 8001;

/**
 * Queues
 */

const redisConnection = new Redis(process.env.REDIS_URL)

const queueOptions = {
    createClient: function () {
        return redisConnection;
    },
};

const QueueIdentifier = {
    email: 'email',
    order: 'order',
};

const orderQueue = new Queue(QueueIdentifier.order, queueOptions);
const emailQueue = new Queue(QueueIdentifier.email, queueOptions);

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
