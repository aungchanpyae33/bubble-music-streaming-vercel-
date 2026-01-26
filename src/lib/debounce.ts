const debounce = <T extends (...args: never[]) => void>(
  fn: T,
  delay: number,
) => {
  // console.log("run");
  let id: ReturnType<typeof setTimeout> | undefined;
  return (...arg: Parameters<T>) => {
    // console.log("bb");
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      // console.log("new timer");
      fn(...arg);
    }, delay);
  };
};

export default debounce;
