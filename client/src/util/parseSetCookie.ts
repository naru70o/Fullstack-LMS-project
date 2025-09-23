export interface ParsedCookie {
  name: string;
  value: string;
  options: Record<string, string | boolean>;
}

/**
 * Parses a Set-Cookie header string into a structured object.
 * Example input:
 * "better-auth.session_token=abcd1234; Path=/; HttpOnly; Secure; SameSite=None"
 */

export function parseSetCookie(setCookieHeader: string): ParsedCookie {
  const parts = setCookieHeader.split(";").map((p) => p.trim());
  const [name, value] = parts[0].split("=");

  const options: Record<string, string | boolean> = {};

  for (let i = 1; i < parts.length; i++) {
    const [key, val] = parts[i].split("=");
    if (!val) {
      options[key.toLowerCase()] = true; // e.g. HttpOnly, Secure
    } else {
      options[key.toLowerCase()] = val;
    }
  }

  return {
    name,
    value,
    options,
  };
}
