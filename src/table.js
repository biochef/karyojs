//Karyo Table options
Karyo.prototype.TableOpt = function(opt)
{
  //Check for table title
  //if(typeof opt.title !== 'undefined'){ this.tablebar.title = opt.title; }

  //Check for table cols parser
  if(typeof opt.parser !== 'undefined'){ this.tablecols.parser = opt.parser; }

  //Check for table cols names
  if(typeof opt.colsName !== 'undefined')
  {
    //Save the number of columns
    this.tablecols.num = opt.colsName.length;

    //Save the array
    this.tablecols.names = opt.colsName;
  }

  //Check for table cols width
  if(typeof opt.colsWidth !== 'undefined')
  {
    //Check the number
    if(opt.colsWidth.length != this.tablecols.num)
    {
      //Show Error
      console.error('Karyo: error in Table Options, number of width cols is not the same.');
    }
    else
    {
      //Save the array
      //this.tablecols.width = opt.colsWidth;
    }
  }

  //Check for cols align
  if(typeof opt.colsAlign !== 'undefined')
  {
    //Check the number
    if(opt.colsAlign.length != this.tablecols.num)
    {
      //Show Error
      console.error('Karyo: error in Table Options, number of align cols is not the same.');
    }
    else
    {
      //Save the array
      this.tablecols.align = opt.colsAlign;
    }
  }

  //Check for show open
  if(typeof opt.openShow !== 'undefined'){ this.tableopen.show = opt.openShow; }

  //Check for open text
  if(typeof opt.openText !== 'undefined'){ this.tableopen.text = opt.openText; }
};

//Karyo Table report builder
Karyo.prototype.TableBuild = function()
{
  //Initialize the show table
  var show = '';

  //Check for show the report table
  if(this.table.show === false)
  {
    //Hide the table report
    show = 'style="display: none;"';
  }

  //Initialize the table div
  var div = '<div id="' + this.table.id + '" class="' + this.table.class + '" ' + show + '>';

  //Create the bar
  //div = div + '<div id="' + this.tablebar.id + '" class="' + this.tablebar.class + '">';

  //Add the track title
  //div = div + '<span>' + this.tablebar.title + '</span>';

  //Close the bar div
  //div = div + '</div>';

  //Create the content div
  //div = div + '<div id="' + this.tablecont.id + '" class="' + this.tablecont.class + '"></div>';

  //Close the table div
  div = div + '</div>';

  //Return the new div
  return div;
};

//Karyo Table report show/hide
Karyo.prototype.TableShowHide = function()
{
  //Check the actual status
  if(this.table.active === true)
  {
    //Set active as false
    this.table.active = false;

    //Hide the table
    $('#' + this.table.id).css('display', 'none');
  }
  else
  {
    //Set active as true
    this.table.active = true;

    //Show the table
    $('#' + this.table.id).css('display', 'block');
  }
};

//Karyo table build the rows
Karyo.prototype.TableRowsMaker = function(c)
{
  //Check for header
  var sheader = false;

  //Check for the header
  if(typeof c === 'undefined')
  {
    //Set c as the header
    c = this.tablecols.names;

    //Change all to upper case
    for(var i = 0; i < c.length; i++)
    {
      c[i] = c[i].toUpperCase();
    }

    //Set show header as true
    sheader = true;
  }

  //For calculate the correct col width
  var ccorr = 0;

  //Check for show open
  if(this.tableopen.show === true)
  {
    //Correct width
    ccorr = this.tableopen.width/c.length;
  }

  //Initialize the div
  var d = '';

  //Default width
  var cwidth = 100/c.length;

  //Read all
  for(var i = 0; i < c.length; i++)
  {
    //Initialize the column style for this col
    var cstyle = 'width: calc(' + cwidth + '% - ' + ccorr + 'px);';

    /*/Check the col width
    if(this.tablecols.width.length == this.tablecols.num)
    {
      //Add the width style
      cstyle = 'width:' + this.tablecols.width[i] + ';';
    }
    */

    //Check the col align
    if(this.tablecols.align.length == this.tablecols.num)
    {
      //Add the text align
      cstyle = cstyle + 'text-align:' + this.tablecols.align[i] + ';';
    }

    //Initialize the col
    d = d + '<div class="' + this.tablecols.class + '" style="' + cstyle + '">';

    //Add the col content
    d = d + c[i];

    //Close the col
    d = d + '</div>';
  }

  //Chekc for add the open col
  if(this.tableopen.show === true)
  {
    //Initialize the col
    d = d + '<div class="' + this.tablecols.class + '" style="width:' + this.tableopen.width + 'px;">';

    //Add the col content
    if(sheader === false)
    {
      //Add the element
      d = d + '<div class="' + this.tableopen.class + '">' + this.tableopen.text + '</div>';
    }
    else
    {
      //Add a empty col
      d = d + '&nbsp;';
    }

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
  var div = this.tableempty.text.toUpperCase();

  //For check if regions has added
  var regionsOk = false;

  //Check if regions is defined
  if(this.region)
  {
    //Get the ID for this chr
    var r = this.UtilFindID(this.region.el, chr);

    //Check if region exists
    if( r > -1)
    {
      //Set as true
      regionsOk = true;

      //Initialize the table
      div = ''; // '<div class="' + this.table.class + '">';

      //Add the header
      div = div + '<div class="' + this.tablerows.class + ' ' + this.table.head + '">';

      //Add the header content
      div = div + this.TableRowsMaker();

      //Close the header div
      div = div + '</div>';

      //Add the content class
      div = div + '<div class="' + this.table.content + '">';

      //Add the regions
      for(var i = 0; i < this.region.el[r].regions.length; i++)
      {
        //Save the region
        var re = this.region.el[r].regions[i];

        //Array with the default row
        var rinfo = [chr, re.start, re.end, '-'];

        //Check for custom table parser
        if(this.tablecols.parser !== null)
        {
          //Call the custom parser
          rinfo = this.tablecols.parser(chr, re);
        }
        else if(this.reglabel.parser !== null)
        {
          //Save the custom label
          rinfo[3] = this.reglabel.parser(chr, this.region.el[r].regions, i);
        }

        //Add the new row
        div = div + '<div class="' + this.tablerows.class + ' ' + this.tablerows.over + '" ';

        //Add the row ID
        div = div + 'id="rep' + i + '">';

        //Add the row content
        div = div + this.TableRowsMaker(rinfo);

        //Close the row
        div = div + '</div>';
      }

      //Close the table content
      div = div + '</div>';
    }
  }

  //Show the new table
  $('#' + this.table.id).html(div);

  //Check for add the events
  if(regionsOk === true)
  {
    //Add the display class
    //$('#' + this.table.id).addClass(this.table.display);

    //Add the regions events
    for(var i = 0; i < this.region.el[r].regions.length; i++)
    {
      //Add the event for over and click
      KaryoTableRowEvnt(this, i);
    }
  }
  else
  {
    //Add the empty class
    $('#' + this.table.id).addClass(this.tableempty.class);
  }
};

//Karyo Table row over event
Karyo.prototype.TableRowOver = function(r)
{
  //Destroy the last label
  this.DrawChrDetailLabelDestroy();

  //Create the new
  this.DrawChrDetailLabel(r);
};

//Karyo Table row click event
Karyo.prototype.TableRowClick = function(r)
{
  //Check the over region
  if(this.svg.draw.label)
  {
    //Execute the callback
    this.CallbackRun(this.svg.draw.label.start, this.svg.draw.label.end);
  }
};

//Karyo Table destroy
Karyo.prototype.TableDestroy = function()
{
  //Create an empty div
  //var div = 'Select a chromosome for view the report.';

  //Show the new table
  $('#' + this.table.id).html('');

  //Remove the empty class
  $('#' + this.table.id).removeClass(this.tableempty.class);

  //Remove the display class
  //$('#' + this.table.id).removeClass(this.table.display);
};

//Karyo table over event
function KaryoTableRowEvnt(_main, _i)
{
  //Add the over event
  $('#rep' + _i).on('mouseover', function(){ _main.TableRowOver(_i); });

  //Add the click event
  $('#rep' + _i).click(function(e){ _main.TableRowClick(_i); });
}
