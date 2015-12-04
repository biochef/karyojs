//Karyo Genome Maps plugin
Karyo.prototype.GenomeMaps = function(call)
{
  //Show in console
  console.log('Karyo: starting Genome-Maps plugin');

  //Create the plugin vars
  this.genomemaps = {};
  this.genomemaps.input = 'regionField'; //ID for the input
  this.genomemaps.btn = 'goButton'; //ID for the Go button
  this.genomemaps.listen = true; //For listen button clicks

  //Add the event
  KaryoGenomeMapsEvent(this, 0);

  //Add the callback for genome maps
  this.callback = this.GenomeMapsCallBack;
};

//Karyo Genome Maps get region
Karyo.prototype.GenomeMapsListen = function()
{
  //Get the value
  var regsel = $('#' + this.genomemaps.input).val();

  //Check
  if(this.genomemaps.listen === true)
  {
    //Show in console
    console.log('Karyo: selecting region fron Genome Maps "' + regsel + '"');

    //Send to the parse select
    this.SelectReg(regsel, false);
  }
  else
  {
    //Change to true
    this.genomemaps.listen = true;
  }
};

//Karyo Genome Maps callback
Karyo.prototype.GenomeMapsCallBack = function(chr, start, end)
{
  //Set listen to false
  this.genomemaps.listen = false;

  //Change the value of genome maps search input
  $('#' + this.genomemaps.input).val(chr + ':' + start + '-' + end);

  //Run
  $('#' + this.genomemaps.btn).click();
};

//Initialize the event
function KaryoGenomeMapsEvent(_main, exec)
{
  //Check if element exits
  if($('#' + _main.genomemaps.btn) && exec > 0)
  {
    //Initialize the action click event
    $('#' + _main.genomemaps.btn).click(function(){ _main.GenomeMapsListen(); });

    //Initialize the change event
    $('#' + _main.genomemaps.input).change(function(){ _main.GenomeMapsListen(); });
  }
  else
  {
    //Set time out
    setTimeout(function(){ KaryoGenomeMapsEvent(_main, 1); }, 2000);
  }
}
