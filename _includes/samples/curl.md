### Creating a new shipment
This is a full sized example. You can omit the from parameters if you define a standard ship from
address in the shipcloud backoffice.

{% highlight shell %}
curl -u {{ site.apikey }}: https://api.shipcloud.io/v1/shipments \
  -d "to[company]=Musterfirma" \
  -d "to[first_name]=Hans" \
  -d "to[last_name]=Meier" \
  -d "to[street]=Musterstraße" \
  -d "to[street_no]=22" \
  -d "to[city]=Musterstadt" \
  -d "to[zip_code]=12345" \
  -d "to[country]=DE" \
  -d "from[company]=Gewuerze Paderborn" \
  -d "from[first_name]=Karl" \
  -d "from[last_name]=Müller" \
  -d "from[street]=Musterstraße" \
  -d "from[street_no]=14a" \
  -d "from[city]=Paderborn" \
  -d "from[zip_code]=33089" \
  -d "from[country]=DE" \
  -d "carrier=dhl" \
  -d "package[weight]=1.5" \
  -d "package[length]=10" \
  -d "package[width]=6" \
  -d "package[height]=8" \
  -d "service=standard" \
  -d "create_shipping_label=true"
{% endhighlight %}

### Creating a Liefery shipment
If you need something delivered really fast than same day delivery is the choice for you. Due to
our partnership with
<a href="https://www.shipcloud.io/de/integrationen/carriers/liefery" target="_blank">Liefery</a>
you can create shipments that will be delivered within the same day.

__Requirements:__

- ```service``` has to be _'same_day'_
- a ```phone``` number is required for sender and recipient

{% highlight shell %}
curl -u {{ site.apikey }}: https://api.shipcloud.io/v1/shipments \
  -d "to[company]=Musterfirma" \
  -d "to[first_name]=Hans" \
  -d "to[last_name]=Meier" \
  -d "to[street]=Musterstraße" \
  -d "to[street_no]=22" \
  -d "to[city]=Musterstadt" \
  -d "to[zip_code]=12345" \
  -d "to[country]=DE" \
  -d "to[phone]=555-555" \
  -d "from[company]=Musterstadt Inc." \
  -d "from[first_name]=Karl" \
  -d "from[last_name]=Müller" \
  -d "from[street]=Musterstraße" \
  -d "from[street_no]=14a" \
  -d "from[city]=Musterstadt" \
  -d "from[zip_code]=12346" \
  -d "from[country]=DE" \
  -d "from[phone]=555-555" \
  -d "carrier=liefery" \
  -d "package[weight]=1.5" \
  -d "package[length]=10" \
  -d "package[width]=6" \
  -d "package[height]=8" \
  -d "service=same_day" \
  -d "create_shipping_label=true"
{% endhighlight %}

### Getting infos about a shipment
{% highlight shell %}
  curl -u {{ site.apikey }}: https://api.shipcloud.io/v1/shipments/665d5287b73575cfba622a4b5094c6fd2f0f3f74
{% endhighlight %}

### Updating a shipment
Updating shipments is only possible if you haven't created a label by setting ```create_shipping_label=true```

{% highlight shell %}
curl -X PUT -u {{ site.apikey }}: https://api.shipcloud.io/v1/shipments/665d5287b73575cfba622a4b5094c6fd2f0f3f74 \
  -d "to[last_name]=Meier" \
  -d "to[street]=Musterstraße" \
  -d "to[street_no]=22" \
  -d "to[city]=Musterstadt" \
  -d "to[zip_code]=12345" \
  -d "to[country]=DE" \
  -d "from[company]=Gewuerze Paderborn" \
  -d "from[first_name]=Karl" \
  -d "from[last_name]=Müller" \
  -d "from[street]=Musterstraße" \
  -d "from[street_no]=14a" \
  -d "from[city]=Paderborn" \
  -d "from[zip_code]=33089" \
  -d "from[country]=DE" \
  -d "carrier=dhl" \
  -d "package[weight]=1.5" \
  -d "package[length]=10" \
  -d "package[width]=6" \
  -d "package[height]=8"
{% endhighlight %}

### Getting a shipment quote for a package
{% highlight shell %}
curl -u {{ site.apikey }}: https://api.shipcloud.io/v1/shipment_quotes \
  -d "carrier=hermes" \
  -d "from[street]=Musterstraße" \
  -d "from[street_no]=14a" \
  -d "from[city]=Paderborn" \
  -d "from[zip_code]=33089" \
  -d "from[country]=DE" \
  -d "package[weight]=1.5" \
  -d "package[length]=10" \
  -d "package[width]=6" \
  -d "package[height]=8" \
  -d "service=standard" \
  -d "to[street]=Musterstraße" \
  -d "to[street_no]=22" \
  -d "to[city]=Musterstadt" \
  -d "to[zip_code]=12345" \
  -d "to[country]=DE"
{% endhighlight %}

### Getting all available carriers for the account
{% highlight shell %}
  curl -u {{ site.apikey }}: https://api.shipcloud.io/v1/carriers
{% endhighlight %}
