# Smoothie API 

## Setup
- `npm i`
- `npm start`
- Navigate to `localhost:3000/docs` for Swagger docs

## Server notes
- ssh ec2-user@44.202.149.230 
- /etc/nginx/nginx.conf has server config
- server running on localhost:3000 in ~/smoothie-api
- No ci (yet?), restart node service and `sudo systemctl restart nginx`
## Arch/Infra
- Server framework is Hapi.js
- Backing DB is postgres in RDS (only one environment)
- EC2 Host with Nginx reverse proxy (doors wide open, public everything :) )
    - Served on http://44.202.149.230:80


### DB

DB conn string
psql postgres://postgres:${password}@smoothie-db.ce37vs3vt2os.us-east-1.rds.amazonaws.com/smoothie