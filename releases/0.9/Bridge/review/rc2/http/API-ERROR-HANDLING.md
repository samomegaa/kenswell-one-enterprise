# RC2-B3 — API Error Handling & 404 Standardisation

## Objective

Standardise Bridge API runtime errors and unmatched route responses.

## Error Envelope

All API errors should use:

```json
{
  "success": false,
  "error": {
    "code": "not_found",
    "message": "The requested resource was not found"
  },
  "meta": {
    "requestId": "..."
  }
}
404 Behaviour

Unmatched routes return:

HTTP 404
code: not_found
Runtime Error Behaviour

Runtime errors pass through the central errorHandler.

In production, unexpected 500 errors should not expose internal details.

Request ID

Error responses include:

meta.requestId

where available.
