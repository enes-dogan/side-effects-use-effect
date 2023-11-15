import { useEffect, useRef, useState, useCallback } from 'react';

import { AVAILABLE_PLACES } from './data';
import { sortPlacesByDistance } from './loc';
import logoImg from './assets/logo.png';

import Places from './components/Places';
import Modal from './components/Modal';
import DeleteConfirmation from './components/DeleteConfirmation';

import { AvaiablePlaces } from './types';

const getStoredIdsFromLocalStorage = () => {
  const storedIds: string[] = JSON.parse(
    localStorage.getItem('selectedPlaces') || '[]'
  ) as string[];
  return storedIds;
};

const storedPlaces: AvaiablePlaces = getStoredIdsFromLocalStorage().map(id =>
  AVAILABLE_PLACES.find(place => place.id === id)
) as AvaiablePlaces;

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedPlace = useRef<string>();
  const [availablePlaces, setAvailablePlaces] = useState<AvaiablePlaces>([]);
  const [pickedPlaces, setPickedPlaces] =
    useState<AvaiablePlaces>(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStartRemovePlace(id: string) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id: string) {
    setPickedPlaces(prevPickedPlaces => {
      if (prevPickedPlaces.some(place => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find(place => place.id === id);
      if (place) {
        return [place, ...prevPickedPlaces];
      } else {
        return prevPickedPlaces;
      }
    });

    const storedIds = getStoredIdsFromLocalStorage();
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        'selectedPlaces',
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  const handleRemovePlace = useCallback(() => {
    setPickedPlaces(prevPickedPlaces =>
      prevPickedPlaces.filter(place => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);

    const storedIds = getStoredIdsFromLocalStorage();
    localStorage.setItem(
      'selectedPlaces',
      JSON.stringify(storedIds.filter(id => id !== selectedPlace.current))
    );
    [];
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={
            availablePlaces.length > 0 ? availablePlaces : AVAILABLE_PLACES
          }
          fallbackText={'Sorting places by distance...'}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
