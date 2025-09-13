/**
 * segmentFetchWorker.ts
 * Web Worker for fetching media segments.
 * Receives { url, signal } and posts back { success, buffer } or { error }.
 */

// Worker context
self.onmessage = async (event) => {
  const { url } = event.data;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      self.postMessage({
        success: false,
        error: `Failed to fetch: ${response.statusText}`,
      });
      return;
    }
    const buffer = await response.arrayBuffer();
    self.postMessage({ success: true, buffer }, [buffer]);
  } catch (error) {
    self.postMessage({ success: false, error: error.message });
  }
};
