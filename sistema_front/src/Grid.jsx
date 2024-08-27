import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import React, { useState, useRef, useCallback, useEffect } from 'react'; // React


import { keepPreviousData, useQuery } from '@tanstack/react-query';


import { UpdateRow } from './components/functions/DataMutate';
import { DeleteRow } from './components/functions/DataMutate';
import { SaveRow } from './components/functions/DataMutate';
import Header from './components/utils/Header';
import { useTheme } from 'styled-components';
import { Button, Dialog, Div, Input } from './components/utils/Div';
import { CheckSquare, CheckSquare2, ChevronDown, ChevronsUpDown, Circle, File, FileText, Plus, Square, Trash } from 'lucide-react';
import { useHotkeys } from 'react-hotkeys-hook';

import TableToPdf from './Pdf';
import Footer from './components/utils/Footer';


const Grid = () => {
    const gridRef = useRef();

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState(["id", "ASC"]);
    const [nometable, setNometable] = useState("hidraulico");
    const [dxsetpage, setDxsetpage] = useState(false);
    const [rowData, setRowData] = useState([{}]);
    const [iconState, setIconState] = useState([]);
    const [onsetpages, setOnsetpages] = useState(false);
    const [count, setCount] = useState(0);
    const { classTheme } = useTheme();
    const { queryupdate } = UpdateRow();
    const { querysave } = SaveRow();
    const { deletequeryid } = DeleteRow();
    const [originalRowData, setOriginalRowData] = useState([]);
    const [fileName, setFileName] = useState('Escolha um arquivo');
    const [tableData, setTableData] = useState([]);
    const [generatePdf, setGeneratePdf] = useState(false);
    const [showPdf, setShowPdf] = useState(false);
    // Atualize esta função conforme necessário para coletar os dados atuais do grid
    const handleGeneratePdf = () => {
        const currentData = collectGridData(); // Substitua pela sua lógica de coleta de dados
        setTableData(currentData);
        setGeneratePdf(true); // Permite a geração do PDF
    };
    const togglePdfView = () => setShowPdf(!showPdf);
    const fetchProjects = async ({ queryKey }) => {
        // Extrai os parâmetros da chave da query

        const response = await fetch(`http://localhost:3000/api/select/${nometable}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        const data = await response.json();
        setRowData(data);
        setOriginalRowData(data);
        return data;
    };
    const onFilterTextBoxChanged = useCallback(() => {
        gridRef.current.api.setGridOption(
            'quickFilterText',
            document.getElementById('filter-text-box').value
        );
    }, []);


    function addNewRow() {
        const newId = rowData.length + 1; // Exemplo simples para gerar um novo ID
        const tempo = new Date();
        const formattedHour = ("0" + tempo.getHours()).slice(-2) + ':' + ("0" + tempo.getMinutes()).slice(-2);
        const newRow = { id: newId, nome_item: '', qtd: '', data: tempo.toISOString().split('T')[0], hora: formattedHour, local: '', rp: '', responsavel: '', obs: '' };
        // setRowData([...rowData, newRow]);
        querysave({ tableName: nometable, rows: [newRow] });

    };
    const { isPending, isError, error, data, isFetching, isSuccess, isPlaceholderData } = useQuery({
        queryKey: ['data', nometable, page, search, itemsPerPage, order],
        queryFn: fetchProjects,

        refetchOnWindowFocus: false
    });
    let gridApi;
    const results = data || [];
    const undoRedoCellEditing = true;
    const undoRedoCellEditingLimit = 20;

    function buttonRenderer(e) {
        // put the value in a span

        return (
            <div>
                <button onClick={() => deletequeryid({ nometable: nometable, id: e.data.id })}>
                    Delete
                </button>
                <button onClick={() => CopyRow(e.data)}>
                    Copy
                </button>
            </div>
        );
    }
    class TimePicker {
        init(params) {
            this.eInput = document.createElement('input');
            this.eInput.setAttribute('type', 'time'); // Define o tipo do input como 'time'
            this.eInput.value = this.convertToTimeValue(params.value);

            // Não é necessário converter a data, pois estamos trabalhando com horários.
            // O formato esperado é "HH:MM" ou "HH:MM:SS" para navegadores que suportam segundos.
        }

        getGui() {
            return this.eInput;
        }

        afterGuiAttached() {
            this.eInput.focus();
            // Nota: 'select' não é aplicável para inputs do tipo 'time'.
        }

        getValue() {
            // Retorna o valor do input, que será um horário no formato "HH:MM" ou "HH:MM:SS"
            return this.eInput.value;
        }

        isPopup() {
            return true;
        }

        convertToTimeValue(dateTimeValue) {
            // Esta função pode converter uma string dateTime ou um objeto Date para um horário no formato "HH:MM"
            // Se o valor já estiver no formato de horário, ele será retornado diretamente.
            if (!dateTimeValue) return '';

            const date = new Date(dateTimeValue);
            const isValidDate = !isNaN(date.getTime());

            if (isValidDate) {
                let hours = date.getHours().toString().padStart(2, '0');
                let minutes = date.getMinutes().toString().padStart(2, '0');
                // Opcional: inclua segundos se necessário
                // let seconds = date.getSeconds().toString().padStart(2, '0');
                return `${hours}:${minutes}`; // Ou `${hours}:${minutes}:${seconds}` para incluir segundos
            }
            // Retorna o valor original caso não seja uma data válida (espera-se que esteja no formato correto)
            return dateTimeValue;
        }
    }
    class DatePicker {
        init(params) {
            this.eInput = document.createElement('input');
            this.eInput.setAttribute('type', 'date'); // Define o tipo do input como 'date'
            this.eInput.value = params.value;

            // Opcional: Converter a data para o formato apropriado (YYYY-MM-DD), se necessário
            // Isso é necessário porque o valor de um input do tipo 'date' deve estar neste formato
            if (params.value) {
                const date = new Date(params.value);
                const formattedDate = date.toISOString().split('T')[0];
                this.eInput.value = formattedDate;
            }
        }

        getGui() {
            return this.eInput;
        }

        afterGuiAttached() {
            this.eInput.focus();
            // Note que 'select' não funciona para inputs do tipo 'date',
            // então você pode querer remover ou ajustar este comportamento
        }

        getValue() {
            // Você pode querer converter o valor de volta para o formato desejado antes de retornar
            return this.eInput.value;
        }

        isPopup() {
            return true;
        }
    }



    const handleCellEdit = (event) => {
        const { data } = event;
        if (event.value !== event.oldValue) {
            queryupdate({ nometable: nometable, id: event.data.id, campo: event.colDef.field, valor: event.value });
        }

        const moreInfo = (e) => {
            const row =
                [{ field: 'responsavel', value: 'teste' }];
            setRowData([...rowData, row]);
        }
    }
    const gridOptions = {
        columnDefs: [
            { width: 60, checkboxSelection: true, editable: false, flex: 0 },
            { field: "id", width: 60, editable: false, flex: 0, headerName: 'ID' },
            { field: "nome_item", width: 150, flex: 1, headerName: 'Nome' },
            { field: "qtd", width: 70, flex: 1, headerName: 'Qtd' },
            { field: "data", width: 170, cellEditor: DatePicker, flex: 1, headerName: 'Data' },
            { field: "hora", width: 110, cellEditor: TimePicker, flex: 1, headerName: 'Hora' },
            { field: "local", width: 150, flex: 1, headerName: 'Local' },
            { field: "rp", width: 150, flex: 1, headerName: 'Rp' },
            { field: "responsavel", width: 150, flex: 1, headerName: 'Responsavel' },
            { field: "obs", width: 90, flex: 1, headerName: 'Obs' },

            // { field: "responsavel", width: 150,flex:1 },
            // { field: "obs", width: 90,flex:1 },

        ],
        defaultColDef: {

            minWidth: 30,
            editable: true,
            resizable: true,
            sortable: true,
            filter: true,
            filterParams: {

                buttons: ['reset', 'apply'],
                closeOnApply: true,
            },
        },

        rowData: results,
        rowSelection: 'multiple',

        // Adiciona um ouvinte para o evento 'rangeSelectionChanged'

    };



    function makeRequest(method, url, success, error) {
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", url, true);
        httpRequest.responseType = "arraybuffer";

        httpRequest.open(method, url);
        httpRequest.onload = function () {
            success(httpRequest.response);
        };
        httpRequest.onerror = function () {
            error(httpRequest.response);
        };
        httpRequest.send();
    }

    // read the raw data and convert it to a XLSX workbook
    function convertDataToWorkbook(dataRows) {
        /* convert data to binary string */
        var data = new Uint8Array(dataRows);
        var arr = [];

        for (var i = 0; i !== data.length; ++i) {
            arr[i] = String.fromCharCode(data[i]);
        }

        var bstr = arr.join("");

        return XLSX.read(bstr, { type: "binary" });
    }

    function importExcel(event) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                populateGrid(workbook);
            };
            reader.readAsBinaryString(file);
        }
    }

    function populateGrid(workbook) {
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const newData = XLSX.utils.sheet_to_json(worksheet);

        // Determine o maior ID atual na tabela.
        const currentMaxId = rowData.reduce((maxId, item) => {
            return item.id && item.id > maxId ? item.id : maxId;
        }, 0);

        // Ajuste os IDs dos novos dados.
        const updatedNewData = newData.map((item, index) => ({
            ...item,
            // Atribui novos IDs começando do próximo valor após o maior ID atual.
            // Certifique-se de que a coluna ID no seu Excel está formatada para permitir IDs numéricos.
            id: currentMaxId + index + 1,
        }));

        // Combine os dados existentes com os novos dados.
        // Isso assume que você deseja manter os dados existentes e apenas adicionar novos itens.
        const combinedData = [...rowData, ...updatedNewData];

        // Atualiza o estado rowData com os novos dados ajustados.
        querysave({ tableName: nometable, rows: updatedNewData });
    }

    function CopyRow(data) {

        const newRows =
        {
            id: rowData.length + 1,
            nome_item: data.nome_item,
            qtd: data.qtd,
            data: data.data,
            hora: data.hora,
            local: data.local,
            rp: data.rp,
            responsavel: data.responsavel,
            obs: data.obs
        }
            ;
        console.log(newRows);
        querysave({ tableName: nometable, rows: newRows });
    }
    let clipboardRows = [];
    function handleKeyDown(e) {

        const { ctrlKey, key } = e.event;
        if (ctrlKey && key.toLowerCase() === 'c') {
            e.event.preventDefault();
            pasteFromClipboard();
        }
        if (e.event.key === 'Delete') {
            deleteSelectedRows();

        }


    }

    function pasteFromClipboard() {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        console.log(selectedNodes);
        clipboardRows = selectedNodes.map(node => node.data);

        if (clipboardRows.length > 0) {
            const newRows = clipboardRows.map(row => ({
                ...row,
                id: Math.max(...rowData.map(r => r.id)) + 1,
                responsavel: '',
                rp: ''
            }));
            querysave({ tableName: nometable, rows: newRows });
        }
    }
    function deleteSelectedRows() {
        const selectedNodes = gridRef.current.api.getSelectedNodes();
        const rowsToRemove = selectedNodes.map(node => node.data);

        const idsToRemove = rowsToRemove.map(row => row.id);

        try {
            deletequeryid({ tableName: nometable, ids: idsToRemove });
        } catch (error) {
            console.error("Erro ao deletar linhas: ", error);
        }
    }

    function openModal() {
        setOnsetpages(!onsetpages)
        const modal = document.querySelector('#dxsetpage');
        onsetpages == false ? modal.classList.add('active') : modal.classList.remove('active');
    }
    function irParaPagina(number) {
        const paginaAtual = gridRef.current.api.paginationGetCurrentPage();
        gridRef.current.api.paginationGoToPage(paginaAtual + number);
    }
    useHotkeys('shift+1', () => addNewRow());
    useHotkeys('ctrl+i', () => { tabelas[count] == tabelas[tabelas.length - 1] ? setCount(0) : setCount(count + 1), setNometable(tabelas[count]) });

    const tabelas = ['eletrico', 'expediente', 'moveis', 'limpeza', 'hidraulico'];

    const toggleColumn = (columnToExclude) => {

        const isCurrentlyIncluded = iconState.includes(columnToExclude);
        const newIconState = isCurrentlyIncluded
            ? iconState.filter(i => i !== columnToExclude)
            : [...iconState, columnToExclude];


        setIconState(newIconState);

        if (!isCurrentlyIncluded) {

            setRowData(currentData =>
                currentData.map(row => {
                    const { [columnToExclude]: removed, ...newRow } = row;
                    return newRow;
                })
            );
        } else {

            setRowData(originalRowData);
        }

        gridRef.current.api.setColumnsVisible([columnToExclude], isCurrentlyIncluded);
    };


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? file.name : 'Escolha um arquivo');

    };
    const generatePdfAndOpenInNewTab = (b) => {
        var visible = gridRef.current.api.getAllDisplayedVirtualColumns();
        var columns = visible.map((column) => column.colId);
        columns.shift();
        var all = gridRef.current.api.getModel().rowsToDisplay;
        // var data = all.map(row => row.data).filter(item => {
        //     var obj = {};
        //     columns.forEach((column) => {
        //         // Atribui diretamente o valor da coluna ao objeto, sem substituir valores não definidos por uma string vazia
        //         obj[column] = .data[column];
        //     });
        //     return obj
        // });
        var data = all.map((row) => {
            var obj = {};
            columns.forEach((column) => {

                obj[column] = row.data[column];
            });
            return obj;
        });

        setTableData(data);
        setTimeout(() => {
            setShowPdf(false);
        }, 3000);
        togglePdfView();

    };

    return (
        <>
            <Header></Header>
            <Div id='dvsettable'>
                <Button onClick={() => openModal()}>{nometable}<ChevronDown onClick={() => openModal()} /></Button>
                <Dialog id='dxsetpage' className='dialog'>


                    <span value="hidraulico" onClick={() => setNometable('hidraulico')}>Hidraulico</span>
                    <span value="eletrico" onClick={() => setNometable('eletrico')} >Eletrico</span>
                    <span value="expediente" onClick={() => setNometable('expediente')}>Expediente</span>
                    <span value="moveis" onClick={() => setNometable('moveis')}>Moveis</span>
                    <span value="limpeza" onClick={() => setNometable('limpeza')}>Limpeza</span>
                </Dialog>

            </Div>

            <Div
                id='theme-selector'
                className={localStorage.getItem('class')}// applying the grid theme
                style={{ height: 400 }} // the grid will fill the size of the parent container
            >

                <Div className={'tools'}>
                    <div>

                        <Input
                            type="text"
                            id="filter-text-box"
                            placeholder="Pesquisar..."
                            onInput={onFilterTextBoxChanged}
                            aria-label='Pesquisar'
                        />
                        {/* <button title='teste' onClick={() => toggleColumn(['nome_item'], false)} aria-labelledby='Butoon'>Ocultar Coluna Nome</button>
                        <button onClick={() => toggleColumn(['nome_item'], true)}>Mostrar Coluna Nome</button> */}

                    </div>

                    <Div id='files'>

                        <div>
                            <span title='PDF' onClick={generatePdfAndOpenInNewTab}><FileText /></span>
                            {showPdf == true && <TableToPdf tableData={tableData} tabela={nometable} />}


                            <Input className='inputfile'

                                type='file'
                                id='file'
                                onChange={() => importExcel(event)}
                                style={{ marginBottom: '5px' }}
                            />
                            <label htmlFor="file" title='Escolha um arquivo'><File /></label>
                        </div>

                        <div>
                            <span onClick={() => deleteSelectedRows()}><Trash /></span>
                            <span onClick={() => addNewRow()}><Plus /></span>
                        </div>
                    </Div>
                    <Div id='dvcolumns'>
                        <Button id='btcolums' onClick={() => setDxsetpage(!dxsetpage)}>Filtrar <ChevronsUpDown /></Button>
                        <Dialog id='dxcolums' className='dialog' open={dxsetpage} style={{ display: `${dxsetpage == true ? 'block' : 'none'}` }}>

                            <div className='columns' onClick={() => toggleColumn('nome_item')}><span>Nome</span>{iconState.includes('nome_item') ? <Square /> : <CheckSquare2 fill={'#007bff'} />}</div>
                            <div className='columns' onClick={() => toggleColumn('qtd')}><span>Qtd</span>{iconState.includes('qtd') ? <Square /> : <CheckSquare2 fill={'#007bff'} />}</div>
                            <div className='columns' onClick={() => toggleColumn('data')}><span>Data</span>{iconState.includes('data') ? <Square /> : <CheckSquare2 fill={'#007bff'} />}</div>
                            <div className='columns' onClick={() => toggleColumn('hora')}><span>Hora</span>{iconState.includes('hora') ? <Square /> : <CheckSquare2 fill={'#007bff'} />}</div>
                            <div className='columns' onClick={() => toggleColumn('local')}><span>Local</span>{iconState.includes('local') ? <Square /> : <CheckSquare2 fill={'#007bff'} />}</div>
                            <div className='columns' onClick={() => toggleColumn('rp')}><span>Rp</span>{iconState.includes('rp') ? <Square /> : <CheckSquare2 fill={'#007bff'} />}</div>
                            <div className='columns' onClick={() => toggleColumn('responsavel')}><span>Responsavel</span>{iconState.includes('responsavel') ? <Square /> : <CheckSquare2 fill={'#007bff'} />}</div>
                            <div className='columns' onClick={() => toggleColumn('obs')}><span>Obs</span>{iconState.includes('obs') ? <Square /> : <CheckSquare2 fill={'#007bff'} />}</div>


                        </Dialog>
                    </Div>


                </Div>
                <AgGridReact
                    gridId='grid-id'
                    ref={gridRef}
                    pagination={true}
                    paginationPageSizeSelector={[10, 20, 50, 100]}
                    paginationPageSize={10}
                    rowData={results}
                    undoRedoCellEditing={undoRedoCellEditing}
                    undoRedoCellEditingLimit={undoRedoCellEditingLimit}
                    gridOptions={gridOptions}
                    onCellKeyDown={handleKeyDown}

                    onCellEditingStopped={handleCellEdit}
                    suppressRowClickSelection={true}


                />
            </Div >

        </>
    );
}
export default Grid;