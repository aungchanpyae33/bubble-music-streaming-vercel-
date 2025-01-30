self.onmessage = (event) => {
  const { url, fetchOptions, segNum } = event.data;

  fetch(url, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch the song segments seg-${segNum}`);
      }
      return response.arrayBuffer();
    })
    .then((buffer) => {
      // Transfer the ArrayBuffer back to the main thread efficiently
      self.postMessage({ buffer, segNum }, [buffer]);
    })
    .catch((err) => {
      self.postMessage({ error: err.message, segNum });
    });
};
