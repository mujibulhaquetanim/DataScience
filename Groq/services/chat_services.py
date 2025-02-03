from Groq.services.groq_client import GroqClient

# this class will take GroqClient as a parameter and will use it to generate a chat completion
class chatService:
    def __init__(self, groq_client: GroqClient):
        self.groq_client = groq_client
    
    def generate_response(self, messages: list, model: str)-> str:
        chat_completion = self.groq_client.get_chat_completion(messages=messages, model=model)
        return chat_completion.choices[0].message.content