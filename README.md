
[![Build Status](http://3.6.76.35:8080/buildStatus/icon?job=build-test-push-crud-vc)](http://3.6.76.35:8080/job/build-test-push-crud-vc/)



# Version Controlled Express CRUD API

A simple Express.js API for CRUD operations with MongoDB, featuring basic frontend, environment configuration, and professional version control practices.

---

## Features

- RESTful API with Express.js
- MongoDB integration (via Mongoose)
- Environment variable support with dotenv
- Basic HTML frontend (`/public/home.html`)
- 404 and health check endpoints
- ESLint for code quality

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/pranav-yaligouda/Version-Control.git
cd Version-Control
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```
NODE_ENV=development
PORT=8080
```

### 4. Run the server
- Development: `npm run dev`
- Production: `npm start`

---

## API Endpoints

| Method | Endpoint    | Description                |
|--------|------------|----------------------------|
| GET    | `/`        | Server status message      |
| GET    | `/health`  | Health check (JSON)        |
| GET    | `/home`    | Serves HTML home page      |
| *      | `*`        | 404 for unknown routes     |

---

## Version Control & Branching

- **Main branches:** `main`, `dev`
- **Feature branches:** `feature/your-feature`
- **Workflow:**
	1. Create a feature branch from `dev`
	2. Commit and push changes
	3. Open a Pull Request (PR) to `main` or `dev`
	4. After PR merge, update all branches:
		 ```bash
		 git checkout dev
		 git pull origin dev
		 git checkout main
		 git pull origin main
		 git checkout feature/your-feature
		 git pull origin main  # or dev
		 ```
	5. Delete feature branch if done

- **Tags:**  
	Use annotated tags for releases (e.g., `v1.0.0`). Push tags to remote:
	```bash
	git tag -a v1.0.0 -m "Release v1.0.0"
	git push origin v1.0.0
	```

---

## Linting

- ESLint is configured for both Node.js and browser code.
- Run lint checks:
	```bash
	npm run lint
	```

---

## Project Structure

```
Version-Control/
├── config/
│   └── envconfig.js
├── public/
│   └── home.html
├── index.js
├── package.json
├── eslint.config.js
├── .gitignore
└── .env (not committed)
```

---

## License

ISC

---
