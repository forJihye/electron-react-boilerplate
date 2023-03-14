import { useEffect, useRef } from "react";

export const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));
export const getRest = (i: number, max: number) => ((max + i % max) % max);
export const comp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));
export const getFormatKeys = (str: string) => (str.match(/%(.+?)%/g) ?? []).map(str => str.slice(1, -1));
export const replacePhoneFormat = (str: string) => str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

export const shuffleArray = <T>(array: T[]) => {
  return array.sort(() => Math.random() - 0.5) as T[];
}


export const raf = new class RAF extends Set<Function> {
  private playing: boolean = true;
  constructor() {
    super();
    const self = this;
    requestAnimationFrame(function draw() {
      self.playing && self.forEach(f => f());
      requestAnimationFrame(draw);
    });
  }
  on() {
    this.playing = true;
  }
  off() {
    this.playing = false;
  }
}

export const fileToFormData = (params: {[key: string]: any}) => {
  return new Promise(resolve => {
    const fd = new FormData();
    for (const name in params) fd.append(name, params[name]) 
    resolve(fd)
  });
}

export const createImage = (url: string, timeout: number = 10000) => {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => res(img)
    img.onerror = () => res(null);
    img.src = url;
    setTimeout(() => res(null), timeout);
  })
}

export const toFormatPhoneNumber = (str: string) => {
  if (str.length < 4) return str;
  else if (str.length < 7) return str.slice(0, 3) + '-' + str.slice(3);
  else if (str.length < 11) return str.slice(0, 3) + '-' + str.slice(3, 6) + '-' + str.slice(6);
  else if (str.length < 12) return str.slice(0, 3) + '-' + str.slice(3, 7) + '-' + str.slice(7);
  else return str;
};

export const useCombinedRefs = <T>(...refs: any[]) => {
  const targetRef = useRef<T>();
  useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current
      }
    })
  }, [refs])
  return targetRef;
};

export const debounce = (f: (...params: any) => void, ms: number) => {
  let timer: any;
  return (...params: any) => {
    if (timer) {
      clearTimeout(timer)
      timer = null;
    };
    timer = setTimeout(() => {
      f(...params);
      timer = null;
    }, ms);
  }
}

export const throttle = (f: (...params: any) => void, ms: number) => {
  let timer: any;
  return (...params: any) => {
    if (timer) return;
    timer = setTimeout(() => {
      f(...params);
      timer = null;
    }, ms);
  }
}

export const loadImage = (src: string, cross: boolean = false): Promise<HTMLImageElement|null> => new Promise(res => {
  const img = new Image;
  img.crossOrigin = 'anonymous';
  img.onload = () => res(img);
  img.onerror = () => res(null);
  img.src = src + '?' + Date.now();
});
