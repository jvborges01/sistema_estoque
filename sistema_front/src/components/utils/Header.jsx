import React, { useState } from "react";
import uepa from "../../assets/img/uepa.png";
import uepablack from "../../assets/img/uepa_black.png";
import styled from 'styled-components';
import { X, Settings2, UserX, ArrowDown, ChevronsUpDown, Table, Book, Dice4, Network, ChevronDown, AlignJustify, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../ThemeProvider";
import { useTour } from "@reactour/tour";
import { Button, Dialog, Div } from "./Div";
import Footer from "./Footer";

const Hr = styled.header`

display: flex;
align-items: center;
border-radius: 10px;
height: 45px;
background-color: ${(props) => props.theme.buttoncolor};
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
padding: 10px;

display: flex;
justify-content: space-between;

 
#logo{
  background-size: contain;
  background-repeat: no-repeat;
  width: 100px;
  height: 100%;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
}


`;
const Setting = styled.div`
  &.slidebar {
    
 position: fixed;
 top: 0;
right: 0;
padding: 20px;
 width: 250px;
 height: 100%;
 background-color: ${(props) => props.theme.buttoncolor};
 border: 1px solid #3737375a;
 box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
 color: ${(props) => props.theme.color};
 font-family: ${(props) => props.theme.font};
 /* Inicialmente fora da tela usando transform para uma melhor performance de animação */
 transform: translateX(100%);
 transition: transform 0.4s ease-in-out; /* Suaviza a animação de entrada e saída */
 z-index: 4; /* Animação de entrada e saída */
 
}
&.slidebar.active {
 transform: translateX(0);

}
#back{
  display: flex;
  align-items: center;
  justify-content: space-between;
  span{
      &:nth-child(1){
      
      
      color : ${(props) => props.theme.color};
      }
     
    }
}
  #info{
    margin-top: 60px;
   
   row-gap: 10px;
   display: flex;
   flex-direction: column;
  
    
    span{
      text-align: left;

      
      color: ${(props) => props.theme.color};
    }
    label{
      text-align: left;
      
      
      color: ${(props) => props.theme.color};
    }
    #theme, .font {
  display: flex;
  align-items: center;
  align-content: flex-start;
  justify-content: space-between;
  position: relative;
  padding: 5px;

  button {
    font-family: ${(props) => props.theme.font};
  font-size: ${(props) => props.theme.fontSize};
    
    color: ${(props) => props.theme.color};
    border: 1px solid #2f2f2f;
    padding: 5px;
    border-radius: 5px;

    &:hover {
      background-color: ${(props) => props.theme.hover};
      color: white; /* Adicionado para melhor visibilidade no hover */
    }
  }

  input[type="checkbox"] {
     /* Define a cor da borda do checkbox */
    -webkit-appearance: none; /* Desabilita o estilo padrão */
    appearance: none;
    width: 20px; /* Largura do checkbox */
    height: 20px; /* Altura do checkbox */

    border: 1px solid #1b1b1c;
    border-radius: 3px; /* Arredondamento da borda do checkbox */
    cursor: pointer; /* Muda o cursor para indicar que é clicável */
    position: relative; /* Necessário para posicionar os pseudo-elementos */
    
    &:checked {
      background-color: transparent; /* Cor de fundo quando o checkbox está marcado */
    }

    &:checked::before,
    &:checked::after {
      content: '';
      position: absolute;
      background-color: ${(props) => props.theme.color}; /* Cor do "X" */
      height: 2px; /* Espessura do "X" */
    }

    &:checked::before {
      width: 70%; /* Largura do "X" */
      top: 50%;
      left: 15%;
      transform: translateY(-50%) rotate(45deg);
    }

    &:checked::after {
      width: 70%; /* Largura do "X" */
      top: 50%;
      left: 15%;
      transform: translateY(-50%) rotate(-45deg);
    }

    &:focus {
      outline: none; /* Remove o contorno ao focar para uma aparência customizada */
    }
  }
}

#save{
  margin-top: 10px;
  align-self: center;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #1b1b1c;
  

  color: #c0b6b6;
} 

  }
`;


const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { selectDimension } = useTheme();
  const { selectClassTheme } = useTheme();
  const modal = document.querySelector('.slidebar');
  const { setIsOpen, nextButton } = useTour();
  const [onsettings, setOnsettings] = useState([]);
  const [onsetpage, setOpsetpage] = useState(false);
  function openModal(modal) {
    if (modal === 'setpage') {
      setOpsetpage(!onsetpage);
      const modal = document.querySelector('#dxsetpoint');

      onsetpage == false ? modal.classList.add('active') : modal.classList.remove('active');
    }
    else {
      setOpen(!open);
      const modal = document.querySelector('.slidebar');
      const backdrop = document.querySelector('.backdrop');
      open == false ? modal.classList.add('active') : modal.classList.remove('active');
    }

  }


  return (
    <>
      <Hr>

        <Div id="setpage">
          <Button onClick={() => { openModal('setpage') }}>
            <AlignJustify />
          </Button>
          <Dialog id='dxsetpoint' open={onsetpage} className='dialog'>
            <div style={{ display: 'flex', alignItems: 'center' }}><Table /><span onClick={() => { openModal() }}>System</span></div>
            <div style={{ display: 'flex', alignItems: 'center' }}><Book /><span onClick={() => { openModal() }}>Documentos</span></div>
          </Dialog>
        </Div>

        <Div id="logo">
          <img src={localStorage.getItem('class') === 'ag-theme-material' ? uepablack : uepa} alt="UEPA" width={115} />
        </Div>

        <Div id='bxprofile'>
          <Button onClick={() => { openModal() }}>
            <Settings2 />
          </Button>
          <Button onClick={() => { localStorage.setItem('user', 'false'), navigate("/login") }}>
            <UserX />
          </Button>
          <Setting className='slidebar'>

            <div id='back'>
              <span>Edit profile</span> <Button onClick={() => { openModal() }}><X size={15}></X></Button>
            </div>

            <div id="info">
              <div className='font'><span>Usuario:</span><span>{localStorage.getItem('nome')}</span></div>
              <Div className='font'>
                <span>Tema</span>
                <div>
                  <Button onClick={() => { onsettings === 'theme' ? setOnsettings(null) : setOnsettings('theme') }}>Material</Button>
                  <Dialog id="dxtheme" open={onsettings === 'theme'} style={{ display: `${onsettings == 'theme' ? 'block' : 'none'}` }}>

                    <span onClick={() => { selectClassTheme('ag-theme-material') }}>Material</span>
                    <span onClick={() => { selectClassTheme('ag-theme-quartz-dark') }}>Quartz</span>
                    <span onClick={() => { selectClassTheme('ag-theme-alpine-dark') }}>Alpine</span>
                    <span onClick={() => { selectClassTheme('ag-theme-balham-dark') }}>Balham</span>

                  </Dialog>
                </div>
              </Div>

              <Div className='font'>
                <span>Dimensão</span>
                <div>
                  <Button onClick={() => { onsettings === 'dimension' ? setOnsettings(null) : setOnsettings('dimension') }}>{sessionStorage.getItem('dimension')}</Button>
                  <Dialog id="dxdimension" open={onsettings === 'dimension'} style={{ display: `${onsettings == 'dimension' ? 'block' : 'none'}` }}>
                    <span onClick={() => { selectDimension('Pequeno') }}>Pequeno</span>
                    <span onClick={() => { selectDimension('Normal') }}>Normal</span>
                    <span onClick={() => { selectDimension('Grande') }}>Grande</span>
                  </Dialog>
                </div>

              </Div>

            </div>
          </Setting>
        </Div>


      </Hr>
     
    </>
  )
}
export default Header