//Karyo select region parser
Karyo.prototype.SelectReg = function(r, force)
{
  //Check the force
  if(typeof force === 'undefined'){ force = false; }

  //Destroy the select
  this.SelectDestroy();

  //Return the opacity as true
  this.DrawChrDetailRegionsOp(1.0);

  //Split by :
  var split = r.split(':');

  //Check if is a chromosome
  var p = this.UtilFindID(this.specie.el.chr, split[0]);

  //Check if p === -1
  if(p < 0)
  {
    //Show error
    this.AlertError('Error, chromosome not found');

    //Exit
    return false;
  }

  //Check if user has set a chromosomical region
  if(split.length >= 2)
  {
    //Save the chromosome to the selected region
    this.select.chr = p;

    //Get the region
    var re = split[1].split('-');

    //Set the start position
    this.select.start = parseInt(re[0]);

    //Set the end position
    this.select.end = parseInt((re.length > 1)? re[1] : re[0]);

    //Check if end > chr.end
    if(this.select.end > this.specie.el.chr[this.select.chr].length)
    {
      //Show error
      console.log('Karyo: invalid region "' + r + '": end is bigger than chromosome');
      console.log('Karyo: settiong selected region end as chromosome end');

      //Change end
      this.select.end = this.specie.el.chr[this.select.chr].length;
    }

    //Check if start > end
    if(this.select.start > this.select.end)
    {
      //Show error
      console.log('Karyo: invalid region "' + r + '": start > end');

      //Destroy
      this.SelectDestroy();

      //Show error
      this.AlertError('Error, start > end');

      //return false
      return false;
    }

    //Select draw as true
    this.select.on = true;
  }

  //Check if chromosome is open
  if(this.status === 'detail' && this.svg.draw.chr.num === p)
  {
    //Draw only the selection
    if(this.select.on === true) { this.SelectDraw(); }
  }
  else
  {
    //Change chromosome view
    this.DrawChrDetail(p);
  }

  //Check for force callback
  if(force === true)
  {
    //Call the select callback
    this.SelectRunCallback();
  }
};

//Karyo select draw
Karyo.prototype.SelectDraw = function(anim)
{
  //Hide if exists
  this.SelectHide();

  //Start the new object
  var obj = {};

  //Calculate the select length
  this.select.length = this.select.end - this.select.start;

  //Save the position x1
  obj.posx1 = Math.floor(this.svg.draw.chr.width*(this.select.start/this.svg.draw.chr.length));
  obj.posx1 =  this.svg.draw.chr.posx + obj.posx1;

  //Save the position x2
  obj.posx2 = Math.floor(this.svg.draw.chr.width*(this.select.end/this.svg.draw.chr.length));
  obj.posx2 = this.svg.draw.chr.posx + obj.posx2;

  //Save the posy
  obj.posy = this.svg.draw.chr.posy;

  //Save the width and height
  obj.width = obj.posx2 - obj.posx1;
  obj.height = this.svg.draw.chr.height;

  //Create the rectangle
  obj.rect = this.svg.build.rect(obj.width, obj.height).attr({x: obj.posx1, y: obj.posy});

  //Add the style
  obj.rect.addClass('karyo-select-bg');

  //Add the opacity
  obj.rect.opacity(this.selectrect.opacity);

  //Add the thwo lines
  obj.line1 = this.svg.build.polyline([[obj.posx1, obj.posy], [obj.posx1, obj.posy + obj.height]]);
  obj.line2 = this.svg.build.polyline([[obj.posx2, obj.posy], [obj.posx2, obj.posy + obj.height]]);

  //Add the style for the lines
  obj.line1.addClass('karyo-select');
  obj.line2.addClass('karyo-select');

  //Add the opacity for the two lines
  obj.line1.opacity(this.selectline.opacity);
  obj.line2.opacity(this.selectline.opacity);

  //Save the object
  this.svg.draw.select = obj;

  //Create the object for the label
  obj = {};

  //Set the position
  obj.posx = this.svg.draw.select.posx1 + this.svg.draw.select.width/2;
  obj.posy = this.svg.draw.select.posy + this.svg.draw.chr.height + 10;

  //Create the rectangle
  obj.rect = this.svg.build.rect(this.selectlabel.width, this.selectlabel.height);

  //Set the position
  obj.rect.attr({x: obj.posx - this.selectlabel.width/2, y: obj.posy});

  //Set the triangle style
  obj.rect.addClass('karyo-selectlabel').radius(5);

  //Create the triangle
  obj.tri = this.svg.build.polygon([[obj.posx - 6, obj.posy + 2],[obj.posx, obj.posy - 6],[obj.posx + 6, obj.posy + 2]]);

  //Set the triangle style
  obj.tri.addClass('karyo-selectlabel');

  //Create the text
  obj.text = this.svg.build.text(this.select.start + '-' + this.select.end);

  //Move the text
  obj.text.attr({x: obj.posx, y: obj.posy + 1});

  //Change style
  obj.text.font(this.style.labeltext);

  //Save the object
  this.svg.draw.selectlabel = obj;

  //Check for animate
  if(anim === true)
  {
    //Add the opacity for the rectangle
    this.svg.draw.select.rect.opacity(0);

    //Add the animation for the rectangle
    this.svg.draw.select.rect.animate(200).opacity(this.selectrect.opacity);

    //Set the opacity for the lines
    this.svg.draw.select.line1.opacity(0);
    this.svg.draw.select.line2.opacity(0);

    //Add the animation for the lines
    this.svg.draw.select.line1.animate(200).opacity(this.selectline.opacity);
    this.svg.draw.select.line2.animate(200).opacity(this.selectline.opacity);

    //Add the opacity for the rectangle
    this.svg.draw.selectlabel.rect.opacity(0.0);

    //Add the animation for the label rect
    this.svg.draw.selectlabel.rect.animate(200).opacity(1.0);

    //Add the opacity for the triangle
    this.svg.draw.selectlabel.tri.opacity(0.0);

    //Add the animation for the triangle
    this.svg.draw.selectlabel.tri.animate(200).opacity(1.0);
  }
};

//Karyo Select run callback
Karyo.prototype.SelectRunCallback = function()
{
  //Execute the callback
  this.CallbackRun(this.select.start, this.select.end);

};

//Karyo Select Drag
Karyo.prototype.SelectDrag = function(x)
{
  //Change the on
  this.select.on = true;

  //Change move to true
  this.select.move = true;

  //Convert to real position
  var pos = this.DrawChrDetailRealPos(x);

  //Calculate the difference
  var diff = pos - this.selectdrag.click;

  //Restart the select start position
  this.select.start = this.selectdrag.posx1 + diff;

  //Restart the select end position
  this.select.end = this.selectdrag.posx2 + diff;

  //Check for the start position
  if(this.select.start < 0)
  {
    //Change the select start
    this.select.start = 0;

    //Change the select end
    this.select.end = this.select.start + this.select.length;
  }
  else if(this.select.end > this.svg.draw.chr.end)
  {
    //Change the select end
    this.select.end = this.svg.draw.chr.end;

    //Change the select start
    this.select.start = this.select.end - this.select.length;
  }

  //Draw the select
  this.SelectDraw(false);
};

//Karyo select move
Karyo.prototype.SelectMove = function(x)
{
  //For save the increment var
  var incr = 1;

  //Check if is first move
  if(this.select.move === false)
  {
    //Set the regions with less opacity
    //this.DrawChrDetailRegionsOp(this.select.op);

    //Change the on
    this.select.on = true;

    //Change move to true
    this.select.move = true;
  }

  //Convert to real position
  var pos = this.DrawChrDetailRealPos(x);

  //Check position x
  if(pos < this.select.start)
  {
    //Save as start
    this.select.start = pos;

    //Save the increment as 1
    incr = 1;
  }
  else if(pos > this.select.end )
  {
    //Save as end
    this.select.end = pos;

    //Save the increment as 0
    incr = 0;
  }
  else
  {
    //Check the direction
    if(this.select.last - pos < -1)
    {
      //Change the end
      this.select.start = pos;

      //Save the increment as 1
      incr = 1;
    }
    else if(this.select.last - pos > 1)
    {
      //Change the start
      this.select.end = pos;

      //Save the increment as 0
      incr = 0;
    }
  }

  //Check for limit region
  if(this.select.max > -1 && this.select.end - this.select.start > this.select.max)
  {
    //Restart the select end or start
    if(incr === 1)
    {
      //Restart the start
      this.select.start = this.select.end - this.select.max;
    }
    else
    {
      //Restart the end
      this.select.end = this.select.start + this.select.max;
    }
  }

  //Save the last
  this.select.last = pos;

  //Draw the select
  this.SelectDraw(false);
};

//Karyo restart select region
Karyo.prototype.SelectDestroy = function()
{
  //Restart the default vars
  this.select.chr = null;
  this.select.start = 0;
  this.select.end = 0;
  this.select.on = false;
  this.select.run = false;
  this.select.hover = false;
  this.select.down = false;

  //Hide
  this.SelectHide();
};

//Karyo select hide
Karyo.prototype.SelectHide = function()
{
  //Check if svg is created
  if(this.svg.draw !== null)
  {
    //Check if svg select is undefined or null
    if(typeof this.svg.draw.select !== 'undefined' && this.svg.draw.select !== null)
    {
      //Remove all the svgs
      this.svg.draw.select.rect.remove();
      this.svg.draw.select.line1.remove();
      this.svg.draw.select.line2.remove();

      //Set as null
      this.svg.draw.select = null;

      //Remove all the labels
      this.svg.draw.selectlabel.rect.remove();
      this.svg.draw.selectlabel.text.remove();
      this.svg.draw.selectlabel.tri.remove();

      //Set as null
      this.svg.draw.selectlabel = null;
    }
  }
};
