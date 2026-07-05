# RC1-B — API Response Standardisation

## Success Response

All successful API responses should use:

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
{
  "success": true,
  "data": {},
  "meta": {}
}
{
  "success": false,
  "error": {
    "code": "bad_request",
    "message": "Error message"
  }
}
