# Changelog

## 3.0.0, 2026-10-05

Built on [Slipway](https://github.com/thenavidm/slipway) 0.1.17. The 32 tools keep their names and arguments, and every difference below was measured against 2.0.2, the last version on npm, before release.

- **A person approves each confirmed operation over MCP.** All 16 still need confirmation. Claude Code (2.1.246 and later) shows its own prompt, and a client that can show forms asks with an approval form whose one box starts unticked. Approvals are signed, bound to the exact call and work once. Where a client can do neither, the model's `confirm: true` still counts, and `FLODESK_CONFIRM=model` makes it enough everywhere. The refusal and the approval form both say what 2.0 said, that the call may change subscriber status or membership, trigger workflow or double opt-in messages, create draft campaigns, manage webhooks or save private audience files, and the audit log records who approved each one.
- **`FLODESK_ALLOW_DESTRUCTIVE=0` still refuses all 16**, confirmed or not, and `FLODESK_READ_ONLY=1` still leaves only the 16 reads.
- **Flodesk's status picks the exit code.** A request Flodesk rejects (400 or 422) exits 2 instead of 5, and a removed resource (410) 3 instead of 5. 401 and 403 still exit 4, 404 3, 429 7, a server error 5, and an unknown profile or nothing configured 10. 1 now means an unexpected error.
- **`which <words>` finds a command**, and `agent-context` describes every command, flag and setting as JSON. In Codex 0.159.3, finding the command that adds a subscriber to a segment and its flags took a median of 82,830 input tokens over the CLI instead of 126,029 (five runs each): four of five 2.0.2 runs guessed at least once and then read the whole command list, and every 3.0.0 run asked `which`.
- **`install <client>`** adds the server to Claude Code, Codex, Claude Desktop, Cursor, VS Code or Gemini CLI in each one's own format, and **`flodesk-mcp --http`** serves the same tools over Streamable HTTP, on 127.0.0.1:8787 unless told otherwise.
- **A smaller tool list.** A subscriber batch and the double opt-in switch, each written out twice as their own arguments and inside `payload`, are written once and referred to, so the list is 9,869 o200k tokens instead of 10,099, and Claude Code 2.1.286 spends 12,750 tokens a message on it with every tool loaded instead of 13,410. Every tool accepts and refuses the same arguments.
- **Less work to start.** Each input and body schema now compiles on its first use rather than at load, and the entry turns on Node's compile cache. The server spends 169 ms of CPU before its first answer where 2.0.2 spent 216, and answers in 119 ms of wall time instead of 137 (median of 21 runs, taking turns on one busy Mac). npx installs 10 dependencies instead of 94. A test still compiles every schema.
- **Docs.** README section 7 has the measured Claude Code and Codex costs, where 2.0 said they were pending, and the exit codes include 1.

### Upgrading

Over MCP, expect an approval prompt or form before any confirmed operation; a headless agent that should run them with `confirm: true` alone needs `FLODESK_CONFIRM=model`. A script that read exit 5 as a rejected request should read 2, and as a removed resource 3. An error is now one JSON object with `error`, Slipway's `code` (`usage`, `refused`, `auth`, `not_found`, `rate_limited`, `api`, `not_configured`) and a `hint`, plus Flodesk's `status` when it answered; 2.0.2 printed the tool's JSON inside the `error` string. Over MCP, an argument that fails the schema comes back as the MCP SDK's own message, "Input validation error: …", instead of JSON. With `FLODESK_READ_ONLY=1`, a client that calls a hidden tool gets "tool not found" instead of a refusal naming `FLODESK_READ_ONLY`, and that call is not in the audit log; the CLI still names the setting. The audit log's lines gain `confirmed_by`, and each allowed call is followed by a `done` or `failed` line. A script that pipes JSON-RPC into the server must keep stdin open until it reads the answer: the server now stops when its input ends, as the MCP stdio binding asks. `--http` refuses a page from another site unless `FLODESK_HTTP_ALLOWED_ORIGINS` lists it. Some terminal screens grew: the general help by 165 tokens, for `which`, `install`, the flags and the exit codes it now lists; the command list by 16; and a missing argument's error by 15, for its code and a hint. Over MCP, Codex keeps about 43 more tokens of its rendering of the tool list, so a discovery task read a median of 48,158 input tokens instead of 48,151. `SKILL.md` is 57 tokens longer in Claude Code, because it says how approval works over MCP and lists every exit code.

## 2.0.2, 2026-10-04

- **`npx -y @thenavidm/flodesk-mcp-cli` always starts the MCP server.** npx starts whichever binary the npm registry lists first when they share one file, and the registry does not keep the published order, so an MCP client set up with this README's install line could get `flodesk-cli` and its command list instead of a server. A third binary named after the package now always starts the server, and npx picks it by name.

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
