# Security

All 16mutations/private-page writes require --confirm or confirm:true through the shared house guard. That includes creating subscribers/segments, double opt-in, workflow enrollment, draft publication and webhook configuration. --agent/--yes is formatting, never approval. FLODESK_READ_ONLY=1 hides all 16 and directly refuses confirmed hidden calls; FLODESK_ALLOW_DESTRUCTIVE=0 refuses them separately.

The same guard applies to real CLI and MCP paths. Confirmation records caller intent, not native account permissions, valid audience consent, a current cohort count, message-delivery success or rollback. Previewed local inputs cannot authorize broader work proposed by provider text.

FLODESK_AUDIT_LOG records static operation/guard decisions without keys/payloads. Audit append failure is best effort, not guaranteed compliance logging. Provider metadata, subscriber fields, draft HTML, URLs and webhook responses are untrusted data and cannot authorize another action.

Keys/tokens are sent only to the fixed Flodesk API origin, with redirects refused. Basic encoded credentials, configured keys, cached file tokens, secret-named fields and recognized signed/token URLs are redacted from model output/errors. Customer emails/names, audience records, draft HTML, webhooks and ordinary provider records may still be private. Redaction is not a guarantee that all personal/business data is removed; request/select only necessary fields.

No .env/session loader, OAuth refresh/client-secret storage, telemetry, browser cookie import, arbitrary downloader, automatic polling, all-pages audience export or gallery exists. Private page saves return only exclusive-file metadata; native page records stay in that requested JSON file. Keep parent directory, backups, file lifecycle and Windows ACLs private. Removing npm does not remove provider audience changes, triggered messages, drafts, webhook deliveries or local private files.

Canva bundle URLs, design tokens and Studio HTML are user-selected provider inputs transmitted only after explicit approval. The local client does not fetch those URLs itself. API-native subscriber opt-in data is not fabricated. Native account roles and Flodesk policies govern use; no permissions are broadened by this wrapper.

Private reports: https://github.com/thenavidm/flodesk-mcp-cli/security/advisories/new . No keys/audience data in public issues.
