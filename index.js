/**
 *
 * @createdBy Aurosmruti Das
 * @email aurosmruti.das@gmail.com
 * @description index
 * @createdOn 05/03/21 23:49
 */
const express = require('express');
const rp = require('request-promise');
const jwt = require('jsonwebtoken');

const PORT = 8080;

const app = express();


const homeResponse = (req, res) => {
    return res.status(500).json({ 'instructions': "The only available end-point is '/token" });
}


const generateAccessToken = async (req, resp) => {
    resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    resp.header('Expires', '-1');
    resp.header('Pragma', 'no-cache');
    // set response header
    resp.header('Access-Control-Allow-Origin', '*');

    const apiKey = req.query.apiKey;
    if (!apiKey) {
        return resp.status(500).json({'error': 'zoom api Key id is required'});
    }

    const apiSecret = req.query.apiSecret;
    if (!apiSecret) {
        return resp.status(500).json({'error': 'zoom api secret is required'});
    }

    // build the token
    const payload = {
        iss: apiKey,
        exp: ((new Date()).getTime() + 5000)
    };
    const token = jwt.sign(payload, apiSecret);

    const email = '000computricks@gmail.com';
    //check if the email was stored in the console
    console.log(email);
    //Store the options for Zoom API which will be used to make an API call later.
    const options = {
        //You can use a different uri if you're making an API call to a different Zoom endpoint.
        uri: "https://api.zoom.us/v2/users/" + email + "/token?type=zak&access_token=" + token,
        qs: {
            status: 'active'
        },
        auth: {
            'bearer': token
        },
        headers: {
            'content-type': 'application/json'
        },
        json: true //Parse the JSON string in the response
    };

//Use request-promise module's .then() method to make request calls.
//     rp(options)
//         .then(function (response) {
//             //printing the response on the console
//             console.log('User has', response);
//             //console.log(typeof response);
//
//             //Adding html to the page
//             const title1 = '<center><h3>Your token: </h3></center>'
//             const result1 = title1 + '<code><pre style="background-color:#aef8f9;">' + token + '</pre></code>';
//             const title = '<center><h3>User\'s information:</h3></center>'
//             //Prettify the JSON format using pre tag and JSON.stringify
//             const result = title + '<code><pre style="background-color:#aef8f9;">' + JSON.stringify(resp, null, 2) + '</pre></code>'
//             response.send(result1 + '<br>' + result);
//
//         })
//         .catch(function (err) {
//             // API call failed...
//             console.log('API call failed, reason ', err);
//         });

    const re = await rp(options);

    // return the token
    return resp.json(re);
}

app.get('/', homeResponse);
app.get('/token', generateAccessToken);


app.set( 'port', ( process.env.PORT || PORT ));

// Start node server
app.listen( app.get( 'port' ), function() {
    console.log( 'Node server is running on port ' + app.get( 'port' ));
});