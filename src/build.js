//Karyo build
Karyo.prototype.Build = function()
{
  //Add the class to the parent
  $('#' + this.parent.id).addClass('karyo-parent');

  //Append the navbar
  $('#' + this.parent.id).append(this.NavbarBuild());

  //Append the loading div
  $('#' + this.parent.id).append(this.LoadingBuild());

  //Append the svg container
  $('#' + this.parent.id).append('<div id="' + this.svg.id + '"></div>');

  //Append the alert
  $('#' + this.parent.id).append(this.AlertBuild());

  //Append the table report
  $('#' + this.parent.id).append(this.TableBuild());

  //Append the foot
  $('#' + this.parent.id).append(this.FootBuild());

  //Set the default size
  this.SetSize(this.default.size.width, this.default.size.height);

  //Start the resize event
  this.EventResize();

  //Start the SVG
  this.svg.build = cSVG(this.svg.id).size(this.default.svg.width, this.default.svg.height);

  //Start mouse event
  this.Mouse();

  //Start the navbar events
  this.NavbarEvnt();

  //Check for draw
  this.Draw();
};

//Function for build
function KaryoBuildTimeOut(_main)
{
  setTimeout(function(){ _main.Build(); }, 200);
}
