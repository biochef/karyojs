//Utils main function
Karyo.prototype.UtilFindID = function(_arr, _id)
{
  //Read all
  for(var i = 0; i < _arr.length; i++)
  {
    //Check
    if(_arr[i].id === _id) return i;
  }

  //Return -1
  return -1;
};

//Karyo check region hover
Karyo.prototype.UtilRegHover = function(x, y, px, py, w, h)
{
  //Check posx
  if( px <= x && x <= px + w )
  {
    //Check posy
    if( py <= y && y <= py + h)
    {
      //Return true
      return true;
    }
  }

  //Return false
  return false;
};

//Karyo check if var is a function
Karyo.prototype.isFunction = function(x)
{
  //Return
  return Object.prototype.toString.call(x) == '[object Function]';
};

//Karyo generate ID
Karyo.prototype.GenID = function()
{
  //Get a random string
	return Math.random().toString(36).slice(2).substr(0, 5);
};

//Karyo Check near
Karyo.prototype.PosNear = function(x, pos, margin)
{
  //Check
  if( pos - margin <= x && x <= pos + margin)
  {
    //Return true
    return true;
  }

  //default
  return false;
};
