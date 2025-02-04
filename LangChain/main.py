

from LangChain.services.chat_service import ChatService
from LangChain.services.langchain_client import LangChainClient


def main():
    model = "deepseek-r1-distill-llama-70b"
    temperature = 0.7
    max_retries = 3
    
    langchain_client = LangChainClient(model=model, temperature=temperature, max_retries=max_retries)
    chat_service = ChatService(langchain_client=langchain_client)
    
    text = "I have a fever. I feel sick"
    response = chat_service.generate_response(text)
    print(response)


if __name__ == "__main__":
    main()