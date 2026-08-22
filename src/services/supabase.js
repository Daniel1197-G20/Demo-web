import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Returns true if all required Supabase environment variables are present and non-empty.
 */
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.trim() !== '' &&
    supabaseAnonKey.trim() !== ''
);

/**
 * Returns an array of missing Supabase configuration variable names.
 * Does not expose or log secret values.
 */
export function getMissingSupabaseEnvVars() {
  const missing = [];
  if (!supabaseUrl || supabaseUrl.trim() === '') missing.push('VITE_SUPABASE_URL');
  if (!supabaseAnonKey || supabaseAnonKey.trim() === '') missing.push('VITE_SUPABASE_ANON_KEY');
  return missing;
}

/**
 * Validates Supabase environment variables and issues a development warning if missing.
 */
export function validateSupabaseConfig() {
  const missing = getMissingSupabaseEnvVars();
  if (missing.length > 0) {
    const message = `[Supabase Configuration] Missing required environment variable(s): ${missing.join(
      ', '
    )}. Please configure them in your .env file (see .env.example).`;
    if (import.meta.env.DEV) {
      console.warn(message);
    }
    return { valid: false, missing, message };
  }
  return { valid: true, missing: [], message: 'Supabase configuration is valid.' };
}

// Initial configuration check
validateSupabaseConfig();

let supabaseInstance = null;

if (isSupabaseConfigured) {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Safe Proxy to prevent runtime crashes during initial scaffolding or build,
  // but explicitly prevent calling methods on an unconfigured backend.
  supabaseInstance = new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === 'then') return undefined;
        return () => {
          throw new Error(
            `Cannot call Supabase method '${String(
              prop
            )}': Supabase is not configured. Missing environment variable(s): ${getMissingSupabaseEnvVars().join(
              ', '
            )}. Refer to .env.example.`
          );
        };
      },
    }
  );
}

export const supabase = supabaseInstance;
export default supabase;
