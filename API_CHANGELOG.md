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

## [20160304] - 2016-03-04

### Fixed
- We're now returning [additional services](https://developers.shipcloud.io/recipes/#additional-services)
  when querying information about shipments

## [20160119] - 2016-01-19

### Added
- When creating a [pickup request](https://developers.shipcloud.io/reference/#pickup-requests)
  we're now returning an **id** that identifies the data
