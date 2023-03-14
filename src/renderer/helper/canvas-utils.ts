export const getBlob = (canvas: HTMLCanvasElement, type?: string, quality?: number): Promise<Blob> => new Promise(res => canvas.toBlob(res as any, type, quality));
export const drawImage = (target: HTMLCanvasElement|HTMLImageElement) => {
  const canvas = Object.assign(document.createElement('canvas'), {width: target.width, height: target.height}) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(target, 0, 0, canvas.width, canvas.height);
  return canvas;
};

export const drawCover = (
  ctx: CanvasRenderingContext2D, 
  img: HTMLVideoElement|HTMLImageElement|HTMLCanvasElement,
  x: number = 0, 
  y: number = 0, 
  w: number = ctx.canvas.width, 
  h: number = ctx.canvas.height,
  offsetX = 0.5, 
  offsetY = 0.5
) => {
  offsetX = typeof offsetX === 'number' ? offsetX : 0.5
  offsetY = typeof offsetY === 'number' ? offsetY : 0.5

  if (offsetX < 0) offsetX = 0
  if (offsetY < 0) offsetY = 0
  if (offsetX > 1) offsetX = 1
  if (offsetY > 1) offsetY = 1

  let iw = img.width || (img as HTMLVideoElement).videoWidth;
  let ih = img.height || (img as HTMLVideoElement).videoHeight;
  let r = Math.min(w / iw, h / ih)
  let nw = iw * r
  let nh = ih * r
  let cx = 1
  let cy = 1
  let cw = 1
  let ch = 1
  let ar = 1

  if (nw < w) ar = w / nw                             
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh
  nw *= ar
  nh *= ar

  cw = iw / (nw / w)
  ch = ih / (nh / h)

  cx = (iw - cw) * offsetX
  cy = (ih - ch) * offsetY

  if (cx < 0) cx = 0
  if (cy < 0) cy = 0
  if (cw > iw) cw = iw
  if (ch > ih) ch = ih

  ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h)
  return ctx.canvas;
};

export const drawContain = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement|HTMLCanvasElement|HTMLVideoElement
) => {
  const canvas = ctx.canvas ;
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.width || (img as any).videoWidth;
  const ih = img.height || (img as any).videoHeight;
  const hRatio = cw / iw;
  const vRatio =  ch / ih;
  const ratio = Math.min(hRatio, vRatio);
  const sx = (cw - iw*ratio) / 2;
  const sy = (ch - ih*ratio) / 2;  
  ctx.drawImage(img, 0, 0, iw, ih, sx, sy, iw*ratio, ih*ratio);  
}

export const drawCropped = (ctx: CanvasRenderingContext2D, img: HTMLImageElement|HTMLCanvasElement, cropped: {width: number; height: number; x: number; y: number}) => {
  const {width, height, x, y} = cropped;
  drawContain(ctx, img);

  const cropCanvas = document.createElement('canvas') as HTMLCanvasElement;
  const cropCtx = cropCanvas.getContext('2d') as CanvasRenderingContext2D;
  cropCanvas.width = width;
  cropCanvas.height = height;
  cropCtx.drawImage(ctx.canvas, x, y, width, height, 0, 0, width, height);
  
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  drawContain(ctx, cropCanvas);
}

export const flipX = (ctx: CanvasRenderingContext2D) => {
  ctx.save();
  ctx.translate(ctx.canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(ctx.canvas, 0, 0);
  ctx.restore();
};

export const img2canvas = (img: HTMLImageElement) => {
  const canvas = Object.assign(document.createElement('canvas'), {width: img.width, height: img.height}) as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}