import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import react from '@vitejs/plugin-react'
import os from 'os';


const getIPv4Address = () => {
  const interfaces = os.networkInterfaces()['Wi-Fi']; 
  if(interfaces != undefined){
  for (let i = 0; i < interfaces.length; i++) {
      if (interfaces[i].family === 'IPv4' && interfaces[i].internal === false) {
          return interfaces[i].address; 
      }
      
  }
}
else{
  return '127.0.0.1'
}
  return null;
}


const ipv4Address = getIPv4Address();
export default defineConfig({
  plugins: [react(),
mdx()
  
  ],
server: {
host: 'localhost',
port: 5137,
},
})
