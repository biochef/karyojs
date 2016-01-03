//Karyo Options
Karyo.prototype.Options = function(opt)
{
  //Check preview regions
  if(typeof opt.previewRegions !== 'undefined'){ this.chrpreview.show = opt.previewRegions; }

  //Check navbar height
  if(typeof opt.navbarHeight !== 'undefined'){ this.navbar.height = opt.navbarHeight; }

  //Check navbar show
  if(typeof opt.navbarShow !== 'undefined'){ this.navbar.show = opt.navbarShow; }

  //Check navbar show karyotype button
  if(typeof opt.navbarShowKaryo !== 'undefined'){ this.navbar.btnKaryoShow = opt.navbarShowKaryo; }

  //Check navbar show search button
  if(typeof opt.navbarShowSearch !== 'undefined'){ this.navbar.btnSearchShow = opt.navbarShowSearch; }

  //Check navbar show table button
  if(typeof opt.navbarShowTable !== 'undefined'){ this.navbar.btnTableShow = opt.navbarShowTable; } 

  //Check navbar show help button
  if(typeof opt.navbarShowHelp !== 'undefined'){ this.navbar.btnHelpShow = opt.navbarShowHelp; }

  //For show the tip alert
  if(typeof opt.tipShow !== 'undefined'){ this.alert.tip = opt.tipShow; }

  //For personalize the tip message
  if(typeof opt.tipText !== 'undefined'){ this.alertmsg.tip = opt.tipText; }

  //Select max region
  if(typeof opt.selectMax !== 'undefined'){ this.select.max = opt.selectMax; }

  //Select enabled
  if(typeof opt.selectEnabled !== 'undefined'){ this.select.enabled = opt.selectEnabled; }

  //Show report table
  if(typeof opt.showTable !== 'undefined'){ this.table.show = opt.showTable; }
};
