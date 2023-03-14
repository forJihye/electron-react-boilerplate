import os from 'os';
import path from 'path';
import {writeFile} from 'fs/promises';

const filesave = async({arraybuffer, filename, folder}: {arraybuffer: ArrayBuffer, filename: string, folder?: string}) => {
  let dir;
  if (folder) dir = path.resolve(os.homedir(), folder, filename);
  else dir = path.resolve(os.homedir(), filename);
  await writeFile(dir, Buffer.from(arraybuffer), 'binary');
}

export default filesave;
