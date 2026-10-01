import {
  BedrockClient,
  ListFoundationModelsCommand,
} from "@aws-sdk/client-bedrock";

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const controlClient = new BedrockClient({ region: "us-east-1" });
const runtimeClient = new BedrockRuntimeClient({ region: "us-east-1" });

/**
 * List all available models in your region
 */
async function listModels() {
  const res = await controlClient.send(new ListFoundationModelsCommand({}));
  console.log("\n===== Available Models =====\n");
  res.modelSummaries?.forEach((m) => {
    console.log(
      `${m.modelId} → ${m.modelName} [${m.providerName}] | Types: ${m.inferenceTypesSupported?.join(", ")}`
    );
  });
}

/**
 * Unified invocation helper
 */
async function invokeModel(modelId: string, prompt: string) {
  let body: any;

  if (modelId.startsWith("anthropic")) {
    body = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 256,
      messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
    };
  } else {
    body = {
      input_text: prompt,
      max_gen_len: 256,
      temperature: 0.7,
      top_p: 0.9,
    };
  }

  const command = new InvokeModelCommand({
    modelId, // must be ON_DEMAND modelId
    contentType: "application/json",
    accept: "application/json",
    body: JSON.stringify(body),
  });

  const response = await runtimeClient.send(command);
  const decoded = JSON.parse(new TextDecoder().decode(response.body));

  console.log(`\n===== ${modelId} OUTPUT =====\n`);
  if (decoded.generation) {
    console.log(decoded.generation);
  } else if (decoded.outputText) {
    console.log(decoded.outputText);
  } else if (decoded.content) {
    console.log(decoded.content[0].text);
  } else {
    console.log(decoded);
  }
}

/**
 * Demo run
 */
(async () => {
  await listModels();

  // Only invoke ON_DEMAND models here
  await invokeModel("anthropic.claude-3-5-sonnet-20241022-v1:0", "Explain LLMs simply.");
  await invokeModel("mistral.mistral-large-3-675b-instruct", "Explain LLMs simply.");
  await invokeModel("openai.gpt-oss-20b-1:0", "Explain LLMs simply.");
  await invokeModel("google.gemma-3-12b-it", "Explain LLMs simply.");
  await invokeModel("nvidia.nemotron-nano-12b-v2", "Explain LLMs simply.");
})();
