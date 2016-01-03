//Resize function
Karyo.prototype.Resize = function()
{
  //Save the parent size
  this.parent.width = $('#' + this.parent.id).width();
  //this.parent.height = $('#' + this.parent.id).height();

  //Save the navbar size
  this.navbar.width = $('#' + this.navbar.id).width();
  this.navbar.height = $('#' + this.navbar.id).height();

  //Save the loading width and height
  this.loading.width = $('#' + this.loading.id).width();
  this.loading.height = $('#' + this.loading.id).height();

  //Save the svg size
  this.svg.width = $('#' + this.svg.id).width();
  this.svg.height = $('#' + this.svg.id).height();

  //Save the table size
  this.table.width = $('#' + this.table.id).width();
  //this.table.height = $('#' + this.table.id).height();

  //Save the foot size
  this.foot.width = $('#' + this.foot.id).width();
  this.foot.height = $('#' + this.foot.id).height();

  //Show resize window
  console.log('Karyo: resizing parent {width: ' + this.parent.width + ', height: ' + this.parent.height + '}');
  console.log('Karyo: resizing navbar {width: ' + this.navbar.width + ', height: ' + this.navbar.height + '}');
  console.log('Karyo: resizing svg {width: ' + this.svg.width + ', height: ' + this.svg.height + '}');
  console.log('Karyo: resizing foot {width: ' + this.foot.width + ', height: ' + this.foot.height + '}');

  //Resize the alert
  this.AlertResize();

  //Save the loading screen width and height
  this.LoadingResize();

  //Check for draw
  if(this.svg.build)
  {
    //Draw again
    this.Draw();
  }
};

//Event Resize
Karyo.prototype.EventResize = function()
{
  //Call the event
  KaryoEvntResize(this);
};

//Event for resize window
function KaryoEvntResize(_main)
{
  //Add the resize event
  $(window).resize(function(){ _main.Resize(); });
}
