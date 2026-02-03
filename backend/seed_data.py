
import logging
from sqlalchemy.orm import Session
from db.session import SessionLocal, engine
from models.user import User
from core.security import get_password_hash

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db(db: Session) -> None:
    # Check if admin exists
    user = db.query(User).filter(User.email == "admin@inqube.com").first()
    if not user:
        logger.info("Creating superuser admin@inqube.com")
        user = User(
            email="admin@inqube.com",
            hashed_password=get_password_hash("password123"),
            # full_name="Admin User",
            is_active=True,
            # is_superuser=True,
            role="admin"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        logger.info("Superuser created successfully")
    else:
        logger.info("Superuser already exists")

def main() -> None:
    db = SessionLocal()
    try:
        init_db(db)
    finally:
        db.close()

if __name__ == "__main__":
    main()
