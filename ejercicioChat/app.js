const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const chatRouter = require('./routes/chat');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// configurar la sesión
app.use(session({
    secret: 'my_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// middleware para pasar la sesión a las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// routes :)
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/chat', chatRouter);

// socket.IO implemented
io.on('connection', (socket) => {
    console.log('A user connected');

    // obtener el nombre de usuario de la solicitud HTTP (handshake)
    socket.on('setUsername', (username) => {
        socket.username = username; // save nombre del usuario en el socket
    });

    // listen to message in chat
    socket.on('chat message', (msg) => {
        if (socket.username) {
            io.emit('chat message', { username: socket.username, message: msg });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


module.exports = { app, server };
