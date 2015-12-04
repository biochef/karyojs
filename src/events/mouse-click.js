//Karyo Click handler
Karyo.prototype.MouseClick = function(x, y)
{
  //Check if location is defined
  if(this.status)
  {
    //Check location
    if(this.status === 'list')
    {
      //Call to the click list
      this.MouseClickList(x, y);
    }
    else if(this.status === 'detail')
    {
      //Call to the click detail
      this.MouseClickDetail(x, y);
    }
    else
    {
      //Show error
      console.log('Karyo: unknow location state "' + this.status + '"');
    }
  }
};

//Karyo mouse Click list
Karyo.prototype.MouseClickList = function(x, y)
{
  //Check the label function
  if(this.svg.draw.label)
  {
    //Open chromosome
    this.DrawChrListExit(this.svg.draw.label.num);
  }
};

//Karyo mouse Click detail
Karyo.prototype.MouseClickDetail = function(x, y)
{
  //Check the hover region
  if(this.svg.draw.label)
  {
    //Execute the callback
    this.CallbackRun(this.svg.draw.label.start, this.svg.draw.label.end);
  }
};
