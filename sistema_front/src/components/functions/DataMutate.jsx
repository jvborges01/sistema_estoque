// DateMutate.jsx
import { useQueryClient, useMutation } from '@tanstack/react-query';

const useHandlePagMutation = () => {
  const queryClient = useQueryClient();

  const mutateAsync = async ({ nometable, page, search, itemsPerPage, order }) => {

    const response = await fetch(`http://localhost:3000/api/search/${nometable}/${page}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ item_pesquisado: search, itemsPerPage: itemsPerPage, order: order }),

      });
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados');
    }


    const data = await response.json(); // Extrai o corpo da resposta como JSON

    await queryClient.refetchQueries(['data', nometable, page], (oldData) => {
      if (oldData) {
        return data;
      }
      return data;
    });
    return data;
  };

  return { mutateAsync };
};
function UpdateRow() {


  const ip = window.location.hostname;
  const queryClient = useQueryClient();

  const queryupdate = async ({ nometable, id, campo, valor }) => {
    const url = `http://localhost:3000/api/update/${nometable}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        campo: campo,
        valor: valor,
        id: id,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json(); // Assumindo que a resposta de erro é JSON
      throw new Error(`Erro ao salvar os dados: ${errorBody.message}`);
    }
    const data = await response.json(); // Extrai o corpo da resposta como JSON

    // Refetch da query relacionada após a inserção/atualização
    await queryClient.refetchQueries(["data", nometable]);

    return data;
  };

  return { queryupdate };
}

const SaveRow = () => {

  const queryClient = useQueryClient();

  const querysave = async ({ tableName, rows }) => {

    const url = `http://localhost:3000/api/insert`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tableName: tableName,
        rows: rows,
      }),
    });

    if (!response.ok) {
      throw new Error(['Erro ao salvar os dados', response.status, response.statusText]);
    }

    const data = await response.json(); // Extrai o corpo da resposta como JSON

    // Refetch da query relacionada após a inserção/atualização
    await queryClient.refetchQueries(["data", tableName]);

    return data;
  };
  return { querysave };
}
const DeleteRow = () => {

  const queryClient = useQueryClient();

  const deletequeryid = async ({ tableName, ids }) => {

    const response = await fetch(`http://localhost:3000/api/delete/${tableName}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: ids }),
      });
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados', response);
    }

    const data = await response.json(); // Extrai o corpo da resposta como JSON

    await queryClient.refetchQueries(["data", tableName]);



    return data;
  };
  return { deletequeryid };
}


export { useHandlePagMutation, SaveRow, DeleteRow, UpdateRow };
