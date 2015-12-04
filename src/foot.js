/* Karyo Foot builder */
Karyo.prototype.FootBuild = function()
{
  //Create the new div
  var div = '<div id="' + this.foot.id + '" class="karyo-foot"';

  //Check if is visible
  if(this.foot.show === false)
  {
    //Add display none
    div = div + ' style="display:none;"';
  }

  //Close the init div
  div = div + '>';

  //Crete the specie div
  div = div + '<div id="' + this.foot.specie + '" class="karyo-foot-specie">&nbsp;</div>';

  //Create the position div
  div = div + '<div id="' + this.foot.pos + '" class="karyo-foot-pos">&nbsp;</div>';

  //Create the logo div
  div = div + '<a href="' + this.info.web + '" class="' + this.foot.logo + '" target="_blank">';
  div = div + this.info.name + '</a>';

  //Create the powered by div
  div = div + '<div class="' + this.foot.powered + '">Powered by </div>';

  //Close the div
  div = div + '</div>';

  //Return the new div
  return div;

};

//Karyo foot show position
Karyo.prototype.FootPosition = function(pos)
{
  //Check for null
  if(pos === null)
  {
    //Set text as space
    var txt = '&nbsp;';
  }
  else
  {
    //Generate the new text
    var txt = this.svg.draw.chr.id + ':' + pos;
  }

  //Change the text
  $('#' + this.foot.pos).html(txt);
};

//Karyo foot specie
Karyo.prototype.FootSpecie = function()
{
  //Generate the specie text
  var txt = this.specie.el.name + ' (' + this.specie.el.assembly + ')';
  //Show
  $('#' + this.foot.specie).html(txt);
};
