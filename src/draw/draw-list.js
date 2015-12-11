//Draw chromosomes list
Karyo.prototype.DrawChrList = function()
{
  //Restart the svg
  this.svg.build.clear();

  //Clear the svg elements
  this.svg.draw = {};

  //Start the chromosome var
  this.svg.draw.chr = {};

  //Get the number of chromosomes
  this.svg.draw.chr.num = this.specie.el.chr.length;

  //Split the svg width in (chr_num-1) segments
  this.svg.draw.chr.space = this.svg.width - this.svg.margin.left - this.svg.margin.right;
  this.svg.draw.chr.space = Math.floor(this.svg.draw.chr.space/(this.svg.draw.chr.num - 1));

  //Calculate the chromosome width
  //this.svg.draw.chr_width = 2*Math.floor(this.svg.draw.chr_space/8);
  this.svg.draw.chr.width = this.chrlist.width;

  //Calculates the chromosome height
  this.svg.draw.chr.height = this.svg.height - this.svg.margin.top - this.svg.margin.bottom;

  //Get the maxium value
  this.svg.draw.chr.max = KaryoMaxChrLength(this.specie.el.chr);

  //Chr containers
  this.svg.draw.chrs = [];

  //Centomere
  this.svg.draw.centromere = [];

  //Text containers
  this.svg.draw.text = [];

  //Label container
  this.svg.draw.label = null;

  /* Obsolete
  //Create the title background
  this.svg.draw.title = this.svg.rect(400, 40).attr({x: this.width/2 - 200, y: this.margin.top/2 - 20});

  //Add the style
  this.svg.draw.title.addClass('karyo-title').radius(5);

  //Draw the title text
  this.svg.draw.title_text = this.svg.text(this.specie.name + ' (' + this.specie.assembly + ')');

  //Change the style
  this.svg.draw.title_text.font({'family': 'OpenSans', 'size': '18px', 'anchor': 'middle', 'fill': '#ffffff'});

  //Move the text
  this.svg.draw.title_text.attr({ x: Math.floor(this.width/2), y: this.margin.top/2 - 17});

  */

  //Draw all
  for(var i = 0; i < this.svg.draw.chr.num; i++)
  {
    //Create the new object
    var obj = {};

    //Time
    var time = 200 + 50*i;

    //Save the ID
    obj.id = this.specie.el.chr[i].id;

    //Save the width
    obj.width = this.svg.draw.chr.width;

    //Save the height
    obj.height = this.specie.el.chr[i].length/this.svg.draw.chr.max;
    obj.height = Math.floor(this.svg.draw.chr.height*obj.height);

    //Creates the new rect
    obj.svg = this.svg.build.rect(obj.width, obj.height);

    //Calculate the position
    obj.posx = this.svg.margin.left + this.svg.draw.chr.space*i - this.svg.draw.chr.width/2;
    obj.posy = this.svg.height - this.svg.margin.bottom - obj.height;

    //Move
    obj.svg.attr({ x: obj.posx, y: obj.posy });

    //Set the radius
    obj.svg.radius(5);

    //Set the style
    obj.svg.addClass('karyo-chr').opacity(0.0);

    //Set the animation
    obj.svg.animate(time).opacity(1.0);

    //Initialize the preview
    obj.preview = [];

    //Check for preview the regions
    if(this.chrpreview.show === true && this.region)
    {
      //Add the regions
      for(var j = 0; j < this.chrpreview.data[i].length; j++)
      {
        //Save the region
        var reg = this.chrpreview.data[i][j];

        //Create the rectangle
        var robj = this.svg.build.rect(this.svg.draw.chr.width, reg[1] - reg[0]);

        //Move the rectangle
        robj.attr({x: obj.posx, y: obj.posy + reg[0]});

        //Add the style
        robj.addClass('karyo-region-bg').opacity(0);

        //Add the animation
        robj.animate(time).opacity(0.5);

        //Save the regions
        obj.preview.push(robj);
      }
    }

    //Push the object
    this.svg.draw.chrs.push(obj);

    //Creates the text
    obj = {};

    //Create the text
    obj.svg = this.svg.build.text(this.specie.el.chr[i].id);

    //Change style
    obj.svg.font(this.style.chrtext);

    //Set the position
    obj.posx = this.svg.draw.chrs[i].posx + this.svg.draw.chr.width/2;
    obj.posy = Math.floor(this.svg.height - this.svg.margin.bottom + 5);

    //Move the text
    obj.svg.attr({ x: obj.posx, y: obj.posy });

    //Push
    this.svg.draw.text.push(obj);

    //Create the centromere
    if(Array.isArray(this.specie.el.chr[i].centromere) === true)
    {
      //Create the new object
      obj = {};

      //Set the width
      obj.width = this.svg.draw.chr.width;

      //Set the height
      obj.height = this.specie.el.chr[i].centromere[1] - this.specie.el.chr[i].centromere[0];
      obj.height = Math.floor(this.svg.draw.chr.height*(obj.height/this.svg.draw.chr.max));

      //Set the position x
      obj.posx = this.svg.draw.chrs[i].posx;

      //Set the position y
      obj.posy = this.svg.draw.chr.height*(this.specie.el.chr[i].centromere[0]/this.svg.draw.chr.max);
      obj.posy = this.svg.draw.chrs[i].posy + Math.floor(obj.posy);

      //Draw the rectangle
      obj.rect = this.svg.build.rect(obj.width + 4, obj.height).attr({x: obj.posx - 2, y: obj.posy});

      //style
      obj.rect.addClass('karyo-centromere-bg');

      //Add the polygon
      var poly = [];
      poly.push([obj.posx, obj.posy]);
      poly.push([obj.posx + obj.width/2, obj.posy + obj.height/2]);
      poly.push([obj.posx, obj.posy + obj.height]);
      poly.push([obj.posx + obj.width, obj.posy + obj.height]);
      poly.push([obj.posx + obj.width/2, obj.posy + obj.height/2]);
      poly.push([obj.posx + obj.width, obj.posy]);

      //Create the polygon
      obj.poly = this.svg.build.polygon(poly);

      //Set the class
      obj.poly.addClass('karyo-centromere').opacity(0.0);

      //Set the animation
      obj.poly.animate(time).opacity(1.0);

      //Push
      this.svg.draw.centromere.push(obj);
    }
    else
    {
      //Insert a null object
      this.svg.draw.centromere.push({"poly": null});
    }
  }

  //Change the location
  this.status = 'list';
};

//Exit from chromosome list
Karyo.prototype.DrawChrListExit = function(n)
{
  //Save the state
  this.status = null;

  //Set the time
  var time = 500;

  //Animate all chromosomes
  for(var i = 0; i < this.svg.draw.chr.num; i++)
  {
    //Check
    if(i !== n)
    {
      //Add the animation for the chromosome
      this.svg.draw.chrs[i].svg.animate(time).opacity(0);

      //Add the animation for the text
      this.svg.draw.text[i].svg.animate(time).opacity(0);

      //Check if centromere is defined
      if(this.svg.draw.centromere[i].poly)
      {
        //Add the animation
        this.svg.draw.centromere[i].poly.animate(time).opacity(0);
      }

      //Delete all the preview regions
      for(var j = 0; j < this.svg.draw.chrs[i].preview.length; j++)
      {
        //Delete the regions
        this.svg.draw.chrs[i].preview[j].animate(time).opacity(0);
      }
    }
  }

  //Hide the hover
  this.DrawChrListLabelDestroy();

  //Timeout
  KaryoDrawChrListTimeOut(this, time + 200, n);
};

//Draw hover
Karyo.prototype.DrawChrListLabel = function(n)
{
  //Check if the label is null
  if(this.svg.draw.label === null && this.chrlabel.parser !== null)
  {
    //Restart
    this.svg.draw.label = {};

    //Create the new hover
    this.svg.draw.label.id = this.specie.el.chr[n].id;

    //Save the num
    this.svg.draw.label.num = n;

    //Save the position x
    var posx = this.svg.draw.chrs[n].posx + this.svg.draw.chr.width/2;

    //Save the position y
    var posy = this.svg.height - this.svg.margin.bottom + 35;

    //Draw the rectangle
    this.svg.draw.label.rect = this.svg.build.rect(this.chrlabel.width, this.chrlabel.height);

    //Move
    this.svg.draw.label.rect.attr({ x: posx - this.chrlabel.width/2, y: posy });

    //Set the radius
    this.svg.draw.label.rect.radius(5);

    //Set the style
    this.svg.draw.label.rect.addClass('karyo-hover');

    //Set the initial opacity
    this.svg.draw.label.rect.opacity(0.0);

    //Set the animation
    this.svg.draw.label.rect.animate(100).opacity(1.0);


    //Get the text
    var txt = this.chrlabel.parser(this.svg.draw.label.id);

    //Show the text
    this.svg.draw.label.text = this.svg.build.text(txt);

    //Change the font
    this.svg.draw.label.text.font(this.style.hovertext);

    //Move the text
    this.svg.draw.label.text.attr({x: posx, y: posy + 4});


    //Draw the triangle
    this.svg.draw.label.tri = this.svg.build.polygon([[posx - 6, posy + 2],[posx, posy - 6],[posx + 6, posy + 2]]);

    //Set the style
    this.svg.draw.label.tri.addClass('karyo-hover');

    //Set the initial opacity
    this.svg.draw.label.tri.opacity(0.0);

    //Set the animation
    this.svg.draw.label.tri.animate(100).opacity(1.0);
  }
};

//Draw Hover destroy
Karyo.prototype.DrawChrListLabelDestroy = function()
{
  //Check if is defined
  if(this.svg.draw.label)
  {
    //Remove the rectangle
    this.svg.draw.label.rect.remove();

    //Remove the triangle
    this.svg.draw.label.tri.remove();

    //Remove the text
    this.svg.draw.label.text.remove();

    //Destroy
    this.svg.draw.label = null;
  }
};

//Calculate the max
function KaryoMaxChrLength(chr)
{
  //Def max
  var chmax = chr[0].length;

  //Read all
  for(var i = 0; i < chr.length; i++)
  {
    //Check
    if(chmax < chr[i].length)
    {
      //Change
      chmax = chr[i].length;
    }
  }

  //Return
  return chmax;
}

//Function for timeout
function KaryoDrawChrListTimeOut(_main, _time, _n)
{
  //Set time out
  setTimeout(function(){ _main.DrawChrDetail(_n); }, _time);
}
