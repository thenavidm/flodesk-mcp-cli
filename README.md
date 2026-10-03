<img src="https://cdn.navid.me/tools/flodesk-icon.png" alt="Flodesk" width="88">

# Flodesk MCP Server & CLI

[![npm](https://img.shields.io/npm/v/@thenavidm/flodesk-mcp-cli?color=orange&label=npm)](https://www.npmjs.com/package/@thenavidm/flodesk-mcp-cli)
[![CI](https://github.com/thenavidm/flodesk-mcp-cli/actions/workflows/ci.yml/badge.svg)](https://github.com/thenavidm/flodesk-mcp-cli/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/License-AGPL--3.0-green)](./LICENSE)
[![YouTube](https://img.shields.io/badge/YouTube-@thenavidm-red?logo=youtube&logoColor=white)](https://youtube.com/@thenavidm?sub_confirmation=1)
[![X](https://img.shields.io/badge/X-@thenavidm-black?logo=x)](https://x.com/thenavidm)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-thenavidm-0A66C2?logo=linkedin&logoColor=white)](https://linkedin.com/in/thenavidm)

Flodesk MCP server and CLI for Codex and AI agents. 32 shared tools for current subscribers, draft campaigns, workflows, custom fields and webhooks, private account profiles and exact reviewed subscriber batches.

One package provides a task CLI, local stdio MCP and versioned desktop bundle. Built and maintained by [Navid Moazzez](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=flodesk-mcp-cli&utm_content=readme). Complete setup: [navid.me](https://navid.me/mcp-servers/flodesk?utm_source=github&utm_medium=referral&utm_campaign=flodesk-mcp-cli&utm_content=guide).

<img src="https://cdn.navid.me/repos/flodesk-mcp-cli.gif?v=2.0.0" alt="Illustrated Flodesk workflow using the shared navid.me terminal" width="520">

The terminal illustrates actual commands, not a recorded provider account session. Node 22+ is required for manual installs; private account API access, subscription eligibility and audience permissions remain separate.

## Two ways to use it

### Command line

A terminal or shell agent calls only the requested task.

```bash
npx -y --package @thenavidm/flodesk-mcp-cli@latest flodesk-cli list-accounts --agent
```

### MCP server, for your AI app

Register the same stdio package with private user settings.

```bash
codex mcp add flodesk --env FLODESK_TOKEN_FILE=/absolute/private/flodesk.txt -- npx -y @thenavidm/flodesk-mcp-cli@latest
```

### Which one

Use task-specific CLI help/compact output for terminal automation, or local MCP for your AI client. Both enforce the exact same handlers and policy. Complete setup is in [INSTALL.md](INSTALL.md).

## Features

- Current native 50-subscriber upsert and complete current subscriber/segment arguments.
- Correct native DELETE JSON, workflow enrollment/removal and actual draft-campaign exports.
- Native custom-field and webhook management with explicit approval.
- Shared read-only/direct-call guard, isolated Basic/Bearer profiles and exact ordered reviews.
- Full client/OS/desktop setup, native terminal, version history, accurate official comparison and 20 FAQ accordions.

## Contents

| Section | What it covers |
| --- | --- |
| [1. What you can ask it](#1-what-you-can-ask-it) | What you can ask it |
| [2. Quick install](#2-quick-install) | Quick install |
| [3. Set up Flodesk access](#3-set-up-flodesk-access) | Set up Flodesk access |
| [4. Connect your client](#4-connect-your-client) | Connect your client |
| [5. Check it works](#5-check-it-works) | Check it works |
| [6. Output, flags and exit codes](#6-output-flags-and-exit-codes) | Output, flags and exit codes |
| [7. MCP or CLI and token cost](#7-mcp-or-cli-and-token-cost) | MCP or CLI and token cost |
| [8. Every tool and argument](#8-every-tool-and-argument) | Every tool and argument |
| [9. Subscriber, draft and automation workflows](#9-subscriber-draft-and-automation-workflows) | Subscriber, draft and automation workflows |
| [10. Exact reviewed batches and pagination](#10-exact-reviewed-batches-and-pagination) | Exact reviewed batches and pagination |
| [11. Several private accounts](#11-several-private-accounts) | Several private accounts |
| [12. Writing safely](#12-writing-safely) | Writing safely |
| [13. How the two surfaces work](#13-how-the-two-surfaces-work) | How the two surfaces work |
| [14. Your data](#14-your-data) | Your data |
| [15. Environment variables](#15-environment-variables) | Environment variables |
| [16. Updates and removal](#16-updates-and-removal) | Updates and removal |
| [17. Troubleshooting](#17-troubleshooting) | Troubleshooting |
| [18. API coverage and comparisons](#18-api-coverage-and-comparisons) | API coverage and comparisons |
| [19. Versions and migration](#19-versions-and-migration) | Versions and migration |
| [20. FAQ](#20-faq) | FAQ |

## 1. What you can ask it

- Read the intended account's subscribers, current native statuses and one exact subscriber.
- Create/update only approved subscriber data, native batch upserts and segment membership.
- Inspect workflows, enroll/remove exactly requested subscribers and account for email side effects.
- Manage requested custom fields and webhook configuration with native arguments.
- Publish a reviewed Canva/Studio export as a draft campaign, without sending it.
- Review ordered subscriber operations and save a requested single audience page privately.

Actual shared discovery exposes **32 tools: 16 reads and 16 confirmed operations**. All 20 legacy tool names remain. Six current REST additions and six helper/account/file/batch tasks complete the shared catalogue. See actual native arguments, major migrations and current official comparison below. The official hosted MCP has separate analytics and cohort capabilities this package does not invent.

## 2. Quick install

```bash
npm install -g @thenavidm/flodesk-mcp-cli@latest
flodesk-cli --version
flodesk-cli tools
flodesk-cli schema batch-create-or-update-subscribers
flodesk-cli login
```

Node 22+ for manual CLI/local MCP. [INSTALL.md](INSTALL.md) has Codex first and full client/OS setup, including the versioned [desktop bundle](https://github.com/thenavidm/flodesk-mcp-cli/releases/download/v2.0.1/flodesk-2.0.1.mcpb).

## 3. Set up Flodesk access

### Private integration API key

1. Sign into the intended [Flodesk account](https://app.flodesk.com). Open Account → Integrations → API, or the [API key settings](https://app.flodesk.com/account/integration/api). Check which account owns the audience before creating/copying a key.
2. Use a private integration API key for your own account. The native docs describe full API access; this package does not invent per-operation key scopes or guarantee provider read-only keys. Local read-only policy is a separate control.
3. Save FLODESK_API_KEY only in private user/client environment settings, or use FLODESK_TOKEN_FILE as an absolute token-only file outside repositories. On macOS/Linux use a private 0700 directory and owner-private 0600 regular non-symlink file, at most 64 KiB. On Windows restrict file/parent ACLs to yourself; POSIX mode checks do not establish Windows ACLs.
4. Run flodesk-cli doctor for local settings. Deliberately run doctor --network to read one subscriber page with per_page=1; output reports only count, not the subscriber record. That verifies one read, not account-owner identity, campaign/webhook access or all native permissions.
5. Inspect exact native fields and IDs, then approve only requested work. Double opt-in, segment additions and workflow enrollment can trigger actual messages. Do not create subscribers, opt-ins, workflow entries, drafts or webhooks merely to test installation.

The API key is an HTTP Basic username, with an empty password. The client constructs Authorization: Basic base64(key:), sends a descriptive User-Agent and uses only the allowlisted https://api.flodesk.com origin. No API key goes into a URL, prompt, Git file or log. It refuses redirects and unknown routes.

### Externally minted partner OAuth

Native [partner OAuth](https://developers.flodesk.com/) requires a provider-approved integration with its own client ID/secret and redirect flow. This package accepts an externally minted FLODESK_ACCESS_TOKEN or named access_token profile as Authorization: Bearer. It does not register an app, start login, exchange authorization codes, refresh tokens or import official connector sessions.

Access tokens are documented as 24 hours; refresh tokens are single-use and rotate. Refreshing belongs to your approved private integration and must store its newly issued refresh token securely. This runtime never holds that client secret/refresh token. Restart after replacing its access token. get_oauth_userinfo makes only the fixed /oauth2/userinfo GET and refuses API-key profiles before any request.

For a token file containing an OAuth access token, set FLODESK_AUTH_TYPE=oauth for a direct profile, or auth_type:"oauth" in that named profile. File credentials otherwise default to API key. Never configure api_key and access_token together. A selected file overrides only its own profile's inline credential; profiles never inherit a global key/token or another account.

### Several private accounts

FLODESK_ACCOUNTS is a private JSON array of unique {name,api_key,access_token,token_file,auth_type} entries. Choose exactly one credential type in each. FLODESK_DEFAULT_ACCOUNT and --account select exact labels. Labels and review hashes are not verified provider ownership. Token files cache until process restart. list_accounts returns only labels/default/auth type/credential source, without token paths or provider reads.

### Official MCP connection

Flodesk already supplies its [official MCP](https://flodesk.com/mcp) and [setup help](https://help.flodesk.com/en/articles/12573377). Its [production field reference](https://mcp.flodesk.com/docs) currently lists 35 tools, including email/form/checkout/workflow analytics, cohort filters, subscriber actions, CSV export and bulk archive/unarchive/segment changes. Its previews issue single-use confirmation tokens expiring after 120 seconds. Those capabilities and safeguards already exist.

The September 11 help article describes an earlier 24-tool/individual-action phase and says bulk work is upcoming; the current production catalog describes 35 tools and bulk workflows. Treat that as documented source drift. Marketing's broad future-control examples do not establish current send/schedule support. This local public-REST package does not call private MCP-only analytics/cohort routes or accept the hosted connector's confirmation tokens.

### Quotas and effects

The AGPL wrapper is free; Flodesk subscription/API eligibility and account policies remain separate. [Native REST limits](https://developers.flodesk.com/#section/Rate-Limiting) are 100 requests/minute normally and 20/minute for POST /subscribers/batch, up to 50 subscribers per request. X-Fd-RateLimit headers report remaining capacity. Our process spacing defaults 650 ms, plus a separate 3100 ms batch window. Other processes/apps share account quota; local pacing is not provider enforcement or a guaranteed distributed limiter.

No automatic retries, including reads, 429, 5xx, redirects or timeouts. A failed write can leave an unknown result, duplicate webhook/segment or triggered message. Inspect provider state before deliberately repeating. JSON requests cap 1 MiB and responses 5 MiB. Each native list returns one page with its own meta/page semantics, not an all-pages backup. Workflow statuses use native CSV and perPage; campaign query names retain native capitalization.

Canva and Studio publish draft campaign exports, not send/schedule emails. Subscriber upsert can create or update by id/email; up to 50 segment IDs are supported. double_optin applies only to newly created subscribers and can send a confirmation message. Workflow re-entry needs prior completion and Allow repeat subscribers; abandoned-cart workflows cannot be enrolled through this route. Unsubscribe changes subscription state without pretending to delete the record. Removing segment membership is distinct and sends the required native DELETE JSON body.

### Revocation and retained data

Revoke the intended key at Flodesk, replace private settings/files and restart. Revoke partner OAuth/official connector authorization separately. Package/client removal does not undo audience changes, sent opt-ins/workflow effects, drafts, webhooks or private audience-page files. Retain receipts and investigate unknown outcomes before explicitly requested cleanup.


## 4. Connect your client

[INSTALL.md](INSTALL.md) covers Codex, Claude Code, Claude Desktop bundle/manual stdio, Cursor, VS Code/Copilot, Windsurf, Zed, Gemini CLI, Cline, Docker and other local stdio clients on macOS/Windows/Linux. No Claude Code installation is needed for Codex. GUI/remote runtimes need their own private settings and accessible file paths; restart/reconnect after changes.

This owned package is local stdio. Official hosted connectors use their own authentication/settings. Manual/client configurations must keep credentials outside project Git; optional SKILL.md is not installed automatically by npm.

```bash
codex mcp add flodesk --env FLODESK_TOKEN_FILE=/absolute/private/flodesk.txt -- npx -y @thenavidm/flodesk-mcp-cli@latest
```

## 5. Check it works

```bash
flodesk-cli --version
flodesk-cli tools
flodesk-cli list-accounts --agent
flodesk-cli doctor
flodesk-cli doctor --network
flodesk-cli list-subscribers --per-page 1 --agent --select meta,data.id
```

The release validates shared full/read-only discovery and native request fixtures. Actual authenticated provider reads/writes, desktop GUI installation and matched successful Codex task/token measurements require their own evidence. doctor without --network checks local configuration only. One successful subscriber read does not prove ownership or every permission; never trigger opt-ins/workflows to test installation.

## 6. Output, flags and exit codes

Native provider JSON/meta is preserved after recognized credential redaction. Audience records, draft HTML and emails can still contain private data. --select filters only the needed fields locally. save_subscriber_page writes one confirmed page exclusively into a private JSON file and returns saved-file metadata, not customer rows.

Native batch upserts can return HTTP 200 with successes and failures. Inspect both arrays; a 2xx transport status is not complete success. Workflow enrollment returns native acceptance/data; it does not prove messages completed. All requests happen once; provider state must resolve unknown outcomes before any repeat.

Use --payload or an absolute private --payload-file for full native bodies, mutually exclusive with flat body flags and each other. Primitive array flags repeat one value at a time; --subscribers and --tasks repeat individual JSON objects. The house bridge derives flag names from actual schema, including native campaign query capitalization and workflow perPage.

```bash
flodesk-cli list-subscribers --per-page 5 --agent --select meta,data.id
flodesk-cli list-workflows --help
flodesk-cli schema publish-studio-email
```

| Flag | Behavior |
| --- | --- |
| --agent | Compact JSON/no input/color; never approval |
| --confirm | Explicit requested-operation approval |
| --account LABEL | Exact private key/token profile |
| --select a,b.c | Local field selection |
| --payload / --payload-file | Complete exclusive native body input |
| --subscribers JSON | Repeat native batch-upsert item objects |
| --tasks JSON | Repeat ordered local review objects |
| --review-sha256 HASH | Exact matching ordered preview hash |
| --output-file PATH | New exclusive private page file |

| Exit | Meaning |
| --- | --- |
|0|Handler/receipt success; still inspect partial native failures|
|2|Invalid arguments or refused/unapproved operation|
|3|Not found|
|4|Auth/permission|
|5|API/network/unknown write outcome|
|7|Provider rate limit|
|10|Missing/invalid private configuration|


## 7. MCP or CLI and token cost

Both surfaces use the exact same real tool catalogue, handlers, argument validation and WriteGuard. CLI discovery/task-specific help can expose only requested command information; MCP clients determine their own discovery/loading strategy. No statement here assumes every client sends every schema on every turn.

Fresh matched successful **Codex** MCP-versus-CLI task measurements remain pending. Publish actual API-reported usage with client/version/model/date, equivalent successful task/output/permissions and measured latency/provider calls. Tool-list characters, fixtures, another service's numbers or another client's historic results cannot establish token savings. Claude Code measurements are optional separate follow-up and never a prerequisite for Codex or this release.

| Evidence | Current status |
| --- | --- |
| Actual shared full/read-only discovery | Verified release checks |
| Local mutation/read-only/account/partial-request behavior | Verified fixtures, no provider side effects |
| Matched successful Codex task/token comparison | Pending; no percentage claimed |
| Official hosted authenticated task comparison | Pending; documentation scope only |


## 8. Every tool and argument

#### `list_campaigns`

List campaigns.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |
| `Search` | No; body/guard requirements still apply | string | Exact native query parameter. |
| `OrderBy` | No; body/guard requirements still apply | string | Exact native query parameter. |
| `Sort` | No; body/guard requirements still apply | string | Exact native query parameter. |
| `Status` | No; body/guard requirements still apply | string | Exact native query parameter. enum: `["draft", "pending", "scheduled", "composing", "sending", "done", "failed"]`. |
| `SharedAsTemplate` | No; body/guard requirements still apply | boolean | Exact native query parameter. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `publish_canva_email`

Publish a Canva email design as a draft campaign.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `bundle_url` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `title` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `design_token` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `page_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `campaign_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `bundle_url` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `title` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `design_token` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `page_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `campaign_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |

#### `get_canva_design_state`

Get the latest Canva design state for auto-selecting campaigns.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `publish_studio_email`

Publish a Studio email export as a draft campaign.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `html` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `title` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `campaign_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `asset_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `html` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `title` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `campaign_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `asset_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |

#### `list_custom_fields`

List all custom fields (pagination).

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `create_custom_field`

Create a custom field.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `label` | No; body/guard requirements still apply | string | A friendly display label of the custom field. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `label` | Yes | string | A friendly display label of the custom field. |

#### `list_all_custom_fields`

List all custom fields.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `list_segments`

List all segments.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `create_segment`

Create a segment.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `color` | No; body/guard requirements still apply | string | The color of the segment using a hex code. `Use GET List all segment colors`. to view available colors. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `color` | No; body/guard requirements still apply | string | The color of the segment using a hex code. `Use GET List all segment colors`. to view available colors. |

#### `list_segment_colors`

List all segment colors.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `get_segment`

Retrieve a segment.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact native path parameter. minLength: `1`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `list_subscribers`

List all subscribers.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |
| `status` | No; body/guard requirements still apply | string | Optional. The subscriber's status.  `active`: The subscriber is currently active to receive marketing emails.   `unsubscribed`: The subscriber has opted out of marketing emails.   `unconfirmed`: The subscriber is pending for double opt-in confirmation.   `bounced`: The subscriber's address is undeliverable due to a hard bounce.   `complained`: The subscriber marked an email as spam.   `cleaned`: The subscriber was cleaned, learn more [here](https://help.flodesk.com/en/articles/4747969#how_can_i_find_out_which_email_addresses_have_been_cleaned).   `archived`: The subscriber was archived. enum: `["active", "unsubscribed", "unconfirmed", "bounced", "complained", "cleaned", "archived"]`. |
| `segment_id` | No; body/guard requirements still apply | string | Optional. The segment's id. When included, returns only subscribers who were added to the given segment. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `create_or_update_subscriber`

Create or update a subscriber.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard requirements still apply | string | The subscriber's `id`. Either `email` or `id` must be included. |
| `email` | No; body/guard requirements still apply | string | The subscriber's `email`. Either `email` or `id` must be included. |
| `first_name` | No; body/guard requirements still apply | string | The subscriber's first name. |
| `last_name` | No; body/guard requirements still apply | string | The subscriber's last name. |
| `custom_fields` | No; body/guard requirements still apply | object | An object containing custom field data. E.g. ``` "favorite_color": "Lavender" ```. |
| `segment_ids` | No; body/guard requirements still apply | array | The segments this subscriber will be added to. Cap at `50`. |
| `double_optin` | No; body/guard requirements still apply | boolean | Whether or not to require the subscriber to confirm subscription via email.  This option is only available to set with new subscriber creation. Default to `false` if not indicated. |
| `optin_ip` | No; body/guard requirements still apply | string | IP address from which the subscriber confirmed their opt-in. |
| `optin_timestamp` | No; body/guard requirements still apply | string | The date and time the subscribers confirmed their opt-in in ISO 8601 format. E.g. `2023-01-02T15:04:05.999Z`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.custom_fields**


**input.custom_fields.{key}**

Native JSON value; inspect the full schema for validation.

**input.segment_ids**


**input.segment_ids[]**

Native JSON value; inspect the full schema for validation.

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard requirements still apply | string | The subscriber's `id`. Either `email` or `id` must be included. |
| `email` | No; body/guard requirements still apply | string | The subscriber's `email`. Either `email` or `id` must be included. |
| `first_name` | No; body/guard requirements still apply | string | The subscriber's first name. |
| `last_name` | No; body/guard requirements still apply | string | The subscriber's last name. |
| `custom_fields` | No; body/guard requirements still apply | object | An object containing custom field data. E.g. ``` "favorite_color": "Lavender" ```. |
| `segment_ids` | No; body/guard requirements still apply | array | The segments this subscriber will be added to. Cap at `50`. |
| `double_optin` | No; body/guard requirements still apply | boolean | Whether or not to require the subscriber to confirm subscription via email.  This option is only available to set with new subscriber creation. Default to `false` if not indicated. |
| `optin_ip` | No; body/guard requirements still apply | string | IP address from which the subscriber confirmed their opt-in. |
| `optin_timestamp` | No; body/guard requirements still apply | string | The date and time the subscribers confirmed their opt-in in ISO 8601 format. E.g. `2023-01-02T15:04:05.999Z`. |

**input.payload.custom_fields**


**input.payload.custom_fields.{key}**

Native JSON value; inspect the full schema for validation.

**input.payload.segment_ids**


**input.payload.segment_ids[]**

Native JSON value; inspect the full schema for validation.

#### `batch_create_or_update_subscribers`

Create or update up to 50 subscribers in a single request.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `subscribers` | No; body/guard requirements still apply | array | List of subscribers to create or update. Maximum 50 items. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.subscribers**


**input.subscribers[]**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard requirements still apply | string | The subscriber's `id`. Either `email` or `id` must be included. |
| `email` | No; body/guard requirements still apply | string | The subscriber's `email`. Either `email` or `id` must be included. |
| `first_name` | No; body/guard requirements still apply | string | The subscriber's first name. |
| `last_name` | No; body/guard requirements still apply | string | The subscriber's last name. |
| `custom_fields` | No; body/guard requirements still apply | object | An object containing custom field data. E.g. ``` "favorite_color": "Lavender" ```. |
| `segment_ids` | No; body/guard requirements still apply | array | The segments this subscriber will be added to. Cap at `50`. |
| `double_optin` | No; body/guard requirements still apply | boolean | Whether or not to require the subscriber to confirm subscription via email.  This option is only available to set with new subscriber creation. Default to `false` if not indicated. |
| `optin_ip` | No; body/guard requirements still apply | string | IP address from which the subscriber confirmed their opt-in. |
| `optin_timestamp` | No; body/guard requirements still apply | string | The date and time the subscribers confirmed their opt-in in ISO 8601 format. E.g. `2023-01-02T15:04:05.999Z`. |

**input.subscribers[].custom_fields**


**input.subscribers[].custom_fields.{key}**

Native JSON value; inspect the full schema for validation.

**input.subscribers[].segment_ids**


**input.subscribers[].segment_ids[]**

Native JSON value; inspect the full schema for validation.

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `subscribers` | Yes | array | List of subscribers to create or update. Maximum 50 items. |

**input.payload.subscribers**


**input.payload.subscribers[]**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard requirements still apply | string | The subscriber's `id`. Either `email` or `id` must be included. |
| `email` | No; body/guard requirements still apply | string | The subscriber's `email`. Either `email` or `id` must be included. |
| `first_name` | No; body/guard requirements still apply | string | The subscriber's first name. |
| `last_name` | No; body/guard requirements still apply | string | The subscriber's last name. |
| `custom_fields` | No; body/guard requirements still apply | object | An object containing custom field data. E.g. ``` "favorite_color": "Lavender" ```. |
| `segment_ids` | No; body/guard requirements still apply | array | The segments this subscriber will be added to. Cap at `50`. |
| `double_optin` | No; body/guard requirements still apply | boolean | Whether or not to require the subscriber to confirm subscription via email.  This option is only available to set with new subscriber creation. Default to `false` if not indicated. |
| `optin_ip` | No; body/guard requirements still apply | string | IP address from which the subscriber confirmed their opt-in. |
| `optin_timestamp` | No; body/guard requirements still apply | string | The date and time the subscribers confirmed their opt-in in ISO 8601 format. E.g. `2023-01-02T15:04:05.999Z`. |

**input.payload.subscribers[].custom_fields**


**input.payload.subscribers[].custom_fields.{key}**

Native JSON value; inspect the full schema for validation.

**input.payload.subscribers[].segment_ids**


**input.payload.subscribers[].segment_ids[]**

Native JSON value; inspect the full schema for validation.

#### `get_subscriber`

Retrieve a subscriber.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id_or_email` | Yes | string | Exact native path parameter. minLength: `1`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `remove_subscriber_from_segments`

Remove the subscriber from segments.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id_or_email` | Yes | string | Exact native path parameter. minLength: `1`. |
| `segment_ids` | No; body/guard requirements still apply | array | An array of identifiers of the segments. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.segment_ids**


**input.segment_ids[]**

Native JSON value; inspect the full schema for validation.

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `segment_ids` | Yes | array | An array of identifiers of the segments. |

**input.payload.segment_ids**


**input.payload.segment_ids[]**

Native JSON value; inspect the full schema for validation.

#### `add_subscriber_to_segments`

Add the subscriber to segments.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id_or_email` | Yes | string | Exact native path parameter. minLength: `1`. |
| `segment_ids` | No; body/guard requirements still apply | array | An array of identifiers of the segments. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.segment_ids**


**input.segment_ids[]**

Native JSON value; inspect the full schema for validation.

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `segment_ids` | Yes | array | An array of identifiers of the segments. |

**input.payload.segment_ids**


**input.payload.segment_ids[]**

Native JSON value; inspect the full schema for validation.

#### `unsubscribe`

Unsubscribe from all lists.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id_or_email` | Yes | string | Exact native path parameter. minLength: `1`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |

#### `list_webhooks`

List all webhooks.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `create_webhook`

Create a webhook.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body/guard requirements still apply | string | The webhook name. |
| `post_url` | No; body/guard requirements still apply | string | The url that the webhook will post to. |
| `events` | No; body/guard requirements still apply | array | An array specifying which events are enabled for webhook notifications. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.events**


**input.events[]**

Native JSON value; inspect the full schema for validation.

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | Yes | string | The webhook name. |
| `post_url` | Yes | string | The url that the webhook will post to. |
| `events` | Yes | array | An array specifying which events are enabled for webhook notifications. |

**input.payload.events**


**input.payload.events[]**

Native JSON value; inspect the full schema for validation.

#### `delete_webhook`

Delete a webhook.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact native path parameter. minLength: `1`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |

#### `get_webhook`

Retrieve a webhook.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact native path parameter. minLength: `1`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

#### `update_webhook`

Update a webhook.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact native path parameter. minLength: `1`. |
| `name` | No; body/guard requirements still apply | string | The webhook name. |
| `post_url` | No; body/guard requirements still apply | string | The url that the webhook will post to. |
| `events` | No; body/guard requirements still apply | array | An array specifying which events are enabled for webhook notifications. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.events**


**input.events[]**

Native JSON value; inspect the full schema for validation.

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body/guard requirements still apply | string | The webhook name. |
| `post_url` | No; body/guard requirements still apply | string | The url that the webhook will post to. |
| `events` | No; body/guard requirements still apply | array | An array specifying which events are enabled for webhook notifications. |

**input.payload.events**


**input.payload.events[]**

Native JSON value; inspect the full schema for validation.

#### `list_workflows`

List workflows.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `statuses` | No; body/guard requirements still apply | array | filter by workflow statuses e.g. statuses=active,paused. Default is all statuses |
| `page` | No; body/guard requirements still apply | integer | Default = 1 minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `perPage` | No; body/guard requirements still apply | integer | Default = 10 Local positive integer validation; perPage has a local 100-item cap. minimum: `1`. maximum: `100`. format: `"int64"`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |

**input.statuses**


**input.statuses[]**

Native JSON value; inspect the full schema for validation.

#### `add_subscriber_to_workflow`

<br><b>Notes:</b>
<ul>
<li>In order for a subscriber to be added to a workflow subsequent times, (1) the subscriber has to have already completed the workflow, i.e. they cannot currently be active in the workflow, and (2) the "Allow repeat subscribers" setting for the workflow must be toggled on.</li>
<li>Subscribers cannot be added to abandoned cart workflows using this endpoint.</li>
</ul>

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `workflow_id` | Yes | string | Exact native path parameter. minLength: `1`. |
| `id` | No; body/guard requirements still apply | string | `id` is required if `email` is not present |
| `email` | No; body/guard requirements still apply | string | `email` is required if `id` is not present |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |
| `payload` | No; body/guard requirements still apply | object | Complete native JSON body; do not mix with body flags or payload_file. Arrays use repeated JSON object flags or a whole native array in a private file. |
| `payload_file` | No; body/guard requirements still apply | string | Absolute regular non-symlink JSON body file, at most 1 MiB. Cannot mix with payload/body flags. minLength: `1`. |

**input.payload**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard requirements still apply | string | `id` is required if `email` is not present |
| `email` | No; body/guard requirements still apply | string | `email` is required if `id` is not present |

#### `remove_subscriber_from_workflow`

Remove a subscriber from workflow.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `workflow_id` | Yes | string | Exact native path parameter. minLength: `1`. |
| `id_or_email` | Yes | string | Exact native path parameter. minLength: `1`. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Must be true for the requested mutation or exclusive private output file. |

#### `list_accounts`

Local profile labels/default/auth method only. No keys, token paths, provider identity or network request.

Kind: **Read**. Native account permissions and local semantics still apply.

Native JSON value; inspect the full schema for validation.

#### `get_operation_schema`

Local reviewed method/path/query/body schema and provenance for one native tool. No credentials or provider request.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `operation` | Yes | string | Exact native tool name, e.g. batch_create_or_update_subscribers or publish_studio_email. enum: `["list_campaigns", "publish_canva_email", "get_canva_design_state", "publish_studio_email", "list_custom_fields", "create_custom_field", "list_all_custom_fields", "list_segments", "create_segment", "list_segment_colors", "get_segment", "list_subscribers", "create_or_update_subscriber", "batch_create_or_update_subscribers", "get_subscriber", "remove_subscriber_from_segments", "add_subscriber_to_segments", "unsubscribe", "list_webhooks", "create_webhook", "delete_webhook", "get_webhook", "update_webhook", "list_workflows", "add_subscriber_to_workflow", "remove_subscriber_from_workflow"]`. |

#### `get_oauth_userinfo`

One fixed UserInfo GET for an explicitly selected externally minted OAuth access token. API keys refuse; no refresh, OAuth login or fallback.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `account` | No; body/guard requirements still apply | string | Exact selected private account profile; binds label, not key ownership. |

#### `preview_subscriber_batch`

Local validation and SHA-256 of exact ordered subscriber/segment/workflow/custom-field work, selected profile label and reviewed schema. No provider reads, key load, identity check, price or rollback guarantee.

Kind: **Read**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `tasks` | Yes | array | One to twenty exact ordered supported subscriber/segment/workflow/custom-field operations. Native batch upserts may affect up to50 subscribers per task; not a20-person budget. minItems: `1`. maxItems: `20`. |
| `account` | No; body/guard requirements still apply | string | Exact selected private account profile; binds label, not key ownership. |

**input.tasks**


**input.tasks[]**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `tool` | Yes | string | Native field; use the reviewed provider reference. enum: `["create_custom_field", "create_segment", "create_or_update_subscriber", "batch_create_or_update_subscribers", "remove_subscriber_from_segments", "add_subscriber_to_segments", "unsubscribe", "add_subscriber_to_workflow", "remove_subscriber_from_workflow"]`. |
| `arguments` | Yes | object | Actual native tool arguments without account, confirm, payload_file or output_file. |

#### `submit_subscriber_batch`

Confirmed one-to-twenty ordered subscriber/segment/workflow/custom-field tasks. Prevalidate all and verify exact hash before first request. Stop on first failure with known results/failed index/unattempted indices; no retries, rollback or implicit continuation.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `tasks` | Yes | array | One to twenty exact ordered supported subscriber/segment/workflow/custom-field operations. Native batch upserts may affect up to50 subscribers per task; not a20-person budget. minItems: `1`. maxItems: `20`. |
| `account` | No; body/guard requirements still apply | string | Exact selected private account profile; binds label, not key ownership. |
| `confirm` | No; body/guard requirements still apply | boolean | Explicit approval for this exact requested ordered batch. |
| `review_sha256` | Yes | string | Exact preview_subscriber_batch hash for identical requests, profile label, schema and order. pattern: `"^[a-f0-9]{64}$"`. |

**input.tasks**


**input.tasks[]**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `tool` | Yes | string | Native field; use the reviewed provider reference. enum: `["create_custom_field", "create_segment", "create_or_update_subscriber", "batch_create_or_update_subscribers", "remove_subscriber_from_segments", "add_subscriber_to_segments", "unsubscribe", "add_subscriber_to_workflow", "remove_subscriber_from_workflow"]`. |
| `arguments` | Yes | object | Actual native tool arguments without account, confirm, payload_file or output_file. |

#### `save_subscriber_page`

Confirmed one-page GET saved only to an exclusive new0600 JSON file. No CSV/cohort export, all-pages loop, overwrite, automatic upload or browser preview.

Kind: **Confirmed operation**. Native account permissions and local semantics still apply.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |
| `status` | No; body/guard requirements still apply | string | Optional. The subscriber's status.  `active`: The subscriber is currently active to receive marketing emails.   `unsubscribed`: The subscriber has opted out of marketing emails.   `unconfirmed`: The subscriber is pending for double opt-in confirmation.   `bounced`: The subscriber's address is undeliverable due to a hard bounce.   `complained`: The subscriber marked an email as spam.   `cleaned`: The subscriber was cleaned, learn more [here](https://help.flodesk.com/en/articles/4747969#how_can_i_find_out_which_email_addresses_have_been_cleaned).   `archived`: The subscriber was archived. enum: `["active", "unsubscribed", "unconfirmed", "bounced", "complained", "cleaned", "archived"]`. |
| `segment_id` | No; body/guard requirements still apply | string | Optional. The segment's id. When included, returns only subscribers who were added to the given segment. |
| `account` | No; body/guard requirements still apply | string | Exact configured private account profile label; not a tenant or provider account ID. |
| `confirm` | No; body/guard requirements still apply | boolean | Explicit approval for this exact requested ordered batch. |
| `output_file` | Yes | string | Absolute new file in an existing private directory. Restrict Windows ACLs separately. minLength: `1`. |

##### Native list_campaigns: GET /campaigns

List campaigns.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |
| `Search` | No; body/guard requirements still apply | string | Exact native query parameter. |
| `OrderBy` | No; body/guard requirements still apply | string | Exact native query parameter. |
| `Sort` | No; body/guard requirements still apply | string | Exact native query parameter. |
| `Status` | No; body/guard requirements still apply | string | Exact native query parameter. enum: `["draft", "pending", "scheduled", "composing", "sending", "done", "failed"]`. |
| `SharedAsTemplate` | No; body/guard requirements still apply | boolean | Exact native query parameter. |

No JSON body.

##### Native publish_canva_email: POST /campaigns/canva

Publish a Canva email design as a draft campaign.

Native JSON value; inspect the full schema for validation.

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `bundle_url` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `title` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `design_token` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `page_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `campaign_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |

##### Native get_canva_design_state: GET /campaigns/canva/design-state

Get the latest Canva design state for auto-selecting campaigns.

Native JSON value; inspect the full schema for validation.

No JSON body.

##### Native publish_studio_email: POST /campaigns/studio

Publish a Studio email export as a draft campaign.

Native JSON value; inspect the full schema for validation.

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `html` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `title` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `campaign_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `asset_id` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |

##### Native list_custom_fields: GET /custom-fields

List all custom fields (pagination).

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |

No JSON body.

##### Native create_custom_field: POST /custom-fields

Create a custom field.

Native JSON value; inspect the full schema for validation.

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `label` | Yes | string | A friendly display label of the custom field. |

##### Native list_all_custom_fields: GET /custom-fields/all

List all custom fields.

Native JSON value; inspect the full schema for validation.

No JSON body.

##### Native list_segments: GET /segments

List all segments.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |

No JSON body.

##### Native create_segment: POST /segments

Create a segment.

Native JSON value; inspect the full schema for validation.

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body/guard requirements still apply | string | Native field; use the reviewed provider reference. |
| `color` | No; body/guard requirements still apply | string | The color of the segment using a hex code. `Use GET List all segment colors`. to view available colors. |

##### Native list_segment_colors: GET /segments/colors

List all segment colors.

Native JSON value; inspect the full schema for validation.

No JSON body.

##### Native get_segment: GET /segments/{id}

Retrieve a segment.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact native path parameter. minLength: `1`. |

No JSON body.

##### Native list_subscribers: GET /subscribers

List all subscribers.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |
| `status` | No; body/guard requirements still apply | string | Optional. The subscriber's status.  `active`: The subscriber is currently active to receive marketing emails.   `unsubscribed`: The subscriber has opted out of marketing emails.   `unconfirmed`: The subscriber is pending for double opt-in confirmation.   `bounced`: The subscriber's address is undeliverable due to a hard bounce.   `complained`: The subscriber marked an email as spam.   `cleaned`: The subscriber was cleaned, learn more [here](https://help.flodesk.com/en/articles/4747969#how_can_i_find_out_which_email_addresses_have_been_cleaned).   `archived`: The subscriber was archived. enum: `["active", "unsubscribed", "unconfirmed", "bounced", "complained", "cleaned", "archived"]`. |
| `segment_id` | No; body/guard requirements still apply | string | Optional. The segment's id. When included, returns only subscribers who were added to the given segment. |

No JSON body.

##### Native create_or_update_subscriber: POST /subscribers

Create or update a subscriber.

Native JSON value; inspect the full schema for validation.

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard requirements still apply | string | The subscriber's `id`. Either `email` or `id` must be included. |
| `email` | No; body/guard requirements still apply | string | The subscriber's `email`. Either `email` or `id` must be included. |
| `first_name` | No; body/guard requirements still apply | string | The subscriber's first name. |
| `last_name` | No; body/guard requirements still apply | string | The subscriber's last name. |
| `custom_fields` | No; body/guard requirements still apply | object | An object containing custom field data. E.g. ``` "favorite_color": "Lavender" ```. |
| `segment_ids` | No; body/guard requirements still apply | array | The segments this subscriber will be added to. Cap at `50`. |
| `double_optin` | No; body/guard requirements still apply | boolean | Whether or not to require the subscriber to confirm subscription via email.  This option is only available to set with new subscriber creation. Default to `false` if not indicated. |
| `optin_ip` | No; body/guard requirements still apply | string | IP address from which the subscriber confirmed their opt-in. |
| `optin_timestamp` | No; body/guard requirements still apply | string | The date and time the subscribers confirmed their opt-in in ISO 8601 format. E.g. `2023-01-02T15:04:05.999Z`. |

**input.custom_fields**


**input.custom_fields.{key}**

Native JSON value; inspect the full schema for validation.

**input.segment_ids**


**input.segment_ids[]**

Native JSON value; inspect the full schema for validation.

##### Native batch_create_or_update_subscribers: POST /subscribers/batch

Create or update up to 50 subscribers in a single request.

Native JSON value; inspect the full schema for validation.

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `subscribers` | Yes | array | List of subscribers to create or update. Maximum 50 items. |

**input.subscribers**


**input.subscribers[]**

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard requirements still apply | string | The subscriber's `id`. Either `email` or `id` must be included. |
| `email` | No; body/guard requirements still apply | string | The subscriber's `email`. Either `email` or `id` must be included. |
| `first_name` | No; body/guard requirements still apply | string | The subscriber's first name. |
| `last_name` | No; body/guard requirements still apply | string | The subscriber's last name. |
| `custom_fields` | No; body/guard requirements still apply | object | An object containing custom field data. E.g. ``` "favorite_color": "Lavender" ```. |
| `segment_ids` | No; body/guard requirements still apply | array | The segments this subscriber will be added to. Cap at `50`. |
| `double_optin` | No; body/guard requirements still apply | boolean | Whether or not to require the subscriber to confirm subscription via email.  This option is only available to set with new subscriber creation. Default to `false` if not indicated. |
| `optin_ip` | No; body/guard requirements still apply | string | IP address from which the subscriber confirmed their opt-in. |
| `optin_timestamp` | No; body/guard requirements still apply | string | The date and time the subscribers confirmed their opt-in in ISO 8601 format. E.g. `2023-01-02T15:04:05.999Z`. |

**input.subscribers[].custom_fields**


**input.subscribers[].custom_fields.{key}**

Native JSON value; inspect the full schema for validation.

**input.subscribers[].segment_ids**


**input.subscribers[].segment_ids[]**

Native JSON value; inspect the full schema for validation.

##### Native get_subscriber: GET /subscribers/{id_or_email}

Retrieve a subscriber.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id_or_email` | Yes | string | Exact native path parameter. minLength: `1`. |

No JSON body.

##### Native remove_subscriber_from_segments: DELETE /subscribers/{id_or_email}/segments

Remove the subscriber from segments.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id_or_email` | Yes | string | Exact native path parameter. minLength: `1`. |

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `segment_ids` | Yes | array | An array of identifiers of the segments. |

**input.segment_ids**


**input.segment_ids[]**

Native JSON value; inspect the full schema for validation.

##### Native add_subscriber_to_segments: POST /subscribers/{id_or_email}/segments

Add the subscriber to segments.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id_or_email` | Yes | string | Exact native path parameter. minLength: `1`. |

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `segment_ids` | Yes | array | An array of identifiers of the segments. |

**input.segment_ids**


**input.segment_ids[]**

Native JSON value; inspect the full schema for validation.

##### Native unsubscribe: POST /subscribers/{id_or_email}/unsubscribe

Unsubscribe from all lists.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id_or_email` | Yes | string | Exact native path parameter. minLength: `1`. |

No JSON body.

##### Native list_webhooks: GET /webhooks

List all webhooks.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `page` | No; body/guard requirements still apply | integer | The page number. Defaults to 1. minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `per_page` | No; body/guard requirements still apply | integer | The number of records to be returned on each page. Defaults to 20. Maximum 100. minimum: `1`. maximum: `100`. format: `"int64"`. |

No JSON body.

##### Native create_webhook: POST /webhooks

Create a webhook.

Native JSON value; inspect the full schema for validation.

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | Yes | string | The webhook name. |
| `post_url` | Yes | string | The url that the webhook will post to. |
| `events` | Yes | array | An array specifying which events are enabled for webhook notifications. |

**input.events**


**input.events[]**

Native JSON value; inspect the full schema for validation.

##### Native delete_webhook: DELETE /webhooks/{id}

Delete a webhook.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact native path parameter. minLength: `1`. |

No JSON body.

##### Native get_webhook: GET /webhooks/{id}

Retrieve a webhook.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact native path parameter. minLength: `1`. |

No JSON body.

##### Native update_webhook: PUT /webhooks/{id}

Update a webhook.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | Yes | string | Exact native path parameter. minLength: `1`. |

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `name` | No; body/guard requirements still apply | string | The webhook name. |
| `post_url` | No; body/guard requirements still apply | string | The url that the webhook will post to. |
| `events` | No; body/guard requirements still apply | array | An array specifying which events are enabled for webhook notifications. |

**input.events**


**input.events[]**

Native JSON value; inspect the full schema for validation.

##### Native list_workflows: GET /workflows

List workflows.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `statuses` | No; body/guard requirements still apply | array | filter by workflow statuses e.g. statuses=active,paused. Default is all statuses |
| `page` | No; body/guard requirements still apply | integer | Default = 1 minimum: `1`. maximum: `9007199254740991`. format: `"int64"`. |
| `perPage` | No; body/guard requirements still apply | integer | Default = 10 Local positive integer validation; perPage has a local 100-item cap. minimum: `1`. maximum: `100`. format: `"int64"`. |

**input.statuses**


**input.statuses[]**

Native JSON value; inspect the full schema for validation.

No JSON body.

##### Native add_subscriber_to_workflow: POST /workflows/{workflow_id}/subscribers

<br><b>Notes:</b>
<ul>
<li>In order for a subscriber to be added to a workflow subsequent times, (1) the subscriber has to have already completed the workflow, i.e. they cannot currently be active in the workflow, and (2) the "Allow repeat subscribers" setting for the workflow must be toggled on.</li>
<li>Subscribers cannot be added to abandoned cart workflows using this endpoint.</li>
</ul>

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `workflow_id` | Yes | string | Exact native path parameter. minLength: `1`. |

Native body: | Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `id` | No; body/guard requirements still apply | string | `id` is required if `email` is not present |
| `email` | No; body/guard requirements still apply | string | `email` is required if `id` is not present |

##### Native remove_subscriber_from_workflow: DELETE /workflows/{workflow_id}/subscribers/{id_or_email}

Remove a subscriber from workflow.

| Argument | Required | Type | Details |
| --- | --- | --- | --- |
| `workflow_id` | Yes | string | Exact native path parameter. minLength: `1`. |
| `id_or_email` | Yes | string | Exact native path parameter. minLength: `1`. |

No JSON body.

## 9. Subscriber, draft and automation workflows

Start with one intended account and exact IDs. Read current subscriber status/membership, segment colors and available workflow IDs before approving changes. Do not infer consent or enroll all matching rows from a display name. Native upsert accepts id or email; optional optin_ip/optin_timestamp preserve supplied provenance rather than inventing it. Its status filter now includes unconfirmed, cleaned and archived.

Use native batch upsert for 1–50 explicit subscribers. It is distinct from the official MCP's dynamic-cohort archive/export actions. Inspect every successes/failures item and repeat only an explicitly reviewed correction after resolving unknown outcomes.

Segment removal changes membership and retains the subscriber record; unsubscribe changes subscription state. Workflow addition can trigger real automation messages and is refused until confirmed. Provider re-entry/completion/abandoned-cart restrictions still apply; the wrapper does not circumvent them.

Create a webhook only for the explicitly chosen HTTPS receiver and requested native events. No receiver is called by this local client. Event delivery is provider behavior after configuration; a creation response is not a receiver/test-delivery success. Native public REST does not expose a signing-key creation/rotation endpoint, and none is invented.

Publish reviewed native HTML via publish_studio_email, or an approved exported bundle_url via publish_canva_email. These create/update draft campaigns; sending/scheduling remains outside this API. The old blanket statement that no campaign creation exists is corrected. Never treat a returned draft URL as a sent campaign receipt.

```bash
flodesk-cli get-subscriber --id-or-email YOUR_SUBSCRIBER_ID --account work --agent
flodesk-cli list-workflows --agent
flodesk-cli get-operation-schema --operation publish_studio_email --agent
flodesk-cli create-or-update-subscriber --help
flodesk-cli save-subscriber-page --per-page 1 --output-file /absolute/private/page-001.json --account work --confirm --agent
```

## 10. Exact reviewed batches and pagination

preview_subscriber_batch is fully local: validate 1–20 ordered subscriber/segment/workflow/custom-field tasks against current packaged schemas and native semantics. It loads no key/file and makes no provider read. SHA-256 binds ordered exact requests/tasks, selected profile label/auth type and snapshot. It is not a real-cohort preview, final recipient count, cryptographic approval, current provider-state lock or verified account ownership. A changed key can keep the same label.

submit_subscriber_batch requires explicit confirmation and the matching hash. Every task is validated before the first request. Native batch-upsert tasks may each affect 50 subscribers:20 tasks is not a 20-recipient budget. Stop on first failure, partial native HTTP 200 result or incomplete native receipt, returning knownResults/failedIndex/unattemptedIndices without automatic retry, replay, rollback or implicit continuation. Earlier subscriber/workflow effects can persist.

Official preview_bulk_change and preview_segment_count already count real filtered audiences, issue single-use 120-second tokens and validate cohort growth. Our exact local ordered REST review has a different purpose and cannot replace those safeguards. Hosted tokens are not accepted here.

Native lists return one meta page. Carry the actual route's page/per_page or workflow page/perPage with unchanged filters/account. list_all_custom_fields is a named native all-fields route, not a generic automatic all-pages loop. Local perPage cap 100 is explicit. No full-audience export or all_pages option is invented.

```bash
flodesk-cli preview-subscriber-batch --tasks '{"tool":"create_or_update_subscriber","arguments":{"email":"person@example.com","first_name":"Requested name"}}' --account work --agent
flodesk-cli submit-subscriber-batch --tasks '{"tool":"create_or_update_subscriber","arguments":{"email":"person@example.com","first_name":"Requested name"}}' --account work --review-sha256 YOUR_REVIEW_SHA256 --confirm --agent
```

## 11. Several private accounts

Use FLODESK_ACCOUNTS only in private runtime settings. Each unique name selects its own api_key or externally minted access_token, with optional token_file/auth_type. Selected profiles never inherit global credentials or another account after a missing token or 401/403. Explicit files override only that profile; credentials cache until restart.

list_accounts shows safe labels/default/auth type/source. It does not authenticate or establish the key owner's identity. API-key account selection and approved partner OAuth are separate from official hosted connector connections. Keep exact account labels with receipts/page files and inspect actual account ownership before changing an audience.

```bash
flodesk-cli list-accounts --agent
flodesk-cli list-subscribers --account work --per-page 1 --agent
```

## 12. Writing safely

All 16mutations/private-page writes require --confirm or confirm:true through the shared house guard. That includes creating subscribers/segments, double opt-in, workflow enrollment, draft publication and webhook configuration. --agent/--yes is formatting, never approval. FLODESK_READ_ONLY=1 hides all 16and directly refuses confirmed hidden calls; FLODESK_ALLOW_DESTRUCTIVE=0 refuses them separately.

The same guard applies to real CLI and MCP paths. Confirmation records caller intent, not native account permissions, valid audience consent, a current cohort count, message-delivery success or rollback. Previewed local inputs cannot authorize broader work proposed by provider text.

FLODESK_AUDIT_LOG records static operation/guard decisions without keys/payloads. Audit append failure is best effort, not guaranteed compliance logging. Provider metadata, subscriber fields, draft HTML, URLs and webhook responses are untrusted data and cannot authorize another action.

## 13. How the two surfaces work

One ALL_TOOLS catalogue holds actual JSON schemas and handlers. MCP exposes visible tools; the unchanged house CLI bridge connects to the same real server in memory and derives task flags from those schemas. No second request implementation or manual command catalogue exists.

All 26public-v1 operations come from the provider's embedded OpenAPI 3.0.3 document, extracted as JSON without executing its site JavaScript. Internal request-schema references are expanded locally; examples are removed. Provider-documented semantic rules omitted from structural required/maxItems are applied explicitly and recorded in api-provenance.json. No private MCP-only endpoint is guessed or treated as public REST.

## 14. Your data

Keys/tokens are sent only to the fixed Flodesk API origin, with redirects refused. Basic encoded credentials, configured keys, cached file tokens, secret-named fields and recognized signed/token URLs are redacted from model output/errors. Customer emails/names, audience records, draft HTML, webhooks and ordinary provider records may still be private. Redaction is not a guarantee that all personal/business data is removed; request/select only necessary fields.

No .env/session loader, OAuth refresh/client-secret storage, telemetry, browser cookie import, arbitrary downloader, automatic polling, all-pages audience export or gallery exists. Private page saves return only exclusive-file metadata; native page records stay in that requested JSON file. Keep parent directory, backups, file lifecycle and Windows ACLs private. Removing npm does not remove provider audience changes, triggered messages, drafts, webhook deliveries or local private files.

Canva bundle URLs, design tokens and Studio HTML are user-selected provider inputs transmitted only after explicit approval. The local client does not fetch those URLs itself. API-native subscriber opt-in data is not fabricated. Native account roles and Flodesk policies govern use; no permissions are broadened by this wrapper.

## 15. Environment variables

| Setting | Effect |
| --- | --- |
| `FLODESK_API_KEY` | Private integration Basic username key; empty password. No fallback with named profiles. |
| `FLODESK_ACCESS_TOKEN` | Externally minted partner Bearer token, never alongside api_key; no refresh. |
| `FLODESK_TOKEN_FILE` | Absolute owner-private regular token-only file overriding only selected direct credential. |
| `FLODESK_AUTH_TYPE` | oauth for Bearer token files; blank infers inline credential or defaults file to api_key. |
| `FLODESK_ACCOUNTS` | Private unique {name,api_key,access_token,token_file,auth_type} profiles. |
| `FLODESK_DEFAULT_ACCOUNT` | Exact selected private profile label, not provider owner proof. |
| `FLODESK_READ_ONLY` | 1/true hides and directly refuses all 16confirmed operations. |
| `FLODESK_ALLOW_DESTRUCTIVE` | 0/false refuses confirmed operations too. |
| `FLODESK_AUDIT_LOG` | Optional best-effort static guard log without payload/key. |
| `FLODESK_REQUEST_TIMEOUT_MS` | Default 30000; allowed 100–300000; no automatic retries. |
| `FLODESK_MIN_REQUEST_INTERVAL_MS` | Default 650; allowed 0–10000; process-wide ordinary spacing. |
| `FLODESK_BATCH_MIN_REQUEST_INTERVAL_MS` | Default 3100; allowed 0–60000; separate native batch-upsert window. |

## 16. Updates and removal

Use npx -y @thenavidm/flodesk-mcp-cli@latest for fresh process launches and restart/reconnect existing clients. Global installs require npm update -g; versioned desktop bundles require a new bundle installation. Read major changes first and preserve intended account configuration.

Remove only the requested MCP registration, skill/global package or desktop extension. Revoke private keys/partner OAuth/official connector access separately, and review provider webhooks/workflows/private audience files. Uninstalling does not unsend opt-in/automation messages or undo subscriber/draft changes.

```bash
npm update -g @thenavidm/flodesk-mcp-cli
flodesk-cli --version
# Removal only when requested
codex mcp remove flodesk
npm uninstall -g @thenavidm/flodesk-mcp-cli
```

## 17. Troubleshooting

| Symptom | Check and resolution |
| --- | --- |
| Node/binary missing | Node 22+ and npm executable PATH; reopen terminal, npm.cmd if Windows policy needs it. |
| Mixed key/token config | Choose one api_key or access_token per profile. |
| File treated as Basic | Explicit auth_type:oauth/FLODESK_AUTH_TYPE=oauth for a Bearer token file. |
|401/403|Check intended key/token/account access; expired OAuth requires private partner renewal and process restart.|
|429|Respect 100/minute standard and 20/minute native-batch limits; other clients share quota.|
| Empty upsert or workflow identity | Provide nonempty id/email and exact requested native fields. |
| Segment removal fails | Use actual id_or_email/segment_ids; required JSON body is sent on DELETE. |
| Native batch HTTP 200 failures | Inspect successes and failures individually, without replaying successes. |
| Workflow enrollment rejected |Check completed/repeat-subscriber setting and abandoned-cart restriction.|
| Review mismatch |Preview exact inputs/order/profile label/auth type/snapshot again.|
| Unknown write outcome |Inspect provider state before any explicit retry.|
| Existing page file |Choose a new absolute file; no overwrite.|
| Analytics/archive/export missing |Those are official MCP-only tools, outside current public REST.|
| Draft URL but no sent mail |Canva/Studio publication creates a draft; no send/schedule endpoint is provided.|
| GUI/remote environment differs |Configure private settings/files/Node in that actual runtime and restart.|


## 18. API coverage and comparisons

| Offering | Current reviewed evidence | Capabilities and boundaries |
| --- | --- | --- |
| [Official hosted MCP](https://mcp.flodesk.com/docs) | Production field reference 35 tools, format 3, catalog 7c6870e8b9c66a4d366fc4c0abc53504721dd7c85cf3de9e3c5a202ef50d05f0, checked 2026-10-03 | Analytics, campaign content/performance, audience engagement/cohort filters, forms/checkouts/workflows, CSV export and bulk archive/unarchive/segment actions. Previews already have exact compiled-filter bindings, single-use 120-second tokens and cohort-growth checks. Public docs count is not authenticated tools/list or a tested account outcome. |
| [Official help](https://help.flodesk.com/en/articles/12573377) | Updated September 11, 2026; earlier individual-action phase | Documents OAuth connections and destructive-operation confirmation. It still says bulk actions are unavailable; current production catalog documents them. Read current field reference rather than using old absence as our advantage. |
| [Public REST API](https://developers.flodesk.com/) | OpenAPI 3.0.3, API 1.0.0, 26 operations, 19 paths | API keys or approved partner OAuth; subscriber batch upsert, native workflow enrollment/removal, custom fields, webhook CRUD and Canva/Studio draft publication. This public API does not expose the official MCP's analytics/cohort/export/archive routes. |
| [Community Rails MCP](https://github.com/mymat-yoga/flodesk-mcp) | [Pinned main source](https://github.com/mymat-yoga/flodesk-mcp/tree/0a240219d675d294df4c531b8208ff1aced05d48), checked 2026-10-03 | The repository description advertises Rails, OAuth 2.1 and encrypted per-user keys, but this public main tree contains only a five-line Gemfile. No implemented tools/client/README are available at this revision, so advertised functionality is unverified; no runtime account test was run. |
| [Community Worker example](https://github.com/chris-enea/remote-mcp-flodesk2/tree/a02fbf0f1eac0f246df07204768bfb8d6af6b8f0) | Pinned source checked 2026-10-03, package 0.0.0/private | Its actual server declares Authless Calculator with only add and calculate. No Flodesk API client or subscriber workflow exists in this revision. No runtime deployment was tested. |
| This owned companion | Shared local stdio MCP, task CLI and versioned desktop bundle | 32 tasks: 16 reads, 16 confirmed operations. All 26 public-v1 native routes, OAuth UserInfo, local profile/schema helpers, exact ordered subscriber review and exclusive private single-page files. Native REST draft/custom-field/webhook/workflow operations and repeatable terminal automation add useful scope. No hosted analytics/cohort filter engine, CSV export, native archive/unarchive, OAuth login/refresh or token-saving claim. |

No official task CLI is identified in the reviewed vendor docs/current registry results. That is a scoped research finding, not proof that no CLI exists anywhere. Provider @flodesk/grain is a component/design package, not a task CLI. A command spelling or 32 versus 35 tools does not establish superiority.

Build criterion: useful repeatable terminal/local-stdio access to native public REST work absent from the current 35-tool hosted catalog, including draft exports, custom-field management, webhook CRUD, explicit workflow enrollment/removal and 50-subscriber upsert. Verified local guards and exact ordered request review support that companion. Official analytics, engagement, cohort counting and two-minute provider-side confirmation tokens remain strengths; our local preview is not an equivalent real-cohort count or replacement for their safeguards.


## 19. Versions and migration

| Component | Reviewed version |
| --- | --- |
| Package/desktop manifest | 2.0.1 |
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

## 20. FAQ

<details>
<summary><b>What does this package provide?</b></summary>

A shared 32-task CLI, local stdio MCP and versioned desktop extension for current public Flodesk REST operations, exact ordered reviews and private account files.

</details>

<details>
<summary><b>Does Flodesk have an official MCP?</b></summary>

Yes. Its current production field reference lists 35 tools with useful analytics, cohort filters, subscriber actions, CSV export and bulk controls. This companion does not replace those capabilities.

</details>

<details>
<summary><b>Does the official MCP already review bulk changes?</b></summary>

Yes. preview_bulk_change/preview_segment_count bind real filtered audiences to single-use confirmation tokens that expire after 120 seconds. Local exact REST request review has a different purpose.

</details>

<details>
<summary><b>Why build this companion?</b></summary>

Repeatable terminal/local-stdio workflows cover native custom fields, webhook CRUD, explicit workflow enrollment/removal,50-subscriber upsert and Canva/Studio draft exports absent from the reviewed hosted catalog.

</details>

<details>
<summary><b>Which clients and operating systems work?</b></summary>

Node 22+ CLI/local stdio on macOS, Windows and Linux. INSTALL covers Codex, Claude Code/Desktop, Cursor, VS Code, Windsurf, Zed, Gemini, Cline and Docker; each runtime needs its private settings.

</details>

<details>
<summary><b>Do I need Claude Code for Codex?</b></summary>

No. Codex registers the same npm package directly. Claude-specific benchmarks are optional and do not block Codex setup.

</details>

<details>
<summary><b>Can it send or schedule campaigns?</b></summary>

No. Current native Canva/Studio publish routes create/update drafts. No public send/schedule endpoint is invented or called.

</details>

<details>
<summary><b>Can subscriber operations trigger messages?</b></summary>

Yes. A new-subscriber double opt-in can send confirmation, and workflow/segment actions can trigger automation. They require approval and are unsuitable installation smoke tests.

</details>

<details>
<summary><b>How does native subscriber batch work?</b></summary>

It accepts 1–50 explicit id/email records. HTTP 200 may contain successes and failures; inspect each. Native batch limits are separate from ordinary REST quota.

</details>

<details>
<summary><b>Do all old tool names remain?</b></summary>

All 20remain, with major native argument corrections: id,post_url,id/email enrollment, perPage and statuses CSV. The dropped DELETE segment-removal body is fixed.

</details>

<details>
<summary><b>API key or OAuth token?</b></summary>

Private integrations use the API key as a Basic username with an empty password. Approved partner integrations may supply externally minted Bearer tokens. Choose exactly one per profile; no OAuth login/refresh occurs here.

</details>

<details>
<summary><b>Can I use several accounts?</b></summary>

Yes. Unique private profiles select only their own key/token/file, with exact labels and no global/cross-account fallback. A label is not authenticated owner proof.

</details>

<details>
<summary><b>How does a token file choose auth type?</b></summary>

API key by default; set FLODESK_AUTH_TYPE=oauth or profile auth_type:"oauth" for a Bearer token file. The file overrides only that selected profile and caches until restart.

</details>

<details>
<summary><b>What does local batch review verify?</b></summary>

Exact ordered inputs/requests, packaged schemas and selected profile label/auth type. It reads no provider data and does not establish current cohort size, real ownership, final side effects or cryptographic human approval.

</details>

<details>
<summary><b>What happens on partial or unknown failure?</b></summary>

Execution stops with knownResults,failedIndex and unattemptedIndices. Earlier changes/messages may persist; no retry, replay, rollback or automatic continuation occurs.

</details>

<details>
<summary><b>Does read-only block direct calls?</b></summary>

Yes. FLODESK_READ_ONLY hides all 16confirmed operations and the shared guard directly refuses confirmed calls. --agent/--yes never approve work.

</details>

<details>
<summary><b>What does private page saving do?</b></summary>

One selected subscriber page is written exclusively into a new private JSON file. It is not a CSV/cohort/all-pages export; console output contains file metadata rather than customer records.

</details>

<details>
<summary><b>Are my audience records fully redacted?</b></summary>

No. Known credentials are redacted, but names/emails/HTML/native records can still be private. Select only necessary fields and keep private files/parents/Windows ACLs restricted.

</details>

<details>
<summary><b>Is token efficiency measured?</b></summary>

Fresh equivalent successful Codex task/API-usage measurements remain pending. Tool counts, character estimates, fixtures or another service/client’s old metrics do not establish savings.

</details>

<details>
<summary><b>How do I update or disconnect?</b></summary>

Reconnect/restart npm@latest processes; update global installs and desktop bundles explicitly. Remove only the requested registration, then revoke exact keys/OAuth separately and review retained files/provider effects.

</details>

## Questions

Open a sanitized [issue](https://github.com/thenavidm/flodesk-mcp-cli/issues). Use SECURITY.md for private reports.

## About the author

Navid Moazzez is a leading AI business strategist, and the host of the AI Creator Summit, watched by 100,000+ creators. He helps creators and founders master AI and build their own AI Operating System (AI OS) to automate their business and life. This Flodesk MCP server and CLI is one piece of that system.

**Links**

- Personal website: [navid.me](https://navid.me?utm_source=github&utm_medium=referral&utm_campaign=flodesk-mcp-cli&utm_content=readme)
- Link in bio: [navid.bio](https://navid.bio?utm_source=github&utm_medium=referral&utm_campaign=flodesk-mcp-cli&utm_content=readme)
- Navid Media: [navid.media](https://navid.media?utm_source=github&utm_medium=referral&utm_campaign=flodesk-mcp-cli&utm_content=readme)
- YouTube: [@thenavidm](https://youtube.com/@thenavidm?sub_confirmation=1) and [@thenavidai](https://youtube.com/@thenavidai?sub_confirmation=1)
- X: [@thenavidm](https://x.com/thenavidm)
- Instagram: [@thenavidm](https://instagram.com/thenavidm)
- LinkedIn: [thenavidm](https://linkedin.com/in/thenavidm)

If this is useful, star the repo and come say hi on [X](https://x.com/thenavidm).

## Dependencies

Runtime: MCP TypeScript SDK, Ajv and ajv-formats. Development: TypeScript, Vitest, Vite and MCPB. Exact locked versions appear above. Packaging tools are excluded from desktop runtime.

## License

Preserves [AGPL-3.0](LICENSE) and existing private legacy history. Read [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Flodesk service terms and trademarks remain separate.

---

© 2026 [Navid Media](https://navid.media). Made with ❤️ by [Navid Moazzez](https://navid.me).
