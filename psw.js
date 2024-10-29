const http = require('http');
const os = require('os');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 3000; //variables de entorno - probamos crear el .env para poner por defecto otro puerto

async function loadDictionary() {
    const data = await fs.readFile("SpanishBFF_0_2.json", "utf-8");
    const dictionary = JSON.parse(data).map(item => item.lemma); // Extrae las palabras del campo "lemma"
    return dictionary;
}

const server = http.createServer((req, res) => {
 console.log('New connection'); //en navegador-> inspect-> network (reload page) busca favicon :. llama de nuevo la peticion y se ejecuta dos veces
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/html');
 res.end('<h1>Hello, World!</h1>');
});

server.listen(port, () => {
 console.log(`Server running at port ${port}`);
}); 