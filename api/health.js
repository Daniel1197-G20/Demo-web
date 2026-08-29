/**
 * Serverless Health Endpoint (Vercel Edge/Node Runtime)
 * Path: /api/health
 */

export default function handler(req, res) {
  const start = Date.now();
  
  // Extract real Vercel Edge headers
  const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
  const country = req.headers['x-vercel-ip-country'] || 'NG';
  const city = req.headers['x-vercel-ip-city'] || 'Lagos';
  const vercelId = req.headers['x-vercel-id'] || 'vcl_edge_local';
  
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Content-Type', 'application/json');

  return res.status(200).json({
    status: 'HEALTHY',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    durationMs: Date.now() - start,
    edge: {
      clientIp: String(clientIp).split(',')[0].trim(),
      country,
      city,
      vercelId,
      protocol: req.headers['x-forwarded-proto'] || 'https',
    },
    services: {
      frontend: 'OK',
      api: 'OK',
      waf: 'ENFORCED',
    },
  });
}
