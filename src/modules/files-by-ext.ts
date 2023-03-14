import fs from 'fs';
import util from 'util';
import path from 'path';
import sharp from 'sharp';

const readdir = util.promisify(fs.readdir);
const unlink = util.promisify(fs.unlink);

export const getFilesByExt = async (dir: string, ext: string) => {
  const files = await readdir(dir);
  const getByExt = files.filter(file => {
    if (file.toLowerCase() === ext.toLowerCase()) return false;
    const strs = file.split('.');
    return strs[strs.length - 1].toLowerCase() === ext.toLowerCase();
  });
  return getByExt.map(item => path.resolve(dir, item).replace(/\\/g, '/'))
}

async function resizeFileToBuffer(path: string, width?: number) {
  let buffer = width ? await sharp(path).resize({width}).withMetadata().toBuffer() : await sharp(path).withMetadata().toBuffer();
  return buffer;
}

export const getFilesByExtResize = async (dir: string, ext: string, width?: number) => {
  const files = await getFilesByExt(dir, ext);
  const resize = files.map(file => resizeFileToBuffer(file, width));
  return await Promise.all(resize);
}

export const removeFilesByExt =  async (dir: string, ext: string) => Promise.all((await readdir(dir)).filter(item => {
  if (item.toLowerCase() === ext.toLowerCase()) return false;
  const strs = item.split('.');
  return strs[strs.length - 1].toLowerCase() === ext.toLowerCase();
}).map(item => unlink(path.resolve(dir, item))));
