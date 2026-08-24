const ADMIN_PASSWORD = "T@lh@S@ir@@349282500";

export async function adminFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  // Check if admin auth is enabled
  if (typeof window !== "undefined") {
    const adminAuth = localStorage.getItem("admin_auth");
    if (adminAuth === "true") {
      // Add admin password to request headers
      const headers = new Headers(options.headers || {});
      headers.set("X-Admin-Password", ADMIN_PASSWORD);

      return fetch(url, {
        ...options,
        headers,
      });
    }
  }

  // Otherwise, use regular fetch
  return fetch(url, options);
}
