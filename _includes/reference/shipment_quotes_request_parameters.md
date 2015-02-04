__Parameters:__

- __carrier__* (string, required), the carrier you want to use. Possible values are "dpd", "dhl", "gls", "hermes", "iloxx", "ups", "fedex"
- __service__ (string, required), additional service. Available values are "returns", "standard", "one_day" (Express),"one_day_early" (Express until 10 o'clock)
- __to__*, object describing the receivers address
  - __street__ (string), street name
  - __street_no__ (string), house number
  - __city__ (string), city
  - __zip_code__ (string), zip code
  - __state__ (string, optional), state
  - __country__ (string), uppercase two-letter country code (ISO 3166-1 alpha-2), e.g. DE for germany
- __from__*, object describing the senders address. Address definition: see "to".
- __package__*, object describing the package dimensions
  - __width__ (float), width of the package in cm
  - __length__ (float), length of the package in cm
  - __height__ (float), height of the package in cm
  - __weight__ (float), weight in kg
