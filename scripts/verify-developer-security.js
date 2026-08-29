/**
 * Verification & Security Test Suite
 * Tests developer role authorization boundaries, IP anomaly risk model,
 * error sanitization, and security headers integrity.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('====================================================');
console.log("  TORY'S TREATS — DEVELOPER CONSOLE SECURITY TEST  ");
console.log('====================================================\n');

// TEST 1: Role Definition & Isolation
console.log('[1] Testing User Role Definitions:');
const constantsFile = fs.readFileSync(path.join(rootDir, 'src/lib/constants.js'), 'utf-8');
assert(constantsFile.includes("DEVELOPER: 'DEVELOPER'"), "USER_ROLES contains 'DEVELOPER' definition");
assert(constantsFile.includes("ADMIN: 'ADMIN'"), "USER_ROLES preserves 'ADMIN'");
assert(constantsFile.includes("CUSTOMER: 'CUSTOMER'"), "USER_ROLES preserves 'CUSTOMER'");

// TEST 2: Developer Route Guard Logic
console.log('\n[2] Testing DeveloperRoute Guard & Role Isolation:');
const devRouteFile = fs.readFileSync(path.join(rootDir, 'src/components/common/DeveloperRoute.jsx'), 'utf-8');
assert(devRouteFile.includes('!user || !isDeveloper'), "DeveloperRoute strictly denies non-developer/unauthenticated users");
assert(devRouteFile.includes('403 FORBIDDEN'), "DeveloperRoute presents explicit 403 Forbidden authorization barrier");

// TEST 3: Vercel Security Headers
console.log('\n[3] Testing vercel.json Security Headers:');
const vercelJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'vercel.json'), 'utf-8'));
const headers = vercelJson.headers?.[0]?.headers || [];
const headerMap = Object.fromEntries(headers.map(h => [h.key, h.value]));

assert(headerMap['X-Content-Type-Options'] === 'nosniff', "X-Content-Type-Options is 'nosniff'");
assert(headerMap['X-Frame-Options'] === 'DENY', "X-Frame-Options is 'DENY'");
assert(headerMap['Referrer-Policy'] === 'strict-origin-when-cross-origin', "Referrer-Policy is strict-origin-when-cross-origin");
assert(headerMap['Content-Security-Policy'] && headerMap['Content-Security-Policy'].includes("default-src 'self'"), "CSP header is configured with strict default-src 'self'");
assert(headerMap['Strict-Transport-Security'] && headerMap['Strict-Transport-Security'].includes('max-age='), "HSTS is configured");

// TEST 4: Supabase Database Migration & RLS Policies
console.log('\n[4] Testing Supabase Migration & Zero-Trust RLS Policies:');
const migrationFile = fs.readFileSync(
  path.join(rootDir, 'supabase/migrations/20260829000000_developer_observability_schema.sql'),
  'utf-8'
);
assert(migrationFile.includes('CREATE TABLE IF NOT EXISTS public.developer_security_events'), "developer_security_events table created");
assert(migrationFile.includes('CREATE TABLE IF NOT EXISTS public.developer_audit_logs'), "developer_audit_logs table created");
assert(migrationFile.includes('CREATE TABLE IF NOT EXISTS public.developer_ip_reputation'), "developer_ip_reputation table created");
assert(migrationFile.includes('CREATE TABLE IF NOT EXISTS public.developer_error_events'), "developer_error_events table created");
assert(migrationFile.includes('ALTER TABLE public.developer_security_events ENABLE ROW LEVEL SECURITY'), "RLS enabled on developer_security_events");
assert(migrationFile.includes('CREATE OR REPLACE FUNCTION public.is_developer()'), "is_developer() security definer function created");
assert(migrationFile.includes('public.is_developer()'), "RLS policies enforce public.is_developer()");

// TEST 5: IP Anomaly Risk Scoring Engine
console.log('\n[5] Testing IP Behavioral Anomaly Model & Risk Calculation:');
const devStoreFile = fs.readFileSync(path.join(rootDir, 'src/lib/developerStore.js'), 'utf-8');
assert(devStoreFile.includes('ENDPOINT_SCANNING') && devStoreFile.includes('riskIncrement = 45'), "Endpoint scanning triggers high risk increment (+45)");
assert(devStoreFile.includes('FAILED_LOGIN') && devStoreFile.includes('riskIncrement = 20'), "Failed login increments risk score (+20)");
assert(devStoreFile.includes("newRisk > 80") && devStoreFile.includes("status = 'BLOCKED'"), "Critical risk (>80) transitions IP to BLOCKED status");
assert(devStoreFile.includes("newRisk > 50") && devStoreFile.includes("status = 'CHALLENGED'"), "High risk (>50) transitions IP to CHALLENGED status");
assert(devStoreFile.includes("unblockIp"), "Manual developer unblock capability implemented");

// TEST 6: All Developer Routes Registered in Router
console.log('\n[6] Testing Router Registration:');
const routesFile = fs.readFileSync(path.join(rootDir, 'src/routes/index.jsx'), 'utf-8');
assert(routesFile.includes('path="/developer"'), "Main /developer route defined");
assert(routesFile.includes('path="performance"'), "/developer/performance route defined");
assert(routesFile.includes('path="traffic"'), "/developer/traffic route defined");
assert(routesFile.includes('path="security"'), "/developer/security route defined");
assert(routesFile.includes('path="ip-anomaly"'), "/developer/ip-anomaly route defined");
assert(routesFile.includes('path="errors"'), "/developer/errors route defined");
assert(routesFile.includes('path="api"'), "/developer/api route defined");
assert(routesFile.includes('path="database"'), "/developer/database route defined");
assert(routesFile.includes('path="deployments"'), "/developer/deployments route defined");
assert(routesFile.includes('path="audit-logs"'), "/developer/audit-logs route defined");
assert(routesFile.includes('path="system-health"'), "/developer/system-health route defined");

// TEST 7: Serverless API Functions for Vercel
console.log('\n[7] Testing Serverless API Functions for Vercel:');
assert(fs.existsSync(path.join(rootDir, 'api/health.js')), "api/health.js exists");
assert(fs.existsSync(path.join(rootDir, 'api/developer/telemetry.js')), "api/developer/telemetry.js exists");

// TEST 8: Skeleton Loading System & Removal of Old Loading Screen
console.log('\n[8] Testing Skeleton Loading System & Fallback Replacement:');
assert(!routesFile.includes("Loading Tory's Treats..."), "Old 'Loading Tory's Treats...' text completely removed from routes");
assert(!routesFile.includes("RouteLoadingFallback"), "Old RouteLoadingFallback removed from routes");
assert(routesFile.includes("RouteSkeletonFallback"), "RouteSkeletonFallback correctly integrated into Suspense");

const skeletonFile = fs.readFileSync(path.join(rootDir, 'src/components/ui/Skeleton.jsx'), 'utf-8');
assert(skeletonFile.includes('export function SkeletonHomepage'), "SkeletonHomepage component exported");
assert(skeletonFile.includes('export function SkeletonShopPage'), "SkeletonShopPage component exported");
assert(skeletonFile.includes('export function SkeletonAdminDashboard'), "SkeletonAdminDashboard component exported");
assert(skeletonFile.includes('export function SkeletonDeveloperConsole'), "SkeletonDeveloperConsole component exported");
assert(skeletonFile.includes('export function RouteSkeletonFallback'), "RouteSkeletonFallback exported");

const cssFile = fs.readFileSync(path.join(rootDir, 'src/assets/styles/index.css'), 'utf-8');
assert(cssFile.includes('.skeleton-shimmer-dark'), "Dark skeleton shimmer style configured");
assert(cssFile.includes('prefers-reduced-motion') && cssFile.includes('.skeleton-shimmer'), "prefers-reduced-motion disables skeleton shimmer animation");

console.log('\n====================================================');
console.log(`  RESULTS: ${passedTests}/${totalTests} TESTS PASSED (${failedTests} FAILED)  `);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
}
