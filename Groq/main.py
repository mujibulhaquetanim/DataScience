import os
from dotenv import load_dotenv

from Groq.services.api_key_provider import APIKeyProvider
from Groq.services.chat_services import chatService
from Groq.services.groq_client import GroqClient

load_dotenv()

def main():
    key_provider = APIKeyProvider("GROQ_API_KEY")
    
    try:
        api_key = key_provider.get_api_key()
    except ValueError as e:
        print(e)
        return
    
    groq_client= GroqClient(api_key)
    chat_service = chatService(groq_client)
    
    messages = [
        {
            "role": "system",
            "content": "You are a helpful translator. Translate the user sentence to Bangla.",
        },
        {
            "role": "user",
            "content": "I love programming.",
        }
    ]
    
    # used new deepseek model
    model= "deepseek-r1-distill-llama-70b"
    
    try:
        response = chat_service.generate_response(messages, model)
        print("\nResponse:\n")
        print(response)
    except Exception as e:
        print(e)
        

if __name__ == "__main__":
    main()