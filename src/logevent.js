/**
*  Dsensor - Logs Regulator
*
* Listen to log folders for new log files

* @class logRegulator
*
* @package    Dsensor.org open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");


var logRegulator = function() {

	events.EventEmitter.call(this);
	this.commandlineFiles();

};

/**
* inherits core emitter class within this class
* @method 
*/
util.inherits(logRegulator, events.EventEmitter);

/**
*  at event module
* @method logListener		
*
*/	
logRegulator.prototype.logListener = function() {

	
};	

/**
*  emit message to Parser
* @method emitParser		
*
*/	
logRegulator.prototype.emitParser = function() {
	
	
};	

/**
*  call command line for list of log in file location
* @method commandlineFiles		
*
*/	
logRegulator.prototype.commandlineFiles = function() {
	
	var localthis = this;
	
	var spawn = require('child_process').spawn;
	var ls = spawn('ls', ['/var/www/html/essecoin/dsensor/code/sensorlibrary/src/data']);
	
	datalog = [];
	var dataout = '';

	ls.stdout.on('data', function (data) {
		
		dataout += data;
		
	});

	ls.stderr.on('data', function (data) {
	
	});

	ls.on('close', function (code) {
		
		var	datalog = dataout.split(/\r\n|\n|\r/)
//console.log(datalog);
		localthis.emit("newLogs", datalog);
//console.log('after emitt');		
	});
	
	ls.kill();
};


module.exports = logRegulator;