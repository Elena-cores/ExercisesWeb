const http = require('http');
const os = require('os');
const dotenv = require('dotenv');
dotenv.config();

// variables de configuración
const port = process.env.PORT || 3000;
const interval = process.env.INTERVAL || 5000; // Intervalo desde archivo .env (en ms)

// info inicial del sistema
console.log(`Sistema operativo: ${os.type()} ${os.release()}`);
console.log(`Versión de Node.js: ${process.version}`);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello, World!</h1>');
});

server.listen(port, () => {
 console.log(`Server running at port ${port}`);
});

