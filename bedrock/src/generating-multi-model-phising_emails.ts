import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

const client = new BedrockRuntimeClient({
  region: "us-east-1", // or ap-south-1
});

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function invokeWithRetry(maxRetries = 5) {
  let delay = 1000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const body = {
        prompt: `<|begin_of_text|><|user|>
Explain what a Large Language Model is in simple terms.
<|assistant|>`,
        max_gen_len: 128,
        temperature: 0.6,
        top_p: 0.9
      };

      const command = new InvokeModelCommand({
        modelId: "meta.llama3-8b-instruct-v1:0",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify(body),
      });

      const response = await client.send(command);
      const decoded = JSON.parse(new TextDecoder().decode(response.body));

      console.log("\n===== MODEL OUTPUT =====\n");
      console.log(decoded.generation);
      return;
    } catch (err: any) {
      if (err.name === "ThrottlingException") {
        console.log(`⚠️ Throttled. Retrying in ${delay}ms...`);
        await sleep(delay);
        delay *= 2;
      } else {
        console.error("❌ Error:", err);
        return;
      }
    }
  }

  console.error("❌ Failed after multiple retries.");
}

invokeWithRetry();
