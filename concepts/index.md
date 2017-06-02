---
title: Concepts behind shipcloud
nav: concepts
footnote_path: concepts
---

# API

## Introduction
shipcloud is a shipping service provider that makes it easy for developers to integrate shipping
using one of the major carriers on the German market into their own software, onlineshop or ERP
solution. We've basically built a wrapper around the carriers' webservices we support so you won't
have to integrate each and every carrier by yourself.

To make it easier for you the developer, we've created the shipcloud API deliberately using the
RESTful architectural style. This means if you're familiar with REST and using RESTful services,
you will have no problems using our API. As it's common when implementing a REST-API we're using
resource-oriented URLs and HTTP authentication.

### Integration guide
To make it easier for you to start working with the shipcloud api and also to give you a better
overview of the features we're supporting and we'd like you to integrate into your software as
well, we wrote a handy integration guide that you can download in __English__ and __German__. In
it, aside from what you can find here, we're also giving you a few pro tips to present your
customers with a seamless user experience as well as showing you what we're calling the __core
features__ of the shipcloud api.

<a href="{{ site.integration_guide_url.en }}">
  <i class="glyphicon glyphicon-download-alt"></i> Integration Guide in English
</a>

<a href="{{ site.integration_guide_url.de }}">
  <i class="glyphicon glyphicon-download-alt"></i> Integration Guide in German
</a>

## Authentication
For developers to test their code before shipping it, we're supplying every account with test and
live API keys. Every call to our API is secured by an API key. This key is tied specificly to your
account and therefore should never be given to anyone else outside of your control. You are able to
manage your API keys from your account page.

To use the API key you'll have to send it with every request being made. We're using http Basic

Authentication to our API has to be done via [HTTP Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication).
You'll have to provide your API key as the basic auth username. You don't have to provide a password.

__Be advised:__ The API key has to be [Base64](http://en.wikipedia.org/wiki/Base64) encoded.

Aside from sending your API key all API requests must be made using HTTPS. Don't bother trying to use HTTP. It will
fail!

## Parameters

Many API methods take optional parameters. For GET requests, any parameters not specified as a segment in the path can be passed as an HTTP query string parameter:

{% highlight shell %}
curl -i -u api_key "https://api.shipcloud.io/v1/shipments?service=returns"
{% endhighlight %}

For POST, PATCH, PUT, and DELETE requests, parameters not included in the URL should be encoded as JSON with a Content-Type of ‘application/json’:

{% highlight shell %}
curl -i -u f7ca956fd5670b2fa8fdee47672b2a26 -d '{"service":["returns"]}' "https://api.shipcloud.io/v1/shipments"
{% endhighlight %}

## Versioning
As with every API we will be releasing new versions from time to time. We do promise to adhere to the following API contract:

- No value types or fields will be changed or deleted in the same API version
- What we will change within the same API version:
  - add new fields to an object
  - add new API endpoints
  - required fields can become optional
  - endpoints can become deprecated

In case we introduce __breaking changes__ we will adjust the API base path to reflect each new major version. So consecutive releases will be called using /v2/, /v3/ and so on.

## Address handling
When sending ```to``` or ```from``` parameters you have to specify a contact for the shipment. This can
either be a ```company``` or a person identified by ```first_name``` and ```last_name```. So
although the entries are marked as being optional, one of them has to be specified in the request.

There are some [carrier specific things](#carrier-specific-address-handling) you have to take in mind.

## Metadata
We've been giving you the possibility to specifiy a reference number when creating a shipment to
make it easier for you to find out, which shipcloud shipment belongs to which order in your shop or
system. When creating a shipment you are now able to send us additional data, that we store for
you. This so called metadata is a structured object and can be any combination of key-value pairs.

{% highlight http %}
POST /shipments
{% endhighlight %}
{% highlight json %}
{
  "metadata": {
    "products": {
      "product": {
        "id": 1234567,
        "name": "blue shirt",
        "price": 42.12,
        "currency": "EUR"
      },
      "product": {
        "id": 0987654,
        "name": "yellow shirt",
        "price": 22.99,
        "currency": "EUR"
      }
    },
    "order_number": "123456",
    "order_date": "2015-06-01",
    "user_e_mail": "user@example.com",
    "order_total": {
      "amount": 65.11,
      "currency": "EUR"
    }
  }
}
{% endhighlight %}

## Timeouts
The services of the carriers we're supporting can be very slow at times. Since we're not queing
requests to create shipping labels at a later point in time, please account for slow response
times. We'd suggest setting a timeout of a little more than a minute to be absolutely sure that
you're not missing our responses.

# Carrier specifics

## Carrier specific address handling

### DHL
With the carrier DHL it is possible to send shipments to post offices and PACKSTATION parcel pickup stations.

#### Post office delivery
To address a post office put the word Postfiliale into the street parameter and the number of the post office into the
street_no. You also need to put a DHL customer number into the care_of parameter.

#### Parcel pickup station (Packstation) delivery
To address one of DHL's automated parcel pickup stations put the word Packstation into the street parameter and the
station number into the street_no. You also need to put the DHL customer number of the recipient into the care_of
parameter.

## Carrier specific field lengths
Due to the different handling every carrier has for managing addresses, there are different
restrictions for submitting data to them. Since we don't want to restrict you we're sending the
data as is to the specific carriers' backend and will receive errors in return if something wasn't
correct according to the carrier.

### DHL

{% include concepts/carrier_specific_field_lengths_dhl.md %}

### UPS

{% include concepts/carrier_specific_field_lengths_ups.md %}

### MyDPD Pro / MyDPD Business

{% include concepts/carrier_specific_field_lengths_dpd.md %}

## Carrier specific label sizes
Each carrier can provide label sizes in a specific DIN format. Here's an overview of the label
sizes that are available and can be configured within your shipcloud account:

{% include concepts/carrier_specific_label_sizes.html %}

## Carrier specific cutoff times
When requesting shipments to be picked up, each carrier has a specific strategy. Since not every
carrier is making clear what their cutoff times are, we can give you the following advices.

### UPS
When requesting a pickup by UPS, the carrier is validating your request if it's possible for them
to reach you within the requested time period. This validation factors in if there is enough time
for the driver to come to you and how far their depot is located from you.

UPS also has a list of cutoff times for postcodes in Germany, you can find within a service pdf
which is provided as a
[download on the UPS website](https://www.ups.com/media/de/service_guide_de_preview.pdf).

### Hermes
If the volume is below 2m<sup>3</sup>, you can request a pickup for the next day until 9pm the day
before. If the volume exceeds this limit you'll have to request the pickup until 2pm the previous
day.

## Misc carrier specifics

### DHL
* when using the service ___one_day___ or ___one_day_early___ the parameter
___package.description___ is mandatory

### DHL Express

#### Shipments with Pickup Requests
If you don't have regular pickups by DHL Express you will have to request a pickup when creating a
shipment. Therefore, you can add a pickup element to your shipment request.

The following rules apply for pickups by DHL Express:

* the date for `pickup_time.earliest` and `pickup_time.latest` has to be the same
* supplying a `pickup_address` is optional
* supplying a `description` is mandatory
* supplying `phone` is mandatory for sender and recipient addresses
* `state` has to be 2 characters long

<kbd>POST</kbd> __/v1/shipments__

{% highlight json %}
{% include shipments_post_request_with_pickup_by_dhl_express.json %}
{% endhighlight %}

### GLS
* shipments will receive a carrier tracking number (```carrier_tracking_no```) with the first scan
by the carrier, which is why this parameter won't be included in the response when creating a
shipment.

### GO!

* Since GO! doesn't provide regular pickups, you will always have to provide a pickup object, when
creating a shipment. See TNT below for a detailed description of how you need to specify this.

### TNT

#### Shipments with Pickup Requests
If you don't have regular pickups by TNT you will have to request pickups by the carrier. In
contrast to other carriers we support, pickup requests for TNT have to be done a little
differently. When creating a shipment for TNT a pickup request has to be made at the same time.
Therefore you can add a pickup element when creating your shipment request.

The following rules apply for pickups by TNT:

* the date for `pickup_time.earliest` and `pickup_time.latest` has to be same
* supplying a `pickup_address` is optional

<kbd>POST</kbd> __/v1/shipments__

{% highlight json %}
{% include shipments_post_request_with_pickup.json %}
{% endhighlight %}


### UPS
* when using the service ___returns___ the parameter ___package.description___ is mandatory
* if one of the following conditions is true, the parameter ___description___ is mandatory:
  * from and to countries are not the same
  * from and/or to countries are not in the EU
  * from and to countries are in the EU and the shipments service is not ___standard___

# Supported services
We currently support sending packages via the following carriers and services:

{% include concepts/supported_services.html %}

*shipment services explained:*

- **standard:** A normal shipment without any extra charges for faster delivery or stuff like that
- **one_day:** A express shipment that will be delivered the next working day
- **one_day_early:** Same as *one_day*. The only difference is, that the carrier will deliver the
shipment before noon
- **same_day:** A shipment that will be delivered on the same day it was picked up
- **returns:** A shipment that the customer sends back to the store / sender

## Additional services

{% include concepts/additional_services.html %}

## Package types

{% include concepts/package_types.html %}

## Other attributes

{% include concepts/other_attributes.html %}

# Sandbox vs. Production

When creating an account at shipcloud you get access for 2 systems. A sandbox and a production system. The first one
can be used to tinker with (e.g. for developing the integration of shipcloud into your own platform) while the
production system is used for the actual creation of shipping labels.

## Keys
Therefore when you create an account at shipcloud, 2 api keys get generated. A sandbox key that you can use for testing
our api and a live key, that can be used to create the actual shipping labels you're going to put on the packages
you're sending.

If at any time you feel the need to generate a new set of api keys (e.g. because you get the feeling, that your system
has been compromised) you can do that in the shipcloud backoffice by clicking your email address at the upper right
corner and selecting the menu item ```API Key```.

## Cleanup
We're currently deleting sandbox shipments 2 weeks after they've been created. So it's best
practice to create a new shipment first if you want to test updating or deleting it.

# Plan up-/downgrades

If you feel like tinkering with our api you can always register for free using our developer plan. If you're satisfied
with our service feel free to upgrade to a payed plan. Upgrades from one payed plan to a higher one can be done at any
time. We use the balance of your current plan against the first month of your new one, so you won't be billed extra for
upgrading before your current plan runs out.

# Prices & Vat

All of our prices are displayed in Euro and without VAT. We will however charge you with the full
German value added tax which is 19% at the moment.

# Webhooks

If you automatically want to react to events happening within the shipcloud
system, webhooks are the right thing for you. All you need to do is provide us
with a URL we should call once something happens. You can also specify which
events should trigger calling your URL. Maybe you only want to be notified,
when a package gets delivered to one of your customers.

When an event is triggered, we'll send an HTTP POST request to your URL,
containing a JSON payload, with all the information necessary. Here's our
sample payload you get when testing a webhook through our website:
{% highlight json %}
{
  "id": "ef9df623-6974-4a4b-9a99-c0ec5b58b136",
  "occured_at": "2015-02-17T14:20:42+01:00",
  "type": "example.event",
  "data": {
    "id": "es40a6e7a83ea8253f54eb414606626172b523d8",
    "url": "/v1/shipments/es40a6e7a83ea8253f54eb414606626172b523d8",
    "object_type": "shipment"
  }
}
{% endhighlight %}

__Notice:__ _Our payload only contains the data that was mentioned above. This means that after a
webhook was fired, you will have to call our api to get detailed information about the shipment.
This way only someone with the correct api key is able to access your customers data._

## Event types
You can currently subscribe to the following event types:

{% include concepts/webhooks_legend.html %}

## Catch all webhooks
If you don't want to subscribe to a specific event or you want to be notified by all events we're
firing using one of our catch all options is the best way to go. Defining a catch all webhook is
easy. Simply use an asterisk instead of a specific status as the last element in the notation.

We're supporting all places in the notation hierarchy as long as the asterisk is the last element
defined.

__Notice:__ By using catch all webhooks you are going the first step in getting notified about all
current and future events we're supporting.

### Examples for catch all webhooks

#### All events for tracking shipments
{% highlight json %}
{
  "url": "https://example.com/webhook",
  "event_types": ["shipment.tracking.*"]
}
{% endhighlight %}

#### All events for shipments
{% highlight json %}
{
  "url": "https://example.com/webhook",
  "event_types": ["shipment.*"]
}
{% endhighlight %}

#### All events
{% highlight json %}
{
  "url": "https://example.com/webhook",
  "event_types": ["*"]
}
{% endhighlight %}

## Configuration
To configure webhooks just click on __Configurations__ in the shipcloud
backoffice to reveal a webhook nav entry. There you can add webhooks and
specify which events should trigger sending a message to your URL.

## Testing
There are a lot of tools out there for testing webhooks. If you'd like a starting point check out
this blogpost called [_60+ Tools and Services for API and Webhook Logging, Debugging, Testing,
Monitoring, Documentation and Discovery_](http://john-sheehan.com/blog/ultimate-api-webhook-backend-service-debugging-testing-monitoring-and-discovery-tools-list).
We'd recommend using a service like [requestb.in](http://requestb.in) or [mocky.io](http://mocky.io)
to have reliable responses for your tests. This way you don't have to create shipments just for
testing handling shipments afterwards.

### Developer accounts
If you're usind TDD (test driven development) another thing we'd recommend is creating a second
account at shipcloud for all your testing needs. This way you can separate further development on
your platform from your live processes.

## Automatic deactivation
If the URL you provided when configuring the webhook can't be reached, we'll try to contact it a
few minutes later. __After 10 failed attempts__ to send you the data, we're giving up and the
webhook will be deactivated automatically. You can reactivate it in shipcloud once your system is
up and reachable again.
