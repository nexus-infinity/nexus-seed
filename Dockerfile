FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Install dependencies first (layer cache)
COPY pyproject.toml .
RUN uv sync --no-dev --no-install-project

# Copy source
COPY . .
RUN uv sync --no-dev

EXPOSE 8000

CMD ["uv", "run", "nexus", "serve"]
