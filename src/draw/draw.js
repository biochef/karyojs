//Check if system is ready for draw
Karyo.prototype.Draw = function()
{
  //Show loading
  this.LoadingShow();

  //Set core as busy
  this.core.busy = true;

  //Check if system is ready
  if(this.specie.el && this.svg.build)
  {
    //Check if the user is using a region
    if(this.region.use === false || (this.region.use === true && this.region.el))
    {
      //Destroy the select
      this.SelectDestroy();

      //Start draw
      this.DrawChrList();

      //Show the specie in the foot
      this.FootSpecie();

      //Delete the position
      this.FootPosition(null);

      //Hide loading
      this.LoadingHide();

      //Set core as no busy
      this.core.busy = false;
    }
  }
};
