//Karyo cursor hide
Karyo.prototype.CursorHide = function()
{
  //Delete the resize cursor
  $(this.cursor.id).removeClass('karyo-resize');

  //Delete the hand cursor
  $(this.cursor.id).removeClass('karyo-hand');

  //Delete the move cursor
  $(this.cursor.id).removeClass('karyo-move');

  //Set the cursor active as false
  this.cursor.active = false;
};

//Karyo Cursor
Karyo.prototype.Cursor = function(type)
{
  //Check the cursor active
  if(this.cursor.active === false)
  {
    //Set the cursor hand
    $(this.cursor.id).addClass('karyo-' + type);

    //Set active as true
    this.cursor.active = true;
  }
};
