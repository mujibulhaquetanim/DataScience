import os

class APIKeyProvider:
    def __init__(self, env_var_name: str):
        self.env_var_name = env_var_name

    def get_api_key(self) -> str:
        api_key = os.environ.get(self.env_var_name)
        if not api_key:
            raise ValueError(f"Environment variable '{self.env_var_name}' is not set.")
        return api_key