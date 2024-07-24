export const omit = <T extends object, K extends keyof T>(obj: T, ...keysToOmit: K[]): Omit<T, K> => {
  const result: Partial<T> = {};

  for (const key in obj) {
    if (obj[key] && !keysToOmit.includes(key as unknown as K)) {
      result[key] = obj[key];
    }
  }

  return result as Omit<T, K>;
}

export const emulateServerRequest = (): Promise<{ data: string; status: string }> => {
  return new Promise((resolve, reject) => {
    // Simulate network latency
    const delay = Math.floor(Math.random() * 2000) + 500; // 500ms to 2500ms

    setTimeout(() => {
      // Randomly decide whether to resolve or reject the promise
      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        resolve({ status: 'success', data: 'Request is successful!' });
      } else {
        reject({ status: 'error', message: 'Something went wrong!' });
      }
    }, delay);
  });
}