import React from "react";
import styled from "styled-components";
import uepa from "./assets/img/uepa.png";
import { useNavigate } from "react-router-dom";

const Input = styled.input`
    
    border: 1px solid #373737;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    font-family: ${(props) => props.theme.font};
    font-size: ${(props) => props.theme.fontSize};
    border-radius: 5px;
    padding: 5px;
    margin-top: 10px;
    text-align: left;
    &:focus {
        outline: 1px solid #8f8e8e;
    }
    `;

const Button = styled.button`
    margin-top: 10px;
    width: 100px;
    align-self: center;
    cursor: pointer;
    border: 1px solid #373737;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    font-size: ${(props) => props.theme.fontSize};
    font-family: ${(props) => props.theme.font};
    padding: 5px;
    border-radius: 5px;

    &:hover {
                background-color: ${(props) => props.theme.hover};
            }
    `;
const Box = styled.div`
    display: flex;
    flex-direction: column;
    
    justify-content: flex-start;
    label{
        margin-bottom: 5px;
        align-self: flex-start;
        text-align: left;
        font-family: ${(props) => props.theme.font};
        font-size: ${(props) => props.theme.fontSize};
        color: ${(props) => props.theme.color};
    }
    `;


const BoxMain = styled.div`
    margin-top: 30vh;
    margin-left: 40vw;
   display: flex;
    flex-direction: column;
    width: 160px;
  
    border-radius: 5px;
    justify-content: center;
    h1{
        text-align: left;
        font-family: ${(props) => props.theme.font};
        font-size: ${(props) => props.theme.fontSize};
        color: ${(props) => props.theme.color};
        font-weight: bolder;
    }
  form{
        display: flex;
        flex-direction: column;
        
  }
  label{
    margin-top: 3px;
    margin-left: 3px;
    color : ${(props) => props.theme.color};
    font-size: ${(props) => props.theme.fontSize};
    font-family: ${(props) => props.theme.font};

  }
  div{
    display: flex;
    flex-direction: row;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
  }
        
    
    `;


const Logando = () => {
    const ip = window.location.hostname;
    const [usuario, setUsuario] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [erro, setErro] = React.useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/select/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: usuario,
                senha: senha
            })
        })
            .then(response => response.json())
            .then(data => {

                if (data[0].total > 0) {
                    localStorage.setItem('user', 'true');

                    localStorage.setItem('nome', data[0].nome);

                    navigate("/");
                }
                else {
                    setErro('Usuario ou senha errada');
                }


            });
    };
    return (
        <BoxMain>

            <div><h1>Login</h1><img src={uepa} width={50}></img></div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Input type="text" placeholder="Nome do Usuario" required value={usuario} onChange={(e) => { setUsuario(e.target.value) }} />
                <Input type="password" placeholder="Senha" required value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                {erro && <label>{erro}</label>}
                <Button type="submit">Entrar</Button>
            </form>

        </BoxMain>
    );
};

export default Logando;