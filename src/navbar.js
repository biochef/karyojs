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
  if(this.navbar.btnKaryoShow === true)
  {
    //Create the div
    div = div + '<div class="' + this.navbar.btnKaryoClass + '" id="' + this.navbar.btnKaryo + '"';

    //Add the title
    div = div + 'title="' + this.navbar.btnKaryoTitle + '"';

    //Close the tiv
    div = div + '></div>';
  }

  //Create the search button and bar
  if(this.navbar.btnSearchShow === true)
  {
    //Create the text input for te search button
    div = div + '<input type="text" class="' + this.navbar.inputClass + '" id="' + this.navbar.input + '"';
    div = div + ' placeholder="' + this.navbar.inputPlaceholder + '">';

    //Create the div for the search button
    div = div + '<div class="' + this.navbar.btnSearchClass + '" id="' + this.navbar.btnSearch + '"';

    //Add the title
    div = div + 'title="' + this.navbar.btnSearchTitle + '"';

    //Close the button div
    div = div + '></div>';
  }

  //Create the Karyo logo
  if(this.navbar.btnHelpShow === true)
  {
    //Create the div for the help button
    div = div + '<div class="' + this.navbar.btnHelpClass + '" id="' + this.navbar.btnHelp + '"';

    //Add the title
    div = div + 'title="' + this.navbar.btnHelpTitle + '"';

    //Close the button div
    div = div + '></div>';
  }

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

  //Start the navbar help button
  KaryoNavbarBtnHelpEvnt(this);
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
  var regsel = $('#' + this.navbar.input).val();

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

//Karyo Help button click
Karyo.prototype.NavbarBtnHelpClick = function()
{
  //Open the help on a new window
  window.open(this.info.docs, '_blank');
}

//Navbar Home Event
function KaryoNavbarBtnHomeEvnt(_main)
{
  //If user clicks on the karyotypes button
  $('#' + _main.navbar.btnKaryo).click(function(e){ _main.NavbarBtnHomeClick(); });
}

//Karyo Navbar Search Event
function KaryoNavbarBtnSearchEvnt(_main)
{
  //If user clicks of search icon
  $('#' + _main.navbar.btnSearch).click(function(e){ _main.NavbarBtnSearchClick(); });

  //Or user press enter
  $('#' + _main.navbar.input).keyup(function(e){ if(e.keyCode == 13){ _main.NavbarBtnSearchClick(); } });
}

//Karyo Navbar Help Event
function KaryoNavbarBtnHelpEvnt(_main)
{
  //If user clicks on the help button
  $('#' + _main.navbar.btnHelp).click(function(e){ _main.NavbarBtnHelpClick(); });
}
