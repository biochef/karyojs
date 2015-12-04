//Karyo Callback save
Karyo.prototype.CallBack = function(call)
{
  //Check the source
  if(typeof call === 'function')
  {
    //Show in console
    console.log('Karyo: saving callback');

    //Save the callback
    this.callback = call;
  }
  else
  {
    //Show error
    console.error('Karyo: Error in "Set Callback", callback is not a function');
  }
};

//Karyo Go back callback
Karyo.prototype.CallbackGoBack = function(call)
{
  //Check the source
  if(typeof call === 'function')
  {
    //Show in console
    console.log('Karyo: saving callback for go back button');

    //Save the callback for the go back button
    this.navbar.callbackBackBtn = call;
  }
  else
  {
    //Show error
    console.error('Karyo: Error in "Set Callback for Go Back Button", callback is not a function');
  }
};

//Karyo Search callback
Karyo.prototype.CallbackSearch = function(call)
{
  //Check the source
  if(typeof call === 'function')
  {
    //Show in console
    console.log('Karyo: saving callback for search button');

    //Save the callback for the go back button
    this.navbar.callbackSearchBtn = call;
  }
  else
  {
    //Show error
    console.error('Karyo: Error in "Set Callback for Search Button", callback is not a function');
  }
};

//Karyo Callback run
Karyo.prototype.CallbackRun = function(rstart, rend)
{
  //Get the chromosome
  if(typeof this.svg.draw.chr.id === 'undefined')
  {
    //Save from select
    var rchr = this.specie.el.chr[this.select.chr].id;
  }
  else
  {
    //Save the chromosome
    var rchr = this.svg.draw.chr.id;
  }

  //Check if callback exists
  if(this.callback !== null)
  {
    //Execute the callback
    this.callback(rchr, rstart, rend);
  }

  //Show by console
  console.log('Karyo: callback for "' + rchr + ':' + rstart + '-' + rend + '"');
};
