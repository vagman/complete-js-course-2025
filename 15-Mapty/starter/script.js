'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const btnDeleteWorkout = document.querySelector('.workout__delete--btn');

let map, mapEvent;

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  // clickCounter = 0;

  constructor(coords, distance, duration) {
    // In older versions of JS we would have to define them inside the constructor
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance;
    this.duration = duration;
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  // click() {
  //   this.clickCounter++;
  //   console.log(this.clickCounter);
  // }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.type = 'running';
    this.calculatePace();
    this._setDescription();
  }

  calculatePace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.type = 'cycling';
    this.calculateSpeed();
    this._setDescription();
  }

  calculateSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
// Experiment - Testing class behaviour
// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

////////////////////////////////////////////
// APPLICATION ARCHITECTURE
class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];
  #markers = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handlers
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    containerWorkouts.addEventListener('click', e => {
      if (e.target.classList.contains('workout__delete--btn')) {
        this._deleteWorkout(e);
      }
    });
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your location.');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude, longitude);
    // console.log(`https://www.google.com/maps/@${latitude},${longitude},15z`);

    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    // console.log(map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    this.#workouts.forEach(workout => {
      this._renderWorkoutMarker(workout);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(input => Number.isFinite(input));

    const allPositiveNumbers = (...inputs) =>
      inputs.every(number => number > 0);

    e.preventDefault();

    // TO DO: Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value; // + converts a string to a number
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // TO DO: If workout is running, create running object. if cyclying create cycling object
    if (type === 'running') {
      const cadence = +inputCadence.value;
      // TO DO: Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        // Make a small function to validate instead of a long if()
        !validInputs(distance, duration, cadence) ||
        !allPositiveNumbers(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    if (type === 'cycling') {
      const elevation = +inputElevation.value;
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositiveNumbers(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');
      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);
    // console.log(workout);

    // TO DO: Render workout on map as a marker
    this._renderWorkoutMarker(workout);

    // TO DO: Render workout in list
    this._renderWorkout(workout);

    // TO DO: hide form & clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    const markerOptions = {
      riseOnHover: true,
      opacity: 0.8,
    };

    const popupOptions = {
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: `${workout.type}-popup`,
    };

    const marker = L.marker(workout.coords, markerOptions)
      .addTo(this.#map)
      .bindPopup(L.popup(popupOptions))
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️ ' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();

    this.#markers.push(marker);
  }

  _renderWorkout(workout) {
    let html = `
          <li class="workout workout--${workout.type}" data-id="${workout.id}">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__actions">
              <button class="workout__delete--btn"></button>
              <div class="tooltip">This is a tooltip!</div>
            </div>
            <div class="workout__details">
              <span class="workout__icon">${
                workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
              }</span>
              <span class="workout__value">${workout.distance}</span>
              <span class="workout__unit">km</span>

            </div>
            <div class="workout__details">
              <span class="workout__icon">⏱</span>
              <span class="workout__value">${workout.duration}</span>
              <span class="workout__unit">min</span>
            </div>`;

    if (workout.type === 'running') {
      html += `
          <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.pace.toFixed(1)}</span>
              <span class="workout__unit">min/km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">🦶🏼</span>
              <span class="workout__value">${workout.cadence}</span>
              <span class="workout__unit">spm</span>
            </div>
          </li>`;
    }

    if (workout.type === 'cycling') {
      html += `
            <div class="workout__details">
              <span class="workout__icon">⚡️</span>
              <span class="workout__value">${workout.speed.toFixed(1)}</span>
              <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⛰</span>
              <span class="workout__value">${workout.elevationGain}</span>
              <span class="workout__unit">m</span>
            </div>
          </li>`;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    // _BUG FIX: When we click on a workout before the map has loaded, we get an error. But there is an easy fix:
    if (!this.#map) return;

    const workoutElement = e.target.closest('.workout');
    // console.log(workoutElement);

    if (!workoutElement) return;

    const workout = this.#workouts.find(
      workout => workout.id === workoutElement.dataset.id
    );
    // console.log(workout);

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });

    // using the publicm interface
    // workout.click();
  }

  // Local Storage is to be used with small amounts of data
  _setLocalStorage() {
    // Convert JSON to string and then save them in local storage
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(typeof data);
    // console.log(data);

    // if there is no data (data === undefined)...
    if (!data) return;
    this.#workouts = data;
    this.#workouts.forEach(workout => this._renderWorkout(workout));
  }

  _deleteWorkout(e) {
    const workoutElement = event.target.closest('.workout'); // Get the workout container

    // find info about workout that was clicked
    const workoutId = workoutElement.dataset.id;
    // Find index of workout
    const workoutIndex = this.#workouts.findIndex(
      workout => workout.id === workoutId
    );
    if (workoutIndex === -1) return; // If workout is not found, exit
    if (confirm('Are you sure you want to delete this workout ?')) {
      // 1. remove from list
      workoutElement.remove();
      // 2. remove from array
      this.#workouts.splice(workoutIndex, 1);
      // 3. remove from map
      this.#markers[workoutIndex].remove();
      // 4. remove from marker array
      this.#markers.splice(workoutIndex, 1);

      // Update local storage
      this._setLocalStorage();
    }
  }

  _getWorkoutId(e) {
    const workout = e.target.closest('.workout');

    if (workout) {
      const workoutId = workout.dataset.id;
      const foundWorkout = this.#workouts.find(w => w.id === workoutId);
      const workoutIndex = this.#workouts.indexOf(foundWorkout);
      return [workoutId, foundWorkout, workoutIndex, workout];
    }
    return [];
  }

  reset() {
    // Clear all 'workout" objects from Local Storage
    localStorage.removeItem('workouts');
    // location objects contains a lot methods and properties of the browser. Here we just reload the page.
    location.reload();
  }
}

const app = new App();
