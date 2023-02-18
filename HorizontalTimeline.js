
import React from 'react';
import { VegaLite } from 'react-vega';

// Javascript function that fetches a list of objects with a thumbnail, date and title given a stock symbol



const HorizontalTimeline = ({ stockSymbol, color }) => {
  const data = [
    { thumbnail: 'image1.jpg', date: '01/01/2020', title: 'Event 1' },
    { thumbnail: 'image2.jpg', date: '02/01/2020', title: 'Event 2' },
    { thumbnail: 'image3.jpg', date: '03/01/2020', title: 'Event 3' },
  ];

  const spec = {
    $schema: "https://vega.github.io/schema/vega-lite/v4.json",
    description: `Horizontal timeline for ${stockSymbol}`,

    data: { values: data },

    mark: "point",

    encoding:{ 
      x:{ field:"date", type:"temporal", axis:{ labelAngle:-90 }}, 
      y:{ value:-1 },  // Set the y-axis to a fixed value so all points appear in the same row 

      color:{ value: color }, // Set the color of the points to the given hex code

      shape:{ field:"thumbnail", type:"nominal" } // Use thumbnails as shapes for the points  
    }  										   // (this requires that each point has a unique thumbnail)  

  };

  

  return <VegaLite spec={spec} />;
};
export default HorizontalTimeline;