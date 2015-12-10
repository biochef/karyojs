//Karyo make the preview regions
Karyo.prototype.Preview = function()
{
  //Show in console
  console.log('Karyo: Creating preview regions...');
  
  //Get the number of chromosomes
  var num = this.specie.el.chr.length;

  //Calculates the chromosome height
  var chr_height = this.svg.height - this.svg.margin.top - this.svg.margin.bottom;

  //Get the maxium value
  var chr_max = KaryoMaxChrLength(this.specie.el.chr);

  //Read all the chromosomes
  for(var i = 0; i < num; i++)
  {
    //Create the new array with the regions
    var arr = [];

    //Create the chromosome height
    var h = Math.floor(chr_height*this.specie.el.chr[i].length/chr_max);

    //Get the ID for this chr
    var r = this.UtilFindID(this.region.el, this.specie.el.chr[i].id);

    //Check if region exists
    if( r > -1)
    {
      //Array with the points
      var points = [];

      //Add the regions
      for(var j = 0; j < this.region.el[r].regions.length; j++)
      {
        //Save the region
        var reg = this.region.el[r].regions[j];

        //Calculate the first position
        var pos1 = Math.floor(h*(reg.start/this.specie.el.chr[i].length));

        //Calculate the second position
        var pos2 = Math.floor(h*(reg.end/this.specie.el.chr[i].length));

        //Save all the points
        for(var k = pos1; k <= pos2; k++){ points.push(k); }
      }

      //Sort the array with the points
      points.sort(function(a,b){ return a - b; });

      //Counter for read all the points
      var k = 0;

      //Read all the points
      while(k < points.length)
      {
        //Get the start and end
        var start = points[k];
        var end = points[k];

        //Next point
        k = k + 1;

        //Check the next points
        while(k < points.length)
        {
          //Check the next point
          if(end + 1 < points[k]){ break; }

          //Save the point
          end = points[k];

          //Get the next
          k = k + 1;
        }

        //Check if start point and end is the same
        if(start == end){ end = end + 1; }

        //Add to the array
        arr.push([start, end]);
      }
    }

    //Add the array to the list of previews
    this.chrpreview.data.push(arr);
  }
};
