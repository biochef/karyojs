//Karyo mouse down
Karyo.prototype.MouseDown = function(x, y)
{
  //Check if location is defined
  if(this.status)
  {
    //Check location
    if(this.status === 'detail')
    {
      //Check if user is hover the chromosome
      if(this.chrdetail.hover === true)
      {
        //Get the real position
        var p = this.DrawChrDetailRealPos(x);

        //Set the new positions
        var p1 = p;
        var p2 = p;

        //Check select down
        if(this.select.on === true)
        {
          //Check if user has clicked on the rectangle
          if(this.svg.draw.select.posx1 < x && x < this.svg.draw.select.posx2)
          {
            //Activate the drag
            this.selectdrag.move = true;

            //Show cursor move
            this.Cursor('move');
          }

          //Check if iser has clicked near the left line
          else if( this.PosNear(x, this.svg.draw.select.posx1, this.select.margin))
          {
            //Save the position
            p2 = this.select.end;

            //Set cursor as resize
            this.Cursor('resize');
          }

          //Check if user has clicked near the right line
          else if( this.PosNear(x, this.svg.draw.select.posx2, this.select.margin))
          {
            //Save the position
            p1 = this.select.start;

            //Set cursor as resize
            this.Cursor('resize');
          }
        }

        //Check if user has clicked on the rectangle
        if(this.selectdrag.move === true)
        {
          //Save the clicked position
          this.selectdrag.click = p;

          //Save the start position
          this.selectdrag.posx1 = this.select.start;

          //Save the end position
          this.selectdrag.posx2 = this.select.end;
        }
        else
        {
          //Save the position
          this.select.start = p1;
          this.select.end = p2;

          //Save the last position
          this.select.last = p;

          //Save the last position x
          this.select.lastx = x;
        }

        //Set select down true
        this.select.down = true;

      }
    }
  }
};
