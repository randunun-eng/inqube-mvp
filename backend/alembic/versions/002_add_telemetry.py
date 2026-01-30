"""Add telemetry table and enable TimescaleDB hypertable

Revision ID: 002_add_telemetry
Revises: 001_initial_schema
Create Date: 2026-01-30 13:40:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '002_add_telemetry'
down_revision = '001_initial_schema'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create telemetry table
    op.create_table(
        'telemetry',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('sensor_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('timestamp', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('value', sa.Float(), nullable=False),
        sa.Column('unit', sa.String(), nullable=True),
        sa.Column('status', sa.String(), nullable=True),
        sa.ForeignKeyConstraint(['sensor_id'], ['sensors.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_telemetry_sensor_id'), 'telemetry', ['sensor_id'], unique=False)
    op.create_index(op.f('ix_telemetry_timestamp'), 'telemetry', ['timestamp'], unique=False)
    
    # Enable TimescaleDB hypertable for efficient time-series queries
    op.execute("SELECT create_hypertable('telemetry', 'timestamp');")


def downgrade() -> None:
    op.drop_index(op.f('ix_telemetry_timestamp'), table_name='telemetry')
    op.drop_index(op.f('ix_telemetry_sensor_id'), table_name='telemetry')
    op.drop_table('telemetry')
