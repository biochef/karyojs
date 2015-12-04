//Karyo Options
Karyo.prototype.Options = function(opt)
{
  //******* Navbar options
  //Check height
  if(typeof opt.navbarHeight !== 'undefined') { this.navbar.height = opt.navbarHeight; }

  //Check show navbar
  if(typeof opt.navbarShow !== 'undefined') { this.navbar.show = opt.navbarShow; }

  //Check show karyotype button
  if(typeof opt.navbarShowKaryo !== 'undefined') { this.navbar.showBtnKaryo = opt.navbarShowKaryo; }

  //Check show search button
  if(typeof opt.navbarShowSearch !== 'undefined') { this.navbar.showBtnSearch = opt.navbarShowSearch; }
};
