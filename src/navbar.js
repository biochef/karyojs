//Karyo Navbar builder
Karyo.prototype.NavbarBuild = function()
{
  //Create the new div
  var div = '<div id="' + this.navbar.id + '" class="' + this.navbar.class + '"';

  //Check if user has set navbar to null
  if(this.navbar.show === false)
  {
    //Add display none
    div = div + ' style="display:none;"';
  }

  //Close the init div
  div = div + '>';

  //Create the go back button
  if(this.navbar.showBtnKaryo === true)
  {
    //Create the div
    div = div + '<div class="' + this.navbar.btnKaryo + '" id="' + this.navbar.id + '_home"';

    //Add the background image
    //div = div + 'style="background-image: url(\'' + this.default.img + this.navbar.BtnKaryo + '\');" ';

    //Add the title
    div = div + 'title="Return to karyotypes"';

    //Close the tiv
    div = div + '></div>';
  }

  //Create the search button and bar
  if(this.navbar.showBtnSearch === true)
  {
    //Create the text input for te search button
    div = div + '<div class="' + this.navbar.input + '" id="' + this.navbar.id + '_input" ';
    div = div + 'data-placeholder="' + this.navbar.placeholder + '" contenteditable></div>';

    //Create the div for the search button
    div = div + '<div class="' + this.navbar.btnSearch + '" id="' + this.navbar.id + '_search"';

    //Add the background image
    //div = div + 'style="background-image: url(\'' + this.default.img + this.navbar.BtnSearch + '\');" ';

    //Add the title
    div = div + 'title="Show region"';

    //Close the button div
    div = div + '></div>';
  }

  //Create the Karyo logo
  //div = div + '<a href="' + this.info.web + '" class="' + this.navbar.btnLogo + '" target="_blank"></a>';
  //div = div + 'style="background-image: url(\'' + this.default.img + this.navbar.BtnLogo + '\');"></a>';

  //Close the div
  div = div + '</div>';

  //Return the new div
  return div;
};

//Karyo navbar event
Karyo.prototype.NavbarEvnt = function()
{
  //Start the navbar home button
  KaryoNavbarBtnHomeEvnt(this);

  //Start the navbar search button
  KaryoNavbarBtnSearchEvnt(this);
};

//Karyo Home button Click
Karyo.prototype.NavbarBtnHomeClick = function()
{
  //Check core
  if(this.core.busy === true)
  {
    //Show in console
    console.warn('Karyo: Core is busy...');

    //Exit
    return false;
  }

  //Show by console
  console.log('Karyo: go back home');

  //Check for callback
  if(this.navbar.callbackBackBtn)
  {
    //Show in console
    console.log('Karyo: Calling function for Go Back button');

    //Call the callback function for the go back button
    this.navbar.callbackBackBtn();
  }

  //Go back to the chromosome view
  this.Draw();
};

//Karyo Search button click
Karyo.prototype.NavbarBtnSearchClick = function()
{
  //Check core
  if(this.core.busy === true)
  {
    //Show in console
    console.warn('Karyo: Core is busy...');

    //Exit
    return false;
  }

  //Get the region selected
  var regsel = $('#' + this.navbar.id + '_input').text();

  //Check
  if(regsel && regsel !== '')
  {
    //Show in console
    console.log('Karyo: searching "' + regsel + '"');

    //Check for callback at search button
    if(this.navbar.callbackSearchBtn)
    {
      //Show in console
      console.log('Karyo: Calling function for Search button');

      //Call the callback function for the go back button
      this.navbar.callbackSearchBtn(regsel);
    }

    //Send to the parse select
    this.SelectReg(regsel, true);
  }
};

//Navbar Home Event
function KaryoNavbarBtnHomeEvnt(_main)
{
  //If click
  $('#' + _main.navbar.id + '_home').click(function(e){

    //Prevent default
    e.preventDefault();

    //Call the Click function
    _main.NavbarBtnHomeClick();

  });
}

//Karyo Navbar Search Event
function KaryoNavbarBtnSearchEvnt(_main)
{
  //If click
  $('#' + _main.navbar.id + '_search').click(function(e){

    //Prevent default
    e.preventDefault();

    //Call the Click function
    _main.NavbarBtnSearchClick();

  });
}
