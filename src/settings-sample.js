/**
*  Dsensor - SoulServer
*
* Self Server control settings

* @class settings
*
* @package    Dsensor.org open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var settings = function() {
	this.account = {};
	this.account.influxdb = {};
	this.account.influxdb.host = 'localhost';	
	this.account.influxdb.username = '';
	this.account.influxdb.password = '';
	this.account.influxdb.database = '';		
		
};


module.exports = settings;
