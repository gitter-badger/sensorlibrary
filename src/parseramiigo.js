/**
*  Dsensor - Parse Amiigo wearable
*
* Manages events coming from sensors in the network 

* @class parseAmiigo
*
* @package    Dsensor.org open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var fs = require('fs');

var parseAmiigo = function(LogReg, liveInflux) {

	events.EventEmitter.call(this);
	this.wristSetAt = {};
	this.WristbandSettings();	
	this.livelogRegulator = LogReg;
	this.baseTimeWrist = 1439124342273;  // unix time milliseconds 
	this.lasttimestamp = 1111;
	this.accTimestamp = 0;
	this.liveInfluxdb = liveInflux;	
	this.amiigoListener();
	//this.amiigoStatus();

};

/**
* inherits core emitter class within this class
* @method 
*/
util.inherits(parseAmiigo, events.EventEmitter);

/**
*  settings of amiigo wristband mode, record record frequency etc.
* @method WristbandSettings		
*
*/	
parseAmiigo.prototype.WristbandSettings = function() {
console.log('settings on wrist band amiigo');
	wristSettings = {};
	wristSettings.mode = 'slow'
	wristSettings.accelfrequency = 0.1; // .1 of a seconds recording
	wristSettings.lightfrequency = 12;  // every twelve seconds
	wristSettings.temperature = 1;  // every   seconds	

	this.wristSetAt = wristSettings;		

};
	
/**
*  view amiigo status data
* @method amiigoStatus		
*
*/	
parseAmiigo.prototype.amiigoStatus = function() {
console.log('child to status shoe');
	
	var spawnshoe = require('child_process').spawn;
	var lsshose = spawnshoe('amlink', ['--b', '34:B1:F7:D5:A8:36', '--c', 'extstatus'],  { cwd: './shoe', env: process.env,  stdio: ['ignore'],});
	//var ls = spawn('amlink', ['--b', '34:B1:F7:D5:A8:36', '--c', 'download', '--raw'], { cwd: './shoe', env: process.env,  stdio: ['ignore'],});	


	datalog = [];
	var dataout = '';

	lsshose.stdout.on('data', function (data) {
	//console.log('stdout: ' + data);
	//	dataout = data;
	 var str = data.toString();
//console.log('stdstr: ' + str);	

		
	});

	lsshose.stderr.on('data', function (data) {
		
console.log('stderr: ' + data);
console.log('aftrer errr');		
	});

	lsshose.on('close', function (code) {
console.log('child process exited with code ' + code);
	//var	datalog = dataout.split(/\r\n|\n|\r/)
//console.log(datalog);	
		
	});


};
	
/**
*  listen for new log files from Amiigo sensor
* @method amiigoListener		
*
*/	
parseAmiigo.prototype.amiigoListener = function() {

	localthis = this;
	
	localthis.livelogRegulator.on("newLogs", function(logIN) {
//console.log('arrived from log event');
//console.log(logIN);
		// new logs files then pass them on to be parsed and save to influxdb
		// remove last array element
		logIN.pop();
		var accelometerData = '';

		// built loop for each file
		logIN.forEach(function (file) {
			
			//extract time data from filename
			timelogfile = localthis.fileLogDate(file);			
			var accelometerData = '';
			var readStream = fs.ReadStream("/var/www/html/essecoin/dsensor/code/sensorlibrary/src/data/" + file);
			readStream.setEncoding('ascii'); // This is key; otherwise we'd be using buffers
			// every time "data" is read, this event fires
			readStream.on('data', function(textData) {

				accelometerData += textData;
				
			});

			// the reading is finished...
			readStream.on('close', function (textData) {
//console.log("I finished source.");
console.log(file);				
				localthis.elementExtraction(timelogfile, accelometerData);
				
			});
		});	
	});	

	
};


/**
*  parse out date from file name
* @method fileLogDate		
*
*/	
parseAmiigo.prototype.fileLogDate = function(fileIN) {
	
	var timenumber = 0;
	
	var splitlogRemove = fileIN.slice(0, -6);
	var splitlogend = splitlogRemove.slice(4);
	var splitlogTime = splitlogend.split('-'); 
	convertDate = new Date(splitlogTime[0], splitlogTime[1]-1, splitlogTime[2], splitlogTime[3], splitlogTime[4], splitlogTime[5]); 
	timenumber = Date.parse(convertDate);

	return timenumber;
	
};	

/**
*  parse out the data elements
* @method elementExtraction		
*
*/	
parseAmiigo.prototype.elementExtraction = function(logTime, invalidJSON) {

	var localthis = this;
	var liveLogTime = logTime;
	var liveTimestamp = 0;
	var accumaccelerometercounter = 0;
	var accumaccelerometer = 0;
	
	var	parse = invalidJSON.split(/\r\n|\n|\r/);

	parse.forEach(function(singleline) {

		if(singleline) {
		
			var nextstring = singleline;
			var	parsen = nextstring.split('",');
			// different sensors will have different parsing array structures
			if (parsen[0].slice(2)  == "timestamp")
			{		

				// reset accum accel counter to zero
				accumaccelerometercounter = 0;
				
				if(parsen[1]) {
					
					var removeOne = parsen[1].slice(0, - 1);	
					var arrayTimestamp = JSON.parse(removeOne);
					// save to influxdb					
					//localthis.saveElementTimestamp(parsen[0].slice(2), arrayTimestamp);
//console.log('live timestamp==' + arrayTimestamp[0]);
					liveTimestamp = arrayTimestamp[0];
					// keep tabs on last timestamp ie between log files
					localthis.lasttimestamp = liveTimestamp;
					
				}
			
			}
			else if(parsen[0].slice(2) == "lightsensor_config")
			{
				// light sensor setting or data?
//console.log('light settings');	
				var nextstringlight = singleline;
				var nextstringlightr = nextstringlight.slice(22);
				var nextstringlightrr = nextstringlightr.slice(0,-1);
				//var	parsenlight = nextstringlight.split('\'');
				var arraysettings = JSON.parse("[" + nextstringlightrr + "]");
	
				// save to Influxdb
				
			}
			else if (parsen[0].slice(2)  == "lightsensor")
			{
				//
//console.log('light data');
				var nextstringlightr = singleline;
//console.log(nextstringlightr);				
				
				var	parsenlightr = nextstringlightr.slice(15);
				var	parsenlightrt = parsenlightr.slice(0,-1);	
				var arraylight = JSON.parse("[" + parsenlightrt + "]");
//console.log(arraylight);		
				var lightTimestamp = localthis.accTimestamp;
				// save to influxdb	
				//localthis.liveInfluxdb.saveElementLight(parsen[0].slice(2), localthis.baseTimeWrist, logTime, lightTimestamp, arraylight);	
				
			}
			else if (parsen[0].slice(2)  == "log_count")
			{
				//
//console.log('log count data');			
				
			}			
			else if (parsen[0].slice(2)  == "temperature")
			{

				if(parsen[1]) {
					
					var temperatureRecorded = parsen[1].slice(0,-1);		
					var temperatureTimestamp = localthis.accTimestamp;
					// save to influxdb					
					//localthis.liveInfluxdb.saveElementTemperature(parsen[0].slice(2), localthis.baseTimeWrist, logTime, temperatureTimestamp, temperatureRecorded);	
				}
				
			}	
			else if (parsen[0].slice(2)  == "accelerometer")
			{
				//  accelerometer data			
				accumaccelerometercounter = accumaccelerometercounter+ (localthis.wristSetAt.accelfrequency * 1000);				
				if(liveTimestamp > 0)
				{
					var accumaccelerometer = accumaccelerometercounter + ((liveTimestamp/128)*1000);
					localthis.accTimestamp = accumaccelerometer;
				}
				else 
				{
					var accumaccelerometer = localthis.lasttimestamp;
				}
//console.log(accumaccelerometer + 'accumm time acceler');				
				if(parsen[1]) {
					var removeOne = parsen[1].slice(0, - 1);	
					var arrayAccelerometer = JSON.parse(removeOne);
					// save to influxdb					
					//localthis.liveInfluxdb.saveElementAccelerometer(parsen[0].slice(2), localthis.baseTimeWrist, logTime, accumaccelerometer, arrayAccelerometer);
					
				}
			}	
		}
	});

};	
	
module.exports = parseAmiigo;
