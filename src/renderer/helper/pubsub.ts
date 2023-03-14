class PubSub extends Map<string, Set<(paylad: any) => void>> {
  emit(key: string, payload: any) {
    if (!this.has(key)) return false;
    const handler = this.get(key);
    handler?.forEach(f => f(payload));
  }
  on(key: string, f: (payload: any) => void) {
    if (!this.has(key)) this.set(key, new Set())
    const handler = this.get(key);
    handler?.add(f);
  }
  remove(key: string) {
    if (this.has(key)) this.delete(key);
  }
}

export default PubSub;