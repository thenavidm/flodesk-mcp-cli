# Install Flodesk MCP Server & CLI

One npm package includes both binaries and all **32 tools**. Requires Node.js 22 or newer for CLI/manual MCP installs. Discovery works before account authentication. Account operations need intended Flodesk account REST API access; provider account plans, key permissions and API quota apply.

| Route | Program | Use |
| --- | --- | --- |
| Terminal | flodesk-cli | Scripts and agents with a shell |
| Local MCP | flodesk-mcp | AI clients supporting stdio |
| Desktop archive | flodesk-2.0.0.mcpb | Compatible Claude Desktop custom extensions |
| Flodesk-hosted alternative | https://flodesk.com/mcp | Official remote provider-hosted access |

## Contents

[Requirements](#requirements) · [CLI](#cli) · [Private account setup](#private-account-setup) · [Claude Code](#claude-code) · [Codex](#codex) · [Claude Desktop](#claude-desktop) · [Cursor](#cursor) · [VS Code and Copilot](#vs-code-and-copilot) · [Windsurf](#windsurf) · [Zed](#zed) · [Gemini CLI](#gemini-cli) · [Docker](#docker) · [Verify](#verify) · [Multiple accounts](#multiple-accounts) · [Updates and removal](#updates-and-removal) · [Troubleshooting](#troubleshooting) · [Development](#development)

## Requirements

Install Node from [nodejs.org](https://nodejs.org/en/download). Open a new terminal and check `node --version` and `npm --version`. The desktop host needs a compatible Node runtime; dependencies are bundled. A GUI app may not inherit your terminal's environment. Check your account's current API access and quota with Flodesk instead of assuming npm installation provides it.

## CLI

On macOS/Linux, use Terminal. On Windows, use PowerShell or Command Prompt:

```bash
npm install -g @thenavidm/flodesk-mcp-cli@latest
flodesk-cli --version
flodesk-cli
flodesk-cli list-subscribers --help
flodesk-cli schema create-or-update-subscriber
flodesk-cli login
```

If PowerShell blocks npm.ps1, use npm.cmd or Command Prompt according to your policy. If a binary is missing, check `npm prefix -g`, ensure its executable directory is on PATH and open a new terminal. Avoid sudo as a workaround for PATH problems.

For one command without a global install:

```bash
npx -y --package @thenavidm/flodesk-mcp-cli@latest flodesk-cli tools
```

Make [SKILL.md](./SKILL.md) available in your agent's supported skill location. The installed file is `<npm root -g>/@thenavidm/flodesk-mcp-cli/SKILL.md`. npm does not automatically register client skills. Your agent should read the actual schema and use --agent/--select for compact output.

## Private account setup

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

The September 11 help article describes an earlier24-tool/individual-action phase and says bulk work is upcoming; the current production catalog describes35 tools and bulk workflows. Treat that as documented source drift. Marketing's broad future-control examples do not establish current send/schedule support. This local public-REST package does not call private MCP-only analytics/cohort routes or accept the hosted connector's confirmation tokens.

### Quotas and effects

The AGPL wrapper is free; Flodesk subscription/API eligibility and account policies remain separate. [Native REST limits](https://developers.flodesk.com/#section/Rate-Limiting) are 100 requests/minute normally and 20/minute for POST /subscribers/batch, up to 50 subscribers per request. X-Fd-RateLimit headers report remaining capacity. Our process spacing defaults 650 ms, plus a separate 3100 ms batch window. Other processes/apps share account quota; local pacing is not provider enforcement or a guaranteed distributed limiter.

No automatic retries, including reads,429,5xx, redirects or timeouts. A failed write can leave an unknown result, duplicate webhook/segment or triggered message. Inspect provider state before deliberately repeating. JSON requests cap 1 MiB and responses 5 MiB. Each native list returns one page with its own meta/page semantics, not an all-pages backup. Workflow statuses use native CSV and perPage; campaign query names retain native capitalization.

Canva and Studio publish draft campaign exports, not send/schedule emails. Subscriber upsert can create or update by id/email; up to50 segment IDs are supported. double_optin applies only to newly created subscribers and can send a confirmation message. Workflow re-entry needs prior completion and Allow repeat subscribers; abandoned-cart workflows cannot be enrolled through this route. Unsubscribe changes subscription state without pretending to delete the record. Removing segment membership is distinct and sends the required native DELETE JSON body.

### Revocation and retained data

Revoke the intended key at Flodesk, replace private settings/files and restart. Revoke partner OAuth/official connector authorization separately. Package/client removal does not undo audience changes, sent opt-ins/workflow effects, drafts, webhooks or private audience-page files. Retain receipts and investigate unknown outcomes before explicitly requested cleanup.


```bash
export FLODESK_TOKEN_FILE='/absolute/private/flodesk.txt'
flodesk-cli doctor --network
```

### Agent-guided installation

> Help me install Flodesk MCP Server & CLI with INSTALL.md. Check Node and the binary, let me configure my account credentials privately, then run discovery and doctor --network. Do not change or mutate accounts during setup.

## Codex

Codex is the current validation priority. Private token paths must exist in the process or remote environment where the server runs.

~~~bash
codex mcp add flodesk -- npx -y @thenavidm/flodesk-mcp-cli@latest
codex mcp list
~~~

Account credentials must reach the server through private environment settings. `codex mcp add --env NAME=value` stores values in your local config, so never commit that config or put secrets in a shared command. In TOML, the equivalent server is:

~~~toml
[mcp_servers.flodesk]
command = "npx"
args = ["-y", "@thenavidm/flodesk-mcp-cli@latest"]
env_vars = ["FLODESK_API_KEY", "FLODESK_TOKEN_FILE", "FLODESK_ACCOUNTS", "FLODESK_DEFAULT_ACCOUNT", "FLODESK_READ_ONLY", "FLODESK_ALLOW_DESTRUCTIVE"]
~~~

`env_vars` forwards those names from the environment available to Codex. If that environment does not contain them, configure private env settings locally. Codex can also call the CLI directly with SKILL.md and `--agent` output.

## Claude Code

For a user-scoped connection, after privately configuring credentials:

~~~bash
claude mcp add --scope user flodesk -- npx -y @thenavidm/flodesk-mcp-cli@latest
claude mcp list
~~~

Use the client's private local environment settings for the account variable if they are not inherited. Claude's `-e NAME=value` registration option writes values into its config; only use it locally through your secret manager, with no shared command transcript. Never place credentials in a project .mcp.json. Reconnect and ask Claude to verify credentials.

Alternatively install the CLI, make SKILL.md available to Claude, and use shell commands. Registering both surfaces is optional.

## Claude Desktop

### Install the .mcpb extension

1. Download `flodesk-2.0.0.mcpb` from [GitHub Releases](https://github.com/thenavidm/flodesk-mcp-cli/releases/latest).
2. In a supported Claude Desktop build, open **Settings > Extensions > Advanced settings > Install Extension…** and select it.
3. Enter a private API key in the sensitive setting, or an absolute private token-file path. Leave the unused credential method empty. Requests use Authorization: Bearer at the fixed Flodesk endpoint. Use the intended account API key; named profiles are configured separately in private client environments.
4. Enable read-only if you want only the 22 read operations. Reconnect and ask for account verification.

The bundle includes production dependencies and no credentials. Use a regular private token-only file if you prefer file-based credentials. The manifest requires Node 22 or newer from a compatible host. Organization policy may restrict custom extensions. Manual bundle updates require installing the new version; no automatic directory updates are promised. GUI installation remains unverified separately from archive/protocol checks.

### Manual config

Open **Settings > Developer > Edit Config**, or use your platform's config file:

| OS | Typical config path |
| --- | --- |
| macOS | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux | `~/.config/Claude/claude_desktop_config.json`; confirm the location through Edit Config in your installed build |

~~~json
{
  "mcpServers": {
    "flodesk": {
      "command": "npx",
      "args": ["-y", "@thenavidm/flodesk-mcp-cli@latest"],
      "env": {
        "FLODESK_API_KEY": "YOUR_PRIVATE_API_KEY",
        "FLODESK_TOKEN_FILE": ""
      }
    }
  }
}
~~~

Replace the placeholders only in your private file. Merge the server entry into an existing mcpServers object instead of replacing other integrations. Fully quit and reopen Claude Desktop. Do not enable an extension and a manual entry with the same name; choose one route.

If a Windows launcher cannot execute npx directly, use `"command": "cmd"` with `"args": ["/c", "npx", "-y", "@thenavidm/flodesk-mcp-cli@latest"]`. An absolute node executable and installed `dist/index.js` path also avoids launcher/PATH problems.

## Cursor

Use private user settings at `~/.cursor/mcp.json`, or **Settings > Tools & MCP**. [Cursor documents environment interpolation and envFile support](https://cursor.com/docs/mcp).

~~~json
{
  "mcpServers": {
    "flodesk": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/flodesk-mcp-cli@latest"],
      "env": {
        "FLODESK_API_KEY": "${env:FLODESK_API_KEY}",
        "FLODESK_TOKEN_FILE": "${env:FLODESK_TOKEN_FILE}"
      }
    }
  }
}
~~~

The environment values must exist for the Cursor process. If you use envFile, keep that file private and outside version control. A project's .cursor/mcp.json must not contain actual credentials. Reconnect the server after saving.

## VS Code and Copilot

Use **MCP: Open User Configuration**. [VS Code uses servers and secure inputs](https://code.visualstudio.com/docs/agent-customization/mcp-servers), rather than a mcpServers root:

~~~json
{
  "inputs": [
    {"type": "promptString", "id": "flodesk-api-token", "description": "Flodesk API key (leave empty for a private token file)", "password": true},
    {"type": "promptString", "id": "flodesk-token-file", "description": "Optional private token-file path (leave empty for API key)"}
  ],
  "servers": {
    "flodesk": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@thenavidm/flodesk-mcp-cli@latest"],
      "env": {
        "FLODESK_API_KEY": "${input:flodesk-api-token}",
        "FLODESK_TOKEN_FILE": "${input:flodesk-token-file}"
      }
    }
  }
}
~~~

Start Flodesk through the MCP controls, approve trust if prompted, and enter credentials in the private input prompts. Workspace .vscode/mcp.json may contain this placeholder-only structure, but never resolved secret values. Remote development runs the server in the selected remote environment, so local file paths refer to that environment.

## Windsurf

Open Cascade's MCP settings or edit the private user file `~/.codeium/windsurf/mcp_config.json`. Use the Claude Desktop manual mcpServers block above with your locally configured env values. See [Windsurf's current MCP documentation](https://docs.devin.ai/desktop/cascade/mcp). Restart or reconnect Flodesk in Cascade; project files must not contain secrets.

## Zed

Open **Settings > AI > MCP Servers > Add Server > Add Local Server**, or your user settings file. [Zed uses context_servers](https://zed.dev/docs/ai/mcp):

~~~json
{
  "context_servers": {
    "flodesk": {
      "command": "npx",
      "args": ["-y", "@thenavidm/flodesk-mcp-cli@latest"],
      "env": {
        "FLODESK_API_KEY": "YOUR_PRIVATE_API_KEY",
        "FLODESK_TOKEN_FILE": ""
      }
    }
  }
}
~~~

Enter actual values only in private user settings. Check the active-server indicator before prompting. Do not wrap command and args inside a nested command object from older Zed examples.

## Gemini CLI

Merge the Claude Desktop manual mcpServers block into your private `~/.gemini/settings.json`. Configure the private credential values locally, then restart Gemini CLI and inspect `/mcp`. See [Gemini CLI's MCP configuration](https://geminicli.com/docs/tools/mcp-server/). Its project settings must not contain real credentials. You can instead use the CLI from an agent shell.

Other local stdio clients use the same command and arguments, adapted to their config format. A client that only accepts a remote MCP URL cannot connect directly: this package does not ship a public HTTP listener. ChatGPT's remote connector setup is not a substitute for local stdio installation.

## Docker

Build locally from the reviewed source; no prebuilt registry image is claimed:

```bash
git clone https://github.com/thenavidm/flodesk-mcp-cli.git
cd flodesk-mcp-cli
docker build -t flodesk-mcp-cli .
docker run --rm -i -e FLODESK_API_KEY flodesk-mcp-cli
```


## Cline and other local MCP clients

Use the client's **Add MCP server** flow with command `npx`, arguments `-y` and `@thenavidm/flodesk-mcp-cli@latest`, stdio transport, and private local FLODESK_API_KEY or FLODESK_TOKEN_FILE settings. UI names depend on the installed client. Reconnect and discover tools before an account call. Browser-only clients need a remote HTTPS connector; use Flodesk's official server rather than this local stdio command.

## Verify

```bash
flodesk-cli --version
flodesk-cli tools
flodesk-cli list-accounts --agent
flodesk-cli doctor
flodesk-cli doctor --network
flodesk-cli list-subscribers --per-page 1 --agent --select meta,data.id
```

The release validates shared full/read-only discovery and native request fixtures. Actual authenticated provider reads/writes, desktop GUI installation and matched successful Codex task/token measurements require their own evidence. doctor without --network checks local configuration only. One successful subscriber read does not prove ownership or every permission; never trigger opt-ins/workflows to test installation.

## Multiple accounts

Use FLODESK_ACCOUNTS only in private runtime settings. Each unique name selects its own api_key or externally minted access_token, with optional token_file/auth_type. Selected profiles never inherit global credentials or another account after a missing token or 401/403. Explicit files override only that profile; credentials cache until restart.

list_accounts shows safe labels/default/auth type/source. It does not authenticate or establish the key owner's identity. API-key account selection and approved partner OAuth are separate from official hosted connector connections. Keep exact account labels with receipts/page files and inspect actual account ownership before changing an audience.

```bash
flodesk-cli list-accounts --agent
flodesk-cli list-subscribers --account work --per-page 1 --agent
```

## Updates and removal

Use npx -y @thenavidm/flodesk-mcp-cli@latest for fresh process launches and restart/reconnect existing clients. Global installs require npm update -g; versioned desktop bundles require a new bundle installation. Read major changes first and preserve intended account configuration.

Remove only the requested MCP registration, skill/global package or desktop extension. Revoke private keys/partner OAuth/official connector access separately, and review provider webhooks/workflows/private audience files. Uninstalling does not unsend opt-in/automation messages or undo subscriber/draft changes.

```bash
npm update -g @thenavidm/flodesk-mcp-cli
flodesk-cli --version
# Removal only when requested
codex mcp remove flodesk
npm uninstall -g @thenavidm/flodesk-mcp-cli
```

## Troubleshooting

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


## Development

```bash
git clone https://github.com/thenavidm/flodesk-mcp-cli.git
cd flodesk-mcp-cli
npm ci
npm run typecheck
npm run build
npm test
npm run check:counts
npm run build:mcpb
```

Source mode: configure private env, then register `node /absolute/path/flodesk-mcp-cli/dist/index.js` as the MCP command. Build before registration and after source changes. No local credentials are packaged. [CONTRIBUTING.md](./CONTRIBUTING.md), [SECURITY.md](./SECURITY.md) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md) cover contributions, disclosures and licensing.


## Desktop authentication options

The bundled settings accept an API key or externally minted OAuth access token, never both. A selected token file overrides only that credential. Leave token-file auth type blank for an API key; enter oauth when the file contains a Bearer token. Named profiles use manual private runtime settings; no partner registration/login/refresh or hosted-session import occurs. Restart after replacing settings.
