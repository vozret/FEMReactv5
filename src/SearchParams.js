import React, { useState, useEffect } from "react";
// pet is a client
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./Dropdown";
import Results from "./Results";

const SearchParams = () => {
  // this is a hook
  // all hooks begin with "use"
  // this is one kind of the destructuring
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  const [pets, setPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);

    //console.log(animals);
  }
  // hooks never go inside of if statements or for loops!!!!
  //console.log("state of location: " + location);

  // useEffect happens AFTER the render
  // you don't want to wait for the first render
  // happens whenever we change the breeds
  // we have to clear whatever there was before
  // if we want to useEffect run only once, we give [] as dependency array
  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds }) => {
      // we are destructuring the name
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <h1>{location}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
