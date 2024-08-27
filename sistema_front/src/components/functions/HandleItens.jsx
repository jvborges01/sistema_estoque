
const handlePerPage = (elemento, setItemsPerPage, setPage, results, page, total) => {
  setItemsPerPage(elemento);
  const totalperpage = Math.ceil(total / elemento);
  if (results.length < elemento && page > totalperpage) {
    setPage(1);
  }

};

const toggleColumn = (column, nometd, elemento, nometable, columnsToExclude, setColumnsToExclude, showRow, setShowRow) => {
  const table = document.querySelector(`#${nometable}`);
  const tbody = table.querySelector('tbody');
  const thead = table.querySelector('thead');

  const element = elemento.currentTarget.querySelector('svg.lucide.lucide-square');
  const element2 = elemento.currentTarget.querySelector('svg.lucide.lucide-plus-square');

  if (columnsToExclude.includes(nometd)) {
    element.style.display = 'block';
    element2.style.display = 'none';
    setColumnsToExclude(columnsToExclude.filter((c) => c !== nometd));
    setShowRow(showRow.filter((item) => item !== nometd));
    thead.querySelector(`tr th:nth-child(${column})`).style.display = 'table-cell';
  } else {
    element.style.display = 'none';
    element2.style.display = 'block';
    setColumnsToExclude([...columnsToExclude, nometd]);
    setShowRow([...showRow, nometd]);
    thead.querySelector(`tr th:nth-child(${column})`).style.display = 'none';
  }
  tbody.querySelectorAll(`td.${nometd}`).forEach((td) => {
    td.style.display == 'none' ? (td.style.display = 'table-cell') : (td.style.display = 'none');
  });
};




const handleCopyRow = (nometable, dataItem, total, querysave, results, setPage, page, itemsPerPage) => {


  const newRow = [{
    nome_item: dataItem.nome_item,
    qtd: dataItem.qtd,
    data: dataItem.data,
    hora: dataItem.hora,
    local: dataItem.local,
    rp: dataItem.rp,
    responsavel: dataItem.responsavel,
    obs: dataItem.obs,
  }
  ];
  if (results.length >= itemsPerPage) {
    setPage(page + 1);

  }
  querysave({ tableName: nometable, rows: newRow });
  // querysave({nometable:nometable,dataItem:dataItem});


};

const handleDelete = (nometable, id,) => {
  deletequeryid({ nometable: nometable, id: id });

  if (results.length == 1 && page > 1) {

    setPage(page - 1)
  }
  const now = new Date();

  // Obtém a hora atual
  const hours = now.getHours();

  // Obtém os minutos atuais
  const minutes = now.getMinutes();
  const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  // sendDataToParent(dataItem, nometable, page, time);
  //  setNotifications(notifications => [
  //   ...notifications,
  //   { id: uuidv4(), title: 'Sucesso', message: `Item ${dataItem.id} deletado com sucesso`, visible: true },
  // ]);

}

const handleOrder = (field, elemento, nometable, page, itemsPerPage, order, search, setOrder, mutateAsync) => {
  setOrder([field, order[1] == 'ASC' ? 'DESC' : 'ASC']);
  mutateAsync({ nometable: nometable, page: page, search: search, itemsPerPage: parseInt(itemsPerPage), order: [field, order[1] == 'ASC' ? 'DESC' : 'ASC'] });
  document.querySelectorAll('.thclass').forEach((elemento) => {
    elemento.getElementsByTagName('svg')[0].style.clipPath = 'none';
  });
  // elemento.target.getElementsByTagName('svg')[0].style.clipPath = 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)';
  order[1] == 'DESC' ? elemento.currentTarget.getElementsByTagName('svg')[0].style.clipPath = 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' : elemento.currentTarget.getElementsByTagName('svg')[0].style.clipPath = 'polygon(0 0, 100% 0, 100% 50%, 0 50%)';

};

const toggleMoreInfo = (index, elemento, moreInfoStates, setMoreInfoStates) => {

  const td = document.querySelector(`tr td:nth-child(${index})`);
  // moreInfoStates.includes(index) ? td.getElementsByTagName('div')[0].getElementsByTagName('svg')[1].style.display = 'none' : td.getElementsByTagName('div')[0].getElementsByTagName('svg')[0].style.display = 'none';
  // moreInfoStates.includes(index) ? td.getElementsByTagName('div')[0].getElementsByTagName('svg')[0].style.display = 'block' : td.getElementsByTagName('div')[0].getElementsByTagName('svg')[1].style.display = 'block';
  const elementos = elemento.currentTarget.getElementsByTagName('div')[0].getElementsByTagName('svg');
  elementos[0].style.display = elementos[0].style.display === 'none' ? 'block' : 'none';
  elementos[1].style.display = elementos[1].style.display === 'block' ? 'none' : 'block';

  setMoreInfoStates(prevState => {
    if (prevState.includes(index)) {
      // Se o índice já está presente, remova-o para fechar os detalhes
      return prevState.filter(i => i !== index);
    } else {
      // Se o índice não está presente, adicione-o para abrir os detalhes
      return [...prevState, index];
    }
  });
};

const handlePageChange = (number, page, itemsPerPage, total, setPage, setMoreInfoStates, setSelectedRowIndex) => {
  const totalPages = Math.ceil(total / itemsPerPage);
  if (page + number < 1 || page + number > totalPages) {
    return;
  }
  setPage(page + number);

  setMoreInfoStates([]);
  setSelectedRowIndex(null);
  document.querySelectorAll('.tdMore').forEach((elemento) => {
    elemento.getElementsByTagName('div')[0].getElementsByTagName('svg')[0].style.display =
      elemento.getElementsByTagName('div')[0].getElementsByTagName('svg')[0].style.display = 'block';
    elemento.getElementsByTagName('div')[0].getElementsByTagName('svg')[1].style.display = 'none';
  })
}

const handleCellEdit = (nometable, dataItem, field, value, queryupdate, results, setCurrentStep, currentStep) => {

  results.map((item) => {
    if (item.id === dataItem.id) {
      item[field] = value;
    }
    if (field == 'nome_item' && value.toLowerCase() == 'uepa') {
      setCurrentStep(currentStep + 1)
    }
    if (field == 'responsavel' && value.toLowerCase() == 'uepa') {
      setCurrentStep(currentStep + 1)
    }
    return item;
  }
  );

  queryupdate({ nometable: nometable, dataItem: dataItem, valor: value, campo: field });
};




const handleDataUpdate = (numrow, nometable, total, querysave, results, itemsPerPage, setPage, page) => {
  const newRows = []; // Preparar um array para novas linhas
  for (let i = 0; i < numrow; i++) {
    const date = new Date();
    const formattedHour = ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2);
    const newRow = {
      nome_item: '',
      qtd: '',
      data: date.toISOString().split('T')[0],
      hora: formattedHour,
      local: '',
      rp: '',
      responsavel: '',
      obs: '',
    };
    newRows.push(newRow); // Adiciona a nova linha ao array
  }

  if (results.length + numrow > itemsPerPage) { // Checa se deve mudar de página com base na adição de novas linhas
    setPage(page + 1);
  }

  querysave({ tableName: nometable, rows: newRows }); // Chama querysave uma única vez com todas as novas linhas
}
const handleSeatch = (elemento, setPage, setSearch, results) => {
  setPage(1);
  setSearch(elemento);
  if (results.length == 0) {
    setPage(1);

  }
}
export { handleCopyRow, handleDelete, handleOrder, handlePageChange, toggleColumn, toggleMoreInfo, handleCellEdit, handleDataUpdate, handleSeatch, handlePerPage };
