import express from 'express';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import os from 'os';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3001; // Porta do servidor (3000 por padrão)
const DIST_DIR = join(__dirname); // Caminho para a pasta de distribuição

const app = express();

// Define o diretório de arquivos estáticos
app.use(express.static(DIST_DIR));

// Rota para tratar todas as solicitações
app.get('*', (req, res) => {
  res.sendFile(join(DIST_DIR, 'index.html'));
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});

