import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App.jsx';
import { TaskManager } from './context/TaskManager.js';

const GlobalStyle = createGlobalStyle`
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    #root {
        width: 100%;
        height: 100%;
    }
`;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalStyle />
        <TaskManager>
            <App />
        </TaskManager>
    </StrictMode>
);
