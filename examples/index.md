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
or time. We currently support advance notices for Cargo International, DHL and DPD. While DHL
supports notifications via email DPD also allows the recipient to be notified via SMS. When using
Cargo International you only have the option to be notified via a phone call.

__Available for the following carriers:__
- [Cargo International](#cargo-international---appointment-announcement)
- [DHL](#dhl---advance-notice)
- [DPD](#dpd---predict)
- [GLS](#gls---flexdeliveryservice)
- [Hermes](#hermes---customer-alert)

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

#### Notification via phone

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
        "phone": "015112345678"
      }
    }
  ],
  "carrier": "cargo_international",
  "service": "standard",
  "description": "a short description of the shipment content",
  "reference_number": "order's reference number",
  "notification_email": "receiver@mail.com",
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

### Cargo International - Appointment announcement

If you want the recipient to get a call from the carrier some time before the shipment will arrive
at its destination you can specify the phone number of the recipient via our additional service
advance_notice.

__Requirements:__

- `service` has to be _'standard'_
- `package.type` can be _'disposable_pallet'_, _'euro_pallet'_ or
  _'cargo_international_large_parcel'_

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
        "phone": "015112345678"
      }
    }
  ],
  "carrier": "cargo_international",
  "service": "standard",
  "description": "a short description of the shipment content",
  "reference_number": "order's reference number",
  "notification_email": "receiver@mail.com",
  "create_shipping_label": true
}
{% endhighlight %}

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
predict service can be used with shipcloud by specifying it as an additional service. You can either
specify the email address or phone number of your customer to be notified.

For examples see [advance notice](#advance-notice)

__Requirements:__

- `service` has to be _'standard'_

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
- Can be used for shipments from Austria, Belgium, Denmark and Germany
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

### Hermes - Customer alert
When using the additional service Hermes customer alert you are requesting Hermes to notify your
customers of a pending delivery by contacting them directly either via email or SMS.

__Requirements:__

- You have to use your own (Hermes HSI) carrier contract

#### Notification via email

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "from": {
    "first_name": "Serge",
    "last_name": "Sender",
    "company": "Sender Corp.",
    "street": "Sender Str.",
    "street_no": "99",
    "zip_code": "20148",
    "city": "Hamburg",
    "country": "DE"
  },
  "to": {
    "first_name": "Roger",
    "last_name": "Receiver",
    "company": "Receiver AG",
    "care_of": "3. Liftstock",
    "street": "Receiver Str.",
    "street_no": "1",
    "city": "Hamburg",
    "zip_code": "20535",
    "country": "DE"
  },
  "package": {
    "weight": "2.5",
    "length": "40",
    "width": "20",
    "height": "10",
    "type": "parcel"
  },
  "service": "standard",
  "carrier": "hermes",
  "additional_services": [
    {
      "name": "advance_notice",
      "properties": {
        "email": "receiver@mail.com"
      }
    }
  ],
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
    "first_name": "Serge",
    "last_name": "Sender",
    "company": "Sender Corp.",
    "street": "Sender Str.",
    "street_no": "99",
    "zip_code": "20148",
    "city": "Hamburg",
    "country": "DE"
  },
  "to": {
    "first_name": "Roger",
    "last_name": "Receiver",
    "company": "Receiver AG",
    "care_of": "3. Liftstock",
    "street": "Receiver Str.",
    "street_no": "1",
    "city": "Hamburg",
    "zip_code": "20535",
    "country": "DE"
  },
  "package": {
    "weight": "2.5",
    "length": "40",
    "width": "20",
    "height": "10",
    "type": "parcel"
  },
  "service": "standard",
  "carrier": "hermes",
  "additional_services": [
    {
      "name": "advance_notice",
      "properties": {
        "sms": "+4915123456789"
      }
    }
  ],
  "create_shipping_label": true
}
{% endhighlight %}

### Hermes - IdentService

You can have the carrier Hermes check the identity of a recipient by specifying this additional
service (more details about the [IdentService at the Hermes website](https://blog.myhermes.de/hermesabc/identservice/)).
The shipment will be handed over to the recipient only if the data on the shipping label matches
100% to the shown ID.

__Requirements:__

- You have to use your own (Hermes HSI) carrier contract
- `id_type` is mandatory and can be one of the following values: _'german_identity_card'_,
  _'german_passport'_, _'international_passport'_
- `id_number` is mandatory
- Applicable only for domestic shipments whithin Germany

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "from": {
    "first_name": "Serge",
    "last_name": "Sender",
    "company": "Sender Corp.",
    "street": "Sender Str.",
    "street_no": "99",
    "zip_code": "20148",
    "city": "Hamburg",
    "country": "DE"
  },
  "to": {
    "first_name": "Roger",
    "last_name": "Receiver",
    "company": "Receiver AG",
    "care_of": "3. Liftstock",
    "street": "Receiver Str.",
    "street_no": "1",
    "city": "Hamburg",
    "zip_code": "20535",
    "country": "DE"
  },
  "package": {
    "weight": "2.5",
    "length": "40",
    "width": "20",
    "height": "10",
    "type": "parcel"
  },
  "service": "standard",
  "carrier": "hermes",
  "additional_services": [
    {
      "name": "hermes_ident_check",
      "properties": {
        "id_type": "german_identity_card",
        "id_number": "ID123ABC"
      }
    }
  ],
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

## Additional insurance
Some carriers are offering you the option of an additional insurance which you can book instead of
their normal liability. To book additional insurance you'll have to specify the parameter
`declared_value` as part of the package object with the value of the goods you're shipping.

__Available for the following carriers:__
- [Cargo International](#cargo-international---additional-insurance)
- [DHL](#dhl---additional-insurance)
- [UPS](#ups---declared-value)

{% include examples/declared_value_dhl.md %}

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

## Cargo International

### Cargo International - Disposable pallet

Use a [disposable pallet](https://www.cargointernational.de/einwegpalette) for sending goods via a
cheaper pallet transport.

__Requirements:__

- max. dimensions 240 cm x 120 cm x 200 cm
- max. weight 1000 kg per pallet
- sender and recipient have to be located in Germany

{% highlight json %}
{
  "from": {
    // see [1]
  },
  "to": {
    // see [1]
  },
  "package": {
    "weight": "200",
    "length":"100",
    "width": "100",
    "height": "50",
    "type": "disposable_pallet"
  },
  "carrier": "cargo_international",
  "service": "cargo_international_express",
  "description": "a short description of the shipment content",
  "reference_number": "order's reference number",
  "notification_email": "receiver@mail.com",
  "create_shipping_label": true
}
{% endhighlight %}

### Cargo International - Euro pallet

Use a [euro pallet (EPAL)](https://www.cargointernational.de/europalette) for sending goods via a
cheap pallet transport.

__Requirements:__

- max. dimensions 240 cm x 120 cm x 200 cm
- max. weight 1000 kg per pallet
- sender and recipient have to be located in Germany

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
    "weight": "200",
    "length":"100",
    "width": "100",
    "height": "50",
    "type": "euro_pallet"
  },
  "carrier": "cargo_international",
  "service": "cargo_international_express",
  "description": "a short description of the shipment content",
  "reference_number": "order's reference number",
  "notification_email": "receiver@mail.com",
  "create_shipping_label": true
}
{% endhighlight %}

### Cargo International - Large parcel

__Requirements:__

- max. dimensions 320 cm x 200 cm x 200 cm
- max. girth 700cm
- max. weight 100 kg
- max. dimensional weight: 800kg
- sender and recipient have to be located in Germany
- `service` can be _'standard'_ or _'cargo_international_express'_
- `package.type` has to be _'cargo_international_large_parcel'_

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
    "weight": "100",
    "length":"120",
    "width": "60",
    "height": "30",
    "type": "cargo_international_large_parcel"
  },
  "carrier": "cargo_international",
  "service": "standard",
  "description": "a short description of the shipment content",
  "reference_number": "order's reference number",
  "notification_email": "receiver@mail.com",
  "create_shipping_label": true
}
{% endhighlight %}

### Cargo International - Additional insurance

An additional insurance beyond legal liablity of 10 EUR/kg can be booked by using the
`declared_value` parameter.

__Requirements:__

- the object `declared_value` has to be specified stating the amount and currency of the shipment

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
    "weight": "1000",
    "length":"240",
    "width": "120",
    "height": "60",
    "type": "euro_pallet",
    "declared_value": {
      "amount": 5000,
      "currency": "EUR"
     }
  },
  "carrier": "cargo_international",
  "service": "standard",
  "description": "a short description of the shipment content",
  "reference_number": "order's reference number",
  "notification_email": "receiver@mail.com",
  "create_shipping_label": true
}
{% endhighlight %}

## DHL

### DHL - Europaket
The service [DHL Europaket](https://www.dhl.de/en/geschaeftskunden/paket/leistungen-und-services/internationaler-versand/europaket.html)
is a great solution for business-to-business parcel shipments, because shipments within the 32
supported countries will generally be delivered within 48 hours.

__Requirements:__

- minimum dimensions (l/w/h): 15 x 11 x 3.5 cm
- maximum dimensions (l/w/h): 120 x 60 x 60 cm
- maximum weight: 31.5 kg

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
    "weight": 7.5,
    "length": 55,
    "width": 22,
    "height": 25,
    "type": "parcel"
  },
  "carrier": "dhl",
  "service": "dhl_europaket",
  "create_shipping_label": true
}
{% endhighlight %}

### DHL - Packstation
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
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

### DHL - Postfiliale
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
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

### DHL - Additional insurance
With
<a href="https://www.dhl.de/content/dam/images/pdf/GK/Services/dhl-infoblatt-transportversicherung-en-06-2019.pdf" target="_blank">DHL additional insurance</a>,
you can insure your parcel beyond the usual liability limits of EUR 500.

__Caution:__
- Please keep in mind that additional fees will be charged by DHL. Check your DHL contract or ask
  your DHL Account Manager to get a quote.
- You shouldn't specify _"declared_value"_ when creating a shipment up to EUR 500 or lesser value unless you actually want the insurance instead of the liability.

__Requirements:__
- You’ll have to use your own DHL contract

### DHL - Bulk shipments
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
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

### DHL - Customs declaration
If you want to send a shipment to a country where a customs declaration is necessary you can specify
this the following way. Detailed information about the parameters can be found in our
[documentation of creating a shipment]({{ site.baseurl }}/reference/#shipments).

__Requirements:__

- ```customs_declaration.currency``` has to be _'EUR'_

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
  "customs_declaration": {
    "contents_type": "commercial_goods",
    "contents_explanation": "Alcoholic beverages",
    "currency": "EUR",
    "additional_fees": 0.0,
    "drop_off_location": "DE",
    "posting_date": "2017-10-07",
    "invoice_number": "123ABC",
    "total_value_amount": 247,
    "items": [{
        "origin_country": "DE",
        "description": "Linkwood 25 years",
        "hs_tariff_number": "501293884",
        "quantity": "1",
        "value_amount": "138.50",
        "net_weight": "0.8"
      },
      {
        "origin_country": "DE",
        "description": "Caol Ila 18 years",
        "hs_tariff_number": "123384890",
        "quantity": "1",
        "value_amount": "108.50",
        "net_weight": "0.8"
      }
    ]
  },
  "carrier": "dhl",
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

#### Response

{% highlight json %}
{
  "id": "199f803bf82fab79e17654213b61993fa78b0524",
  "carrier": "dhl",
  "carrier_tracking_no": "84168117830018",
  "tracking_url": "https://track.shipcloud.io/de/199f803bf8",
  "label_url": "https://sc-labels.s3.amazonaws.com/shipments/01370b4d/199f803bf8/label/shipping_label_199f803bf8.pdf",
  "price": 10.7,
  "customs_declaration": {
    "id": "cd-f466905c",
    "contents_type": "commercial_goods",
    "contents_explanation": "Alcoholic beverages",
    "invoice_number": "123ABC",
    "drop_off_location": "DE",
    "posting_date": "2017-10-07",
    "additional_fees": "0.0",
    "total_value_amount": "247.0",
    "currency": "EUR",
    "created_at": "2017-10-04T15:49:44+02:00",
    "updated_at": "2017-10-04T15:49:44+02:00",
    "carrier_declaration_document_url": "https://documents.shipcloud.io/shipments/519895c7165cdc032356d42c6d9babe8e3151473/customs_declaration_document.pdf",
    "items": [{
        "id": "cdi-50a46bf8",
        "description": "Linkwood 25 years",
        "hs_tariff_number": "501293884",
        "net_weight": 0.8,
        "origin_country": "DE",
        "quantity": 1,
        "value_amount": "138.5",
        "created_at": "2017-10-04T15:49:44+02:00",
        "updated_at": "2017-10-04T15:49:44+02:00"
      },
      {
        "id": "cdi-081a523d",
        "description": "Caol Ila 18 years",
        "hs_tariff_number": "123384890",
        "net_weight": 0.8,
        "origin_country": "DE",
        "quantity": 1,
        "value_amount": "108.5",
        "created_at": "2017-10-04T15:49:44+02:00",
        "updated_at": "2017-10-04T15:49:44+02:00"
      }
    ]
  }
}
{% endhighlight %}

## DPD - Parcel letter
DPD defines parcel letters as "everything which is too small for a parcel but larger and heavier
than a classical letter"

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

## Deutsche Post

### Deutsche Post - Brief
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

### Deutsche Post - Bücher- und Warenversand
If you want to send books, replacement parts, electronic devices, mobile telephone accessories,
data storage devices, textiles and household goods you can do so by using the service
[Bücher- und Warenversand](https://www.deutschepost.de/en/w/buecherundwarensendung.html) by Deutsche Post AG.

__Requirements:__

- `package.type` has to be _'parcel_letter'_
- `carrier` has to be _'dpag'_
- `service` has to be _'standard'_

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

### Deutsche Post - Büchersendung
<p class="bg-warning">
  <i class="fas fa-exclamation-triangle"></i>
  The product Büchersendung has been replaced by
  <a href="#deutsche-post---bücher--und-warenversand">Bücher- und Warenversand</a> as of July 1st
  2019.
</p>

### Deutsche Post - Warenpost
When using the [Deutsche Post Warenpost](https://www.deutschepost.de/en/w/warenpost.html) as your
service you can send letters that will have shipment tracking and are usually delivered on the next
day.

__Requirements:__

- ```carrier``` has to be _'dpag'_
- ```package.type``` has to be _'parcel_letter'_
- ```service``` has to be _'dpag_warenpost'_
- The sender and recipient have to be located in Germany
- For shipments up to 1,000g
- Maximum dimensions: length 353mm, width 250mm, thickness 50mm
- Minimum volume: 200 items per year
- you'll have to use your own contract with the carrier

__Notice:__
Since this is a new offering of Deutsche Post, the tracking events returned by the carrier can
differ from the ones shown on the carriers' tracking page. We therefore advise you to send customers
to the carrier's tracking page for now until the carrier has figured out a way to return meaningful
tracking events.

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
    "length": 20,
    "width": 15,
    "height": 5,
    "type": "parcel_letter"
  },
  "carrier": "dpag",
  "service": "dpag_warenpost",
  "create_shipping_label": true
}
{% endhighlight %}

### Deutsche Post - Warenpost International
You can also send international shipments using the Warenpost service of Deutsche Post from outside
of Germany. There are two different services you can use. The normal use case are tracked shipments
using the service _'dpag_warenpost'_. You can also have international shipments without tracking
information. For this you just specify the service to be _'dpag_warenpost_untracked'_.

__Requirements:__

- ```carrier``` has to be _'dpag'_
- ```package.type``` has to be _'parcel_letter'_
- ```service``` can be _'dpag_warenpost'_ or _'dpag_warenpost_untracked'_
- The sender has to be located in Germany
- The recipient has to be located outside of Germany
- Only applicable for shipments up to 2,000g
- Maximum dimensions: lenghth 600mm, width 600mm, length + width + thickness combined 900mm
- you'll have to use your own contract with the carrier

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
{
  "from": {
    "company": "Sender Corp.",
    "first_name": "Susan",
    "last_name": "Sender",
    "street": "Sender Str.",
    "street_no": "99",
    "zip_code": "20148",
    "city": "Hamburg",
    "country": "DE"
  },
  "to": {
    "company": "Receiver AG",
    "first_name": "Roger",
    "last_name": "Receiver",
    "street": "Receiver Str.",
    "street_no": "1",
    "city": "Vienna",
    "zip_code": "1040",
    "country": "AT"
  },
  "package": {
      "weight": 0.5,
      "length": 40,
      "width": 20,
      "height": 10,
      "type": "parcel_letter"
  },
  "carrier": "dpag",
  "service": "dpag_warenpost_untracked",
  "create_shipping_label": true
}
{% endhighlight %}

#### Customs declaration using CN22
If you want to send a shipment to a country where a customs declaration is necessary you can specify
this the following way. Detailed information about the parameters can be found in our
[documentation of creating a shipment]({{ site.baseurl }}/reference/#shipments).

__Requirements:__

- ```customs_declaration.contents_type``` is mandatory
- ```customs_declaration.currency``` has to be _'EUR'_
- ```customs_declaration.items``` is mandatory

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
{
  "from": {
    "company": "Sender Inc",
    "first_name": "Serge",
    "last_name": "Sender",
    "street": "Senderstr.",
    "street_no": "99",
    "city": "Hamburg",
    "zip_code": "20148",
    "country": "DE"
  },
  "to": {
      "company": "Receiver Inc.",
      "first_name": "Rolf",
      "last_name": "Receiver",
      "street": "Pennsylvania Ave NW",
      "street_no": "1600",
      "city": "Washington D.C.",
      "zip_code": "20500",
      "state": "DC",
      "country": "US",
  },
  "package": {
      "weight": 1.5,
      "length": 30,
      "width": 15,
      "height": 5,
      "type": "parcel_letter"
  },
  "customs_declaration": {
    "contents_type": "commercial_goods",
    "contents_explanation": "Goods for sale",
    "currency": "EUR",
    "total_value_amount": 150,
    "items": [{
        "origin_country": "DE",
        "description": "Linkwood 25 years",
        "hs_tariff_number": "62032280",
        "quantity": 1,
        "value_amount": 70,
        "net_weight": 1.0
      },
      {
        "origin_country": "DE",
        "description": "Caol Ila 18 years",
        "hs_tariff_number": "62032280",
        "quantity": 1,
        "value_amount": 80,
        "net_weight": 0.5
      }
    ]
  },
  "carrier": "dpag",
  "service": "dpag_warenpost",
  "create_shipping_label": true
}
{% endhighlight %}

### Deutsche Post - Warensendung
<p class="bg-warning">
  <i class="fas fa-exclamation-triangle"></i>
  The product Warensendung has been replaced by
  <a href="#deutsche-post---bücher--und-warenversand">Bücher- und Warenversand</a> as of July 1st
  2019.
</p>

## GLS

### GLS - Incoterms
To be able to send dutiable shipments you have to send GLS the shipment specific incoterm with your
request.

__Requirements:__

- `incoterm` is mandatory, its value can be `ddp`, `ddp_untaxed`, `dap` or `dap_cleared`

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "to": {
    "first_name": "Daniel",
    "last_name": "Bernoulli",
    "street": "Rue du Grand-Pré",
    "street_no": "2a",
    "city": "Lausanne",
    "zip_code": "1007",
    "country": "CH"
  },
  "package": {
    "weight": 1.5,
    "length": 20,
    "width": 20,
    "height": 20
  },
  "service": "standard",
  "carrier": "gls",
  "incoterm": "ddp",
  "create_shipping_label": true
}
{% endhighlight %}

### GLS - Pick&ShipService
Using the [Pick&ShipService](https://gls-group.eu/DE/de/versand-services/pick-ship-service) you can
request GLS to pick up a parcel at the address of your choice and deliver it directly to the
recipient.

__Requirements:__

- the sender has to be located in Germany or Austria
- you'll have to use your own contract with the carrier
- only available when using GLS Web API integration

__Additional information:__

- pickup will take place the next working day at the shipping address
- the label within our response can't be used for shipping, since the carrier will bring a shipping
  label when picking up the parcel. It can be used for internal processes or for package assignment.

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "from": {
    "first_name": "Roger",
    "last_name": "Receiver",
    "street": "Receiver Str.",
    "street_no": "1",
    "city": "Hamburg",
    "zip_code": "20535",
    "country": "DE"
  },
  "to": {
    "first_name": "Serge",
    "last_name": "Sender",
    "company": "Sender Corp.",
    "street": "Sender Str.",
    "street_no": "99",
    "zip_code": "20148",
    "city": "Hamburg",
    "country": "DE"
  },
  "package": {
    "weight": "2.5",
    "length": "40",
    "width": "20",
    "height": "10",
    "type": "parcel"
  },
  "service": "gls_pick_and_ship",
  "carrier": "gls",
  "create_shipping_label": true
}
{% endhighlight %}

### GLS - Returns
__Requirements:__

- Only available when using GLS Web API integration

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "from": {
    "first_name": "Roger",
    "last_name": "Receiver",
    "street": "Receiver Str.",
    "street_no": "1",
    "city": "Hamburg",
    "zip_code": "20535",
    "country": "DE"
  },
  "to": {
    "first_name": "Serge",
    "last_name": "Sender",
    "company": "Sender Corp.",
    "street": "Sender Str.",
    "street_no": "99",
    "zip_code": "20148",
    "city": "Hamburg",
    "country": "DE"
  },
  "package": {
    "weight": "2.5",
    "length": "40",
    "width": "20",
    "height": "10",
    "type": "parcel"
  },
  "service": "returns",
  "carrier": "gls",
  "create_shipping_label": true
}
{% endhighlight %}

### GLS - ShopDeliveryService
> GLS delivers parcels (except tyres) directly to a ParcelShop. Recipients select in advance the ParcelShop to which the parcel should be sent.
> Once parcels have arrived, GLS informs recipients by e-mail or text message. They can collect their parcels from the GLS ParcelShop within the next eight working days after the day of delivery.

__Requirements:__

- `to.first_name` is mandatory
- `to.last_name` is mandatory
- `to.email` or `to.phone` has to be specified
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

## Hermes

### Hermes - Bulk shipments

__Requirements:__

- ```package.type``` has to be _'bulk'_
- You have to use your own (Hermes HSI) carrier contract

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
{
  "from": {
    "first_name": "Serge",
    "last_name": "Sender",
    "company": "Sender Corp.",
    "street": "Sender Str.",
    "street_no": "99",
    "zip_code": "20148",
    "city": "Hamburg",
    "country": "DE"
  },
  "to": {
    "first_name": "Roger",
    "last_name": "Receiver",
    "company": "Receiver AG",
    "care_of": "3. Liftstock",
    "street": "Receiver Str.",
    "street_no": "1",
    "city": "Hamburg",
    "zip_code": "20535",
    "country": "DE"
  },
  "package": {
    "weight": 5.5,
    "length": 25,
    "width": 36,
    "height": 5,
    "type": "bulk"
  },
  "carrier": "hermes",
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

### Hermes - ParcelShopDeliveryService

__Requirements:__

- You have to use your own (Hermes HSI) carrier contract
- `drop_off_point.drop_off_point_id` is mandatory (can be determined through the [Hermes Website](https://www.myhermes.de/paketshop/))
- `drop_off_point.type` has to be `parcel_shop`

__Options:__

- Hermes can notify the receiver via sms or email if you provide the additional service
  [advance notice](#hermes---customer-alert)

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "from": {
    "first_name": "Serge",
    "last_name": "Sender",
    "company": "Sender Corp.",
    "street": "Sender Str.",
    "street_no": "99",
    "zip_code": "20148",
    "city": "Hamburg",
    "country": "DE"
  },
  "to": {
    "first_name": "Roger",
    "last_name": "Receiver",
    "company": "Hermes Paketshop Schmidt",
    "care_of": "3. Liftstock",
    "street": "Receiver Str.",
    "street_no": "1",
    "city": "Hamburg",
    "zip_code": "20535",
    "country": "DE",
    "drop_off_point": {
      "drop_off_point_id": "660328",
      "type": "parcel_shop"
    }
  },
  "package": {
    "weight": "2.5",
    "length": "40",
    "width": "20",
    "height": "10",
    "type": "parcel"
  },
  "service": "standard",
  "carrier": "hermes",
  "create_shipping_label": true
}
{% endhighlight %}

### Hermes - Returns

__Requirements:__

- When using Hermes HSI you will have to use your own carrier contract
- Applicable only for domestic return shipments whithin Germany

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}
{% highlight json %}
{
  "from": {
    "first_name": "Roger",
    "last_name": "Receiver",
    "street": "Receiver Str.",
    "street_no": "1",
    "city": "Hamburg",
    "zip_code": "20535",
    "country": "DE"
  },
  "to": {
    "first_name": "Serge",
    "last_name": "Sender",
    "company": "Sender Corp.",
    "street": "Sender Str.",
    "street_no": "99",
    "zip_code": "20148",
    "city": "Hamburg",
    "country": "DE"
  },
  "package": {
    "weight": "2.5",
    "length": "40",
    "width": "20",
    "height": "10",
    "type": "parcel"
  },
  "service": "returns",
  "carrier": "hermes",
  "create_shipping_label": true
}
{% endhighlight %}

## PARCEL.ONE

### PARCEL.ONE - Customs declaration
If you want to send a shipment to a country where a customs declaration is necessary you can specify
this the following way. Detailed information about the parameters can be found in our
[documentation of creating a shipment]({{ site.baseurl }}/reference/#shipments).

__Requirements:__

- ```customs_declaration.contents_type``` is mandatory
- ```customs_declaration.currency``` has to be _'EUR'_
- ```customs_declaration.items``` is mandatory

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
{
  "from": {
    "first_name": "Serge",
    "last_name": "Sender",
    "company": "Sender Corp.",
    "street": "Sender Str.",
    "street_no": "99",
    "zip_code": "20148",
    "city": "Hamburg",
    "country": "DE"
  },
  "to": {
    "company": "Apple Inc.",
    "first_name": "Tim",
    "last_name": "Cook",
    "street": "Infinite Loop",
    "street_no": "1",
    "zip_code": "95014",
    "city": "Cupertino",
    "state": "CA",
    "country": "US",
    "phone": "408-996-1010"
  },
  "package": {
    "weight": "2",
    "length": "8",
    "width": "26",
    "height": "15",
    "type": "parcel"
  },
  "customs_declaration": {
    "contents_type": "commercial_goods",
    "contents_explanation": "Alcoholic beverages",
    "currency": "EUR",
    "additional_fees": 0.0,
    "drop_off_location": "DE",
    "posting_date": "2017-10-07",
    "invoice_number": "123ABC",
    "total_value_amount": 108.50,
    "items": [
      {
        "origin_country": "DE",
        "description": "Caol Ila 18 years",
        "hs_tariff_number": "123384890",
        "quantity": "1",
        "value_amount": "108.50",
        "net_weight": "0.8"
      }
    ]
  },
  "carrier": "parcel_one",
  "service": "standard",
  "create_shipping_label": true
}
{% endhighlight %}

## UPS

### UPS - Declared value
By using
<a href="https://www.ups.com/de/en/shipping/services/value-added/declared-value.page?loc=en_DE" target="_blank">
  UPS declared value
</a>
you can insure your parcel beyond the usual liability limits of EUR 510.

__Caution:__

- Additional fees will be charged by UPS. Check your UPS contract or ask your account manager to get
  a quote.
- You shouldn't specify "declared_value" when creating a shipment up to EUR 510 or lesser value
  unless you actually want the insurance instead of the liability.

__Requirements:__
- You’ll have to use your own UPS contract

### UPS - Expedited
If you want to send less urgent shipments to destinations outside of Europe you can use the UPS
service
<a href="https://www.ups.com/de/en/shipping/international/services/expedited.page?loc=en_DE" target="_blank">
  expedited
</a>
to reach more than 220 countries and territories.

__Requirements:__
- `description` is mandatory
- `service` has to be _'ups_expedited'_
- You’ll have to use your own UPS contract
- The recipient has to be located outside of the EU, Liechtenstein, Norway or Switzerland

{% highlight http %}
POST https://api.shipcloud.io/v1/shipments
{% endhighlight %}

{% highlight json %}
{
  "from": {
    // see [1]
  },
  "to": {
    "company": "Apple Inc.",
    "first_name": "Tim",
    "last_name": "Cook",
    "care_of": null,
    "street": "Infinite Loop",
    "street_no": "1",
    "zip_code": "95014",
    "city": "Cupertino",
    "state": "CA",
    "country": "US",
    "phone": "408-996-1010"
  },
  "package": {
    // see [2]
  },
  "carrier": "ups",
  "service": "ups_expedited",
  "description": "Linkwood 25 years",
  "create_shipping_label": true
}
{% endhighlight %}

### UPS - Express 12:00
The UPS service [Express 12:00](https://www.ups.com/de/en/shipping/services/intra/express-1200.page?loc=en_DE)
ensures a next business day delivery by noon throughout the country.

__Requirements:__

- The sender and recipient have to be located in Germany
- ```service``` has to be _'ups_express_1200'_
- Label size can be A5 & A6

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
  "carrier": "ups",
  "service": "ups_express_1200",
  "create_shipping_label": true
}
{% endhighlight %}

## Returns
Return shipments are created the same way you'd create a normal shipment. The only thing that's
different is the service parameter and that you can't use (additional) services like express
shipping.

__Requirements:__

- ```service``` has to be _'returns'_
- ```carrier``` can be _'dhl', 'dpd', 'gls' ([details for GLS Web API](#gls---returns)), 'hermes' ([details for Hermes HSI](#hermes---returns)) or 'ups'_

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
