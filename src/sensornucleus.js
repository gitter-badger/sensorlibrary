/**
*  Dsensor - Sensor Library
*
* Manages Sensor, data and parsing of data 

* @class sensorNucleus
*
* @package    Dsensor.org open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");

var sensorNucleus = function() {

	events.EventEmitter.call(this);
	

};

/**
* inherits core emitter class within this class
* @method 
*/
util.inherits(sensorNucleus, events.EventEmitter);

/**
*  at event module
* @method logListener		
*
*/	
sensorNucleus.prototype.logListener = function() {

	
};	

/**
*  emit message to MAPPING
* @method emitMapping		
*
*/	
sensorNucleus.prototype.emitMapping = function() {
	
	
};	


module.exports = sensorNucleus;