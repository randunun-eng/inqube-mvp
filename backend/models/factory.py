from sqlalchemy import Column, String, Float, ForeignKey, JSON, Boolean, UUID
# from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from models.base import Base

class Factory(Base):
    __tablename__ = "factories"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False)
    location = Column(String)
    config = Column(JSON)
    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    
    zones = relationship("Zone", back_populates="factory")

class Zone(Base):
    __tablename__ = "zones"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    factory_id = Column(UUID(as_uuid=True), ForeignKey("factories.id"))
    name = Column(String, nullable=False)
    
    factory = relationship("Factory", back_populates="zones")
    machines = relationship("Machine", back_populates="zone")

class Machine(Base):
    __tablename__ = "machines"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    zone_id = Column(UUID(as_uuid=True), ForeignKey("zones.id"))
    name = Column(String, nullable=False)
    type = Column(String)
    status = Column(String, default="offline")
    
    zone = relationship("Zone", back_populates="machines")
    sensors = relationship("Sensor", back_populates="machine")
