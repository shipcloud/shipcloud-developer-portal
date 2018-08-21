---
title: shipcloud api reference
nav: reference
---

# shipcloud API v1

## Changelog
If you haven't seen it already in the
[github-repo for this website](https://github.com/shipcloud/shipcloud.github.io/) - we've got a
[api changelog file](https://github.com/shipcloud/shipcloud.github.io/blob/master/API_CHANGELOG.md)
where you can see the changes we've made to our api. There is also an
[HTML-version]({{ site.baseurl }}/API_CHANGELOG.html) of the changelog file for your convenience.

## http status codes
When talking to our API you can receive the following status codes:

{% include reference/http_status_codes.html %}

## Addresses
The following is a section of resources related to addresses.

{% include reference/addresses_request_togglebox.html %}

### Creating an address
If you want to create an Address, this is the way to go!

#### Request
<kbd>POST</kbd> __/v1/addresses__

{% highlight json %}
{% include addresses_post_put_request.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Create addresses request]({{ site.baseurl }}/reference/post_addresses_request_schema.html)

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include addresses_post_put_response.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Create addresses response]({{ site.baseurl }}/reference/address_response_schema.html)

### Getting a list of addresses

#### Request
<kbd>GET</kbd> __/v1/addresses__

You can filter the shipments list using one or more of the following

__GET parameters:__

- __first_name__, e.g. 'first_name=Max'
- __last_name__, e.g. 'last_name=Mustermann'
- __company__, e.g. 'company=Example%20Company'
- __care_of__, e.g. 'care_of=Roger%20Receiver'
- __street__, e.g. 'street_no=Musterstraße'
- __street_no__, e.g. 'street_no=42'
- __zip_code__, e.g. 'zip_code=12345'
- __state__, e.g. 'state=CA'
- __city__, e.g. 'city=Musterstadt'
- __country__, e.g. 'country=DE'
- __phone__, e.g. 'phone=555-555'
- __page__, show page number x, e.g. 'page=2'
- __per_page__, show x number of shipments on a page (default & max: 100), e.g. 'per_page=25'

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include addresses_index_response.json %}
{% endhighlight %}

### Show an Address

#### Request
<kbd>GET</kbd> __/v1/addresses/:id__

__GET parameters:__

- __id__, the id attribute that was returned when creating the address

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include addresses_get_response.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Address response]({{ site.baseurl }}/reference/address_response_schema.html)

## Shipments
The following is a section of resources related to shipments. Be advised: We will charge you only for shipments that a
label was created for.

<p class="bg-info">
  <i class="glyphicon glyphicon-info-sign"></i>
  Please notice the requirements regarding the use of the parameter "description" (either in the
  root or as part of the "package" attribute).
</p>

{% include reference/shipments_request_togglebox.html %}

### Creating a shipment
If you want to create a shipment, this is the way to go!

#### Request
<kbd>POST</kbd> __/v1/shipments__

{% highlight json %}
{% include shipments_post_put_request.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Shipments request]({{ site.baseurl }}/reference/shipments_request_schema.html)

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include shipments_post_put_response.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Shipments response]({{ site.baseurl }}/reference/shipments_response_reduced_schema.html)

### Getting a list of shipments

#### Request
<kbd>GET</kbd> __/v1/shipments__
{% highlight json %}
no payload
{% endhighlight %}

You can filter the shipments list by using one or more of the following GET parameters. 

{% include reference/shipments_index_request_togglebox.html %}

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include shipments_index_response.json %}
{% endhighlight %}

### Getting information about a shipment
<p class="bg-info">
  <i class="glyphicon glyphicon-info-sign"></i>
  Only shipments where create_shipping_label is true contain prices and may contain tracking_events
</p>
<p class="bg-info">
  <i class="glyphicon glyphicon-info-sign"></i>
  Shipments that are created on the sandbox system aren't send to the carriers. Therefore they won't contain
  tracking_events.
</p>

#### Request
<kbd>GET</kbd> __/v1/shipments/:id__
{% highlight shell %}
no payload
{% endhighlight %}

__URL parameters:__

- __id__, the id attribute that was returned when creating the shipment

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include shipments_get_response.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Shipments response]({{ site.baseurl }}/reference/shipments_query_response_schema.html)

### Updating a shipment

#### Request

<kbd>PUT</kbd> __/v1/shipments/:id__

{% highlight json %}
{% include shipments_post_put_request.json %}
{% endhighlight %}

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include shipments_post_put_response.json %}
{% endhighlight %}

### Deleting a shipment

#### Request

<kbd>DELETE</kbd> __/v1/shipments/:id__

<p class="bg-info">
  <i class="glyphicon glyphicon-info-sign"></i>
  Prepared shipments (where create_shipping_label is false) can be deleted at any time, because no
  transaction with the carrier has happened until this point and no actual shipping label has been
  created. In case you've created a shipping label you can delete it before the cutoff time of the
  carrier. Cutoff times differ from carrier to carrier and are some time between 5pm and 8pm.
</p>

{% highlight shell %}
no payload
{% endhighlight %}

__URL parameters:__

- __id__, the id attribute that was returned when creating the shipment

#### Response
{% highlight http %}
204 (No Content)
{% endhighlight %}

{% highlight json %}
{}
{% endhighlight %}

## Carriers

### Get all carriers available for your account

#### Request

<kbd>GET</kbd> __/v1/carriers__

{% highlight shell %}
no payload
{% endhighlight %}

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
[
  {
    "name": "dhl",
    "display_name": "Deutsche Post DHL",
    "services": [
      "standard",
      "returns"
    ],
    "package_types": [
      "parcel",
      "bulk"
    ]
  },
  {
    "name": "dpag",
    "display_name": "Deutsche Post",
    "services": [
      "standard"
    ],
    "package_types": [
      "letter",
      "parcel_letter",
      "books"
    ]
  },
  {
    "name": "dpd",
    "display_name": "DPD - Dynamic Parcel Distribution",
    "services": [
      "standard",
      "returns",
      "one_day",
      "one_day_early"
    ],
    "package_types": [
      "parcel",
      "parcel_letter"
    ]
  }
]
{% endhighlight %}
<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [carriers response]({{ site.baseurl }}/reference/carriers_response_schema.html)

## Shipment Quotes
With this call you can find out how much we will charge you for a specific shipment.

{% include reference/shipment_quotes_request_togglebox.html %}

### Creating a shipment quote

#### Request
<kbd>POST</kbd> __/v1/shipment_quotes__

{% highlight json %}
{% include shipment_quotes_post_request.json %}
{% endhighlight %}

In case you've previously added an adress and know its ```id```, you can use it instead of
providing a complete set of address data.

{% highlight json %}
{% include shipment_quotes_post_request_with_address_id.json %}
{% endhighlight %}

You can also omit the ```from``` parameter if the users has configured a standard ship from address
in her/his shipcloud profile.

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Shipment Quotes request]({{ site.baseurl }}/reference/shipment_quotes_request_schema.html)

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include shipment_quotes_post_response.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Shipment Quotes response]({{ site.baseurl }}/reference/shipment_quotes_response_schema.html)

## Rates

### Getting the rate for a package
<p class="bg-warning">
  <i class="glyphicon glyphicon-warning-sign"></i>
  The rates call is <b>deprecated</b>. Please use <a href="{{ site.baseurl }}/reference/#shipment-quotes">Shipment Quotes</a>.
</p>

With this call you can find out how much a specific package will cost you.

<p class="bg-info">
  <i class="glyphicon glyphicon-info-sign"></i>
  You'll have to use your live api key to get the correct prices.
</p>

#### Request
<kbd>POST</kbd> __/v1/rates__

{% highlight json %}
{% include rates_post_request.json %}
{% endhighlight %}

{% include reference/rates_request_togglebox.html %}

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include rates_post_response.json %}
{% endhighlight %}

## Pickup requests

### Requesting pickup
There are two ways you can request shipments to be picked up by a specific carrier. By simply
stating that all shipments that haven't been picked up already should be picked up or by specifying
which shipments should by picked up.

__Notice:__ _If you don't supply a pickup_address in your request, we're using the default from
address that's being defined in the shipcloud profile for requesting a pickup by the carrier.
Please keep in mind there are
[carrier specific field lengths]({{ site.baseurl }}/concepts/#carrier-specific-field-lengths)
for that._

#### Request

Here's an example for having all shipments being picked up by a specific carrier:

{% include reference/pickup_requests_request_togglebox.html %}

<kbd>POST</kbd> __/v1/pickup_requests__

{% highlight json %}
{
  "carrier": "dpd",
  "pickup_time": {
    "earliest": "2015-09-15T09:00:00+02:00",
    "latest": "2015-09-15T18:00:00+02:00"
  },
  "pickup_address": {
    "company": "Muster-Company",
    "first_name": "Max",
    "last_name": "Mustermann",
    "street": "Musterstraße",
    "street_no": "42",
    "zip_code": "54321",
    "city": "Musterstadt",
    "country": "DE",
    "phone": "555-555"
  }
}
{% endhighlight %}

If you want to only have specific shipments be picked up you add the shipment ids to the call:

<kbd>POST</kbd> __/v1/pickup_requests__

{% highlight json %}
{% include pickup_post_requests_request.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Pickup Requests request]({{ site.baseurl }}/reference/pickup_requests_request_schema.html)

#### Response

__Notice:__ _Some carriers (e.g. Hermes) are using the address that's being defined at the carrier
account for picking up shipments. In those cases we'll return ```null``` as pickup_address._

{% include headers/200_ok.html %}
{% highlight json %}
{% include pickup_post_requests_response.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Pickup Requests response]({{ site.baseurl }}/reference/pickup_requests_response_schema.html)

## Webhooks
The following is a section of resources related to webhooks.

{% include reference/webhooks_request_togglebox.html %}

### Creating a webhook

If you want to create a webhook, this is the way to go!

#### Request
<kbd>POST</kbd> __/v1/webhooks__

{% highlight json %}
{% include webhooks_post_put_request.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Create webhook request]({{ site.baseurl }}/reference/webhooks_request_schema.html)

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include webhooks_post_put_response.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Create webhooks response]({{ site.baseurl }}/reference/webhooks_response_schema.html)

### Getting a list of webhooks

#### Request
<kbd>GET</kbd> __/v1/webhooks__

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include webhooks_index_response.json %}
{% endhighlight %}

### Show a webhook

#### Request
<kbd>GET</kbd> __/v1/webhooks/:id__

__GET parameters:__

- __id__, the id attribute that was returned when creating the webhook

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include webhooks_get_response.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Webhook response]({{ site.baseurl }}/reference/webhooks_response_schema.html)

### Deleting a webhook

#### Request

<kbd>DELETE</kbd> __/v1/webhooks/:id__

{% highlight shell %}
no payload
{% endhighlight %}

__URL parameters:__

- __id__, the id attribute that was returned when creating the webhook

#### Response
{% highlight http %}
204 (No Content)
{% endhighlight %}

{% highlight json %}
{}
{% endhighlight %}

## Trackers
Trackers make it possible to track a shipment that wasn't created using shipcloud. They are
basically a way to monitor shipments created elsewhere. All you have to do is provide us with the
tracking number you received from the carrier as well as its corresponding name acronym.

{% include reference/trackers_request_togglebox.html %}

### Creating a tracker

This is the way to create a tracker based on a tracking number provided by one of our supported
carriers ({{ site.shipcloud.supported_carriers.as_display_names }})

#### Request
<kbd>POST</kbd> __/v1/trackers__

{% highlight json %}
{% include trackers_post_put_request.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Create tracker request]({{ site.baseurl }}/reference/trackers_request_schema.html)

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include trackers_post_put_response.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Create tracker response]({{ site.baseurl }}/reference/trackers_response_schema.html)

### Getting a list of trackers

#### Request
<kbd>GET</kbd> __/v1/trackers__

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include trackers_index_response.json %}
{% endhighlight %}

### Show a tracker

#### Request
<kbd>GET</kbd> __/v1/trackers/:id__

__GET parameters:__

- __id__, the id attribute that was returned when creating the tracker

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include trackers_get_response.json %}
{% endhighlight %}

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Tracker response]({{ site.baseurl }}/reference/trackers_response_schema.html)
