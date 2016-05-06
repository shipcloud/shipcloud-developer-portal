__Parameters:__

- __carrier__ (string), the carrier you want to use. Possible values are "dpd", "fedex", "hermes", "ups".
- __pickup_time__ (object), contains the earliest and latest pickup time in iso8601.
  - __earliest__ (datetime), the date the shipments are ready for pickup.
  - __latest__ (datetime), the latest date for pick up.
- __pickup_address__ (object, optional), address where the carrier should pick up shipments. See [address request]({{ site.baseurl }}/reference/#addresses) for a detailed definition.
- __shipments__ (array of shipment objects, optional), if you want only certain shipments to get picked up,
you can send the specific shipment objects with the request. Please keep in mind that return
shipments can't be picked up.
