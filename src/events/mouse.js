//Mouse event
Karyo.prototype.Mouse = function()
{
  //Mouse event
  KaryoMouseEvnt(this);
};

//Karyo mouse function event
function KaryoMouseEvnt(_main)
{
  //Save the ID
  var _id = '#' + _main.svg.id;

  //Mouse up
  $(_id).mouseup(function(e){

    //Prevent
    e.preventDefault();

    //Get the div position
    var posX = $(this).offset().left
    var posY = $(this).offset().top;

    //Call the click handler
    _main.MouseUp(e.pageX - posX, e.pageY - posY);

  });

  //Mouse down
  $(_id).mousedown(function(e){

    //Prevent
    e.preventDefault();

    //Get the div position
    var posX = $(this).offset().left
    var posY = $(this).offset().top;

    //Call the click handler
    _main.MouseDown(e.pageX - posX, e.pageY - posY);

  });

  //Mouse move
  $(_id).mousemove(function(e){

    //Prevent
    e.preventDefault();

    //Get the div position
    var posX = $(this).offset().left
    var posY = $(this).offset().top;

    //Call the click handler
    _main.MouseMove(e.pageX - posX, e.pageY - posY);

  });
}
