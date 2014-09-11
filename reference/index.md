---
title: shipcloud api reference
nav: reference
---

# shipcloud API v1

## Shipments
The following is a section of resources related to shipments. Be advised: We will charge you only for shipments that a
label was created for.

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

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Shipments response]({{ site.baseurl }}/reference/shipments_response_schema.html)

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
{% highlight bash %}
no payload
{% endhighlight %}

__URL parameters:__

- __id__, the id attribute that was returned when creating the shipment

<i class="glyphicon glyphicon-arrow-right"></i> JSON schema: [Shipments response]({{ site.baseurl }}/reference/shipments_query_response_schema.html)

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include shipments_get_response.json %}
{% endhighlight %}

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
  Only shipments where create_shipping_label is false can be deleted, because no transaction with a carrier has been
  done until this point.
</p>

{% highlight bash %}
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

## Carrier

### Get all carriers available for your account

#### Request

<kbd>GET</kbd> __/v1/carriers__

{% highlight bash %}
no payload
{% endhighlight %}

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
[
  {
    "name": "dhl",
    "display_name": "Deutsche Post DHL"
  },
  {
    "name": "hermes",
    "display_name": "Hermes Europe"
  }
]
{% endhighlight %}

## Rates

### Getting the rate for a package
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
With this you're requesting pickup of packages for a specific carrier

#### Request

<kbd>POST</kbd> __/v1/pickup_requests__

{% highlight json %}
{% include pickup_post_requests_request.json %}
{% endhighlight %}

__Parameters:__

- __carrier__ (string), the carrier you want to use. Possible values are "dhl", "gls", "hermes", "ups".
- __pickup_date__ (string), pickup date (e.g. 2014/02/12)

#### Response
{% include headers/200_ok.html %}
{% highlight json %}
{% include pickup_post_requests_response.json %}
{% endhighlight %}
