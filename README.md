# 3D Hub Meta Server

A microservice platform for managing 3D printing and related services.

## 🚀 About

3D Hub Meta Server is a modern microservice architecture built with NestJS, designed to manage all aspects of 3D printing: from user management to order processing and payments.

## Architecture

The project is built on a microservice architecture and consists of the following services:

- **Gateway Service** - API Gateway handling incoming requests and routing
- **Users Service** - User management and authentication
- **Products Service** - Product and catalog management 
- **Orders Service** - Order processing and management
- **Payment Service** - Payment processing
- **Storage Service** - File and asset management
- **Search Service** - Search functionality

## Technology Stack

### Core Technologies
- Node.js
- TypeScript
- NestJS
- GraphQL (Apollo Server)
- Prisma ORM
- NATS (for inter-service communication)
- Docker

### Database & Storage
- PostgreSQL (via Prisma)
- AWS S3 for file storage

### API & Communications
- GraphQL
- REST
- NATS Message Broker
- Fastify

### Security & Authentication
- JWT
- Passport.js
- bcrypt

### Additional Tools
- Fastify Multipart
- Class Validator
- Class Transformer
- Nodemailer for email communications

## Project Structure 