var s1 = Object();
var s2 = Object();
var s3 = Object();
var s4 = Object();

s1.title = "About Obesity";
s1.text  = "Jason Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur. Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.";

s2.title = "Obesity is an Epidemic!";
s2.text  = "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur. Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.";

s3.title = "The Causes of Obesity";
s3.text  = "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur. Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.";

s4.title = "About Our Research";
s4.text  = "Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur. Donec id elit non mi porta gravida at eget metus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec ullamcorper nulla non metus auctor fringilla. Nulla vitae elit libero, a pharetra augue. Donec sed odio dui. Donec id elit non mi porta gravida at eget metus. Etiam porta sem malesuada magna mollis euismod. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.";

var sections = Array(s1, s2, s3, s4);


// Anon. Immediately Run Function
(function($) {

  // Document.ready()
  $(function() {

    // The width of the window.
    var windowWidth = $(window).outerWidth();

    // Resize the following elements on window resize...
    $(window).resize(function() {

      // Update windowWide on browser resize
      windowWidth = $(window).outerWidth();

    });


    // Replace HTML Elements with text above...
    // REALLY Bad for SEO, but easy to maintain all text here for project purposes.
    $('.section').each(function(i, value) { (i < sections.length) ? $(this).html(sections[i].text) : null; });

    // Replace all headers as well.
    $('.heading').each(function(i, value) { (i < sections.length) ? $(this).html(sections[i].title) : null; });



    // When the user clicks the "See For Yourself" button the following
    // jQuery actions are triggered.
    $('.see-button').click(function() {

      // Slide the landing page left
      $('#landing-wrapper').animate({ left: - (windowWidth - 29), }, 1500, 'easeOutExpo', function() {

        // Hide all text that could potentially "poke out" into sidebar gutter.
        $('#landing-wrapper p, #landing-wrapper #footer').hide();

        // Since the landing page is in a fixed position, we need this.
        $(this).css('width', $(this).width() + 'px');

        // Fade in the social buttons, and the "Show Introduction" link.
        $('.show-landing, #social-wrapper').fadeIn(700);

      }); // End slide landing page left

    }); // End .see-button.click()



    // When the user clicks the "Show Introduction" link the following
    // jQuery actions are triggered
    $('.show-landing').click(function() {

      // Hide the "Show Landing" link and social buttons
      $('.show-landing, #social-wrapper').hide();

      // Replace any text we hid before
      $('#landing-wrapper p, #landing-wrapper #footer').show();

      // Slide the landing page right
      $('#landing-wrapper').css('width', '100%').animate({ left: 0, }, 2000, 'easeOutExpo');

      // Scroll to the top of the page.
      $('html, body').animate({ scrollTop:0 }, 0);

    }); // End .show-landing.click()



    // Social button "on click" handlers. Each calls the openSocial() function with the respective
    // social link as its argument.
    $('.social-button.facebook').click(function() { openSocial('https://www.facebook.com/sharer/sharer.php?u=') });
    $('.social-button.twitter').click(function() { openSocial('https://twitter.com/home?status=') });
    $('.social-button.google').click(function() { openSocial('https://plus.google.com/share?url=') });



    // --------------------------------------------------- D3 STUFF --------------------------------------------------- //


    // Load the data.csv file

    d3.json("data.json", function(error, data) {

      console.log(data);
      console.log(data.length);

      var n = 6, // number of layers
          stack = d3.layout.stack().values(function(d) { return d.values; });

      var margin = {top: 40, right: 10, bottom: 20, left: 50},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var x = d3.scale.ordinal()
          .domain(d3.range(data.length))
          .rangeRoundBands([0, width], .08);

      var y = d3.scale.linear()
          .domain([0, 2])
          .range([height, 0]);

      var color = d3.scale.linear()
          .domain([0, n - 1])
          .range(["#aad", "#556"]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .tickSize(0)
          .tickPadding(6)
          .orient("bottom");

      var svg = d3.select("#vis-2").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var layer = svg.selectAll(".layer")
          .data(data)
        .enter().append("g")
          .attr("class", "layer")
          .style("fill", function(d, i) { return color(i); });

        console.log(height);
      var rect = layer.selectAll("rect")
          .data(data)
        .enter().append("rect")
          .attr("x", function(d) { return x(d.x); })
          .attr("y", height)
          .attr("width", x.rangeBand())
          .attr("height", function(d) { return 0; });
      rect.transition()
      .delay(function(d, i) { return i * 10; })
      .attr("y", function(d) { return y(d.y0 + d.y); })
    .attr("height", function(d) { return y(d.y0) - y(d.y0 + d.y); });

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      var timeout = setTimeout(function() {
        d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
      }, 2000);

    }); // End d3.json()






  }); // End Document.ready()

})(jQuery); // End AIRF


function openSocial(url) {
  window.open(url + document.URL, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
}


function bumpLayer(n, o) {

  function bump(a) {
    var x = 1 / (.1 + Math.random()),
        y = 2 * Math.random() - .5,
        z = 10 / (.1 + Math.random());
    for (var i = 0; i < n; i++) {
      var w = (i / n - y) * z;
      a[i] += x * Math.exp(-w * w);
    }
  }

  var a = [], i;
  for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
  for (i = 0; i < 5; ++i) bump(a);
  return a.map(function(d, i) { return {x: i, y: Math.max(0, d)}; });
}