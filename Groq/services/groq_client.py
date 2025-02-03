from groq import Groq

class GroqClient:
    def __init__(self, api_key: str):
        self.client = Groq(api_key=api_key)
        
    def get_chat_completion(self, messages: list, model: str):
        # call the Groq API to generate a chat completion
        return self.client.chat.completions.create(messages=messages, model=model)