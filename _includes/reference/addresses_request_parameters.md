__Parameters:__

- __company__ (string), the receivers company name
- __first_name__ (string, optional), the receivers first name
- __last_name__ (string), the receivers last name
- __care_of__ (string, optional), name of the person that should be able to receive the package
- __street__ (string), street name
- __street_no__ (string), house number
- __zip_code__ (string), zip code
- __city__ (string), city
- __state__ (string, optional), state
- __country__ (string), country as uppercase ISO 3166-1 alpha-2 code
- __phone__ (string, optional), telephone number (mandatory when using UPS and the following terms apply: service is one_day or one_day_early or ship to country is different than ship from country)
- __email__ (string, optional), email address of the receiver to get notified by the carrier. Currently only used when sending shipments via [GLS - ShopDeliveryService]({{ site.baseurl }}/examples/#gls---shopdeliveryservice)
- __drop_off_point__ (object, optional), data that needs to be defined when using the [GLS - ShopDeliveryService]({{ site.baseurl }}/examples/#gls---shopdeliveryservice)
  - __drop_off_point_id__ (string, optional), ID of the drop off point where the shipment should be send to. The ID can be determined through the [GLS parcelshop search](https://gls-group.eu/DE/en/depot-parcelshop-search)
  - __type__ (string, optional), drop off point type
