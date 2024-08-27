import { createPool } from 'mysql2/promise';

// Criar o pool de conexões com suporte a Promises
const pool = createPool({
  host: '127.0.0.1',
    user: 'user',
    password: 'root12345',
  database: 'sistema_estoque',
  waitForConnections: true,
  connectionLimit: 10, // Número máximo de conexões no pool
  queueLimit: 0
});

// Configurar eventos do pool (opcional)
pool.on('connection', (connection) => {
  console.log('Nova conexão estabelecida', connection.threadId);
});

pool.on('error', (err) => {
  console.error('Erro na database:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Reconectando database...');
    // Não é necessário reconectar manualmente com o pool; o pool gerencia isso automaticamente.
  } else {
    throw err;
  }
});

export default pool;
