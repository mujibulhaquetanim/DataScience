from LangChain.services.langchain_client import LangChainClient


class ChatService:
    def __init__(self, lanchain_client: LangChainClient):
        self.langchain_client = lanchain_client
    
    def generate_response(self, text: str) -> str:
        
        messages = [{"role": "system", "content": "You are a helpful doctor. Help the patient "},{"role": "user", "content": text}]
        
        return self.langchain_client.get_chat_completion(messages=messages)