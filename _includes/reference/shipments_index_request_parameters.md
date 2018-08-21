__Parameters:__

- __carrier__, e.g. 'carrier=dhl'
- __carrier_tracking_no__, e.g. 'carrier_tracking_no=43128000105'
- __created_at_gt__, e.g. 'created_at_gt=20180712T1300Z'
- __created_at_lt__, e.g. 'created_at_lt=20180712T1400Z'
- __page__, show page number x, e.g. 'page=2'
- __per_page__, show x number of shipments on a page (default & max: 100), e.g. 'per_page=25'
- __reference_number__, e.g. 'reference_number=ref123456'
- __service__, e.g. 'service=returns'
- __shipcloud_tracking_no__, e.g. 'shipcloud_tracking_no=86afb143f9c9c0cfd4eb7a7c26a5c616585a6271'
- __shipment_type__, e.g. 'shipment_type=prepared'
- __source__, e.g. 'source=api'
- __tracking_status__, e.g. 'tracking_status=out_for_delivery'
- __tracking_status_not__, e.g. 'tracking_status_not=delivered'

___shipment_type:___ Specifies the type of a shipment. The following types are available:
- _prepared_: a shipment which was saved in shipcloud but doesn't have a shipping label yet
- _label_created_: a shipment containing a shipping label.
- _tracking_only_: a shipment that was imported via its carrier tracking number (see
  [trackers](#trackers) for more details)

___created_at_gt / created_at_lt:___ You can filter the list by using these parameters to specify a
timerange to find the shipments that were created during this time. The timestamp will be evaluated
as ISO 8601 using the following format: `YYYYMMDDThhmmZ`.

___source:___ Filter shipments by platform they were created through. The following keys can be used:
- _api_: a shipment created through our api
- _webui_: a shipment created using the shipcloud ui
- _return_portal_: a shipment created using the shipcloud return portal
