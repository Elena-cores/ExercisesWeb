const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 3000;

// Función para cargar el diccionario de palabras
async function loadDictionary() {
    const data = await fs.readFile(path.join(__dirname, 'SpanishBFF_0_2.json'), 'utf-8');
    return JSON.parse(data).map(item => item.lemma);
}

// Función para generar una contraseña
async function generatePassword(numWords, capitalize) {
    const dictionary = await loadDictionary();
    const usedWords = new Set();
    const password = [];

    while (password.length < numWords) {
        const randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!usedWords.has(randomWord)) {
            usedWords.add(randomWord);
            password.push(capitalize ? capitalizeWord(randomWord) : randomWord);
        }
    }

    return password.join('');
}

// Capitalizar la primera letra de una palabra
function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Crear el servidor
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    if (pathname === '/') {
        // Servir la página principal
        const filePath = path.join(__dirname, 'public', 'passwordGenerator.html');
        const html = await fs.readFile(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(html);
    } else if (pathname === '/generate') {
        // Generar contraseña aleatoria
        const numWords = parseInt(parsedUrl.query.numWords) || 4;
        const capitalize = parsedUrl.query.capitalize === 'true';

        try {
            const password = await generatePassword(numWords, capitalize);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(password);
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error generating password');
        }
    } else if (pathname === '/script.js') {
        // Servir el archivo script.js
        const filePath = path.join(__dirname, 'public', 'script.js');
        const js = await fs.readFile(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(js);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Iniciar el servidor
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
