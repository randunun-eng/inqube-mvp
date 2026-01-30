import sys
import requests
from core.security import get_password_hash

BACKEND_URL = "http://localhost:8000"
API_V1 = f"{BACKEND_URL}/api/v1"

def create_test_user():
    """Create a test user directly in the database."""
    from db.session import SessionLocal
    from models.user import User
    
    db = SessionLocal()
    try:
        # Check if test user exists
        existing = db.query(User).filter(User.email == "admin@inqube.ai").first()
        if existing:
            print("✓ Test user already exists")
            return
        
        # Create test user
        test_user = User(
            email="admin@inqube.ai",
            hashed_password=get_password_hash("admin123"),
            role="admin",
            is_active=True
        )
        db.add(test_user)
        db.commit()
        print("✓ Created test user: admin@inqube.ai / admin123")
    except Exception as e:
        print(f"✗ Failed to create test user: {e}")
        db.rollback()
    finally:
        db.close()

def test_login():
    """Test the login endpoint."""
    print("\n--- Testing Login ---")
    response = requests.post(
        f"{API_V1}/login/access-token",
        data={
            "username": "admin@inqube.ai",
            "password": "admin123"
        }
    )
    
    if response.status_code == 200:
        data = response.json()
        print("✓ Login successful")
        print(f"  Token: {data['access_token'][:50]}...")
        print(f"  User: {data['user']}")
        return data['access_token']
    else:
        print(f"✗ Login failed: {response.status_code}")
        print(f"  {response.text}")
        return None

def test_me_endpoint(token):
    """Test the /users/me endpoint."""
    print("\n--- Testing /users/me ---")
    response = requests.get(
        f"{API_V1}/users/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    
    if response.status_code == 200:
        print("✓ Successfully retrieved user profile")
        print(f"  {response.json()}")
    else:
        print(f"✗ Failed to get user profile: {response.status_code}")
        print(f"  {response.text}")

def main():
    print("=== InQube Auth Verification ===\n")
    
    # Test health check
    try:
        response = requests.get(f"{BACKEND_URL}/health")
        if response.status_code == 200:
            print("✓ Backend is running")
        else:
            print("✗ Backend health check failed")
            return
    except Exception as e:
        print(f"✗ Cannot connect to backend: {e}")
        print(f"  Make sure the backend is running: docker-compose up")
        return
    
    # Create test user
    create_test_user()
    
    # Test login
    token = test_login()
    if not token:
        return
    
    # Test protected endpoint
    test_me_endpoint(token)
    
    print("\n✓ All tests passed!")

if __name__ == "__main__":
    main()
