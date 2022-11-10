const express = require('express');
const { ApiStream } = require('@api.stream/sdk');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000
require('dotenv').config();

app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
}));
const sdk = new ApiStream({apiKey: process.env.API_STREAM_KEY});

async function auth(req, res, next) {
    const { serviceUserId } = req.params
    sdk.LiveApi().backendAuthentication?.createAccessToken({
        serviceUserId: serviceUserId,
    }).then(token => {
        res.status(200).send(token.accessToken);
    }).catch(error => {
        res.status(400).send(error);
    })
};

app.get('/auth/:serviceUserId', auth);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});