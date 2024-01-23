const DEFAULT_DELAY = 500;

export async function resolveWithDelay(data, delay = DEFAULT_DELAY) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}
