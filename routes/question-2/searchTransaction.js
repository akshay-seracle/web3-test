const config = require('../../configurations/config')();

const db = config.getDB();

async function searchTransaction(req, res) {
    const from = req.query.from;
    const to = req.query.to;
    const start_time = req.query.start_time;
    const end_time = req.query.end_time;

    const searchQuery = {};

    if (from) 
        searchQuery.from = from;

    if (to) 
        searchQuery.to = to;

    if (start_time) {
        searchQuery.time = {
            $gte: start_time
        };
    }

    if (end_time) {
        searchQuery.time = {
            $lt: end_time
        };
    }

    const transactions = await db.collection('transactions').find(searchQuery, {
        projection: {
            _id: 0
        }
    }).toArray();

    if (transactions.length === 0) {
        return res.status(404).send({
            message: 'No transactions found'
        });
    }

    return res.status(200).send({
        data: transactions,
        message: `${transactions.length} transactions found`
    });
}

module.exports = searchTransaction;