# Fleet Data Ingestion Service

This project implements a high-scale data ingestion and analytics service for Smart Meters and EV Fleets using NestJS and PostgreSQL.

## Architecture

### 1. Ingestion Layer
- **Polymorphic Handling**: The `/ingestion` endpoints handle both Meter and Vehicle telemetry.
- **Storage Strategy**:
  - **Cold Store (History)**: `meter_readings_history` and `vehicle_readings_history` tables use `INSERT` for every heartbeat to maintain a complete audit trail. Indices on `timestamp` and `device_id` ensure efficient time-series queries.
  - **Hot Store (Operational)**: `meter_latest_status` and `vehicle_latest_status` tables use `UPSERT` (update on conflict) to provide O(1) access to the latest state without scanning history tables.

### 2. Analytics Layer
- **Performance Endpoint**: `/v1/analytics/performance/:vehicleId` provides a 24-hour summary.
- **Correlation**: A `DeviceMapping` table links `vehicleId` to `meterId`.
- **Optimization**: Queries use aggregate functions (`MAX - MIN`) on indexed `timestamp` columns to compute total consumption/delivery without full table scans.

## Setup

1. **Start Environment**:
   ```bash
   docker-compose up --build
   ```

2. **API Endpoints**:
   - **Ingest Meter**: `POST /ingestion/meter`
     ```json
     { "meterId": "m1", "kwhConsumedAc": 100.5, "voltage": 230, "timestamp": "2023-10-27T10:00:00Z" }
     ```
   - **Ingest Vehicle**: `POST /ingestion/vehicle`
     ```json
     { "vehicleId": "v1", "kwhDeliveredDc": 90.0, "soc": 80, "voltage": 400, "temperature": 45.5, "timestamp": "2023-10-27T10:00:00Z" }
     ```
   - **Link Device**: `POST /ingestion/mapping`
     ```json
     { "vehicleId": "v1", "meterId": "m1" }
     ```
   - **Analytics**: `GET /v1/analytics/performance/v1`

## Database
- PostgreSQL is used as the data store.
- Tables are automatically synchronized (for this assignment configuration).
- TimescaleDB extension could be added for further optimization on the history tables.
