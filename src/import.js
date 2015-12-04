//Karyo Import Chromosomes list
Karyo.prototype.ImportChrs = function(source, parser)
{
  //Call to the Import
  this.Import('specie', source, parser);
};

//Karyo Import Regions
Karyo.prototype.ImportRegions = function(source, parser)
{
  //Call to the Import
  this.Import('region', source, parser);
};

//Karyo Import from url
Karyo.prototype.Import = function(type, source, parser)
{
  //Show loading
  this.LoadingShow();

  //Set core as busy
  this.core.busy = true;

  //Check the parser
  if(typeof parser === 'undefined')
  {
    //Set parser as null
    parser = null;
  }

  //Set the use as true
  this[type].use = true;

  //Show info
  console.log('Karyo: reading ' + type + ' from ' + source);

  //Import the JSON file
  KaryoImportJson(type, source, parser, this);
};

//Specie Read
Karyo.prototype.ImportParser = function(type, data, parser)
{
  //Check if is necessary parse the data
  if(parser)
  {
    //Parse the data
    data = parser(data);
  }

  //Save the data
  this[type].el = data;

  //Check the data type
  if(type === 'specie')
  {
    //Show the specie by console
    console.log('Karyo: using ' + this.specie.el.name + ' with assembly ' + this.specie.el.assembly);
    console.log('Karyo: detected ' + this.specie.el.chr.length + ' chromosomes');
  }

  //Check for draw
  this.Draw();
};

//Function for import the data with jquery
function KaryoImportJson(_type, _json, _parser, _main)
{
  //Create the conection
  var _import = $.ajax({url: _json, dataType: 'json'});

  //Done function
  _import.done(function(data){ _main.ImportParser(_type, data, _parser); });

  //Fail function
  _import.fail(function(){ console.error('Karyo: Error reading from ' + _json); });
}
