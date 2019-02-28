# UPS

## Supported services

- standard
- one_day
- one_day_early
- ups_express_1200
- returns

## Additional services

- Adult signature
- Cash on delivery

## Package types

- parcel

## Label sizes

- standard:
  - DIN A5
  - DIN A6
- one_day
  - DIN A5
  - DIN A6
- one_day_early
  - DIN A5
  - DIN A6
- ups_express_1200:
  - DIN A5
  - DIN A6
- returns:
  - DIN A5
  - DIN A6

## Field lengths

### Shipment requests
- `company` 1 - 35 characters [^1]
- `first_name` + `last_name` 1 - 35 characters [^1]
- `care_of` 0 - 35 characters [^1]
- `street` + `street_no` 1 - 35 characters [^1]
- `zip_code` 1 - 9 characters
- `city` 1 - 30 characters [^2]
- `state` 2 characters
- `phone` 0 - 15 characters
- `reference_number` 0 - 35 characters

### Pickup Requests

- `company` 1 - 27 characters
- `first_name` + `last_name` 1 - 22 characters
- `care_of` 0 - 35 characters
- `street` + `street_no` 1 - 73 characters
- `zip_code` 1 - 8 characters
- `city` 1 - 50 characters
- `state` 1 - 50 characters
- `phone` 0 - 25 characters


## Other attributes

- additional insurance

[^1]: only 30 characters will be printed on the label
[^2]: only 15 characters will be printed on the label
