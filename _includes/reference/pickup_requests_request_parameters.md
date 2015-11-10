__Parameters:__

- __carrier__ (string), the carrier you want to use. Possible values are "dpd", "fedex", "hermes", "ups".
- __pickup_time__, object containing the earliest and latest pickup time in iso8601.
  - __earliest__ (datetime), the date the shipments are ready for pickup.
  - __latest__ (datetime), the latest date for pick up.
- __shipments__ (array of shipment objects), if you want only specific shipments to get picked up,
you can send their shipment objects with the request. Please keep in mind that no return shipments
can be picked up.
