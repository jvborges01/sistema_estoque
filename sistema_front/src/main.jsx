import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { ThemeContextProvider } from "./ThemeProvider";
import GlobalStyle from "./assets/index";
import Logando from "./Login";
import { Sticker } from "lucide-react";
import styled from "styled-components";
import { SocialIcon } from 'react-social-icons'
import Grid from "./Grid";
const queryClient = new QueryClient();
const NotFound = () => {
  const Errod = styled.div`
display: flex;
flex-direction: column;
margin-top: 20vh;
margin-left: 35vw;

svg{
  margin-top: 20px;
 
}
`;

  return (
    <>
      <Errod>
        <Sticker size={60}></Sticker><h1>404 - Página não encontrada</h1>
        <p>Desculpe, a página que você está procurando não foi encontrada.</p>

      </Errod>
    </>
  );
};



const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>

        <ThemeContextProvider>
          <GlobalStyle />

          <BrowserRouter>

            <Routes>
              <Route path="/" element={<App><Grid /></App>} />
              <Route path="/login" element={<Logando />} />
              <Route path="*" element={<NotFound />} />

            </Routes>

          </BrowserRouter>

        </ThemeContextProvider>

      </QueryClientProvider>
    </React.StrictMode>
  );
}
