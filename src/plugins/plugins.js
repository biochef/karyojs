//Karyo plugins
Karyo.prototype.Plugins = function(name, callback)
{
  //Find the plugin
  if(name === 'genome-maps')
  {
    //Call to the genome maps parser
    this.GenomeMaps(callback);
  }
  else
  {
    //Sow error in console
    console.error('Karyo: "' + name + '" plugin not found');
  }
};
