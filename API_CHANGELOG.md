---
title: shipcloud api changelog
---

# Change log
All notable changes to our api will be documented in this file. This way you can easily find out
about all changes we made in the past and see if there's anything new you have to consider since
you've last visited the api documentation.

This changelog does not follow [Semantic Versioning](http://semver.org/), since we currently do not
work with any other release modifiers than major versions.

**Notice**: Not everything we do affects the viewable parts of our api.

## [20170127] - 2017-01-27

### Added
- Introducing the [trackers ressource]({{ site.baseurl }}/reference/#trackers) to be able to import
  shipments by sending us carrier tracking numbers of shipments that were created, using another
  software.

## [20170119] - 2017-01-19

### Added
- When [reading a shipment]({{ site.baseurl }}/reference/#getting-information-about-a-shipment),
  `shipper_notification_email` will now be returned (_if specified during creation_)

## [20161021] - 2016-10-21

### Added
- You can now [specify a reference]({{ site.baseurl }}/examples/#dhl---cash-on-delivery) when
  creating a shipment that gets payed by cash on delivery, in order to see the reference on the
  bank statement

## [20161019] - 2016-10-19

### Removed
- We've removed the event type `shipcloud_label_created` because it was too confusing and users
didn't get the difference between this one and `label_created`.

## [20160511] - 2016-05-11

### Added
- You can supply the id of an address now when creating a ShipmentQuote

### Changed
- When creating a ShipmentQuote you won't have to supply a from-address anymore. If it's missing
  we'll use the standard from address that is associated with your account

### Fixed
- Returning the right error message when standard ship from address is missing a phone number and
  making a PickupRequest for carrier UPS
- Package type will now be returned as parameter ```type``` withing the object ```package``` when
  creating a shipment
- When creating a returns shipment we won't return the misleading tip about having to add a
  _default address at your profile page_ anymore, since you can supply a different address
- if ```pakadoo.id``` is ```null``` we'll return a error message now
- if ```pakadoo.id``` is empty we'll return a error message now

## [20160422] - 2016-04-22

### Added
- When making a PickupRequest you can now add a [pickup_address]({{ site.baseurl }}/reference/#pickup-requests)
  that tells the carrier where the shipments should be collected

## [20160304] - 2016-03-04

### Added
- We're now returning [additional services]({{ site.baseurl }}/examples/#additional-services)
  when querying information about shipments

## [20160119] - 2016-01-19

### Added
- When creating a [pickup request]({{ site.baseurl }}/reference/#pickup-requests)
  we're now returning an **id** that identifies the data
