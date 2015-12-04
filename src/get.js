//Karyo Get Chromosome info
Karyo.prototype.GetChr = function(chr)
{
  //Find the selected ID
  for(var i = 0; i < this.specie.el.chr.length; i++)
  {
    //Check ID
    if(this.specie.el.chr[i].id === chr)
    {
      //Return the selected chromosome
      return this.specie.el.chr[i];
    }
  }

  //Default, return null
  return null;
};

//Karyo get Regions for chromosome
Karyo.prototype.GetRegionsByChr = function(chr)
{
  //Find the selected chr
  for(var i = 0; i < this.region.el.length; i++)
  {
    //Check ID
    if(this.region.el[i].id === chr)
    {
      //Return the regions
      return this.region.el[i].regions;
    }
  }

  //Default, return null
  return null;
}
