import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

// no hooks in class components
class Details extends React.Component {
  /*constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }*/

  state = { loading: true };

  componentDidMount() {
    // throw new Error("lol");
    // props are immutable
    // called only once
    // e.g. for API requests
    // single animal, we want to pass the id from the url
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }
  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }

    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  // spreads the props in the details
  // when component doesn't care what the props are
  // it gets the id from parent component
  // same as <Deatils id={props.id} />
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
