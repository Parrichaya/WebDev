const express = require('express');

const router = express.Router();

const fs = require('fs');

router.get('/login', (req, res, next) => {
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/login" method="POST"><input type="text" id="username" name="username" placeholder="Username"><br><button type="submit">Add Username</button></form>');
  });
  
router.post('/login', (req, res, next) => {
    // console.log(req.body);
    res.redirect('/');
  });

router.get('/', (req, res, next) => {
    fs.readFile('messages.txt', (err, data) => {
        res.send(`${data}<br><form action="/" onsubmit="document.getElementById('username').value = localStorage.getItem('username')" method="POST"><input type="text" name="message" placeholder="Message"><input type="hidden" id="username" name="username"><br><button type="submit">Send Message</button></form>`);
    });
    
});

router.post('/', (req, res, next) => {  
    const username = req.body.username;
    const message = req.body.message;    
    
    const messageData = `${username}: ${message} `;

    fs.appendFile('messages.txt', messageData, (err) => {
        res.statusCode = 302;
        res.redirect('/');
    });
  });

module.exports = router;