//Draw chromosome detail
Karyo.prototype.DrawChrDetail = function(n)
{
  //Show the alert tip
  this.AlertTip();

  //Restart the svg
  this.svg.build.clear();

  //Restart the container
  this.svg.draw = {};

  //Start the chromosome
  this.svg.draw.chr = {};

  //Save the num
  this.svg.draw.chr.num = n;

  //Save the ID
  this.svg.draw.chr.id = this.specie.el.chr[n].id;

  //Save the start and end
  this.svg.draw.chr.start = 0;
  this.svg.draw.chr.end = this.specie.el.chr[n].length;

  //Save the length
  this.svg.draw.chr.length = this.svg.draw.chr.end - this.svg.draw.chr.start;

  //Save the width and height
  this.svg.draw.chr.width = this.svg.width - this.svg.margin.left - this.svg.margin.right;
  this.svg.draw.chr.height = this.chrdetail.height;

  //Save the position
  this.svg.draw.chr.posx = this.svg.margin.left;
  this.svg.draw.chr.posy = Math.floor(this.svg.height/2 - this.svg.draw.chr.height/2 - this.chrdetail.margin);

  //Draw the chromosome
  this.svg.draw.chr.svg = this.svg.build.rect(this.svg.draw.chr.width, this.svg.draw.chr.height);

  //Move the chromosome
  this.svg.draw.chr.svg.attr({x: this.svg.draw.chr.posx, y: this.svg.draw.chr.posy});

  //Set the style
  this.svg.draw.chr.svg.addClass('karyo-chr').opacity(0.0);

  //Set the radius
  this.svg.draw.chr.svg.radius(20);

  //Animate
  this.svg.draw.chr.svg.animate(200).opacity(1.0);


  //Initialize the title
  this.svg.draw.title = null;

  //Check
  if(this.chrtitle.show === true)
  {
    //Initialize
    this.svg.draw.title = {};

    //Draw the title rectangle
    this.svg.draw.title.rect = this.svg.build.rect(this.chrtitle.width, this.chrtitle.height);

    //Set the position
    this.svg.draw.title.rect.attr({ x: this.svg.width/2 - this.chrtitle.width/2, y: this.chrtitle.margin});

    //Set the style
    this.svg.draw.title.rect.addClass('karyo-title').radius(5);

    //Create the title text
    var txt = 'Chromosome ' + this.svg.draw.chr.id + ':' + this.svg.draw.chr.start + '-' + this.svg.draw.chr.end;

    //Create the title
    this.svg.draw.title.text = this.svg.build.text(txt);

    //Change the style
    this.svg.draw.title.text.font(this.style.titletext);

    //Move the text
    this.svg.draw.title.text.attr({ x: this.svg.width/2, y: this.chrtitle.margin});
  }

  //Initialize the centromere
  this.svg.draw.centromere = null;

  //Check if centromere is defined
  if(this.specie.el.chr[n].centromere)
  {
    //Create the new object
    var obj = {};

    //Save the positions
    obj.posx1 = Math.floor(this.svg.draw.chr.width*(this.specie.el.chr[n].centromere[0]/this.svg.draw.chr.length));
    obj.posx2 = Math.floor(this.svg.draw.chr.width*(this.specie.el.chr[n].centromere[1]/this.svg.draw.chr.length));
    obj.posy = this.svg.draw.chr.posy;

    //Save the width and height
    obj.width = obj.posx2 - obj.posx1;
    obj.height = this.svg.draw.chr.height;

    //Create the rectangle
    obj.rect = this.svg.build.rect(obj.width, obj.height + 6).attr({x: obj.posx1, y: obj.posy - 3});

    //Add the style
    obj.rect.addClass('karyo-centromere-bg');

    //Create the polygon
    var poly = [];
    poly.push([obj.posx1, obj.posy]);
    poly.push([obj.posx1 + obj.width/2, obj.posy + obj.height/2]);
    poly.push([obj.posx1 + obj.width, obj.posy]);
    poly.push([obj.posx1 + obj.width, obj.posy + obj.height]);
    poly.push([obj.posx1 + obj.width/2, obj.posy + obj.height/2]);
    poly.push([obj.posx1, obj.posy + obj.height]);

    //Create the polygon
    obj.poly = this.svg.build.polygon(poly);

    //Set the class
    obj.poly.addClass('karyo-centromere').opacity(0.0);

    //Set the animation
    obj.poly.animate(200).opacity(1.0);

    //Save
    this.svg.draw.centromere = obj;
  }

  //Initialize the regions
  this.svg.draw.region = {};

  //Initialize the regions container
  this.svg.draw.region.regs = [];

  //Add the regions
  if(this.region)
  {
    //Get the ID for this chr
    var r = this.UtilFindID(this.region.el, this.svg.draw.chr.id);

    //Check if region exists
    if( r > -1)
    {
      //Save the region index
      this.svg.draw.region.index = r;

      //Initialize the opacity for the rectangle
      var opr = (this.select.on === true) ? this.select.op : this.regrect.opacity;

      //Initialize the opacity for the lines
      var opl = (this.select.on === true) ? this.select.op : 1.0;

      //Add the regions
      for(var i = 0; i < this.region.el[r].regions.length; i++)
      {
        //Save the region
        var reg = this.region.el[r].regions[i];

        //Create the new object
        var obj = {};

        //Create the time
        var time = 500;

        //Save the position x1
        obj.posx1 = Math.floor(this.svg.draw.chr.width*(reg.start/this.svg.draw.chr.length));
        obj.posx1 =  this.svg.draw.chr.posx + obj.posx1;

        //Save the position x2
        obj.posx2 = Math.floor(this.svg.draw.chr.width*(reg.end/this.svg.draw.chr.length));
        obj.posx2 = this.svg.draw.chr.posx + obj.posx2;

        //Save the posy
        obj.posy = this.svg.draw.chr.posy;

        //Save the width and height
        obj.width = obj.posx2 - obj.posx1;
        obj.height = this.svg.draw.chr.height;

        //Create the rectangle
        obj.rect = this.svg.build.rect(obj.width, obj.height).attr({x: obj.posx1, y: obj.posy});

        //Add the style
        obj.rect.addClass('karyo-region-bg').opacity(0);

        //Add the animation
        obj.rect.animate(time).opacity(opr);

        //Add the thwo lines
        obj.line1 = this.svg.build.polyline([[obj.posx1, obj.posy], [obj.posx1, obj.posy + obj.height]]);
        obj.line2 = this.svg.build.polyline([[obj.posx2, obj.posy], [obj.posx2, obj.posy + obj.height]]);

        //Add the style for the lines
        obj.line1.addClass('karyo-region').opacity(0);
        obj.line2.addClass('karyo-region').opacity(0);

        //Add the animation
        obj.line1.animate(time).opacity(opl);
        obj.line2.animate(time).opacity(opl);

        //Push
        this.svg.draw.region.regs.push(obj);
      }
    }
  }

  //Initialize the hover
  this.svg.draw.hover = null;

  //Initialize the label
  this.svg.draw.label = null;

  //Initialize the selected region
  this.svg.draw.select = null;

  //Initialize the select label
  this.svg.draw.selectlabel = null;

  //Check if user has selected a region
  if(this.select.on === true)
  {
    //Show in console
    console.log('Karyo: drawing selected region [' + this.select.start + ',' + this.select.end + ']');

    //Calling to the draw function
    this.SelectDraw(true);
  }

  //Change the location
  this.status = 'detail';

  //Show the table report
  this.TableCreate(this.svg.draw.chr.id);

  //Show in console
  console.log('Karyo: opening chromosome ' + this.svg.draw.chr.id);
};

//Karyo Change Regions opacity
Karyo.prototype.DrawChrDetailRegionsOp = function(op)
{
  //Opacity for the rectangle
  var opr = op;

  //Check the opacity for the rectangle
  if(op == 1.0)
  {
    //Seet the default value
    opr = this.regrect.opacity;
  }

  //Check
  if(typeof this.svg.draw.region !== 'undefined')
  {
    //Loop over all regions
    for(var i = 0; i < this.svg.draw.region.regs.length; i++)
    {
      //Change the rect opacity
      this.svg.draw.region.regs[i].rect.opacity(opr);

      //Change the line1 opacity
      this.svg.draw.region.regs[i].line1.opacity(op);

      //Change the line2 opacity
      this.svg.draw.region.regs[i].line2.opacity(op);
    }
  }
};

//Karyo get the real position
Karyo.prototype.DrawChrDetailRealPos = function(pos)
{
  //Calculate the position
  var real = ((pos - this.svg.draw.chr.posx)/this.svg.draw.chr.width)*this.svg.draw.chr.length;

  //Add the start and round
  real = Math.floor(real + this.svg.draw.chr.start);

  //Return
  return real;
};

//Karyo Hover
Karyo.prototype.DrawChrDetailHover = function(posx)
{
  //Save the posy
  var posy = this.svg.draw.chr.posy - 40;

  //Delete
  this.DrawChrDetailHoverDestroy();

  //Create new
  this.svg.draw.hover = {};

  //Create the rectangle
  this.svg.draw.hover.rect = this.svg.build.rect(80, 30).attr({x: posx - 40, y: posy});

  //Add the style
  this.svg.draw.hover.rect.addClass('karyo-hover').radius(5);

  //Add the triangle
  this.svg.draw.hover.tri = this.svg.build.polygon([[posx - 6, posy + 28],[posx, posy + 36],[posx + 6, posy + 28]]);

  //Set the style
  this.svg.draw.hover.tri.addClass('karyo-hover');

  //Get the real position
  var real = this.DrawChrDetailRealPos(posx);

  //Add the text
  this.svg.draw.hover.text = this.svg.build.text(real.toString());

  //Change the position
  this.svg.draw.hover.text.attr({x: posx, y: posy + 4});

  //Change style
  this.svg.draw.hover.text.font(this.style.hovertext);

  //Show the real position on the foot
  this.FootPosition(real);
};

// Karyo Hover destroy
Karyo.prototype.DrawChrDetailHoverDestroy = function()
{
  //Check if exists
  if(this.svg.draw.hover)
  {
    //Remove the rectangle
    this.svg.draw.hover.rect.remove();

    //Remove the triangle
    this.svg.draw.hover.tri.remove();

    //Remove the text
    this.svg.draw.hover.text.remove();

    //Set as null
    this.svg.draw.hover = null;
  }
};

//Karyo Hover region
Karyo.prototype.DrawChrDetailLabel = function(n)
{
  //Check hover
  if(this.svg.draw.label === null)
  {
    //Check if label parser function is created
    var por = (this.reglabel.parser)? 2 : 1;

    //Create
    this.svg.draw.label = {};

    //Save the region num
    this.svg.draw.label.num = n;

    //Set the position
    var posx = Math.floor(this.svg.draw.region.regs[n].posx1 + this.svg.draw.region.regs[n].width/2);
    var posy = this.svg.draw.region.regs[n].posy + this.svg.draw.region.regs[n].height + 10;


    //Create the rectangle
    this.svg.draw.label.rect = this.svg.build.rect(this.reglabel.width, this.reglabel.height*por);

    //Set the position
    this.svg.draw.label.rect.attr({x: posx - this.reglabel.width/2, y: posy});

    //Set the triangle style
    this.svg.draw.label.rect.addClass('karyo-label').radius(5);


    //Create the triangle
    this.svg.draw.label.tri = this.svg.build.polygon([[posx - 6, posy + 2],[posx, posy - 6],[posx + 6, posy + 2]]);

    //Set the triangle style
    this.svg.draw.label.tri.addClass('karyo-label');


    //Set the start and end positions
    this.svg.draw.label.start = this.region.el[this.svg.draw.region.index].regions[n].start;
    this.svg.draw.label.end = this.region.el[this.svg.draw.region.index].regions[n].end;

    //Create the text
    this.svg.draw.label.text1 = this.svg.build.text(this.svg.draw.label.start + '-' + this.svg.draw.label.end);

    //Move the text
    this.svg.draw.label.text1.attr({x: posx, y: posy + 1});

    //Change style
    this.svg.draw.label.text1.font(this.style.labeltext);

    //Initialize the second text
    this.svg.draw.label.text2 = null;

    //Check for the second
    if(this.reglabel.parser !== null)
    {
      //Get the region object
      var robj = this.GetRegionsByChr(this.svg.draw.chr.id);

      //Get the text
      var txt = this.reglabel.parser(this.svg.draw.chr.id, robj, this.svg.draw.label.num);

      //Create the text
      this.svg.draw.label.text2 = this.svg.build.text(txt);

      //Move the text
      this.svg.draw.label.text2.attr({x: posx, y: posy + this.reglabel.height - 2});

      //Change the style
      this.svg.draw.label.text2.font(this.style.labeltext);
    }
  }
};

// Karyo Hover region destroy
Karyo.prototype.DrawChrDetailLabelDestroy = function()
{
  //Check if exists
  if(this.svg.draw.label)
  {
    //Remove the rectangle
    this.svg.draw.label.rect.remove();

    //Remove the triangle
    this.svg.draw.label.tri.remove();

    //Remove the first text
    this.svg.draw.label.text1.remove();

    //Check for second text
    if(this.svg.draw.label.text2 !== null)
    {
      //Remove the second text
      this.svg.draw.label.text2.remove();
    }

    //Set as null
    this.svg.draw.label = null;
  }
};
