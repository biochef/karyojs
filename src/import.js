//Karyo Import Chromosomes list
Karyo.prototype.ImportChrs = function(opt)
{
  //Check if user has set import from the Karyo database
  if(typeof opt.fromDB !== 'undefined')
  {
    //Convert to lower case
    opt.fromDB = opt.fromDB.toLowerCase();

    //User has set load chromosomes from database. Replace the specie
    opt.url = this.db.url.replace('{specie}', opt.fromDB);

    //Replace the database version
    opt.url = opt.url.replace('{version}', this.db.version);

    //Make the paser as null
    opt.parser = null;
  }

  //Call to the Import
  this.Import('specie', opt.url, opt.parser);
};

//Karyo Import Regions
Karyo.prototype.ImportRegions = function(opt)
{
  //Call to the Import
  this.Import('region', opt.url, opt.parser);
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

  //Check for specie
  if(type === 'specie')
  {
    //Show the specie by console
    console.log('Karyo: using ' + this.specie.el.name + ' with assembly ' + this.specie.el.assembly);
    console.log('Karyo: detected ' + this.specie.el.chr.length + ' chromosomes');
  }

  //Check for region
  if(type === 'region')
  {
    //Clear the preview
    this.chrpreview.data = [];
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
