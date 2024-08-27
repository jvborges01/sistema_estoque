// Exemplo mínimo de um servidor usando Express e MySQL
import { resolve } from 'path'
import express from 'express';
import { createConnection } from 'mysql';
import os from 'node:os';
const app = express();
app.use(express.json());


app.use((req, res, next) => {
    
    res.header('Access-Control-Allow-Origin', '*'); // Permitir qualquer origem. Substitua '*' pelo seu domínio específico, se necessário.
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Content-Security-Policy', 'default-src *; style-src *; script-src *');
    res.header('upgrade-insecure-requests', '1');


    next();
});

const connection = createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root12345',
    database: 'sistema_estoque'
});
if (connection) {
    console.log('Conectado ao banco de dados');
}
const tabelasPermitidas = ['material_limpeza', 'material_eletrico','bens_moveis','material_hidraulico','material_expediente']; 
app.get('/' , (req, res) => {
   res.send('Bem vindo ao sistema de estoque');
}
);


app.post('/api/search/:tableName/:page', (req, res) => {
  const { tableName } = req.params;
  const {order} = req.body;
  const { item_pesquisado } = req.body;
  const page = req.params.page;
  const {itemsPerPage} = req.body; // Número de itens por página

  // Calcula o deslocamento com base no número da página
  const offset = (page - 1) * itemsPerPage;

  // Executa ambas as consultas em paralelo
  Promise.all([
    // Consulta para obter o total de resultados
    new Promise((resolve, reject) => {
      connection.query( 
        `SELECT COUNT(*) AS total
        FROM ${tableName}
        WHERE 
            id LIKE CONCAT(?, '%') OR
            nome_item LIKE CONCAT(?, '%') OR
            qtd LIKE CONCAT(?, '%') OR
            data LIKE CONCAT(?, '%') OR
            hora LIKE CONCAT(?, '%') OR
            local LIKE CONCAT(?, '%') OR
            rp LIKE CONCAT(?, '%') OR
            responsavel LIKE CONCAT(?, '%') OR
            obs LIKE CONCAT(?, '%')
        ORDER BY id ASC;
        
            `,
        [item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado],
        (error, countResult) => {
          if (error) {
            reject('Erro ao consultar o banco de dados');
            return;
          }
          const total = countResult[0].total; // Extrai o total de resultados
          resolve(total);
      });
    }),
    // Consulta para obter os resultados paginados
    new Promise((resolve, reject) => {
      connection.query( 
        `SELECT *
        FROM ${tableName} 
        WHERE 
            id LIKE CONCAT(?, '%') OR
            nome_item LIKE CONCAT(?, '%') OR
            qtd LIKE CONCAT(?, '%') OR
            data LIKE CONCAT(?, '%') OR
            hora LIKE CONCAT(?, '%') OR
            local LIKE CONCAT(?, '%') OR
            rp LIKE CONCAT(?, '%') OR
            responsavel LIKE CONCAT(?, '%') OR
            obs LIKE CONCAT(?, '%')
        ORDER BY ${order[0]} ${order[1]}
        LIMIT ? OFFSET ?;`,
        [item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, item_pesquisado, itemsPerPage, offset],
        (error, results) => {
          if (error) {
            reject({ error: 'Erro ao consultar o banco de dados', details: error.message });
            return;
          }
          resolve(results); // Retorna os resultados paginados
      });
    })
  ])
  .then(([total, results]) => {
    // Retorna o total e os resultados paginados
    res.status(200).json({ total, results });
  })
  .catch(error => {
    res.status(500).json({ error: 'Erro ao consultar o banco de dados', details: error.message });
  });
});

 
app.post('/api/insert', async (req, res) => {
  const { nome_item, qtd, data, hora, local, rp, responsavel, obs, nometable } = req.body;

// Supondo que essas sejam as tabelas permitidas

  if (!tabelasPermitidas.includes(nometable)) {
    return res.status(400).json({ error: 'Nome de tabela inválido ou operação não permitida.' });
  }

  await connection.beginTransaction();
  try {
    const [rows] = await connection.query(`SELECT MAX(id) AS maxId FROM ${nometable}`);
    const maxId = rows[0].maxId ? rows[0].maxId + 1 : 1; // Caso a tabela esteja vazia, comece de 1

    const insertQuery = `INSERT INTO ${nometable} (id, nome_item, qtd, data, hora, local, rp, responsavel, obs) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await connection.query(insertQuery, [maxId, nome_item, qtd, data, hora, local, rp, responsavel, obs]);

    await connection.commit();
    res.status(200).json({ message: 'Registro inserido com sucesso.' });
  } catch (error) {
    await connection.rollback();
    console.error("Erro ao inserir dados:", error);
    res.status(500).json({ error: 'Erro ao inserir o registro', details: error.message });
  } finally {
    await connection.end();
  }
});

app.patch('/api/update/:nometable', (req, res) => {
  const { nometable } = req.params;
  const { campo, valor, id } = req.body;



  if (!tabelasPermitidas) {

    res.status(400).json({ error: 'Requisição inválida' });
    return;
  }

  connection.query(
    `UPDATE ${nometable} SET ${campo} = ? WHERE id = ?;`,
    [valor, id],
    (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
        return;
      }
      res.status(200).json({ message: 'Modificado com sucesso' });
    }
  );
});
  app.delete('/api/delete/:nometable/:id', (req, res) => {
    const { id,nometable} = req.params;
  
    
  
    connection.query(
      `DELETE FROM ${nometable} WHERE id = ?;`,
      [id], // Corrigido: os parâmetros agora estão corretamente passados como um array
      (error, results, fields) => {
        if (error) {
          res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
          return;
        }
        res.status(200).json({ message: 'Deletado com sucesso' });
      }
    );
  });
  app.post('/api/select', (req, res) => {
    const {coluna} = req.body;
    const { item } = req.body;
    connection.query( 
      `SELECT * FROM material_limpeza WHERE ? LIKE ?';`,[coluna,item],(error, results, fields) => {
        if (error) {
          res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
          return;
        }
        res.status(200).json({ message: 'ok' });
        res.end();
    });
  });
  app.post('/api/select/user', (req, res) => {
    const { nome, senha } = req.body;
    connection.query(
      `SELECT nome,COUNT(*) AS total FROM user WHERE nome = ? AND senha = ?`,
      [nome, senha],
      (error, results, fields) => {
        if (error) {
          res.status(500).json({ error: 'Erro ao consultar o banco de dados' });
          return;
        }
        res.json(results);
      }
    );
  });

  app.get('/api/select', (req, res) => {
    connection.query('SELECT id,nome_item,qtd,data,hora,local,rp,responsavel,obs FROM material_limpeza;', (error, results, fields) => {
        if (error) {
            res.status(500).json({error: error.message });
            return;
        }
        res.json(results);
    });
});

const getIPv4Address = () => {
  const interfaces = os.networkInterfaces()['Wi-Fi']; 
  if(interfaces != undefined){
  for (let i = 0; i < interfaces.length; i++) {
      if (interfaces[i].family === 'IPv4' && interfaces[i].internal === false) {
          return interfaces[i].address; 
      }
      
  }
}
else{
  return '127.0.0.1'
}
  return null;
}

// Exemplo de uso

const port = 3001;
app.listen(port, () => {

    console.log(`Servidor está ouvindo na porta ${port}`);
});
