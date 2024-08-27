import { Minus } from "lucide-react";
import React, { useState, useEffect } from "react";
import styled from 'styled-components';

const Ts = styled.div`
      position: absolute;
    bottom: 35px;
    right: 20px;
    width: 300px;
    background-color: ${(props) => props.theme.background};
    padding: 15px;
    border: 1px solid #373737;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg{
        color: ${(props) => props.theme.color};
        cursor: pointer;
    }
    b{
        display: flex;
        width: 100%;
        text-align: right;
    
        
        color: ${(props) => props.theme.color};
    }
    #text{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        width: 100%;
        span{
            color: ${(props) => props.theme.color};
        }
        button{
            cursor: pointer;
            background-color: ${(props) => props.theme.background};
            border: 1px solid #373737;
            color: ${(props) => props.theme.color};
            padding: 5px;
            border-radius: 5px;
            &:hover{
            background-color: ${(props) => props.theme.hover};
            }
        }
    }

    /* Adicionando animações */
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    /* Aplicando as animações */
    &.fade-enter {
        animation: fadeIn 1s ease-in;
    }

    &.fade-exit {
        animation: fadeOut 1s ease-out;
    }
`;

const Toast = (props) => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        let timer;
        if (visible) {
            timer = setTimeout(() => {
                setVisible(false)

                // Chama a função onClick para esconder o toast após 3 segundos
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [visible, props.onClick]);

    return visible ? (
        <Ts className='fade-enter'>
            <b>{props.title}</b>
            <div id='text'>
                {props.children}
                <span>{props.message}</span>
                <button onClick={props.onClick}>Desfazer</button>
            </div>
        </Ts>
    ) : null;
};


export default Toast;