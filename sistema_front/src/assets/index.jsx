import Inter from './fonts/Inter-4.0/web/InterDisplay-Medium.woff2';

import { createGlobalStyle } from 'styled-components';



const GlobalStyle = createGlobalStyle`



@font-face {
  font-family: 'Inter';
  src: url(${Inter}) format('woff2');
  font-weight: 500;
  font-style: normal;
}
 body{
  color: ${(props) => props.theme.color};
  

 }


:root {
  line-height: 1.5;
  font-weight: 400;
  color-scheme:${(props) => props.theme.webkitcolor};
  background-color:  ${(props) => props.theme.background};
  
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.ag-theme-quartz {
  --ag-font-size :${(props) => props.theme.fontSize};
  --ag-font-family : "Inter", sans-serif;

  --ag-border-radius: 5px;
}
.ag-theme-quartz-dark{
  --ag-font-size :${(props) => props.theme.fontSize};
  --ag-border-radius: 5px;

}
.ag-theme-alpine{
  --ag-font-size :${(props) => props.theme.fontSize};

}
.ag-theme-alpine-dark{
  --ag-font-size :${(props) => props.theme.fontSize};
  --ag-border-radius: 5px;

}
.ag-theme-material{
  --ag-font-size :${(props) => props.theme.fontSize};
  --ag-border-radius: 5px;
}

.ag-theme-balham{
  --ag-font-size :${(props) => props.theme.fontSize};
  --ag-border-radius: 5px;
}
.ag-theme-balham-dark{
  --ag-font-size :${(props) => props.theme.fontSize};
  --ag-border-radius: 5px;
}
svg{
  color: ${(props) => props.theme.color};  
  width: ${(props) => props.theme.svgSize};
}
button.tooltip {
  position: relative;
  cursor: pointer;
}

button.tooltip:hover::after {
  content: attr(title);
  display: block;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 999;
}
@media (min-width: 800px) {
  .lbdevice{
    display: none;
  }
}
@media (max-width: 800px) {
  #material_limpeza{
      border: none;
      
    th{
      display: none;
    }
    td{
      display: flex;
      
      input{
        text-align: left;
      }
    }
   
  /* Alinha à direita */
}
  
}


`;

export default GlobalStyle;