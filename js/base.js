// hex2rgba

var hex = "";
var opacity = 100;
var hex2rgb = "";
var hex2rgba = "";

// Sliders
var slider = document.getElementById('opacity_range');

noUiSlider.create(slider, {
  start: [null, 100],
  connect: true,
  step: 1,
  range: {
    'min': 0,
    'max': 100
  },
  format: wNumb({
    decimals: 0
  })
});

// Css helpers
function setInvalidHexMessage() {
  $("input#hex").removeClass('valid');
  $("input#hex").addClass('invalid');
  return false;
}

function removeInvalidHexMessage() {
  $("input#hex").removeClass('invalid');
  return true;
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
    console.log();
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function validateRgb(rgb_r, rgb_g, rgb_b) {
  var rgb_r1 = /^[0-255]/.exec(rgb_r);
  var rgb_g1 = /^[0-255]/.exec(rgb_g);
  var rgb_b1 = /^[0-255]/.exec(rgb_b);

  var result = (rgb_r && rgb_g && rgb_b);
  return result ? {
    r: rgb_r,
    g: rgb_g,
    b: rgb_b
  } : null
}

function getHex2rgba() {
  if (hex != "") {
    rgb = hexToRgb(hex);
    opacity = $("input#opacity").val();
    hex2rgb = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ")";
    hex2rgba = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + opacity / 100 + ")";
  }

  $("input#hex").change(function() {
    hex = $(this).val();
    rgb = hexToRgb(hex);

    if (rgb == null) {
      setInvalidHexMessage();
    } else {
      return null;
    }
  });
}

function getOpacity() {
  $("input#opacity").change(function() {
    opacity = $(this).val();
    slider.noUiSlider.set([null, opacity]);
    getHex2rgba();
  });
  slider.noUiSlider.on('update', function(values, handle) {
    opacity = values[1];
    $("input#opacity").val(opacity);
  });
  return opacity;
}

$('#subm').click(function(e) {
  e.preventDefault();
  var hex_rgb = hexToRgb(hex);
  var rgb = validateRgb($("#rgb_r").val(), $("#rgb_g").val(), $("#rgb_b").val());

  if (hex_rgb != null) {
    $('.toast').fadeOut();
    var hex2rgb = hex_rgb.r + ", " + hex_rgb.g + ", " + hex_rgb.b;
    var hex2rgba = "rgba(" + hex_rgb.r + ", " + hex_rgb.g + ", " + hex_rgb.b + ", " + opacity / 100 + ")";
    $('input#rgb').val(hex2rgb);
    $('input#rgba').val(hex2rgba);
    var toastContent = $('<div><div>' + hex2rgba + '</div><div>is copied to clipboard!</div></div>');
    var toastColor = $('<div style="width: 48px; height: 48px; border-radius: 50%; margin:auto; background:' + hex2rgba + ';"></div>');
    Materialize.toast(toastColor, 10000, 'rounded');
    Materialize.toast(toastContent, 10000);
    clipboard.copy(hex2rgba+'aaa');
    removeInvalidHexMessage();

    return true;


  } else {
    if (rgb != null) {
      $('.toast').fadeOut();
      var hex2rgb = rgb.r + ", " + rgb.g + ", " + rgb.b;
      var hex2rgba = "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + opacity / 100 + ")";
      $('input#rgb').val(hex2rgb);
      $('input#rgba').val(hex2rgba);
      var toastContent = $('<div><div>' + hex2rgba + '</div><div>is copied to clipboard!</div></div>');
      var toastColor = $('<div style="width: 48px; height: 48px; border-radius: 50%; margin:auto; background:' + hex2rgba + ';"></div>');
      Materialize.toast(toastColor, 10000, 'rounded');
      Materialize.toast(toastContent, 10000);
      clipboard.copy(hex2rgba);
      removeInvalidHexMessage();
      return true;
    } else {
      return false;
    }
    return false;
  }

});

function erase() {
  $('#erase').click(function() {
    $('*:input').val('');
    opacity = 100;
  });
}

var rndNumber = Math.floor(Math.random() * 5);
$.getJSON("data.json", function(json) {
  var color = json[rndNumber].color.toLowerCase();
  $('#color-card').addClass(color);
  $('#color-card .card-content').append('<h5>' + json[rndNumber].color + '</h5>');
  $('#color-card .card-content').append('<p>' + json[rndNumber].p_1 + '</p>');
  $('#color-card .card-content').append('<p>' + json[rndNumber].p_2 + '</p>');
  $('#color-card .card-content').append('<p>' + json[rndNumber].p_3 + '</p>');
});

$(document).ready(function() {
  getOpacity();
  getHex2rgba();
  erase();
});