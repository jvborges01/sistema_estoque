import express from 'express';
import pool from '../config/db.js';
import { tableMap } from '../util/tableMap.js';

const router = express.Router();

router.post('/insert', async (req, res, next) => {
  const { tableName, rows } = req.body; // 'rows' deve ser um array de objetos
  const nometable = tableMap[tableName]; // Segurança adicional
  
  if (!nometable) {
      return res.status(400).json({ error: 'Nome de tabela inválido ou operação não permitida.' });
  }

  if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ error: 'Dados de entrada inválidos ou vazios.' });
  }

  try {
      const [[{ maxId }]] = await pool.query(`SELECT MAX(id) AS maxId FROM ${nometable}`);
      let nextId = maxId + 1;

      // Preparando os valores para a inserção
      const insertValues = rows.map(row => [
          nextId++,
          row.nome_item,
          row.qtd,
          row.data,
          row.hora,
          row.local,
          row.rp,
          row.responsavel,
          row.obs
      ]);

      // Construindo a query com múltiplas linhas
      const placeholders = insertValues.map(_ => '(?, ?, ?, ?, ?, ?, ?, ?, ?)').join(', ');
      const query = `INSERT INTO ${nometable} (id, nome_item, qtd, data, hora, local, rp, responsavel, obs) VALUES ${placeholders}`;
      const flattenedValues = insertValues.flat();

      // Executando a query com todos os valores
      await pool.query(query, flattenedValues);

      res.status(200).json({ message: 'Registros inseridos com sucesso.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao inserir os registros', details: error.message });
  }
});

router.post('/search/:tableName/:page', async (req, res) => {
    const { tableName, page } = req.params;
    const { order, item_pesquisado, itemsPerPage } = req.body;
  
    const nometable = tableMap[tableName];
    if (!nometable) {
      return res.status(400).json({ error: 'Nome de tabela inválido ou operação não permitida.' });
    }
  
    const offset = (page- 1) * itemsPerPage;
  
    try {
      const [totalResults] = await pool.query(
        `SELECT COUNT(*) AS total FROM ${nometable} WHERE id LIKE CONCAT(?, '%') OR nome_item LIKE CONCAT(?, '%') OR qtd LIKE CONCAT(?, '%') OR data LIKE CONCAT(?, '%') OR hora LIKE CONCAT(?, '%') OR local LIKE CONCAT(?, '%') OR rp LIKE CONCAT(?, '%') OR responsavel LIKE CONCAT(?, '%') OR obs LIKE CONCAT(?, '%')`,
        Array(9).fill(item_pesquisado)
      );
  
      const total = totalResults[0].total;
  
      const [results] = await pool.query(
        `SELECT * FROM ${nometable} WHERE id LIKE CONCAT(?, '%') OR nome_item LIKE CONCAT(?, '%') OR qtd LIKE CONCAT(?, '%') OR data LIKE CONCAT(?, '%') OR hora LIKE CONCAT(?, '%') OR local LIKE CONCAT(?, '%') OR rp LIKE CONCAT(?, '%') OR responsavel LIKE CONCAT(?, '%') OR obs LIKE CONCAT(?, '%') ORDER BY ${order[0]} ${order[1]} LIMIT ? OFFSET ?`,
        [...Array(8).fill(item_pesquisado), order[0], itemsPerPage, offset]
      );
  
      res.json({ total, results });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados', details: error.message });
    }
  });
  router.delete('/delete/:tableName', async (req, res, next) => {
    const { tableName } = req.params;
    const { ids } = req.body;
    console.log(typeof ids);

    const nometable = tableMap[tableName];

    if (!nometable) {
        return res.status(400).json({ error: 'Nome de tabela inválido ou operação não permitida.' });
    }

    // Certifique-se de que 'ids' é um array
    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ error: 'Nenhum ID fornecido para exclusão.' });
    }

    try {
        // Construir a query SQL para deletar múltiplos registros
        // Utiliza a cláusula WHERE id IN (?) e passa 'ids' como parâmetro
        const query = `DELETE FROM ${nometable} WHERE id IN (?)`;
        const [results] = await pool.query(query, [ids]);

        if (results.affectedRows > 0) {
            res.status(200).json({ message: 'Registro(s) excluído(s) com sucesso.' });
        } else {
            res.status(404).json({ message: 'Nenhum registro encontrado para os IDs fornecidos.' });
        }
    } catch (error) {
        next(error);
    }
});
const update = async (req, res, next) => {
    const { tableName } = req.params;
    const { campo, valor, id } = req.body;
  
    const nometable = tableMap[tableName]; // Segurança adicional
  
    if (!nometable) {
      return res.status(400).json({ error: 'Nome de tabela inválido ou operação não permitida.' });
    }
  
    try {
      const [results] = await pool.query(`UPDATE ${nometable} SET ${campo} = ? WHERE id = ?`, [valor, id]);
      res.status(200).json({ message: 'Registro atualizado com sucesso.' });
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erro
    }
  }
router.patch('/update/:tableName', update);
router.post('/select/user', async (req, res) => {
    const { nome, senha } = req.body;
  
    try {
      const [results] = await pool.query('SELECT COUNT(*) AS total, nome FROM user WHERE nome = ? AND senha = ?', [nome, senha]);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados', details: error.message });
    }
  });
  router.get('/select/:tableName', async (req, res) => {
    const { tableName } = req.params;
    const nometable = tableMap[tableName]; // Segurança adicional
  
    if (!nometable) {
      return res.status(400).json({ error: 'Nome de tabela inválido ou operação não permitida.' });
    }
  
    try {
      const [results] = await pool.query(`SELECT * FROM ${nometable}`);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao consultar o banco de dados', details: error.message });
    }
  });
  router.post('/select/:tableName', async (req, res) => {
    const { tableName } = req.params;
    const filters = req.body;
    const nometable = tableMap[tableName]; 

    if (!nometable) {
        return res.status(400).json({ error: 'Nome de tabela inválido ou operação não permitida.' });
    }
  
    // Inicializa a query básica
    let query = `SELECT * FROM ${nometable}`;

    // Inicializa o array de values antes de usá-lo
    let values = []; // Esta é a linha que estava faltando

    if (Object.keys(filters).length) {
        // Adiciona WHERE apenas se houver filtros
        query += ' WHERE ';

        // Constrói as condições do filtro
        const filterConditions = Object.keys(filters).filter(key => filters[key] !== '').map((key) => {
          values.push(filters[key]);
          return `${key} = ?`;
      }).join(' AND ');
      

        query += filterConditions; 
    }

    try {
        const [results] = await pool.query(query, values);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao consultar o banco de dados', details: error.message });
    }
});


export default router;
