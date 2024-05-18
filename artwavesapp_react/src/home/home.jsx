import React from 'react';
import '../styles/home.css';

function AnimatedBackground() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Animated Background</title>
        <link rel="stylesheet" media="all" href="style.css" />
      </head>
      <body>
        <BodyContent />
      </body>
    </html>
  );
}

function BodyContent() {
  return (
    <div>
      <div className="a"></div>
      <div id="circle"></div>
    </div>
  );
}

export default AnimatedBackground;
