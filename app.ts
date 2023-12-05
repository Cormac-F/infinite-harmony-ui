import { Application, Request, Response } from 'express';

const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const app = express();
const session = require('express-session');

// Nunjucks Configuration
const appViews = path.join(__dirname, '/views/');

function setUpNunjucks(expressApp: Application) {

    let env = nunjucks.configure('views', {
        autoescape: true,
        express: app
    });
  }
  
setUpNunjucks(express);

// Express Configuration
app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

declare module 'express-session' {
    interface SessionData {
    }
}

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

// Express Routes
app.get('/', async (req: Request, res: Response) => {
    res.render('index', { title: 'Home' });
});
