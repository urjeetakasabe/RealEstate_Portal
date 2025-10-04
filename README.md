# 🏠 Real Estate Portal

A comprehensive digital marketplace for property buying, selling, and renting, built with modern web technologies to connect property owners, buyers, renters, and brokers in a seamless ecosystem.

## 📋 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [User Roles](#user-roles)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Future Enhancements](#future-enhancements)

## 🎯 Introduction

The Real Estate Portal is an advanced digital platform designed to simplify property transactions. It enables property owners to list properties, buyers/renters to search and book, brokers to assist in deals, and admins to manage the entire system.

### Objectives
- Provide a unified digital marketplace for properties
- Enable advanced search & filters for better user experience
- Support property owners and brokers in managing listings
- Ensure secure transactions through payment gateways
- Deliver analytics & reports for admins
- Enhance engagement with notifications, reviews, and ratings

## ✨ Features

### 🔐 Authentication & Authorization
- JWT/OAuth based secure authentication
- Role-based access control
- Secure password management

### 👥 User Management
- Multi-role user profiles (Admin, Owner, Buyer, Broker)
- Profile management and customization
- User verification system

### 🏢 Property Management
- Advanced property listing with rich media
- Property categorization and tagging
- Location-based services
- Dynamic pricing and availability

### 🔍 Search & Discovery
- Advanced search with multiple filters
- Location-based property discovery
- Price range and amenity-based filtering
- Saved searches and favorites

### 💰 Booking & Payments
- Online booking system
- Secure payment gateway integration
- Transaction history and receipts
- Commission management for brokers

### ⭐ Reviews & Ratings
- Property reviews and ratings
- User reputation system
- Broker performance tracking

### 📊 Admin Dashboard
- Comprehensive analytics and reports
- User management and moderation
- Dispute resolution system
- Financial reporting

## 👨‍💼 User Roles

### 🛠️ Admin
- Manages users, properties, brokers, and payments
- Resolves disputes and moderates content
- Generates analytical reports
- System configuration and maintenance

### 🏠 Property Owner
- Lists and manages properties
- Handles inquiries and bookings
- Confirms payments and bookings
- Manages property availability

### 🏡 Buyer/Renter
- Searches and discovers properties
- Sends inquiries and books properties
- Makes secure online payments
- Leaves reviews and ratings

### 🤝 Broker/Agent
- Assists owners in listing properties
- Guides buyers through purchasing process
- Earns commission on successful deals
- Manages client relationships

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **React Router** - Client-side routing
- **Vite** - Build tool and development server

### Backend
- **Laravel** - PHP web application framework
- **MySQL** - Relational database management
- **JWT** - JSON Web Tokens for authentication
- **RESTful API** - API architecture

### Additional Technologies
- **Payment Gateway** - Secure transaction processing
- **Email/SMS Services** - Notification system
- **File Storage** - Property image management
- **Redis** - Caching and session management

## 🏗️ System Architecture

### Entity Relationship Model

**Core Entities:**
- **User** (user_id, name, email, password, role)
- **Property** (property_id, owner_id, title, description, price, location)
- **Booking** (booking_id, user_id, property_id, booking_date, status)
- **Payment** (payment_id, booking_id, amount, payment_date, method)
- **Review** (review_id, user_id, property_id, rating, comment)
- **Agent** (agent_id, user_id, commission_rate)

**Relationships:**
- User ↔ Property (1–M)
- User ↔ Booking (1–M)
- Booking ↔ Payment (1–1)
- User ↔ Review (1–M)
- Property ↔ Review (1–M)
- Agent ↔ Property (M–M)

## 🚀 Installation

### Prerequisites
- PHP 8.0 or higher
- Node.js 16.0 or higher
- MySQL 8.0 or higher
- Composer

### Backend Setup (Laravel)
```bash
# Clone the repository
git clone https://github.com/urjeetakasabe/realeastate_portal.git
cd real-estate-portal/backend

# Install PHP dependencies
composer install

# Environment configuration
cp .env.example .env
php artisan key:generate

# Database setup
# Update .env with your database credentials
php artisan migrate
php artisan db:seed

# Start development server
php artisan serve
