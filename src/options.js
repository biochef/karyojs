//Karyo Options
Karyo.prototype.Options = function(opt)
{
  //Check navbar height
  if(typeof opt.navbarHeight !== 'undefined'){ this.navbar.height = opt.navbarHeight; }

  //Check navbar show
  if(typeof opt.navbarShow !== 'undefined'){ this.navbar.show = opt.navbarShow; }

  //Check navbar show karyotype button
  if(typeof opt.navbarShowKaryo !== 'undefined'){ this.navbar.showBtnKaryo = opt.navbarShowKaryo; }

  //Check navbar show search button
  if(typeof opt.navbarShowSearch !== 'undefined'){ this.navbar.showBtnSearch = opt.navbarShowSearch; }

  //For show the tip alert
  if(typeof opt.tipShow !== 'undefined'){ this.alert.tip = opt.tipShow; }

  //For personalize the tip message
  if(typeof opt.tipText !== 'undefined'){ this.alertmsg.tip = opt.tipText; }

  //Select max region
  if(typeof opt.selectMax !== 'undefined'){ this.select.max = opt.selectMax; }

  //Select enabled
  if(typeof opt.selectEnabled !== 'undefined'){ this.select.enabled = opt.selectEnabled; }
};
