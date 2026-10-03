# Changelog

## Unreleased

Use the native terminal capture at 1040 source pixels with lossless GIF optimization, displayed at 520 pixels, matching the Bluesky/Substack reference. Original assets remain available.

## 2.0.1: 2026-10-03

Corrected copied desktop installation instructions to the actual native authentication scheme and 16 read-only tools. Codex environment forwarding now explicitly includes OAuth access-token/auth-type settings. Updated package/desktop/versioned download references together. Handlers, tool catalogue, dependency entries and reviewed native API schemas are unchanged.

## 2.0.0 — 2026-10-03

| Component | Reviewed version |
| --- | --- |
| Package/desktop manifest | 2.0.0 |
| Node runtime | >=22 |
| MCP SDK | 1.32.0 |
| Ajv / formats | 8.20.0 / 3.0.1 |
| TypeScript / Vitest | 7.0.2 / 5.0.3 |
| Desktop builder | 2.1.2 |
| Native API snapshot | OpenAPI 3.0.3/API1.0.0;26operations checked 2026-10-03 |
| Official MCP production catalog | Format 3; 35 listed tools, checked 2026-10-03 |

2.0.0 is a major refresh of the private 1.0 MCP. All 20legacy names remain. Added batch_create_or_update_subscribers, list_campaigns, publish_canva_email, get_canva_design_state, publish_studio_email and list_all_custom_fields. Legacy segment/workflow/webhook aliases keep their tool names but use exact current native fields: get_segment/get_webhook/delete_webhook/update_webhook use id, enrollment accepts id or email, webhook configuration uses post_url, workflows use perPage and statuses CSV. The old server omitted DELETE bodies and misnamed some fields; these are corrected rather than keeping broken requests.

Subscriber statuses now include unconfirmed/cleaned/archived; upserts accept native id/email, optin_ip/optin_timestamp and 50 segment IDs. Native upsert permits 50 subscribers and preserves partial successes/failures. All mutations/private-page files require approval and isolated credentials. Mixed private credential types fail instead of silently prioritizing Bearer/global values. All automatic/inherited auth fallbacks, source-saved credentials and thin clone-only setup are removed. The complete CLI/MCP/desktop/client framework, policy, current comparison and dated update history ships together.

Private legacy history/settings remain separate and are never imported into public history. See [CHANGELOG.md](CHANGELOG.md), [api-provenance.json](api-provenance.json) and [RELEASE-CHECKLIST.md](RELEASE-CHECKLIST.md).

## 1.0.0 — legacy private MCP

Twenty subscriber/segment/workflow/custom-field/webhook tools with no declared shared task CLI. Existing private history is preserved separately.
