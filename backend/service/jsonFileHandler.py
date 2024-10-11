import json
import os

class JsonFileHandler:
    def __init__(self, relativePath):
        "relative path from backend -> Windows: C:\\....\\backend\\ or MacOS /Users/.../backend/"
        current_dir = os.path.dirname(os.path.abspath(__file__))
        
        self.filepath =  os.path.join(os.path.dirname(current_dir),relativePath)
    def read_json(self)->dict:
        """Reads and returns data from a .json file"""
        print(self.filepath)
        if not os.path.exists(self.filepath):
            raise FileNotFoundError(f"The file {self.filepath} does not exist.")
        
        with open(self.filepath, 'r', encoding='utf-8') as file:
            try:
                data = json.load(file)
                return data
            except json.JSONDecodeError as e:
                raise ValueError(f"Error decoding the JSON file: {e}")
    
    def write_json(self, data):
        """Writes data to a .json file"""
        with open(self.filepath, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)

    def update_json(self, key, value):
        """Updates a specific key in the JSON file"""
        data = self.read_json()
        data[key] = value
        self.write_json(data)

    def delete_key(self, key):
        """Deletes a specific key from the JSON file"""
        data = self.read_json()
        if key in data:
            del data[key]
            self.write_json(data)
        else:
            raise KeyError(f"The key {key} is not found in the JSON file.")