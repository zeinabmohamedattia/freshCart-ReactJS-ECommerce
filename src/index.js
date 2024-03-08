import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import UserContextProvider from './Context/UserContext.js';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools'
import CartContextProvider from './Context/CartContext.js';



const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient = new QueryClient()

root.render(
    <CartContextProvider>
    <UserContextProvider>
        
        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools/>
        </QueryClientProvider>
    
        </UserContextProvider>
    </CartContextProvider>
    
);
