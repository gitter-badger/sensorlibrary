# Dsensor.org - a better understanding of reality

[![Join the chat at https://gitter.im/Dsensor/sensorlibrary](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/Dsensor/sensorlibrary?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# SENSOR LIBRARY


STATUS:  pre beta.


Components
========

Parsing of sensor data

Zero knowledge proof library for all sensors

Data saving to blockchain/Dstore apps

API to Dsensor Mapping Protocol


Parsing of sensor data
------------------------------

The currently library parser is for the  www.amiigo.co  wearable.  It parses the log files produced by the https://github.com/dashesy/amiigo-link  bluetooth library.

Log file location.  Make a note of where the amiigo log files are located and edit the file location in the logevents.js  file location i.e. edit /var/www/html/essecoin/dsensor/code/sensorlibrary/src/data


Influxdb
----------

The library only stores data to Influxdb.

Make a settings.js  file from  sample-settings.js  and add  influxdb account and password details.

