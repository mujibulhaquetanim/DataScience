from langchain_groq import ChatGroq
import os

class LangChainClient:
    def __init__(self, model: str, temperature: float, max_retries: int):
        self.model = model,
        self.temperature = temperature,
        self.max_retries = max_retries
        
        api_key = os.environ.get("GROQ_API_KEY")
        
        if not api_key:
            raise ValueError("Environment variable 'GROQ_API_KEY' is not set.")
        
        self.client = ChatGroq(api_key=api_key, model=self.model, temperature=self.temperature, max_retries=self.max_retries)
        
    def get_chat_completion(self, messages: list) -> str:
        return self.client.invoke(messages=messages)