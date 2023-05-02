export function next(current: number, total: number) {
  return current + 1 <= total - 1 ? current + 1 : 0;
}

export function prev(current: number, total: number) {
  return current - 1 >= 0 ? current - 1 : total - 1;
}
