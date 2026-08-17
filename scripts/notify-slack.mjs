#!/usr/bin/env node
const webhook = process.env.SLACK_WEBHOOK_URL;
if (!webhook) { console.error("SLACK_WEBHOOK_URL is not configured."); process.exit(2); }
const [type = "INFO", ...parts] = process.argv.slice(2);
const message = parts.join(" ").trim();
if (!message) { console.error("Usage: node scripts/notify-slack.mjs <TYPE> <MESSAGE>"); process.exit(2); }
const response = await fetch(webhook, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ text: `[Codex:${type}] ${message}` })
});
if (!response.ok) { console.error(`Slack notification failed: HTTP ${response.status}`); process.exit(1); }
console.log(`Slack notification sent: ${type}`);
