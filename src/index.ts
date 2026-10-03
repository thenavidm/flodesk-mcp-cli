#!/usr/bin/env node
import{StdioServerTransport}from'@modelcontextprotocol/sdk/server/stdio.js';import{buildServer,VERSION}from'./server.js';import{runCli,exitCodeFor}from'./cli.js';import{runDoctor}from'./doctor.js';import{basename}from'node:path';
const HELP=`Flodesk MCP and shared task CLI ${VERSION}
flodesk-mcp                            Local stdio MCP
flodesk-cli <command> --help            Actual shared arguments
flodesk-cli schema <command>            Actual JSON input schema
flodesk-cli doctor [--network]          Local settings / explicit subscriber read
flodesk-cli login                      Private setup instructions only
FLODESK_API_KEY / FLODESK_TOKEN_FILE        Private Basic account key; external Bearer token also supported
FLODESK_ACCOUNTS                       Named isolated API key / OAuth profiles
FLODESK_DEFAULT_ACCOUNT                Exact account profile label
FLODESK_READ_ONLY=1                    Hide and directly refuse mutations/file writes
FLODESK_ALLOW_DESTRUCTIVE=0             Refuse mutations even when confirmed
FLODESK_REQUEST_TIMEOUT_MS             Default 30000; no automatic retries
FLODESK_MIN_REQUEST_INTERVAL_MS        Default650; native batch default3100; process-wide request pacing
`;
async function main():Promise<void>{const args=process.argv.slice(2),command=args[0];if(['--version','-v'].includes(command??'')){console.log(VERSION);return;}if(['--help','-h','help'].includes(command??'')){process.stdout.write(HELP);return;}if(command==='login'){console.log('Create the intended private integration API key through https://app.flodesk.com/account/integration/api; Basic username is the key with an empty password. Store privately in FLODESK_API_KEY or absolute owner-private FLODESK_TOKEN_FILE. FLODESK_ACCESS_TOKEN / auth_type:oauth support externally minted partner Bearer tokens; no OAuth login/refresh or official connector session import. Named profiles never inherit global credentials. Existing official MCP connections are separate and already have analytics/cohort/bulk approval. login prints instructions only.');return;}if(command==='doctor'){if(args.slice(1).some(a=>a!=='--network')){process.exitCode=2;console.error(JSON.stringify({error:'doctor accepts only --network'}));return;}process.exitCode=await runDoctor(args.includes('--network'));return;}if(args.length||basename(process.argv[1]??'').startsWith('flodesk-cli')){process.exitCode=await runCli(args);return;}const server=buildServer();await server.connect(new StdioServerTransport());for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>void server.close().then(()=>process.exit(0)));}
main().catch(e=>{console.error(JSON.stringify({error:e.message}));process.exitCode=exitCodeFor(e.message);});
