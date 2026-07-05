# RC2-A3 — Enterprise Logging Foundation

## Objective

Introduce a structured logging foundation for Kenswell One Bridge.

## Current Approach

The logger is dependency-free and writes structured JSON to the configured stream.

## Log Format

```json
{
  "level": "info",
  "service": "kenswell-one",
  "event": "server_started",
  "timestamp": "2026-07-05T00:00:00.000Z"
}

upported Levels
debug
info
warn
error
Configuration

Environment variables:

LOG_LEVEL
APP_NAME
Usage

const { logger } = require('./src/logging');

logger.info('event_name', {
  key: 'value'
});

