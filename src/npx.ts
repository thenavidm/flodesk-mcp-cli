#!/usr/bin/env node
/**
 * What `npx -y @thenavidm/flodesk-mcp-cli` runs.
 *
 * npx starts a binary named after the package when the package's binaries
 * point to different files. When they all share one file it starts whichever
 * one the registry lists first, and the registry does not keep the order they
 * were published in, so it could start flodesk-cli and hand an MCP client the
 * command list instead of a server. This file starts the entry as flodesk-mcp.
 */
process.argv[1] = (process.argv[1] ?? "").replace(/[^/\\]*$/, "flodesk-mcp");
void import("./index.js");
