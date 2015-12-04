//Karyo loading div build
Karyo.prototype.LoadingBuild = function()
{
  //Create the new div
  var div = '<div id="' + this.loading.id + '" class="' + this.loading.class + '">';

  //Create the screen
  div = div + '<div id="' + this.loadingscreen.id + '" class="' + this.loadingscreen.class + '" ';

  //Set the screen style
  div = div + 'style="opacity:0.0; visibility:hidden; padding-top:' + this.loadingscreen.padding.top + '">';

  //Create the animation
  div = div + '<div class="karyo-anim"></div>';

  //Close the screen div
  div = div + '</div>';

  //Close the main div
  div = div + '</div>';

  //Return the div
  return div;
};

//Karyo loading resize
Karyo.prototype.LoadingResize = function()
{
  //Save the width
  this.loadingscreen.width = $('#' + this.loadingscreen.id).width();

  //Calculate the height
  this.loadingscreen.height = this.svg.height - this.loadingscreen.padding.top;

  //Set the loading screen height
  $('#' + this.loadingscreen.id).height(this.loadingscreen.height);
};

//Karyo Show loading
Karyo.prototype.LoadingShow = function()
{
  //Show in console
  //console.log('Karyo: loading ON');

  //Change the opacity
  $('#' + this.loadingscreen.id).css('opacity', '1.0');

  //Change the visibility
  $('#' + this.loadingscreen.id).css('visibility', 'visible');

  //Set visible as true
  this.loading.visible = true;
};

//Karyo Hide loading
Karyo.prototype.LoadingHide = function()
{
  //Show in console
  //console.log('Karyo: loading OFF');

  //Check for visible
  if(this.loading.visible === true)
  {
    //Change the opacity
    $('#' + this.loadingscreen.id).css('opacity', '0.0');

    //Change the visibility
    $('#' + this.loadingscreen.id).css('visibility', 'hidden');
  }

  //Set visible as false
  this.loading.visible = false;
};
