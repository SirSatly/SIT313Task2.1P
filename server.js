const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = 8080

const API_KEY = '4a8dcd66ea55ebd99a137357062c5142-73f745ed-86bedcc0';
const DOMAIN = 'sandbox2058c049f9d74750ae36c66c06676084.mailgun.org';

const formData = require('form-data');
const Mailgun =  require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({username: 'api', key: API_KEY});

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    const email = req.body.email

    const messageData = {
        from: 'Newsletter Service <test@sandbox2058c049f9d74750ae36c66c06676084.mailgun.org>',
        to: email,
        subject: "Welcome",
        text: 'Thank you for subscribing to our Daily Insider!'
      };
      
    client.messages.create(DOMAIN, messageData)
    .then((resq) => {
        console.log(resq);
        res.send("Email has been sent")
    })
    .catch((err) => {
        console.error(err);
        res.send(err)
    });
})

app.listen(port, () => {
    console.log('Example app listening on port ${port}')
})