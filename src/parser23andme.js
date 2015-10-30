/**
*  Dsensor - Parse 23 and Me genome log file
*
*  extract four part genome information 

* @class parse23andMe
*
* @package    Dsensor.org open source project
* @copyright  Copyright (c) 2012 James Littlejohn
* @license    http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
* @version    $Id$
*/
var util = require('util');
var events = require("events");
var fs = require('fs');
var level = require('levelup');

var parse23andMe = function() {
console.log('starting gemone parser');
	events.EventEmitter.call(this);
	//this.readRawfile('genome_James_Littlejohn_Full_20150825025924.txt');
	this.db = level('genome_sensor');
	this.queryGenome();
};

/**
* inherits core emitter class within this class
* @method 
*/
util.inherits(parse23andMe, events.EventEmitter);

/**
*   Read file for raw 23 and me log file
* @method readRawfile		
*
*/	
parse23andMe.prototype.readRawfile = function(file) {
//console.log('read genome raw');
	var localthis = this;

	//extract time data from filename
	//timelogfile = localthis.fileLogDate(file);
	var timelogfile = '1441710249926';
	var accelometerData = '';
	var readStream = fs.ReadStream("genome/" + file);
	readStream.setEncoding('ascii'); // This is key; otherwise we'd be using buffers
	// every time "data" is read, this event fires
	readStream.on('data', function(textData) {

		//readStream.pause();

		//setTimeout(function() {
		//setInterval(function() {	
//console.log('resuming stream');
			accelometerData += textData;
			//setTimeout(function() {
			//	localthis.elementExtraction('222', accelometerData);
			//	accelometerData = '';
			//	readStream.resume();
			//},2000);	
				
				
		//},2);
			
	
	});
	
	// the reading is finished...
	readStream.on('close', function (textData) {

		localthis.elementExtraction('222', accelometerData);
	});
	
};

/**
*  parse out the data elements
* @method elementExtraction		
*
*/	
parse23andMe.prototype.elementExtraction = function(logTime, genein) {

	var localthis = this;
//console.log("I finished source.");
//console.log(file);				
	var liveLogTime = '1430589313';
	var liveTimestamp = 0;
	var accummtime = 1;
	var volumecounter = 0;
	
	logTime = liveLogTime;	
		
	var	parse = genein.split(/\r\n|\n|\r/);
//console.log(parse);
	var holdarray = [];		
	var a = parse;
	//while(a.length) {
//console.log(a.splice(0,500));
	//	holdarray.push(a.splice(0,500));
		
	//}		
// array of 500 data points to save
//console.log(holdarray);
	//holdarray.forEach(function(batcharray) {
		
		parse.forEach(function(singleline) {

			if(singleline) {
				accummtime++;
				// make unique timestamp
				var elementtime = logTime + accummtime;
//console.log(elementtime); 			
				var	parsen = singleline.split('\t');
//console.log(parsen);			
				// prepare for saving to influx
				genoneSave = {};
				genoneSave.seqdownload = logTime;
				genoneSave.timeunique = elementtime;				
				genoneSave.rsid = parsen[0];
				genoneSave.chromosome = parsen[1];
				genoneSave.position = parsen[2];
				genoneSave.genotype = parsen[3];				
				// call influx class	
				newjson = JSON.stringify(genoneSave);
				var series = 'genome';
//console.log(elementtime);
//console.log('json to save');					
//console.log(newjson);					

					localthis.db.put(parsen[0], newjson,  function() {


					});

				
			}
		});
	//});
};	

/**
*  query leveldb for genome data
* @method queryGenome		
*
*/	
parse23andMe.prototype.queryGenome = function() {
	
	localthis = this;
	
	localthis.db.createReadStream()
		.on('data', function (data) {

		//returneddata = {};	
		returneddata = JSON.parse(data.value);
//console.log('returuned ob');	  
//console.log(returneddata);			
			if(returneddata.rsid == "i4000759")
			{
//console.log('key');	  
//console.log(data.key);
console.log('value');	  
console.log(returneddata.rsid);	
//console.log('rsid');	  
//console.log(data.value.results);	  
			}
	  })
	  .on('error', function (err) {
	    console.log('Oh my!', err);
	  })
	  .on('close', function () {
	    console.log('Stream closed');
	  })
	  .on('end', function () {
	    console.log('Stream closed');
	  });
	  
  };

module.exports = parse23andMe;