import './context-menu';
import { createRoot } from 'react-dom/client';
import App from './App';

const ROOT_DIV = document.getElementById('root') as HTMLElement;
const ROOT = createRoot(ROOT_DIV);
ROOT.render(<App />);
