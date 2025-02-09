const throttle = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  // console.log("run");
  let lastTime = 0;
  return (...arg: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastTime < delay) return;
    lastTime = now;
    fn(...arg);
  };
};
export default throttle;
