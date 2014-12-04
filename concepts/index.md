---
title: Concepts behind shipcloud
nav: concepts
---

# API

## Introduction
To make it easier for you the developer, we've created the Shipcloud API deliberately using the RESTful architectural
style. This means if you're familiar with REST and using RESTful services, you will have no problems using our API. As
it's common when implementing a REST-API we're using resource-oriented URLs and HTTP authentication.

For developers to test their code before shipping it, we're supplying every account with test and live API keys.

## Authentication
Every call to our API is secured by an API key. This key is tied specificly to your account and therefore should never
be given to anyone else outside of your control. You are able to manage your API keys from your account page.

To use the API key you'll have to send it with every request being made. We're using http Basic

Authentication to our API has to be done via [HTTP Basic Auth](http://en.wikipedia.org/wiki/Basic_access_authentication).
You'll have to provide your API key as the basic auth username. You don't have to provide a password.

__Be advised:__ The API key has to be [Base64](http://en.wikipedia.org/wiki/Base64) encoded.

Aside from sending your API key all API requests must be made using HTTPS. Don't bother trying to use HTTP. It will
fail!

## Versioning
From time to time we will be releasing new versions of our API. In order to not break (your) implementations of our
API, we will adjust the path to reflect each new major version. So consecutive releases will be called using /v2/, /v3/
and so on after the base url.

## Address handling
When sending <code>to</code> or <code>from</code> parameters you have to specify a contact for the shipment. This can
either be a <code>company</code> or a person identified by <code>first_name</code> and <code>last_name</code>. So
although the entries are marked as being optional, one of them has to be specified in the request.

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

## Returns
We're currently only supporting returns for DHL, HERMES and UPS.

# Supported services
We currently support sending packages via the following carriers and services:

{% include concepts/supported_services.html %}

# Sandbox vs. Production

When creating an account at shipcloud you get access for 2 systems. A sandbox and a production system. The first one
can be used to tinker with (e.g. for developing the integration of shipcloud into your own platform) while the
production system is used for the actual creation of shipping labels.

## Keys
Therefor when you create an account at shipcloud, 2 api keys get generated. A sandbox key that you can use for testing
our api and a live key, that can be used to create the actual shipping labels you're going to put on the packages
you're sending.

If at any time you feel the need to generate a new set of api keys (e.g. because you get the feeling, that your system
has been compromised) you can do that in the shipcloud backoffice by clicking your email address at the upper right
corner and selecting the menu item <code>API Key</code>.

# Plan up-/downgrades

If you feel like tinkering with our api you can always register for free using our developer plan. If you're satisfied
with our service feel free to upgrade to a payed plan. Upgrades from one payed plan to a higher one can be done at any
time. We use the balance of your current plan against the first month of your new one, so you won't be billed extra for
upgrading before your current plan runs out.

# Prices & Vat

All of our prices are displayed without VAT. We will however charge you with the full German value added tax which is
19% at the moment.
