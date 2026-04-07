---
description: Read this file to understand how to fetch data in this project.
---
# Data Fetching guidelines
This document explains the recommended approach for fetching data in this Next.js application. Adhering to these guidelines will ensure that data is fetched efficiently and consistently throughout the project.

## 1. Use server components for data fetching.

In Next.js, ALWAYS use server components for data fetching. NEVER use client components to fetch data directly from APIs or databases. 

## 2. Data fetching methods

ALWAYS use the helper functions in the /data directory to fetch data. NEVER fetch data directly in the components.

ALL helper functions in the /data directory should use Drizzle ORM for database interactions.