/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };
  // must be static
  // takes set of props, does some filtering on them and passes them to the component
  static getDerivedStateFromProps({ media }) {
    // default image if there are no images
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      // pull out all the large photos
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  /*
    whenever passing funcs down to children or using event listeners
    use an arrow function
  */
  handleIndexClick = (event) => {
    this.setState({
      // need to turn this into a number
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => {
            // es-lint-disable-next-line
            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events
              <img
                key={photo}
                onClick={this.handleIndexClick}
                data-index={index}
                src={photo}
                className={index === active ? "active" : ""}
                alt="animal thumbnail"
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
