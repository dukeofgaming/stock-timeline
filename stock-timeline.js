

function renderStockTimeline(stockSymbol) {
    // Fetch references for the stock symbol
    const references = fetchReferences(stockSymbol);
  
    // Prepare data for Vega lite
    const data = {
      values: references.map(r => ({
        date: new Date(r.date),
        thumbnail: r.thumbnail,
        url: r.url
      }))
    };
  
    // Define the Vega lite specification
    const spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
      "width": 800,
      "height": 100,
      "data": {"name": "data"},
      "layer": [
        {
          "mark": {"type": "circle", "size": 50},
          "encoding": {
            "x": {"field": "date", "type": "temporal", "axis": {"labelAngle": -45}},
            "y": {"value": 50},
            "href": {"field": "url"},
            "tooltip": [
              {"field": "date", "type": "temporal", "format": "%Y-%m-%d %H:%M:%S"},
              {"field": "url"}
            ],
            "thumbnail": {"field": "thumbnail", "type": "nominal"}
          }
        }
      ]
    };
  
    // Render the timeline using Vega lite
    vegaEmbed("#timeline", spec, {defaultStyle: true, actions: false}).then(({view}) => {
      // code to handle the rendered view
    });
}


  


// Function that renders a horizontal timeline using Vega lite, it takes a list of objects representing references, each reference has a date of publication, a thumbnail URL and a URL link for the reference


function renderHorizontalTimeline(references) {
    const vegaSpec = {
        "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
        "data": {
        "values": references
        },
        "mark": {
        "type": "rule",
        "tooltip": true,  // show tooltip when hovering over a reference item in the timeline
        },
        "encoding": {
        "x": {  // x-axis is used for the date of publication of each reference item 
            "field": 'date',  // use the date field from each reference object in the list of references 
            "type": 'temporal',   // type is temporal because we are dealing with dates here 
            "axis": {"title":"Date"}   // set axis title to Date  
        },  

        "y": {  // y-axis is used to display a thumbnail image of each reference item in the timeline 
            "field": 'thumbnailURL',   // use the thumbnailURL field from each reference object in the list of references 
            "type":"nominal",   // type is nominal because we are dealing with images here 

            // define a scale for displaying images on y-axis, using thumbnailURL field from each reference object in the list of references as source for images 

            "scale":{"rangeStep":[20],	"domain":["thumbnailURL"],	"range":["url(datum.thumbnailURL)"]},

            // define an axis title for y-axis as Thumbnail Image

                "axis":{"title":"Thumbnail Image"}											    

        },

        // define a tooltip that will be displayed when hovering over a reference item in the timeline, it will show URL link for that particular reference item

        'tooltip': [{'field': 'urlLink', 'type': 'nominal'}]    

        }    

    };

    return vegaSpec;   // return Vega spec object which can be used to render horizontal timeline using Vega lite library.  
}

