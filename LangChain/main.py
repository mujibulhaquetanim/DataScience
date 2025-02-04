from dotenv import load_dotenv
from LangChain.services.chat_service import ChatService
from LangChain.services.langchain_client import LangChainClient

# Load environment variables from .env file.
load_dotenv()

def main():
    model = "deepseek-r1-distill-llama-70b"  
    temperature = 0.7                       
    max_retries = 3                         
    
    # Initialize the LangChain client with correct scalar values.
    langchain_client = LangChainClient(model=model, temperature=temperature, max_retries=max_retries)
    
    # Create an instance of ChatService using the LangChain client.
    chat_service = ChatService(langchain_client=langchain_client)
    
    text = "I have a fever. I feel sick"
    response = chat_service.generate_response(text)
    print(response)

if __name__ == "__main__":
    main()
