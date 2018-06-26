---
title: examples for using the shipcloud api
nav: examples
---

# Examples

To give you a better understanding of how the shipcloud api could be used you can find a few
examples on this page. Sometimes there's also a certain chain of calls you need to perform to
achieve a specific goal.

## Additional services

Some services can be used on top of a normal shipment. Therefore they don't fall under the normal
definition of a service - and because they mostly are only available for a few carriers. We're
calling them _additional services_.


### Advance notice
Some carriers provide the option to notify the recipient of a shipment of its arrival date and /
or time. We currently support advance notices for DHL and DPD. While DHL supports notifications via
email DPD also allows the recipient to also be notified via SMS.

__Requirements:__

- ```language``` has to be provided as a
[ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes)

__Available for the following carriers:__
- [DHL](#dhl---advance-notice)
- [DPD](#dpd---predict)
- [GLS](#gls---flexdeliveryservice)

#### Notification via email

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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
  "carrier": "dhl",
  "create_shipping_label": true
}
{% endhighlight %}

#### Notification via SMS

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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

### Cash on delivery

__Available for the following carriers:__
- [DHL](#dhl---cash-on-delivery)
- [GLS](#gls---cash-on-delivery)
- [UPS](#ups---cash-on-delivery)

### Saturday delivery

__Available for the following carriers:__
- [DHL Express](#dhl-express---saturday-delivery)
- [DPD](#dpd---saturday-delivery)

### DHL - Advance notice
DHL currently only supports advance notice via email. You can find an example above in our
[advance notice](#notification-via-email) section.

### DHL - Cash on delivery

__Requirements:__

- You'll have to use your own DHL contract

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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
        "bank_code": "BENEDEPPYYY",
        "reference1": "reason for transfer"
      }
    }
  ],
  "carrier": "dhl",
  "create_shipping_label": true
}
{% endhighlight %}

### DHL - Delivery Time (Preferred Time)

With the
[DHL preferred time service](https://www.dhl.de/en/paket/information/geschaeftskunden/service-wunschzeit.html)
you can choose between several two-hour time frames for
the delivery of your item. The following options are available for ```time_of_day_earliest``` and
```time_of_day_latest``` (Monday - Saturday):

* Nationwide in Germany for evening deliveries:
  * 18:00 - 20:00
  * 19:00 - 21:00
* In specific German conurbations for daytime deliveries:
  * 10:00 - 12:00
  * 12:00 - 14:00
  * 14:00 - 16:00
  * 16:00 - 18:00

__Requirements:__

- You'll have to use your own DHL contract
- Your DHL contract must be setup for DHL "Ship" (DHL "Versenden")
- The recipient has to be located in Germany
- Only available for label size A5

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "carrier": "dhl",
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
      "name": "delivery_time",
      "properties": {
          "time_of_day_earliest": "18:00",
          "time_of_day_latest": "20:00"
      }
    }
  ],
  "carrier": "dhl",
  "create_shipping_label": true
}
{% endhighlight %}

### DHL - Ident Check
If you want the carrier to only deliver the shipment to a specific person you can use the DHL ident
check. DHL will ask the recepient to show them a valid ID. Thus you will be able to minimize fraud,
only deliver to persons of a certain age (e.g. when sending alcoholic beverages, adult content or
pharmaceuticals that need a prescription).

__Caution:__
- Please keep in mind that additional fees will be charged by DHL. Check your DHL contract or ask
  your DHL Account Manager to get a quote.

__Requirements:__

- You'll have to use your own DHL contract
- Your DHL contract must be setup for DHL "Ship" (DHL "Versenden")
- The recipient has to be located in Germany
- Only available for label size A5

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "carrier": "dhl",
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
      "name": "dhl_ident_check",
      "properties": {
        "first_name": "Hans",
        "last_name": "Dampf",
        "date_of_birth": "1982-09-30",
        "minimum_age": "16"
      }
    }
  ],
  "carrier": "dhl",
  "create_shipping_label": true
}
{% endhighlight %}

### DHL - Premium International

Using the additional service
<a href="https://www.dhl.de/en/paket/information/geschaeftskunden/premium.html" target="_blank" data-proofer-ignore>DHL premium international</a>
you can reduce international shipping transit times.

__Requirements:__

- You'll have to use your own DHL contract
- Your DHL contract must be setup for DHL "Ship" (DHL "Versenden")

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "carrier": "dhl",
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
      "name": "premium_international"
    }
  ],
  "carrier": "dhl",
  "create_shipping_label": true
}
{% endhighlight %}

### DHL - Visual age check
When sending goods that are only legally available for people of a specific age, you can request
the carrier to check the receiver's age visually. Just add the additional service
`visual_age_check` and either `16` or `18` as its `minimum_age` value.

__Requirements:__

- You need to use your own DHL Ship contract
- The recipient has to be located in Germany

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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
      "name": "visual_age_check",
      "properties": {
        "minimum_age": "16"
      }
    }
  ],
  "carrier": "dhl",
  "create_shipping_label": true
}
{% endhighlight %}

### DHL Express - Saturday delivery

When sending packages on a Friday you can specify that they should be delivered on Saturday.

__Requirements:__

- ```service``` has to be _'one_day'_ or _'one_day_early'_
- you'll have to use your own contract with the carrier

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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
  "carrier": "dhl_express",
  "service": "one_day",
  "create_shipping_label": true
}
{% endhighlight %}

### DPD - Drop authorization

When sending packages via DPD the sender can allow the carrier to leave the shipment with someone
else in case the receiver isn't present and has allowed the sender to do so.
{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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

- ```service``` has to be _'one_day'_ or _'one_day_early'_
- you'll have to use your own contract with the carrier

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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
[predict service](https://www.dpd.com/de_en/sending_parcels/our_options/predict)
can be used with shipcloud by specifying it as an additional service. You can either specify the
email address or phone number of your customer to be notified.

For examples see [advance notice](#advance-notice)

__Requirements:__

- `service` has to be _'standard'_

## Label size
Not all carriers use the same size of labels. Have a look at our chart of the
[carrier specific label sizes]({{ site.baseurl }}/concepts/#carrier-specific-label-sizes)
we support.

You can configure the standard size we should create labels for each and every carrier from within
the shipcloud backoffice, so you won't have to think about handling different label sizes. You can
however define the size of the label on a per shipment basis. So, when you're creating a shipping
label via our api you can send us the size the shipping label should have.

{% highlight json %}
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
  "carrier": "dhl",
  "service": "standard",
  "label": {
    "size": "A5"
  },
  "create_shipping_label": true
}
{% endhighlight %}

### GLS - Cash on delivery
> Cash on delivery parcels with GLS: The recipient pays for the goods on delivery in cash. GLS
> accepts the money and transfers it securely and quickly to the sender’s account – usually within
> five working days after delivery.

__Requirements:__

- Maximum cash on delivery amount and liability limit: € 2,500
- The Currency has to be EUR
- The sender has to be located in Germany or Austria
- The recipient has to be located in Germany or Austria
- You'll have to use your own contract with the carrier
- Only available when using GLS Web API integration

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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
        "reference1": "reason for transfer"
      }
    }
  ],
  "carrier": "gls",
  "create_shipping_label": true
}
{% endhighlight %}

### GLS - FlexDeliveryService
> The <a href="https://gls-group.eu/DE/en/flexdelivery" target="_blank">FlexDeliveryService</a> gives recipients numerous possibilities to customise parcel delivery.
> [...]
> The recipient gets information via e-mail about the upcoming parcel delivery, including the estimated delivery time frame. If the recipient will not be at home, he can choose from a range of practical delivery options – actively influencing the delivery of the parcel.

__Requirements:__
- `service` has to be `standard`
- `properties.email` is mandatory
- Can be used for shipments from Austria, Belgium, Denmark and Germany to the following countries:
  AT, BE, CZ, DE, DK, ES, FR, HR, HU, LU, NL, PL, RO, SI, SK
- Only available when using GLS Web API integration

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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
        "sms": "+4917012345678"
      }
    }
  ],
  "service": "standard",
  "carrier": "gls",
  "create_shipping_label": true
}
{% endhighlight %}

### GLS - Guaranteed24Service
When using the additional service
<a href="https://gls-group.eu/DE/de/versand-services/guaranteed-24-service" target="_blank">Guaranteed24Service</a>
the carrier GLS is guaranteeing delivery on the next business day (except Saturdays) for shipments
within Germany. If the delivery can't be made within time, GLS will refund the extra charges for
the service.

__Requirements:__

- Only applicable for shipments within Germany
- The sender and recipient have to be located in Germany
- You'll have to use your own contract with the carrier
- Only available when using GLS Web API integration

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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
      "name": "gls_guaranteed24service"
    }
  ],
  "service": "standard",
  "carrier": "gls",
  "create_shipping_label": true
}
{% endhighlight %}

### UPS - Adult signature

When sending packages via UPS you can specify that the receiver needs to be an adult, and prove the fact with his or her signature.

__Requirements:__

- you'll have to use your own contract with the carrier

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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
      "name": "ups_adult_signature"
    }
  ],
  "carrier": "ups",
  "service": "one_day",
  "create_shipping_label": true
}
{% endhighlight %}

### UPS - Cash on delivery

__Requirements:__

- only collection of cash is available for now, no collection of checks
- you'll have to use your own contract with the carrier

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
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
        "currency": "EUR"
      }
    }
  ],
  "carrier": "ups",
  "create_shipping_label": true
}
{% endhighlight %}

## DHL Packstation
When sending to a DHL Packstation the following parameters have to be defined:

- ```care_of``` = customer id number (_postnummer_)
- ```street_no``` = number of packstation

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
{
  "from": {
    // see [1]
  },
  "to": {
    "first_name": "Hans",
    "last_name": "Meier",
    "care_of": "12345678",
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

- ```care_of``` = customer id number (_postnummer_)
- ```street_no``` = number of the Postfiliale outlet

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
{
  "from": {
    // see [1]
  },
  "to": {
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

## DHL additional insurance
With
<a href="https://www.dhl.de/content/dam/dhlde/downloads/paket/produkte-services/dhl-service-additional-insurance-072016.pdf" target="_blank">DHL additional insurance</a>,
you can insure your parcel beyond the usual liability limits of EUR 500. To book DHL additional
insurance  you'll have to specify the parameter `declared_value` as part of the package object with
the value of the goods you’re shipping.

__Caution:__
- Please keep in mind that additional fees will be charged by DHL. Check your DHL contract or ask
  your DHL Account Manager to get a quote.
- You shouldn’t specify "declared_value" when creating a shipment up to EUR 500 or lesser value unless you actually want the insurance instead of the liability.

__Requirements:__
- You’ll have to use your own DHL contract

{% include examples/declared_value_dhl.md %}

## DHL bulk shipments
Shipments that don't fall into the normal dimensions can be send by specifying them as bulk
items when sending via DHL. When doing this you won't have to specify the length, width or height
of your package.

__Requirements:__

- ```package.type``` has to be _'bulk'_
- you'll have to use your own contract with the carrier

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
{
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    "weight": 5.5,
    "length": 25,
    "width": 36,
    "height": 5,
    "type": "bulk"
  },
  "carrier": "dhl",
  "create_shipping_label": true
}
{% endhighlight %}

## DPD parcel letter
DPD defines [parcel letters](https://www.dpd.com/de_en/sending_parcels/our_shipping_services/parcelletter)
as "everything which is too small for a parcel but larger and heavier than a classical letter"

__Requirements:__

- ```package.type``` has to be _'parcel_letter'_

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
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
    "type": "parcel_letter"
  },
  "carrier": "dpd",
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

## Deutsche Post Büchersendung
You can send books, brochures, sheets of music and maps using the service
[Büchersendung](https://www.deutschepost.de/en/b/buechersendung_national.html) by Deutsche Post AG.

__Requirements:__

- ```package.type``` has to be _'books'_
- ```carrier``` has to be _'dpag'_

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
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
    "width": 18,
    "height": 5,
    "type": "books"
  },
  "carrier": "dpag",
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

## Deutsche Post Brief
If you want to send a simple [letter](https://www.deutschepost.de/en/b/brief_postkarte.html) using
the Deutsche Post AG services you can do that as well.

__Requirements:__

- ```package.type``` has to be _'letter'_
- ```carrier``` has to be _'dpag'_

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
{
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    "weight": 0.5,
    "length": 14,
    "width": 10,
    "height": 0.3,
    "type": "letter"
  },
  "carrier": "dpag",
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

## Deutsche Post Warensendung
You can send a variety of merchandise related things to your customers using the service
[Warensendung](https://www.deutschepost.de/en/w/warensendung.html) by Deutsche Post AG.

__Requirements:__

- ```package.type``` has to be _'parcel_letter'_
- ```carrier``` has to be _'dpag'_

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
{
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    "weight": 0.8,
    "length": 20,
    "width": 20,
    "height": 5,
    "type": "parcel_letter"
  },
  "carrier": "dpag",
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

## GLS - ShopDeliveryService
> GLS delivers parcels (except tyres) directly to a ParcelShop. Recipients select in advance the ParcelShop to which the parcel should be sent.
> Once parcels have arrived, GLS informs recipients by e-mail or text message. They can collect their parcels from the GLS ParcelShop within the next eight working days after the day of delivery.

__Requirements:__

- `to.first_name` is mandatory
- `to.last_name` is mandatory
- `to.email` is mandatory
- `drop_off_point.drop_off_point_id` is mandatory (can be determined through the [GLS parcelshop search](https://gls-group.eu/DE/en/depot-parcelshop-search))
- `drop_off_point.type` has to be `parcel_shop`
- The sender has to be located in Austria, Belgium or Germany
- The recipient has to be located in one of the following countries: AT, DE, BE, DK, PL
- Only available when using GLS Web API integration

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "to": {
    "first_name": "Karl",
    "last_name": "Müller",
    "street": "Musterstraße",
    "street_no": "14a",
    "city": "Paderborn",
    "zip_code": "33089",
    "country": "DE",
    "email": "receiver@mail.com",
    "phone": "0151-12345678",
    "drop_off_point": {
      "drop_off_point_id": "2760095246",
      "type": "parcel_shop"
    }
  },
  "package": {
    "weight": 1.5,
    "length": 20,
    "width": 20,
    "height": 20
  },
  "service": "standard",
  "carrier": "gls",
  "label": {
    "size": "A5"
  },
  "create_shipping_label": true
}
{% endhighlight %}

## Returns
Return shipments are created the same way you'd create a normal shipment. The only thing that's
different is the service parameter and that you can't use (additional) services like express
shipping.

__Requirements:__

- ```service``` has to be _'returns'_
- ```carrier``` can be _'dhl', 'ups', 'hermes' or 'dpd'_

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
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
  "carrier": "dhl",
  "service": "returns",
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
{% highlight json %}
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

In both cases you can either specify the pakadoo ID as ```pakadoo_id``` or you simply use
the ```care_of``` attribute with "PAK" as a prefix to the pakadoo ID (e.g "PAK 5KQTPH5").

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
{% highlight json %}
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
```care_of``` field (e.g. "PAK 5KQTPH5").

We're checking the ```care_of``` attribue for the "PAK" prefix. If it's found, we then check
if a valid pakadoo userid is present, validate it using the pakadoo system and return the users'
selected pakadoo point address, if available.

___Notice:___
_Any additional "to" address information given in the request will be replaced by what is returned
from the pakadoo system._

#### Create Shipment Request

{% highlight http %}
POST /shipments
{% endhighlight %}
{% highlight json %}
{
  "from": {
    // see [1]
  }
  "to": {
    "care_of": "PAK 5KQTPH5",
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

***

## _Footnotes_

_[1] Addresses_
{% highlight json %}
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
{% highlight json %}
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
