$(function()
  {
      var state = {
          "explosiongif": "http://media.giphy.com/media/uSHMDTUL7lKso/giphy.gif",
            "targetKnob": false,
            "centerKnobPosition": [0, 0],
            "relativeDegrees": 0
        };
      var rotateEl = function($el, deg)
      {
          ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"].forEach(function(r)
          {  
              $el.css(r, "rotate(" + deg + "deg)"); 
          });
      }
      rotateEl($('.knob'), 90);
      (new Image()).src = state.explosiongif;
      $(document).on({
            "mousedown touchstart": function(evt)
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
            "mousemove touchmove": function(evt)
            {
                if(state.targetKnob)
                {
                    var 
                      x = (evt.type === "touchmove") ? evt.originalEvent.touches[0].pageX : evt.clientX,
                      y = (evt.type === "touchmove") ? evt.originalEvent.touches[0].pageX : evt.clientY;
                    var theta = Math.atan2(-(y-state.centerKnobPosition[1]), (x-state.centerKnobPosition[0]));
                    if (theta < 0)theta += 2 * Math.PI;
                    theta = theta * (180 / Math.PI);
                    theta = ((360 - theta)+180)%360;
                    state.relativeDegrees = Math.round(theta);
                    rotateEl($('#'+state.targetKnob+' .knob'), state.relativeDegrees);
                }
            },
            "mouseup touchend": function(evt)
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
