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
  "from": {
    // see [1]
  },
  "to": {
    "company": "shipcloud GmbH",
    "first_name": "Hans",
    "last_name": "Meier",
    "care_of": "1234567",
    "street": "PACKSTATION",
    "street_no": "109",
    "city": "Hamburg",
    "zip_code": "20148",
    "country": "DE"
  },
  "package": {
    // see [2]
  },
  "carrier": "dhl",
  "create_shipping_label": true
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
  "from": {
    // see [1]
  },
  "to": {
    "company": "shipcloud GmbH",
    "first_name": "Hans",
    "last_name": "Meier",
    "care_of": "1234567",
    "street": "POSTFILIALE",
    "street_no": "515",
    "city": "Hamburg",
    "zip_code": "20148",
    "country": "DE"
  },
  "package": {
    // see [2]
  },
  "carrier": "dhl",
  "create_shipping_label": true
}
{% endhighlight %}

## DHL higher insurance
If you want your DHL shipment to have a so called __higher insurance__  you'll have to specify the
parameter <code>declared_value</code> as part of the package object with the value of the goods
you're shipping. All __shipments up to 500 Euros are automatically insured__. You shouldn't specify
declared_value when creating a shipment of lesser value.

{% include recipes/declared_value_dhl.md %}

## DHL bulk shipments
Shipments that don't fall into the normal dimensions can be send by specifying them as bulk
items when sending via DHL. When doing this you won't have to specify the length, width or height
of your package.

__Requirements:__

- <code>package_type</code> has to be _'bulk'_
- you'll have to use your own contract with the carrier

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight javascript %}
{
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    "weight": 5.5,
    "package_type": "bulk"
  },
  "carrier": "dhl",
  "create_shipping_label": true
}
{% endhighlight %}

## DPD parcel letter
DPD defines [parcel letters](http://www.dpd.com/de_en/home/produkte_services/special_services/dpd_parcelletter)
as "everything which is too small for a parcel but larger and heavier than a classical letter"

__Requirements:__

- <code>package_type</code> has to be _'parcel_letter'_

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight javascript %}
{
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    "weight": 0.5,
    "length": 25,
    "width": 36,
    "height": 5,
    "package_type": "parcel_letter"
  },
  "carrier": "dpd",
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

## Working with addresses
You can create a new address object by POSTing to our ADDRESS endpoint

{% highlight http %}
POST /addresses
{% endhighlight %}
{% highlight json %}
{
  "first_name": "Maxi",
  "last_name": "Mustermann",
  "street": "Mittelweg",
  "street_no": "158a",
  "zip_code": "20148",
  "city": "Hamburg",
  "country": "DE"
}
{% endhighlight %}

The response will look like this:

{% highlight json %}
{
  "company": null,
  "first_name": "Maxi",
  "last_name": "Mustermann",
  "care_of": null,
  "street": "Mittelweg",
  "street_no": "158a",
  "zip_code": "20148",
  "city": "Hamburg",
  "state": null,
  "country": "DE",
  "phone": null,
  "id": "10b10652-570b-4bc3-9e14-dab0b51b075f"
}
{% endhighlight %}

As you can see, the response contains a unique id for this address, which you can use to create shipments

{% highlight http %}
POST /shipments
{% endhighlight %}
{% highlight javascript %}
{
  "carrier":"DHL",
  "to": {
    "id": "10b10652-570b-4bc3-9e14-dab0b51b075f"
  },
  "package": {
    // see [2]
  },
  "carrier": "dhl",
  "create_shipping_label": true
}
{% endhighlight %}

## pakadoo

pakadoo is a service that lets you receive personal packages at work. For this a so called pakadoo
point is being installed in your companies office rooms. For more information visit
[http://www.pakadoo.de](http://www.pakadoo.de)

There are 2 ways you can create a shipment that’s going to be send to a pakadoo point:  

- create an address and use the id that’s returned for the address to create a shipment  
- create a shipment by specifying the pakadoo ID in the to address object of the shipments call.

In both cases you can either specify the pakadoo ID as <code>pakadoo_id</code> or you simply use
the <code>care_of</code> attribute with "PAK" as a prefix to the pakadoo ID (e.g "PAK 5KQTPH5").

### Create a pakadoo address and shipment using the pakadoo_id

If the pakadoo user has been identified, shipcloud will return an address object, containing the
currently selected delivery address for said pakadoo user.

#### Create Address Request

{% highlight http %}
POST /addresses
{% endhighlight %}
{% highlight json %}
{
  "pakadoo_id": "5KQTPH5"
}
{% endhighlight %}

#### Create Address Response

{% highlight json %}
{
  "id": "71f2522f-be6f-4606-8eda-67997edfe2ac",
  "pakadoo_id": "5KQTPH5",
  "company": "LGI GmbH",
  "street": "Hewlett-Packard-Str.",
  "street_no": "1/1",
  "zip_code": "71083",
  "city": "Herrenberg",
  "country": "DE"
}
{% endhighlight %}

Like with every other address you can then use its unique address id to create a new shipment with it.

#### Create Shipment Request

{% highlight http %}
POST /shipments
{% endhighlight %}
{% highlight javascript %}
{
  "from": {
    // see [1]
  }
  "to": {
    "id": "71f2522f-be6f-4606-8eda-67997edfe2ac"
  },
  "package": {
    // see [2]
  },
  "carrier": "dhl",
  "create_shipping_label": true,
  "metadata": {
    "pakadoo": {
      "shop_name": "The shopname",
      "order_number": "123456",
      "order_date": "2015-06-01",
      "e_mail_shop": "user@example.com",
      "order_total": {
        "amount": 42.12,
        "currency": "EUR"
      }
    }
  }
}
{% endhighlight %}

### Create a shipment using the pakadoo ID in the care_of attribute

You can use this if e.g. you don't want to amend your checkout process. Your customers can use your
existing address form to specify the pakadoo point address by entering their pakadoo ID in the
<code>care_of</code> field (e.g. "PAK 5KQTPH5").

We're checking the <code>care_of</code> attribue for the "PAK" prefix. If it's found, we then check
if a valid pakadoo userid is present, validate it using the pakadoo system and return the users'
selected pakadoo point address, if available.

__Notice:__ Any additional "to" address information given in the request will be replaced by what
is returned from the pakadoo system.

#### Create Shipment Request

{% highlight http %}
POST /shipments
{% endhighlight %}
{% highlight javascript %}
{
  "from": {
    // see [1]
  }
  "to": {
    "care_of": "PAK 5KQTPH5"
    "company": "LGI GmbH",
    "street": "Hewlett-Packard-Str.",
    "street_no": "1/1",
    "zip_code": "71083",
    "city": "Herrenberg",
    "country": "DE",
  },
  "package": {
    // see [2]
  },
  "carrier": "dhl",
  "create_shipping_label": true,
  "metadata": {
    "pakadoo": {
      "shop_name": "The shopname",
      "order_number": "123456",
      "order_date": "2015-06-01",
      "e_mail_shop": "user@example.com",
      "order_total": {
        "amount": 42.12,
        "currency": "EUR"
      }
    }
  }
}
{% endhighlight %}

## Additional services

### DHL - Cash on delivery

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight javascript %}
{
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    // see [2]
  },
  "additional_services": [
    {
      "name": "cash_on_delivery",
      "properties": {
        "amount": 123.45,
        "currency": "EUR",
        "bank_account_holder": "Max Mustermann",
        "bank_name": "Musterbank",
        "bank_account_number": "DE12500105170648489890",
        "bank_code": "BENEDEPPYYY"
      }
    }
  ],
  "carrier": "dhl",
  "create_shipping_label": true
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
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    // see [2]
  },
  "additional_services": [
    {
      "name": "drop_authorization",
      "properties": {
        "message": "Description about where the package should be left"
      }
    }
  ],
  "carrier": "dpd",
  "create_shipping_label": true
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
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    // see [2]
  },
  "additional_services": [
    {
      "name": "saturday_delivery"
    }
  ],
  "carrier": "dpd",
  "service": "one_day",
  "create_shipping_label": true
}
{% endhighlight %}

### DPD - Predict

DPD allows recipients to be notified of a pending delivery within the next hour. The so called
[predict service](http://www.dpd.com/de_en/home/produkte_services/zusatzleistungen/national/predict)
can be used with shipcloud by specifying it as an additional service. You can either specify the
email address or phone number of your customer to be notified.

#### Notification via email

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight javascript %}
{
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    // see [2]
  },
  "additional_services": [
    {
      "name": "advance_notice",
      "properties": {
        "email": "test@example.com",
        "language": "en"
      }
    }
  ],
  "carrier": "dpd",
  "create_shipping_label": true
}
{% endhighlight %}

#### Notification via SMS

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight javascript %}
{
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    // see [2]
  },
  "additional_services": [
    {
      "name": "advance_notice",
      "properties": {
        "sms": "+4917012345678"
      }
    }
  ],
  "carrier": "dpd",
  "create_shipping_label": true
}
{% endhighlight %}

***

## _Footnotes_

_[1] Addresses_
{% highlight javascript %}
{
  "company": "Gewuerze Paderborn",
  "first_name": "Karl",
  "last_name": "Müller",
  "street": "Musterstraße",
  "street_no": "14a",
  "city": "Paderborn",
  "zip_code": "33089",
  "country": "DE"
}
{% endhighlight %}


_[2] Packages_
{% highlight javascript %}
{
  "weight": 1.5,
  "length": 10,
  "width": 6,
  "height": 8
}
{% endhighlight %}

___Notice:___
_At the moment we're only supporting sending a single package with one shipment. Our api responses
however return an array to be able to switch to sending  multiple packages with a single shipment
in the future_
