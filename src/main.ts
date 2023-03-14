import { PAGE_HEIGHT, PAGE_WIDTH } from './config';
import resolution from './modules/resolution';
import './style/index.css';

export const isDev = process.env.NODE_ENV === 'development';

resolution.init(document.getElementById('app') as HTMLDivElement, PAGE_WIDTH, PAGE_HEIGHT); 

const main = async () => { try {
  if (isDev) resolution.setMode('contain');
  require('./renderer');
} catch (err: any) {
  throw Error(err)
}}
main();
