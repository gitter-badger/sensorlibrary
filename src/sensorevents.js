/**
*  Dsensor - sensor Events
*
* Manages events coming from sensors in the network 

* @class sensorEvents
*
* @package    Dsensor.org open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");

var sensorEvents = function() {

	events.EventEmitter.call(this);
	

};

/**
* inherits core emitter class within this class
* @method 
*/
util.inherits(sensorEvents, events.EventEmitter);

/**
*  at event module
* @method sensorListener		
*
*/	
sensorEvents.prototype.sensorListener = function() {

	
};	

/**
*  emit message to Nucleus
* @method emitNucleus		
*
*/	
sensorEvents.prototype.emitNucleus = function() {
	
	
};	


module.exports = sensorEvents;