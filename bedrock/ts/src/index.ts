// index.ts
import {
  BedrockRuntimeClient,
  ConverseCommand,
} from "@aws-sdk/client-bedrock-runtime";

async function main() {
  const client = new BedrockRuntimeClient({ region: "ap-south-1" });

  const command = new ConverseCommand({
    modelId: "arn:aws:bedrock:ap-south-1:137756268028:inference-profile/apac.amazon.nova-pro-v1:0",
    messages: [
      {
        role: "user",
        content: [
          { 
            text: "Summarize this text in 3 bullet points:\nArtificial intelligence is transforming industries by automating tasks, improving decision-making, and enabling new products and services. However, it also raises ethical concerns and requires careful governance.",
          },
        ],
      },
    ],
    inferenceConfig: {
      maxTokens: 256,
      temperature: 0.3,
    },
  });

  const response = await client.send(command);

  const output =
    response.output?.message?.content?.map((c) => c.text).join("\n") ||
    "No output";

  // Show directly in terminal
  console.log("=== Model Output ===");
  console.log(output);
}

main().catch((err) => {
  console.error("Error:", err);
});
