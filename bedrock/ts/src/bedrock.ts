import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const REGION = "us-east-1";
const MODEL_ID = "amazon.nova-pro-v1:0"; // single source of truth

export const bedrock = new BedrockRuntimeClient({ region: REGION });

async function readStream(stream: any): Promise<string> {
  if (!stream) return "";
  if (Buffer.isBuffer(stream)) return stream.toString("utf-8");

  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString("utf-8");
}

/**
 * Unified AI call – text in, text out
 */
export async function generateText(prompt: string) {
  const body = {
    input: prompt,
    max_tokens: 800,
    temperature: 0.4
  };

  const command = new InvokeModelCommand({
    modelId: MODEL_ID,
    contentType: "application/json",
    body: JSON.stringify(body),
  });

  const response = await bedrock.send(command);
  const raw = await readStream(response.body);

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}
