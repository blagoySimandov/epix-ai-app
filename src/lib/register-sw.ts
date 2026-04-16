/**
 * Registers the Epix AI service worker.
 * Call once at app root — idempotent, safe to call multiple times.
 */
export function registerServiceWorker(): void {
  if (typeof window === "undefined") return; // SSR guard
  if (!("serviceWorker" in navigator)) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((registration) => {
        console.log("[Epix AI SW] registered, scope:", registration.scope);

        // Notify user of new content available
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("[Epix AI SW] New version available — auto-updating.");
              // Auto-update: tell the new SW to take over immediately
              newWorker.postMessage({ type: "SKIP_WAITING" });
              window.location.reload();
            }
          });
        });
      })
      .catch((err) => {
        console.warn("[Epix AI SW] registration failed:", err);
      });
  });
}
