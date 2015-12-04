//Karyo alert div build
Karyo.prototype.AlertBuild = function()
{
  //Create the new div
  var div = '<div id="' + this.alert.id + '" class="' + this.alert.class + '">';

  //Create the alert container div
  div = div + '<div class="' + this.alertcont.class + '" id="' + this.alertcont.id + '" ';

  //Add the alert container style
  div = div + 'style="opacity: 0.0; visibility: hidden; padding-left: ' + this.alertcont.padding + 'px;"';

  //Close the alert container div
  div = div + '></div>';

  //Close the alert div
  div = div + '</div>';

  //Return the new div
  return div;
};

//Karyo Alert resize
Karyo.prototype.AlertResize = function()
{
  //Calculate the size
  this.alertcont.width = this.svg.width - this.svg.margin.left - this.svg.margin.right;

  //Add the padding
  this.alertcont.width = this.alertcont.width - this.alertcont.padding;

  //Calculate the posx
  this.alertcont.posx = this.svg.margin.left;

  //Calculate the position
  this.alertcont.posy = (-1)*(this.alertcont.height + this.alertcont.margin);

  //Change the div width
  $('#' + this.alertcont.id).css('width', this.alertcont.width);

  //Change the div height
  $('#' + this.alertcont.id).css('height', this.alertcont.height);

  //Change the div top
  $('#' + this.alertcont.id).css('top', this.alertcont.posy);

  //Change the div left
  $('#' + this.alertcont.id).css('left', this.alertcont.posx);
};

//Karyo Alert Tip Creator
Karyo.prototype.AlertTip = function()
{
  //Create the tip
  this.AlertShow('tip', this.alertmsg.tip);
};

//Karyo alert error
Karyo.prototype.AlertError = function()
{
  //Create the error
  this.AlertShow('error', this.alertmsg.error);
};

//Karyo Alert alert show
Karyo.prototype.AlertShow = function(type, text)
{
  //Check if is visible
  if(this.alertcont.visible == false)
  {
    //Change the text
    $('#' + this.alertcont.id).text(text);

    //Save the type
    this.alert.type = type;

    //Add the type class
    $('#' + this.alertcont.id).addClass(this.alert.typeclass + this.alert.type);

    //Change the display
    //$('#' + this.alertcontid).css('display', 'block');

    //Change the opacity
    $('#' + this.alertcont.id).css('opacity', '1.0');

    //Change the visibility
    $('#' + this.alertcont.id).css('visibility', 'visible');

    //Set to visible
    this.alertcont.visible = true;

    //Set the time out
    KaryoAlertTimeOut(this);
  }
};

//Karyo alert Show/hide
Karyo.prototype.AlertHide = function()
{
  //Hide the alert
  //$('#' + this.alertcont.id).css('display', 'none');

  //Change the opacity
  $('#' + this.alertcont.id).css('opacity', '0.0');

  //Change the visibility
  $('#' + this.alertcont.id).css('visibility', 'hidden');

  //Remove the type class
  $('#' + this.alertcont.id).removeClass(this.alert.typeclass + this.alert.type);

  //Set as hide
  this.alertcont.visible = false;
};

//Karyo alert error time out
function KaryoAlertTimeOut(_main)
{
  //Set the time out
  setTimeout(function(){ _main.AlertHide(); }, _main.alert.time);
}
