# load .env file
include .env
export $(shell sed 's/=.*//' .env)

install: prepare
	@echo "[install] Installing dependencies..."
	@npm install

typescript: clean
	@echo "[typescript] Transpiling code..."
	@npm run typescript

clean:
	@echo "[clean] Cleaning..."
	@rm -rf dist

linter:
	@echo "[linter] Running linter..."
	@npm run linter

check:
	@echo "[check] Checking project..."
	@make typescript
	@make test
	@make linter

run:
	@echo "[run] running service..."
	@npm start

dev:
	@echo "[run-dev] Running docker compose..."
	@docker-compose --env-file .env up -d --build
	@echo "[dev] running service in debug mode..."
	@npm run dev 

stop:
	@echo "[stop] Stopping docker compose"
	@docker-compose --env-file .env down || true

deploy:
	@echo "[deploy] Deploying version to remote server..."

deploy-internal:
	@echo "[deploy] Internal deploying..."
	@make stop
	@git pull origin $(BRANCH)
	@make install
	@make dev

destroy:
	@echo "[destroy] Destroying..."

destroy-internal:
	@echo "[destroy] Internal destroying..."
	@make stop

.PHONY: install typescript clean linter check run dev deploy deploy-internal destroy destroy-internal