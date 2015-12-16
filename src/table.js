//Karyo Table report builder
Karyo.prototype.TableBuild = function()
{
  //Initialize the table div
  var div = '<div id="' + this.table.id + '" class="' + this.table.class + '">';

  //Create the bar
  div = div + '<div id="' + this.tablebar.id + '" class="' + this.tablebar.class + '">';

  //Add the track title
  div = div + '<span>' + this.tablebar.title + '</span>';

  //Close the bar div
  div = div + '</div>';

  //Create the content div
  div = div + '<div id="' + this.tablecont.id + '" class="' + this.tablecont.class + '"></div>';

  //Close the table div
  div = div + '</div>';

  //Return the new div
  return div;
};

//Karyo Table report show/hide
Karyo.prototype.TableOpenClose = function()
{
  //Check the actual status
  if(this.table.active === true)
  {
    //Set active as false
    this.table.active = false;

    //Hide the table
    $('#' + this.tablecont.id).css('display', 'none');
  }
  else
  {
    //Set active as true
    this.table.active = true;

    //Show the table
    $('#' + this.tablecont.id).css('display', 'block');
  }
};

//Karyo table build the rows
Karyo.prototype.TableRowsMaker = function(c)
{
  //Initialize the div
  var d = '';

  //Read all
  for(var i = 0; i < c.length; i++)
  {
    //Initialize the col
    d = d + '<div class="' + this.tablereport.col + '" ';

    //Add the style
    d = d + 'style="width:' + this.tablecols.width[i] + ';text-align:' + this.tablecols.align[i] + ';">';

    //Add the col content
    d = d + c[i];

    //Close the col
    d = d + '</div>';
  }

  //Return the div
  return d;
};

//Karyo Table build the table
Karyo.prototype.TableCreate = function(chr)
{
  //Create the new div
  var div = 'No region for this chromosome...';

  //Check if regions is defined
  if(this.region)
  {
    //Get the ID for this chr
    var r = this.UtilFindID(this.region.el, chr);

    //Check if region exists
    if( r > -1)
    {
      //Remove the empty class
      $('#' + this.tablecont.id).removeClass(this.tablecont.empty);

      //Initialize the table
      div = '<div class="' + this.tablereport.class + '">';

      //Add the header
      div = div + '<div class="' + this.tablereport.row + '">';
      div = div + this.TableRowsMaker(this.tablecols.names);
      div = div + '</div>';

      //Add the regions
      for(var i = 0; i < this.region.el[r].regions.length; i++)
      {
        //Save the region
        var re = this.region.el[r].regions[i];

        //Array with the row info
        var rinfo = [chr, re.start, re.end, '-'];

        //Check for custom label
        if(this.reglabel.parser !== null)
        {
          //Get the text
          rinfo[rinfo.length - 1] = this.reglabel.parser(chr, r);
        }

        //Add the new row
        div = div + '<div class="' + this.tablereport.row + ' ' + this.tablereport.hover + '" id="rep' + i + '">';

        //Add the row content
        div = div + this.TableRowsMaker(rinfo);

        //Close the row
        div = div + '</div>';
      }

      //Close the new table
      div = div + '</div>';
    }
  }

  //Show the new table
  $('#' + this.tablecont.id).html(div);
};

//Karyo Table destroy
Karyo.prototype.TableDestroy = function()
{
  //Create an empty div
  var div = 'Select a chromosome for view the report.';

  //Show the new table
  $('#' + this.tablecont.id).html(div);

  //Add the empty class
  $('#' + this.tablecont.id).addClass(this.tablecont.empty);
};
