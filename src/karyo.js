//Karyo class
function Karyo(parent_id)
{
  //Version info
  this.info = {};
  this.info.name = 'Karyo.js'; //App name
  this.info.version = '1.0.0'; //Version ID
  this.info.web = 'https://jmjuanes.github.io/karyojs'; //App website

  //Show the welcome on the console
  console.log('Karyo: ' + this.info.name + ' v' + this.info.version);
  console.log('Karyo: Visit ' + this.info.web + ' for more info and usage.');

  //Start the default values
  this.default = {};
  this.default.size = {'width': '100%', 'height': '330px'}; //Default width and height
  this.default.svg = {'width': '100%', 'height': '100%'}; //Default svg width and size
  this.default.img = 'img/'; //Images folder

  //Start the parent
  this.parent = {};
  this.parent.id = parent_id; //Parent ID
  this.parent.width = 0; //Parent width
  this.parent.height = 0; //Parent height

  //Core
  this.core = {};
  this.core.busy = false; //For core status

  //Start the navbar
  this.navbar = {};
  this.navbar.id = this.parent.id + '_navbar'; //Navbar ID
  this.navbar.width = 0; //Navbar width
  this.navbar.height = 50; //Navbar height
  this.navbar.show = true; //Show navbar
  this.navbar.class = 'karyo-navbar'; //Navbar css class
  this.navbar.padding = {"left": 10, "right": 10}; //Navbar padding
  this.navbar.btnKaryo = 'karyo-navbar-btn karyo-navbar-btn-home'; //Karyotype button css
  this.navbar.btnSearch = 'karyo-navbar-btn karyo-navbar-btn-search'; //Search button css
  this.navbar.input = 'karyo-navbar-input'; //Input css class
  this.navbar.btnLogo = 'karyo-navbar-logo'; //Logo button css
  this.navbar.showBtnKaryo = true; //Show karyotypes button
  this.navbar.showBtnSearch = true; //Show search button
  this.navbar.placeholder = 'Find region'; //Input placeholder
  this.navbar.callbackBackBtn = null; //Go back callback
  this.navbar.callbackSearchBtn = null; //Search btn callback

  //Start the foot
  this.foot = {};
  this.foot.id = this.parent.id + '_foot'; //Foot ID
  this.foot.pos = this.foot.id + '_pos'; //Foot position ID
  this.foot.specie = this.foot.id + '_specie'; //Foot specie ID
  this.foot.width = 0; //Foot width
  this.foot.height = 30; //Foot height
  this.foot.padding = {"left": 10, "right": 10}; //Foot padding
  this.foot.show = true; //Show foot
  this.foot.logo = 'karyo-foot-logo'; //Karyo foot logo class
  this.foot.powered = 'karyo-foot-powered'; //Karyo powered by class

  //Start the svg
  this.svg = {};
  this.svg.id = this.parent.id + '_svg'; //Svg ID
  this.svg.build = null; //Svg starter
  this.svg.width = 0; //Svg width
  this.svg.height = 0; //Svg height
  this.svg.draw = null; //Svg draw container
  this.svg.margin = {'top': 35, 'bottom': 75, 'left': 70, 'right': 70}; //Svg margins

  //Start the specie
  this.specie = {};
  this.specie.el = null; //Array with the species
  this.specie.use = false; //For check if user uses the species
  this.specie.parser = null; //Function for parser the species

  //Start the region
  this.region = {};
  this.region.el = null; //Array with the regions
  this.region.use = false; //For check if user uses the regions
  this.region.parser = null; //Function for parser the species

  //Start the chromosome list info
  this.chrlist = {};
  this.chrlist.hover = false; //True if mouse is hover the chromosome
  this.chrlist.width = 12; //Chromosome width

  //Start the chromosome detail info
  this.chrdetail = {};
  this.chrdetail.hover = false; //True if mouse is hover the chromosome
  this.chrdetail.height = 60; //Chromosome height
  this.chrdetail.margin = -5; //Chromosome detail margin top

  //Start the chromosome title
  this.chrtitle = {};
  this.chrtitle.width = 400; //title width
  this.chrtitle.height = 35; //Title height
  this.chrtitle.margin = 20; //Title margin top
  this.chrtitle.show = true; //Show title

  //Start the species label
  this.chrlabel = {};
  this.chrlabel.width = 90; //Label width
  this.chrlabel.height = 30; //Label height
  this.chrlabel.parser = null; //Function for parser the chr label

  //Start the regions label
  this.reglabel = {};
  this.reglabel.parser = null; //Function for parser the reg labels
  this.reglabel.showPositions = true; //For show the positions
  this.reglabel.width = 130; //Label width
  this.reglabel.height = 20; //Label height

  //Start the region rectangle
  this.regrect = {};
  this.regrect.opacity = 0.4; //Rectangle opacity

  //Start the selected region
  this.select = {};
  this.select.op = 1.0; //Opacity for regions
  this.select.on = false; //Check if is activated
  this.select.chr = null; //Selected chr
  this.select.start = 0; //Select start point
  this.select.end = 0; //Select end point
  this.select.length = 0; //Select length
  this.select.move = false; //For check if user is selecting a region
  this.select.down = false; //For check if user has clicked on the region
  this.select.last = 0; //Last point for check direction
  this.select.lastx = 0; //Last position x
  this.select.margin = 5; //Margin for capture the click
  this.select.max = -1; //Max select region
  this.select.limitset = false; //For check if user has limited the select length
  this.select.enabled = true; //Select enabled

  //Select drag
  this.selectdrag = {};
  this.selectdrag.move = false; //Select drag move
  this.selectdrag.click = 0; //Select drag click position
  this.selectdrag.posx1 = 0; //Original position x1
  this.selectdrag.posx2 = 0; //Original position x2

  //Start the select rectangle
  this.selectrect = {};
  this.selectrect.opacity = 0.4; //Rectangle opacity

  //Start the select line
  this.selectline = {};
  this.selectline.opacity = 0.4; //Line opacity

  //Start the select label
  this.selectlabel = {};
  this.selectlabel.width = 130; //Width for the select label
  this.selectlabel.height = 20; //Height for the select label

  //Set the styles
  this.style = {};
  this.style.chrtext = {'family': 'OpenSans', 'size': '12px', 'anchor': 'middle', 'fill': '#546E7A'};
  this.style.titletext = {'family': 'OpenSans', 'size': '20px', 'anchor': 'middle', 'fill': '#546E7A'};
  this.style.hovertext = {'family': 'OpenSans', 'size': '12px', 'anchor': 'middle', 'fill': '#ffffff'};
  this.style.labeltext = {'family': 'OpenSans', 'size': '11px', 'anchor': 'middle', 'fill': '#ffffff'};

  //Alert
  this.alert = {};
  this.alert.id = this.parent.id + '_alert'; //Alert ID
  this.alert.padding = 40; //Alert padding for image
  this.alert.class = 'karyo-alert'; //Karyo alert class
  this.alert.width = 0; //Alert width
  this.alert.height = 0; //Alert Height
  this.alert.time = 4000; //Alert time visible
  this.alert.typeclass = 'karyo-alert-'; //Alert type class
  this.alert.type = ''; //Alert type
  this.alert.tip = true; //For show alert tip

  //Alert container
  this.alertcont = {};
  this.alertcont.id = this.alert.id + '_cont'; //Alert container ID
  this.alertcont.class = 'karyo-alert-cont'; //Karyo alert container class
  this.alertcont.visible = false; //Container is visible
  this.alertcont.width = 0; //Alert container width
  this.alertcont.height = 30; //Alert container height
  this.alertcont.posx = 0; //Alert container posx
  this.alertcont.posy = 0; //Alert contaeiner posy
  this.alertcont.margin = 5; //Alert container margin
  this.alertcont.padding = 35; //Alert container padding

  //Alert messages
  this.alertmsg = {};
  this.alertmsg.tip = 'Click on a red region to view, or click and drag to select a custom region.'; //Alert tip
  this.alertmsg.error = 'Error, region not found...'; //Alert search error

  //Cursor
  this.cursor = {};
  this.cursor.id = '#' + this.parent.id; //Cursor element
  this.cursor.active = false; //Cursor status

  //Loading window
  this.loading = {};
  this.loading.id = this.parent.id + '_loading'; //Loading ID
  this.loading.width = '100%'; //Loading height
  this.loading.height = 0; //Loading height
  this.loading.class = 'karyo-loading'; //Loading css class
  this.loading.show = true; //Loading show
  this.loading.visible = false; //Loading visible

  //Loading screen
  this.loadingscreen = {};
  this.loadingscreen.id = this.loading.id + '_screen'; //Loading screen ID
  this.loadingscreen.width = '100%'; //Loading screen width
  this.loadingscreen.height = 0; //Loading screen height
  this.loadingscreen.class = 'karyo-loading-screen'; //Loading screen css class
  this.loadingscreen.show = true; //Show true
  this.loadingscreen.padding = {"top": 100}; //Padding

  //Plugins
  this.plugins = {};

  //Callback
  this.callback = null;

  //Project status
  this.status = null;

  //Karyo Build Time out
  KaryoBuildTimeOut(this);
}
