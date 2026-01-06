import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

export const microcmsConfigured = Boolean(serviceDomain && apiKey);

// Avoid throwing at import-time when env vars aren't configured yet (common in fresh dev setups).
export const client = microcmsConfigured
  ? createClient({
      serviceDomain: serviceDomain!,
      apiKey: apiKey!,
    })
  : null;