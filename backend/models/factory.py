from sqlalchemy import Column, String, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from backend.models.base import Base

class Factory(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)
    location = Column(String)
    config = Column(JSON)
    
    zones = relationship("Zone", back_populates="factory")

class Zone(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    factory_id = Column(UUID(as_uuid=True), ForeignKey("factory.id"))
    name = Column(String, nullable=False)
    
    factory = relationship("Factory", back_populates="zones")
    machines = relationship("Machine", back_populates="zone")

class Machine(Base):
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    zone_id = Column(UUID(as_uuid=True), ForeignKey("zone.id"))
    name = Column(String, nullable=False)
    type = Column(String)
    status = Column(String, default="offline")
    
    zone = relationship("Zone", back_populates="machines")
    sensors = relationship("Sensor", back_populates="machine")
