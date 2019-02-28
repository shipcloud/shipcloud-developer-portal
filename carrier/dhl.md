# DHL

## Supported services

- standard
- returns
- dhl_europaket

## Additional services

- Advance notice
- Cash on delivery
- Delivery time
- Ident check
- Premium international
- Visual age check

## Package types

- parcel
- bulk

## Label sizes

- standard:
  - DIN A5
  - DIN A6
- returns:
  - DIN A5

## Field lengths

- `company` 2 - 50 characters
- `first_name` + `last_name` 1 - 35 characters
- `care_of` 0 - 35 characters
- `street` 1 - 35 characters
- `street_no` 1 - 5 characters
- `zip_code` 1 - 10 characters
- `city` 1 - 35 characters
- `state` 0 - 30 characters
- `phone` 0 - 20 characters
- `notification_email` 0 - 70 characters
- `customs_declaration`
  - `contents_explanation` 0 - 256 characters
  - `invoice_number` 0 - 35 characters
  - `drop_off_location` 0 - 35 characters
  - `items`
    - `description` 0 - 256 characters
    - `hs_tariff_number` 1 - 10 characters

## Other attributes

- additional insurance
