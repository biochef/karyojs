//Karyo Click handler
Karyo.prototype.MouseUp = function(x, y)
{
  //Check if location is defined
  if(this.status)
  {
    //Check location
    if(this.status === 'list')
    {
      //Call to the click list
      this.MouseUpList(x, y);
    }
    else if(this.status === 'detail')
    {
      //Call to the click detail
      this.MouseUpDetail(x, y);
    }
  }
};

//Karyo mouse Click list
Karyo.prototype.MouseUpList = function(x, y)
{
  //Check the label function
  if(this.svg.draw.label)
  {
    //Open chromosome
    this.DrawChrListExit(this.svg.draw.label.num);
  }
};

//Karyo mouse Click detail
Karyo.prototype.MouseUpDetail = function(x, y)
{
  //Check if select is activate
  if(this.select.on === true && this.select.start !== this.select.end)
  {
    //Check if user has move
    if(this.select.move === true)
    {
      //Set move as false
      this.select.move = false;

      //Generate the callback
      this.SelectRunCallback();
    }
    else
    {
      //Delete the region
      this.SelectDestroy();

      //Return the opacity as true
      this.DrawChrDetailRegionsOp(1.0);
    }
  }
  else
  {
    //Check the hover region
    if(this.svg.draw.label)
    {
      //Execute the callback
      this.CallbackRun(this.svg.draw.label.start, this.svg.draw.label.end);
    }

    //Delete the region
    this.SelectDestroy();

    //Return the opacity as true
    this.DrawChrDetailRegionsOp(1.0);
  }

  //Set select down false
  this.select.down = false;
};
