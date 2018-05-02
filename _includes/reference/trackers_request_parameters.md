__Parameters:__

- __carrier_tracking_no__ (string), the tracking number provided by the carrier
- __carrier__ (array), name of the carrier you want to use. Possible values are {{ site.shipcloud.supported_carriers.as_keys }}
- __to__* (object, optional), describes the receivers address. See [address request]({{ site.baseurl }}/reference/#addresses) for a detailed definition.
- __from__* (object, optional), describes the senders address. If missing, the default sender address (if defined in your shipcloud account) will be used. See [address request]({{ site.baseurl }}/reference/#addresses) for a detailed definition.
- __notification_email__ (string, optional), email address that we should notify once there's an update for this shipment
