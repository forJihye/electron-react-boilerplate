const POST_KEY = '__post_promise_post_v1__';
const LISTENER_KEY = '__post_promise_listener_v1__';

class PostListener {
  private static key = LISTENER_KEY;
  private mapTypeToHandlers = new Map<string, (payload: any) => any>();
  private target!: Window;

  constructor() {
    window.addEventListener('message', async ({data, source}: MessageEvent<{key: string; seq: number; action: {type: string; data: any}}>) => {
      if (!data || data.key !== POST_KEY) return;
      const {seq, action} = data;
      const handler = this.mapTypeToHandlers.get(action.type);
      const payload = handler ? await handler(action.data) : void 0;
      (source as Window).postMessage({key: PostListener.key, seq, payload}, '*');
    });
  }

  add<T>(type: string, handle: (payload: T) => any) {
    this.mapTypeToHandlers.set(type, handle);
  }
  remove(type: string) {
    this.mapTypeToHandlers.delete(type);
  }
}

class PostPromise {
  private static key = POST_KEY;
  private seq: number = 0;
  private mapSeqToResolve = new Map<number, (value: any) => void>();

  constructor() {
    window.addEventListener('message', ({data}: MessageEvent<{key: string; seq: number; payload: any}>) => {
      if (!data || data.key !== LISTENER_KEY) return;
      const {seq, payload} = data;
      this.mapSeqToResolve.get(seq)?.(payload);
    });
  }
  
  message<T>(target: Window, action: {type: string; data: any}, targetOrigin: string) {
    const seq = this.seq++;
    const promise = new Promise<T>(res => this.mapSeqToResolve.set(seq, res));
    target.postMessage({key: PostPromise.key, seq, action}, targetOrigin);
    return promise;
  }

};
export const postListener = new PostListener();
export const postPromise = new PostPromise();
export default postPromise;