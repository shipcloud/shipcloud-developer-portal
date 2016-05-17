### Setup
Before using the shipcloud API, you need to set the API access key:

{% highlight ruby %}
Shipcloud.api_key = '{{ site.apikey }}'
{% endhighlight %}

Since Version 0.3.0, you can also do this via a configuration block, e.g. in an initializer:

{% highlight ruby %}
Shipcloud.configure do |config|
  config.api_key = '{{ site.apikey }}'
end
{% endhighlight %}

### Creating a new shipment
To create a new shipment on the shipclod platform, you need to provide the name of the carrier, to
and from address, and the package dimensions. For details, see our <a href="/reference">API reference</a>.

{% highlight ruby %}
Shipcloud::Shipment.create(
  carrier: 'ups',
  from: from-address-params,
  to: to-address-params,
  package: package-params,
  create_shipping_label: true
)
{% endhighlight %}

```Shipment#create``` will return shipping label and tracking information, encapsulated in a
```Shipcloud::Shipment``` object:

{% highlight ruby %}
shipment = Shipcloud::Shipment.create(...) # parameters ommitted
shipment.tracking_url # -> http://track.shipcloud.io/86afb143f9c9c0cfd4eb7a7c26a5c616585a6271
{% endhighlight %}
