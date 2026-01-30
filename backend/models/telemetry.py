from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from backend.models.base import Base

class Telemetry(Base):
    """
    Telemetry data from IoT sensors.
    This table will be converted to a TimescaleDB hypertable.
    """
    __tablename__ = "telemetry"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    sensor_id = Column(UUID(as_uuid=True), ForeignKey("sensors.id"), nullable=False, index=True)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), nullable=False, index=True)
    value = Column(Float, nullable=False)
    unit = Column(String, nullable=True)  # e.g., "celsius", "rpm", "kw"
    status = Column(String, default="normal")  # normal, warning, critical
