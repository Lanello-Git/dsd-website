/** Verified DSD public identifiers. Credentials never belong in this file. */
export const tracking = {
  ga4MeasurementId: 'G-QE0P0VT2WH',
  clarityProjectId: 'yu86qiz0xt',
  googleSiteVerification: 'RlBMNB5_y6DoBqwFWfna1OPmiA2j_KI9cSjY-D1u5NU',
  // Prevent a preview or copied site from sending production analytics.
  allowedHosts: ['desmetenzoon.be', 'www.desmetenzoon.be'],
} as const;

export const trackingConfigured = Boolean(tracking.ga4MeasurementId || tracking.clarityProjectId);
