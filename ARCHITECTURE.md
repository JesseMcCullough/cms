# Architecture

## Table of Contents
- [Overview](#overview)
- [api/](#api)
  - [Request Flow](#request-flow)
  - [index.js](#index-js)
  - [controllers/](#controllers)
  - [routes/](#routes)
  - [models/](#models)
  - [database/](#database)
  - [errors/](#errors)
  - [validators/](#validators)

## Overview
The CMS has two components: `api/` and `admin/`.

`api/` holds the backend logic for the CMS.

`admin/` holds the frontend UI and logic for interacting with the CMS.

## `api/`

Contains the backend server and all application logic.

### Request Flow

Most requests follow this path:

Request -> Route -> Controller -> Model -> Database

### `index.js`

Application entry point. Starts the server and connects API routes.

### `controllers/`

Controllers receive requests from routes, execute application logic, and return responses. Database access should be delegated to models.

### `routes/`

Defines the API endpoints and maps incoming HTTP requests to the appropriate controller. Routes should remain lightweight and delegate application logic to controllers.

### `models/`

Responsible for interacting with the database. Models create, read, update, and delete application data.

### `database/`

Contains the database connection and schema initialization used by the CMS.

### `errors/`

Contains custom error classes used throughout the CMS.

### `validators/`

Validators to ensure proper schema and content validation before storing data.

