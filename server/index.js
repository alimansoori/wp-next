const next = require('next');
const express = require('express');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        // server.get('/graphql', (req, res) => {
        //     return res.json({
        //         message: "Hi GraphQL"
        //     })
        // })

        server.get('*', (req, res) => {
            return handler(req, res);
        });

        const PORT = process.env.PORT || 3000;

        server.listen(PORT, err => {
            if (err) { throw err }
            console.log(process.env.NODE_ENV);

            console.log(`Ready on ${PORT}`);
        });
    }).catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });