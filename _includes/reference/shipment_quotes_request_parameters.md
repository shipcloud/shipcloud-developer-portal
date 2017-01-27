__Parameters:__

- __carrier__* (string), the carrier you want to use. Possible values are {{ site.shipcloud.supported_carriers.as_keys }}
- __service__ (string), service that should be used. Available values are "returns", "standard", "one_day" , "one_day_early", "same_day". See [supported services]({{ site.baseurl }}/concepts/#supported-services) for detailed information
- __to__* (object), describes the receivers address. See [address request]({{ site.baseurl }}/reference/#addresses) for a detailed definition.
- __from__ (object, optional), describes the senders address. See [address request]({{ site.baseurl }}/reference/#addresses) for a detailed definition.
- __package__*, object describing the package dimensions
  - __width__ (float), width of the package in cm
  - __length__ (float), length of the package in cm
  - __height__ (float), height of the package in cm
  - __weight__ (float), weight in kg
