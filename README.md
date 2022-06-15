# Smoothie API 

## Arch/Infra
- Server framework is Hapi.js
- Backing DB is postgres in RDS (only one environment)
- EC2 Host with Nginx reverse proxy (doors wide open, public everything :) )

### DB

DB conn string
psql postgres://postgres:${password}@smoothie-db.ce37vs3vt2os.us-east-1.rds.amazonaws.com/smoothie