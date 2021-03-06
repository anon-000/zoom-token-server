/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index
 * @createdOn 05/03/21 23:49
 */
const express = require('express');

const PORT = 8080;

const app = express();


const homeResponse = (req, res) => {
    return res.status(500).json({ 'instructions': "The only available end-point is '/token" });
}


const generateAccessToken = (req, resp) => {
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires', '-1');
    resp.header('Pragma', 'no-cache');
    // set response header
    resp.header('Access-Control-Allow-Origin', '*');

    const appId = req.query.appId;
    if (!appId) {
        return resp.status(500).json({ 'error': 'agora app id is required' });
    }

    const appCertificate = req.query.appCertificate;
    if (!appCertificate) {
        return resp.status(500).json({ 'error': 'agora app certificate is required' });
    }

    // build the token
    const token = '';
    // return the token
    return resp.json({ 'token': token });
}

app.get('/', homeResponse);
app.get('/token', generateAccessToken);


app.set( 'port', ( process.env.PORT || PORT ));

// Start node server
app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));
});