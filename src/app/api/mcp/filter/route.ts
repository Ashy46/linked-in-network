import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js"

import { Client } from "@modelcontextprotocol/sdk/client/index.js"


const hdwConfig = {
  "hdwAccessToken": process.env.HDW_ACCESS_TOKEN,
  "hdwAccountId": process.env.HDW_ACCOUNT_ID,
}

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  const openai_key = process.env.OPENAI_API_KEY;
  const smithery_key = process.env.SMITHERY_KEY;

  const openai = new OpenAI({
    apiKey: openai_key,
  });

  // Create server URL like the Python example
  const configB64 = Buffer.from(JSON.stringify(hdwConfig)).toString('base64');
  const serverUrl = new URL(`https://server.smithery.ai/@horizondatawave/hdw-mcp-server/mcp?config=${configB64}&api_key=${smithery_key}`);

  const transport = new StreamableHTTPClientTransport(serverUrl)
  
  const client = new Client({
    name: "linkedin_filter",
    version: "1.0.0",
  })

  await client.connect(transport)

  const tools = await client.listTools()

  console.log(tools)

  return NextResponse.json({ tools })
}









