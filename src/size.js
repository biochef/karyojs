//Set Karyo size
Karyo.prototype.SetSize = function(w, h)
{
  //Resize the parent div
  $('#' + this.parent.id).width(w);
  //$('#' + this.parent.id).height(h);

  //Calculate the width for the navbar
  var navw = 'calc(' + w + ' - ' + this.navbar.padding.left + 'px - ' + this.navbar.padding.right + 'px)';

  //Resize the navbar
  $('#' + this.navbar.id).css('width', navw);
  $('#' + this.navbar.id).height(this.navbar.height);

  //Set the navbar padding
  $('#' + this.navbar.id).css('padding-left', this.navbar.padding.left);
  $('#' + this.navbar.id).css('padding-right', this.navbar.padding.right);

  //Resize the svg
  $('#' + this.svg.id).width(w);
  $('#' + this.svg.id).height(parseInt(h));

  //Resize the table
  $('#' + this.table.id).width(this.table.width);
  //$('#' + this.table.id).height(this.table.height);

  //Set the table bar padding
  $('#' + this.tablebar.id).css('padding-left', this.tablebar.padding.left);
  $('#' + this.tablebar.id).css('padding-right', this.tablebar.padding.right);

  //Calculate the width for the table bar
  var tbarw = 'calc(' + this.tablebar.width + ' - ' + this.tablebar.padding.left + 'px - ' + this.tablebar.padding.right + 'px)';

  //Resize the table bar
  $('#' + this.tablebar.id).css('width', tbarw);
  $('#' + this.tablebar.id).height(this.tablebar.height);

  //Resize the table content
  $('#' + this.tablecont.id).width(this.tablecont.width);
  //$('#' + this.tablecont.id).height(this.tablecont.height);

  //Check for show
  $('#' + this.tablecont.id).css('display', (this.table.active === true)? 'block': 'none');

  //Resize the loading div
  $('#' + this.loading.id).width(this.loading.width);
  $('#' + this.loading.id).height(this.loading.height);

  //Resize the loading screen div
  $('#' + this.loadingscreen.id).width(this.loadingscreen.width);
  $('#' + this.loadingscreen.id).height(this.loadingscreen.height);

  //Calculate the width for the foot
  var foow = 'calc(' + w + ' - ' + this.foot.padding.left + ' - ' + this.foot.padding.right + ')';

  //Resize the foot
  $('#' + this.foot.id).css('width', foow);
  $('#' + this.foot.id).height(this.foot.height);

  //Set the navbar padding
  $('#' + this.foot.id).css('padding-left', this.foot.padding.left);
  $('#' + this.foot.id).css('padding-right', this.foot.padding.right);

  //Set the line Height
  $('#' + this.foot.id).css('line-height', '' + this.foot.height + 'px');

  //Call the resize event
  this.Resize();
};
