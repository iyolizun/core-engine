import os
import json
import logging
from typing import Any, Dict, Optional

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def read_json_file(file_path: str) -> Optional[Dict[str, Any]]:
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        logging.error(f"File not found: {file_path}")
    except json.JSONDecodeError:
        logging.error(f"Invalid JSON in file: {file_path}")
    return None

def write_json_file(file_path: str, data: Dict[str, Any]) -> bool:
    try:
        with open(file_path, 'w') as file:
            json.dump(data, file, indent=4)
        return True
    except IOError:
        logging.error(f"Failed to write to file: {file_path}")
        return False

def ensure_directory_exists(directory: str) -> bool:
    if not os.path.exists(directory):
        try:
            os.makedirs(directory)
            return True
        except OSError:
            logging.error(f"Failed to create directory: {directory}")
            return False
    return True

def get_file_extension(file_path: str) -> str:
    _, ext = os.path.splitext(file_path)
    return ext.lower()

def is_valid_file(file_path: str, allowed_extensions: Optional[list] = None) -> bool:
    if not os.path.isfile(file_path):
        return False
    if allowed_extensions:
        ext = get_file_extension(file_path)
        return ext in allowed_extensions
    return True