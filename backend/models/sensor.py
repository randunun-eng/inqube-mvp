from sqlalchemy import Column, String, ForeignKey, Float, DateTime, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from backend.models.base import Base

class Sensor(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    machine_id = Column(UUID(as_uuid=True), ForeignKey("machine.id"))
    type = Column(String) # temp, energy, vibration
    unit = Column(String)
    mqtt_topic = Column(String, unique=True)
    
    machine = relationship("Machine", back_populates="sensors")
    telemetry = relationship("Telemetry", back_populates="sensor")

class Telemetry(Base):
    # TimescaleDB hypertable - primary key is (time, sensor_id)
    time = Column(DateTime(timezone=True), primary_key=True, server_default=func.now())
    sensor_id = Column(UUID(as_uuid=True), ForeignKey("sensor.id"), primary_key=True)
    value = Column(Float, nullable=False)
    metadata_ = Column("metadata", JSON) # 'metadata' is reserved in some contexts, using metadata_ mapped to metadata
    
    sensor = relationship("Sensor", back_populates="telemetry")
