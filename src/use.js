//Karyo Use size
Karyo.prototype.UseSize = function(obj)
{
  //Check for width
  if(typeof obj.width !== 'undefined') { this.default.size.width = obj.width; }

  //Check for height
  if(typeof obj.height !== 'undefined') { this.default.size.height = obj.height; }
}

//Karyo Use margins
Karyo.prototype.UseMargin = function(obj)
{
  //Check for top
  if(typeof obj.top !== 'undefined') { this.svg.margin.top = obj.top; }

  //Check for bottom
  if(typeof obj.bottom !== 'undefined') { this.svg.margin.bottom = obj.bottom; }

  //Check for left
  if(typeof obj.left !== 'undefined') { this.svg.margin.left = obj.left; }

  //Check for right
  if(typeof obj.right !== 'undefined') { this.svg.margin.right = obj.right; }
}

//Karyo Use plugins
Karyo.prototype.UsePlugin = function(name, callback)
{
  //Seng to the plugins function
  this.Plugins(name, callback);
};

//Karyo GoTo region
Karyo.prototype.GoTo = function(go, call)
{
  //Check call
  if(typeof call === 'undefined') { call = true; }

  //Check core
  if(this.core.busy === true)
  {
    //Show in console
    console.warn('Karyo: Core is busy...');

    //Exit
    return;
  }

  //Open region
  this.SelectReg(go, call);
};

//Karyo Label functions
Karyo.prototype.UseLabel = function(opt)
{
  //Check label for chromosome
  if(typeof opt.chromosome === 'function')
  {
    //Save the chromosomes region parser
    this.chrlabel.parser = opt.chromosome;
  }

  //Check label for region
  if(typeof opt.region === 'function')
  {
    //Save the regions label parser
    this.reglabel.parser = opt.region;
  }
};
