// Karyo Move function event
Karyo.prototype.MouseMove = function(x, y)
{
  //Check if location is defined
  if(this.status)
  {
    //Check location
    if(this.status === 'list')
    {
      //Call the hover list
      this.MouseMoveList(x, y);
    }
    else if(this.status === 'detail')
    {
      //Call the hover detail
      this.MouseMoveDetail(x, y);
    }
    else
    {
      //Show error
      console.log('Karyo: unknow location state "' + this.status + '"');
    }
  }
};

//Karyo mouse hover list
Karyo.prototype.MouseMoveList = function(x, y)
{
  //For check
  var is_hover = false;

  //Find if user is hover a chromosome
  for(var i = 0; i < this.svg.draw.chr.num; i++)
  {
    //Get the chr
    var mchr = this.svg.draw.chrs[i];

    //Check
    if(this.UtilRegHover(x, y, mchr.posx, mchr.posy, mchr.width, mchr.height))
    {
      //Draw the Hover
      this.DrawChrListLabel(i);

      //Show the cursor hand
      this.Cursor('hand');

      //Change the var
      is_hover = true;

      //Break
      break;
    }
  }

  //Check is_hover
  if(is_hover === false)
  {
    //Reset the cursor
    this.CursorHide();

    //Hide the label
    this.DrawChrListLabelDestroy();
  }
};

//Karyo mouse hover detail
Karyo.prototype.MouseMoveDetail = function(x, y)
{
  //Set hover as false
  this.chrdetail.hover = false;

  //Save the chromosome positions
  var pos = {x: this.svg.draw.chr.posx, y: this.svg.draw.chr.posy};

  //Check
  if(this.UtilRegHover(x, y, pos.x, pos.y, this.svg.draw.chr.width, this.svg.draw.chr.height))
  {
    //Draw the hover
    this.DrawChrDetailHover(x);

    //Check if select down is true
    //if(this.select.down === true && (this.select.lastx - x) !== 0)
    if(this.select.down === true)
    {
      //Change the lastx
      //this.select.lastx = -100;

      //Check for move
      if(this.selectdrag.move === true)
      {
        //Set cursor as move
        this.Cursor('move');

        //Send to select drag
        this.SelectDrag(x);
      }
      else
      {
        //Set cursor as resize
        this.Cursor('resize');

        //Send to select move
        this.SelectMove(x);
      }
    }
    else
    {
      //For check
      var is_hover = false;

      //Check is near a region
      for(var i = 0; i < this.svg.draw.region.regs.length; i++)
      {
        //Get the region
        var reg = this.svg.draw.region.regs[i];

        //Check if x is between posx1 and posx2
        if( reg.posx1 - 2 <= x && x <= reg.posx2 + 2)
        {
          //Draw the hover
          this.DrawChrDetailLabel(i);

          //Set the cursor hand
          this.Cursor('hand');

          //Change var
          is_hover = true;

          //Break
          break;
        }
      }

      //Check for delete the hover region
      if(is_hover === false)
      {
        //Reset the cursor
        this.CursorHide();

        //Hide the label
        this.DrawChrDetailLabelDestroy();
      }

      //Check if select is active
      if(this.select.on === true)
      {
        //Get vars
        var near1 = this.PosNear(x, this.svg.draw.select.posx1, this.select.margin);
        var near2 = this.PosNear(x, this.svg.draw.select.posx2, this.select.margin);

        //Check if is near
        if(near1 === true || near2 === true)
        {
          //Hide cursor
          this.CursorHide();

          //Show cursor resize
          this.Cursor('resize');
        }
        else if(this.svg.draw.select.posx1 < x && x < this.svg.draw.select.posx2)
        {
          //Hide cursor
          this.CursorHide();

          //Show cursor move
          this.Cursor('move');
        }
      }

      //Chage the move to false
      this.select.move = false;

      //Change the drag move to false
      this.selectdrag.move = false;
    }

    //Set the hover as true
    this.chrdetail.hover = true;
  }
  else
  {
    //Delete the hover
    this.DrawChrDetailHoverDestroy();

    //Delete the hover region
    this.DrawChrDetailLabelDestroy();

    //Hide cursor
    this.CursorHide();
  }
};
