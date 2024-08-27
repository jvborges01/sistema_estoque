import styled from "styled-components";
import uepa from "../../assets/img/uepa.png";
import uepablack from "../../assets/img/uepa_black.png";
const Div = styled.div`
position: relative;
font-size: ${(props) => props.theme.fontSize};
font-family: ${(props) => props.theme.font};
&#bxprofile{
    display: flex;
    gap: 5px;
}
&.tools{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3px;
}

&#theme-selector{
    margin-top: 10px;
    margin-top: 4%;
    justify-self: center;
}
&#dvsettable{
    margin-top: 3px;
}
&#files{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3px;
    gap: 5px;
}
&#logo{
    display: flex;
    align-items: center;
    justify-content: center;
    
}
&#files{
    gap: 20px;
    
    div{
        display: flex;
        align-items: center;
        gap: 5px;
        span{
            display: flex;
            align-items: center;
        }
        label{
            display: flex;
            align-items: center;
        
        }
    }
}
&.font{
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
   
    text-align: center;
   div{
    
         display: flex;
         justify-content: flex-start;
        align-items: flex-end;
        flex-direction: column;
       
    
   }
  
}
`;
const Dialog = styled.div`

margin: 0;
box-sizing: border-box;
position: absolute;
border: ${(props) => props.theme.border};
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
z-index: 1;
&#dxsetpage,&#dxcolums,&#dxsetpoint,&#dxtheme,&#dxdimension{
   
    margin-top: 3px;
    outline:none;
    background-color: ${(props) => props.theme.buttoncolor};
    border-radius: 5px;
    padding: 5px;
   
    :hover{
        border-radius: 5px;
          background-color: ${(props) => props.theme.hover};
      }
    .columns{
        display: flex;
        align-items: center;
        justify-content: space-around;
        /* svg{
            fill: #007bff;
            color: wheat;
        }    */
    } 
    span{
        margin-top: 3px;
        display: flex;
        font-family: ${(props) => props.theme.font};
       
        color: ${(props) => props.theme.color};
        align-items: center;
        width: 100px;
        gap: 2px;
        border-radius: 5px;  
    }
    

}
&#dxdimension{
    z-index: 3;
    
    margin-top: 30px;
    span{
        display: flex;
        align-items: center;
        justify-content: center;
    }
  
}
&#dxtheme{
    z-index: 2;
    margin-top: 30px;
    span{
       
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
}
&#dxcolums{
    z-index: 3;
    height: 160px;

}
&.dialog{
    
   
    border: ${(props) => props.theme.border};
    transition: transform 0.4s ease-in-out; 
    &#dxsetpoint.active, &#dxsetpage.active{
    transform: translateX(0%)
   
   }
    span{
        margin-top: 3px;
        display: flex;
        font-size: ${(props) => props.theme.fontSize};
        font-family: ${(props) => props.theme.font};
        
        color: ${(props) => props.theme.color};
        align-items: center;
        width: 100px;
        gap: 2px;
        border-radius: 5px;
    }
}
&#dxsetpoint{
    transform: translateX(-120%);
    z-index: 4;
    height: 70px;
    width: 120px;
    
}
&#dxsetpage{
    transform: translateX(-120%);
    z-index: 3;
    height: 120px;
    width: 120px;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
   
    
}
&#dxcolums{
    overflow-x:hidden;
    overflow-y: auto;
    height: 150px;
    z-index: 3;
}
`;
const Input = styled.input`
background-color: ${(props) => props.theme.buttoncolor};
border: ${(props) => props.theme.border};
border-radius: 5px;
padding: 5px;
font-size: ${(props) => props.theme.fontSize};
font-family: ${(props) => props.theme.font};
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
&.inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
}
`;
const Button = styled.button`

display: flex;
align-items: center;
justify-content: space-between;
background-color: ${(props) => props.theme.buttoncolor};
border: ${(props) => props.theme.border}; 
gap: 5px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
border-radius: 5px;

font-size: ${(props) => props.theme.fontSize};
font-family: ${(props) => props.theme.font};
color: ${(props) => props.theme.color};
&:hover{
    background-color: ${(props) => props.theme.hover};
}
&#btcolums{
    width: 130px;
    
}


`;

export { Div, Dialog, Input, Button };