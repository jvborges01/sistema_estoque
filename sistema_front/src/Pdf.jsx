import React, { useRef } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, PDFViewer, BlobProvider, Font, Image } from '@react-pdf/renderer';
import uepa from './assets/img/brasaouepa.png';
// Estilos para o PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
    },
    pageid: {
        position: 'absolute',
        top: 550,
        right: 80,
        fontSize: 10,
        fontFamily: 'Times-Roman',


    },

    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        border: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        borderColor: '#000',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        borderBottom: 1,
        borderStyle: 'solid',
        borderRadius: 4,
        borderColor: '#000',
        padding: 10,
    },
    infos: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginRight: 10,
    },
    infosmid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginRight: 10,
        alignItems: 'center',

    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#305c9a',

    },
    textinfo: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 'auto',
        fontFamily: 'Times-Roman',
        color: '#fff',
    },
    img: {
        width: 50,
        height: 50,
        margin: 'auto',
    },
    text: {
        fontSize: 8,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 4,
        fontFamily: 'Times-Roman',

    },
    textmid: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 5,
        fontFamily: 'Times-Roman',

    },
    table: {
        display: 'table',
        width: 'auto',
        marginTop: 100,


    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    tableTh: {
        display: 'flex',
        flexDirection: 'row',
        margin: 'auto',
        borderTopWidth: 1,


    },
    id: {
        width: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#d1c8c8',
    },
    nome_item: {
        width: 80,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f3f3f3',

    },
    qtd: {
        width: 30,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f3f3f3',
    },
    data: {
        width: 60,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f3f3f3',
    },
    hora: {
        width: 40,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f3f3f3',
    },
    local: {
        width: 80,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f3f3f3',
    },
    rp: {
        width: 80,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f3f3f3',
    },
    responsavel: {
        width: 80,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f3f3f3',
    },
    obs: {
        width: 80,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f3f3f3',
    },
    tableColHeader: {
        width: 80,
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#f3f3f3',
    },
    tableCol: {
        width: 80,
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontFamily: 'Times-Roman',
    },
    tableCell: {
        margin: 'auto',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 8,
        fontFamily: 'Times-Roman',

    },
    tableHeader: {
        display: 'flex',
        margin: 'auto',
        marginTop: 5,
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 9,
        fontFamily: 'Times-Roman',


    }


    // tableColHeader: {
    //     width: 80,
    //     borderStyle: 'solid',
    //     borderWidth: 1,
    //     borderLeftWidth: 0,
    //     borderTopWidth: 0,
    //     backgroundColor: '#f3f3f3',
    // },
    // tableCol: {
    //     width: 80,
    //     borderStyle: 'solid',
    //     borderWidth: 1,
    //     borderLeftWidth: 0,
    //     borderTopWidth: 0,
    // },
    // tableCell: {
    //     margin: 'auto',
    //     marginTop: 5,
    //     marginBottom: 5,
    //     fontSize: 8,
    // },
    // Adicione mais estilos conforme necessário
});
const getColumnStyle = (colName) => {
    switch (colName) {
        case 'id':
            return styles.id;
        case 'nome_item':
            return styles.nome_item;
        case 'qtd':
            return styles.qtd;
        case 'data':
            return styles.data;
        case 'hora':
            return styles.hora;
        case 'local':
            return styles.local;
        case 'rp':
            return styles.rp;
        case 'responsavel':
            return styles.responsavel;
        case 'obs':
            return styles.obs;
        default:
            return null; // ou um estilo padrão, se necessário
    }
};
const DocumentoPDF = ({ tableData, tabela }) => {
    const linhasPorPagina = 20;
    const paginasDeDados = [];
    for (let i = 0; i < tableData.length; i += linhasPorPagina) {
        const paginaData = tableData.slice(i, i + linhasPorPagina);
        paginasDeDados.push(paginaData);
    }

    const horas = new Date().toLocaleTimeString();
    const data = new Date().toLocaleDateString();

    return (
        <Document>
            {paginasDeDados.map((dadosPagina, pageIndex) => (
                <Page key={pageIndex} size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <View style={styles.header}>
                            <div>
                                <Image source={uepa} style={styles.img}></Image>

                            </div>
                            <View style={styles.infosmid}>
                                <Text style={styles.textmid}>UEPA - Universidade do Estado do Pará</Text>
                                <Text style={styles.textmid}>Rua Mato Grosso, 137 – Setor Alto Paraná</Text>
                                <Text style={styles.textmid}>Campus XV</Text>
                            </View>
                            <View style={styles.infos}>
                                <Text style={styles.text}>Nome: {localStorage.getItem('nome')}</Text>
                                <Text style={styles.text}>Data: {data}</Text>
                                <Text style={styles.text}>Horas:{horas}</Text>
                                <Text style={styles.text}>Tabela: {tabela}</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textinfo}>Relatorio Tabela</Text>
                        </View>
                        <View style={styles.table}>
                            {pageIndex == 0 ?
                                <View style={styles.tableTh}>
                                    {Object.keys(dadosPagina[0]).map((col, index) => (
                                        <View key={index} style={getColumnStyle(col)}>
                                            <Text style={styles.tableHeader}>{col}</Text>
                                        </View>
                                    ))}
                                    <Text style={styles.pageid}>{pageIndex}</Text>
                                </View>
                                : <Text style={styles.pageid}>{pageIndex}</Text>}

                            {dadosPagina.map((row, rowIndex) => (
                                <View key={rowIndex} style={styles.tableRow}>
                                    {Object.keys(row).map((colKey, colIndex) => (
                                        <View key={colIndex} style={getColumnStyle(colKey)}>
                                            <Text style={styles.tableCell}>{row[colKey]}</Text>

                                        </View>

                                    ))}


                                </View>
                            ))}

                        </View>
                    </View>
                </Page>
            ))}
        </Document>
    )
}



const TableToPdf = ({ tableData, tabela }) => {
    // Função para abrir o PDF em uma nova aba assim que o blob estiver pronto
    const handleOnBlobReady = (blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };

    return (
        <div>
            {/* Renderize BlobProvider aqui para gerar o PDF e lide com o blob quando estiver pronto */}
            <BlobProvider document={<DocumentoPDF tableData={tableData} tabela={tabela} />}>
                {({ blob, url, loading, error }) => {
                    if (loading) {
                        return 'Carregando documento...';
                    }

                    if (blob) {
                        handleOnBlobReady(blob);

                    }

                    return <div>Baixar PDF</div>;
                }}
            </BlobProvider>
        </div>
        // <div>
        //     <PDFDownloadLink document={<DocumentoPDF tableData={tableData} />} fileName="relatorio.pdf">
        //         {({ blob, url, loading, error }) =>
        //             loading ? 'Carregando documento...' : 'Baixar PDF'
        //         }   
        //     </PDFDownloadLink>

        // </div>
    );
};

export default TableToPdf;
