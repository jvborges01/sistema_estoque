import express from 'express';
import inventoryRoutes from './routes/inventoryRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import session from 'express-session';

const app = express();
const PORT = 3001;
const HOST = '0.0.0.0'; // Permite conexões externas

app.use(session({
    secret: 'sistem',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Em produção, definir como true para HTTPS
}));

// Configurar CORS
const allowedOrigins = ['https://librin.site', 'http://127.0.0.1:5173', 'http://localhost:5137', 'http://127.0.0.1:5138']; // Adicione todas as origens permitidas

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Exemplo de rota inicial
app.get('/', (req, res) => {
    res.send('Hello');
});

// Rotas do inventário
app.use('/api', inventoryRoutes);

// Middleware de tratamento de erros
app.use(errorHandler);

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/librin.site/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/librin.site/fullchain.pem')
};

// Inicie o servidor HTTPS
https.createServer(options, app).listen(PORT, () => {
    console.log(`Servidor HTTPS rodando na porta ${PORT}`);
});
