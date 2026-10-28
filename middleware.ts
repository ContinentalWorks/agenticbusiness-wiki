// POSTURE (2026-10-27, Gary): Continental Works' wiki, MEMBERS ONLY. Every page sits behind the
// Supersuit account (Freedom-account gate, read mode: sign-in at freedom.continentalworks.ai).
// One-page share links (/s/<sig>/<route>) still open a single page for anyone with no sign-in:
// the preset's share layer answers a genuine address before the gate refuses. It needs
// WIKI_PASS_SECRET and WIKI_GATE_SECRET on the Vercel project; a WIKI_PASSWORD opens nothing.
//
// `openPaths` narrows the gate's open set to /skills/ and /generators/ only, because the default
// also leaves .md, .txt and /llms-full.txt open, and /llms-full.txt is every page in one file.
//
// Vercel Routing Middleware from the preset: the family bot-block, the one-page share layer,
// then the account gate.
import { createMiddleware, createFreedomAccountGate } from '@supersuit/docusaurus-preset-wiki/middleware';

const gate = createFreedomAccountGate({ openPaths: /^\/(skills\/|generators\/)/ });

export default createMiddleware({ gate });

export const config = {
  // Run on HTML routes only. Skip static assets so we do not pay function
  // invocations on every CSS, JS, image, or font fetch.
  matcher: [
    '/((?!assets/|img/|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\.(?:js|css|png|jpe?g|gif|svg|webp|ico|woff2?|ttf|map|json|xml)$).*)',
  ],
  runtime: 'edge',
};
