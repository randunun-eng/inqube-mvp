from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from backend.models.base import Base

class Alert(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    sensor_id = Column(UUID(as_uuid=True), ForeignKey("sensor.id"))
    severity = Column(String) # Info, Warning, Critical
    message = Column(String)
    acknowledged = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Decision(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id = Column(UUID(as_uuid=True), ForeignKey("user.id"))
    alert_id = Column(UUID(as_uuid=True), ForeignKey("alert.id"), nullable=True)
    action_taken = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
