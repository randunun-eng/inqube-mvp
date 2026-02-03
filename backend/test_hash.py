
from core.security import get_password_hash
try:
    print(f"Hashing 'password123'...")
    h = get_password_hash("password123")
    print(f"Hash success: {h}")
except Exception as e:
    print(f"Hash failed: {e}")
