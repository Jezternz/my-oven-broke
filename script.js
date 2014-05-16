$(function()
  {
      var state = {
          "explosiongif": "http://media.giphy.com/media/uSHMDTUL7lKso/giphy.gif",
            "targetKnob": false,
            "centerKnobPosition": [0, 0],
            "relativeDegrees": 0
        };
      (new Image()).src = state.explosiongif;
      $(document).on({
            "mousedown": function(evt)
            {
                $('#arrowtext, #arrow').hide();
                if($(evt.target).is(".knob"))
                {
                    evt.preventDefault();
                    $(window).focus();
                    $('#'+state.targetKnob).focus(); 
                    state.targetKnob = $(evt.target).closest(".gauge").attr("id");
                    state.centerKnobPosition[0] = Math.round($(evt.target).parent().offset().left + ($(evt.target).parent().width()/2));
                    state.centerKnobPosition[1] = Math.round($(evt.target).parent().offset().top + ($(evt.target).parent().height()/2));
                }
                else if($(evt.target).is("#explosion"))
                {
                    $('#explosion').hide();
                }
            },
            "mousemove": function(evt)
            {
                if(state.targetKnob)
                {
                    var theta = Math.atan2(-(evt.clientY-state.centerKnobPosition[1]), (evt.clientX-state.centerKnobPosition[0]));
                    if (theta < 0)theta += 2 * Math.PI;
                    theta = theta * (180 / Math.PI);
                    theta = ((360 - theta)+180)%360;
                    state.relativeDegrees = Math.round(theta);
                    $('#'+state.targetKnob+' .knob').css("-webkit-transform", "rotate(" + state.relativeDegrees + "deg)");
                }
            },
            "mouseup": function(evt)
            {
                if(state.targetKnob)
                {
                    $('#'+state.targetKnob).focus(); 
                    if(state.targetKnob === "timer")
                    {
                         $('#explosion').show();   
                    }
                    state.targetKnob = false;
                }
            }
        });
  });
