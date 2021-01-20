import React from "react";
import { Link } from "@reach/router";

const Pet = ({ name, animal, breed, media, location, id }) => {
  let hero = "http://placecorgi.com/300/300";

  if (media.length) {
    hero = media[0].small;
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      {
        // we used an a tag instead of the Link tag
        // a tag was destroying the DOM
        // that's why the button color wasn't updating
        // Link is using HTML history to navigate the pages
        // navigate would also use HTML history
      }
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} - ${breed} - ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;
