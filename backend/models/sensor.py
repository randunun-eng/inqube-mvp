from sqlalchemy import Column, String, Float, Boolean, ForeignKey, UUID
# from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from models.base import Base

class Sensor(Base):
    __tablename__ = "sensors"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    machine_id = Column(UUID(as_uuid=True), ForeignKey("machines.id"))
    type = Column(String) # temp, energy, vibration
    unit = Column(String)
    mqtt_topic = Column(String, unique=True)
    
    machine = relationship("Machine", back_populates="sensors")
