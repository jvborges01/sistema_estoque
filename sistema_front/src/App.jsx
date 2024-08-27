import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components'; // Importando styled-components
import { Navigate } from 'react-router-dom';


function App({children}) {
const user = false


  const isUserLoggedIn = localStorage.getItem('user') === 'true';


  return isUserLoggedIn ? children : <Navigate to="/login" />;  
 
}
export default App;
