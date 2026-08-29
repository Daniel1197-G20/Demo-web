/**
 * Serverless Developer Telemetry & Edge Ingestion
 * Path: /api/developer/telemetry
 */

export default function handler(req, res) {
  // Extract edge security headers
  const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || '127.0.0.1';
  const country = req.headers['x-vercel-ip-country'] || 'NG';
  const userAgent = req.headers['user-agent'] || 'Unknown';
  const vercelId = req.headers['x-vercel-id'] || 'vcl_edge_' + Date.now();

  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'POST') {
    const body = req.body || {};
    return res.status(200).json({
      received: true,
      requestId: vercelId,
      timestamp: new Date().toISOString(),
      metadata: {
        ip: String(clientIp).split(',')[0].trim(),
        country,
        userAgent,
      },
    });
  }

  return res.status(200).json({
    status: 'ACTIVE',
    edge: {
      clientIp: String(clientIp).split(',')[0].trim(),
      country,
      vercelId,
      wafStatus: 'ENFORCED',
    },
    timestamp: new Date().toISOString(),
  });
}
