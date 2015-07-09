---
title: Recipes for using the shipcloud api
nav: recipes
---

# Recipes

To give you a better understanding of how the shipcloud api could be used you can find a few
recipes on this page. Sometimes there's also a certain chain of calls you need to perform to
achieve a specific goal.

## DHL Packstation
When sending to a DHL Packstation the following parameters have to be defined:

- <code>care_of</code> = customer id number (_postnummer_)
- <code>street_no</code> = number of packstation

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight javascript %}
{
  'from': {
    // see addresses [1]
  },
  'to': {
    'company': 'shipcloud GmbH',
    'first_name': 'Hans',
    'last_name': 'Meier',
    'care_of': '1234567',
    'street': 'PACKSTATION',
    'street_no': '109',
    'city': 'Hamburg',
    'zip_code': '20148',
    'country': 'DE'
  },
  'package': {
    // see packages [2]
  },
  'carrier': 'dhl',
  'service': 'standard',
  'create_shipping_label': true
}
{% endhighlight %}

## DHL Postfiliale
When sending to a DHL post office the following parameters have to be defined:

- <code>care_of</code> = customer id number (_postnummer_)
- <code>street_no</code> = number of the Postfiliale outlet

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight javascript %}
{
  'from': {
    // see addresses [1]
  },
  'to': {
    'company': 'shipcloud GmbH',
    'first_name': 'Hans',
    'last_name': 'Meier',
    'care_of': '1234567',
    'street': 'POSTFILIALE',
    'street_no': '515',
    'city': 'Hamburg',
    'zip_code': '20148',
    'country': 'DE'
  },
  'package': {
    // see packages [2]
  },
  'carrier': 'dhl',
  'service': 'standard',
  'create_shipping_label': true
}
{% endhighlight %}

## Additional services

### DHL - Cash on delivery

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight javascript %}
{
  'from': {
    // see addresses [1]
  },
  'to': {
    // see addresses [1]
  },
  'package': {
    // see packages [2]
  },
  'additional_services': {
    'name': 'cash_on_delivery',
    'properties': {
      'amount': 123.45,
      'currency': 'EUR',
      'bank_account_holder': 'Max Mustermann',
      'bank_name': 'Musterbank',
      'bank_account_number': 'DE12500105170648489890',
      'bank_code': 'BENEDEPPYYY'
    }
  }
  'carrier': 'dhl',
  'service': 'standard',
  'create_shipping_label': true
}
{% endhighlight %}

### DPD - Drop authorization

When sending packages via DPD the sender can allow the carrier to leave the shipment with someone
else in case the receiver isn't present and has allowed the sender to do so.
{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight javascript %}
{
  'from': {
    // see addresses [1]
  },
  'to': {
    // see addresses [1]
  },
  'package': {
    // see packages [2]
  },
  'additional_services': {
    'name': 'drop_authorization',
    'properties': {
      'message': 'Description about where the package should be left'
    }
  }
  'carrier': 'dpd',
  'service': 'standard',
  'create_shipping_label': true
}
{% endhighlight %}

### DPD - Saturday delivery

When sending packages on a Friday you can specify that they should be delivered on Saturday (if
the carrier supports this).

__Requirements:__

- <code>service</code> has to be _'one_day'_ or _'one_day_early'_
- you'll have to use your own contract with the carrier

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight javascript %}
{
  'from': {
    // see addresses [1]
  },
  'to': {
    // see addresses [1]
  },
  'package': {
    // see packages [2]
  },
  'additional_services': {
    'name': 'saturday_delivery',
  }
  'carrier': 'dpd',
  'service': 'one_day',
  'create_shipping_label': true
}
{% endhighlight %}

***

## _Footnotes_

_[1] Addresses_
{% highlight javascript %}
{
  'company': 'Gewuerze Paderborn',
  'first_name': 'Karl',
  'last_name': 'Müller',
  'street': 'Musterstraße',
  'street_no': '14a',
  'city': 'Paderborn',
  'zip_code': '33089',
  'country': 'DE'
}
{% endhighlight %}


_[2] Packages_
{% highlight javascript %}
{
  'weight': 1.5,
  'length': 10,
  'width': 6,
  'height': 8
}
{% endhighlight %}

___Notice:___
_At the moment we're only supporting sending a single package with one shipment. Our api responses
however return an array to be able to switch to sending  multiple packages with a single shipment
in the future_
