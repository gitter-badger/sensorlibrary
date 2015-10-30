/**
*  Dsensor - Sensor Library
*
* Start sensor library

*
* @package    Dsensor.org open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var settings = require("./settings.js");
var sensorNucleus = require("./sensornucleus");
var sensorEvents = require("./sensorevents");
var logEvents = require("./logevent");
var parserAmiigo = require('./parseramiigo.js');
var liveInfluxdb = require('./influxdb.js');
var parse23andMe = require('./parser23andme.js');

startSettings = new settings();
StartInflux = new liveInfluxdb(startSettings.account.influxdb);

//StartLog = new logEvents();
//StartParser = new parserAmiigo(StartLog, StartInflux);

//var saveGenetics = new parse23andMe();
//console.log(saveGenetics);
