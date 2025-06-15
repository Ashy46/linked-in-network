import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { LINKED_IN_MCP_URL } from "@/lib/utils/util";

export async function POST(request: NextRequest) {
  const { text } = await request.json();
  const response = await fetch(LINKED_IN_MCP_URL, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}









