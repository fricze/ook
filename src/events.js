// class Observable {
//   constructor() {
//     this.observers = [];
//   }

//   // Subscribe method for observers to listen to changes
//   subscribe(observerFunction) {
//     this.observers.push(observerFunction);
//     return () => this.unsubscribe(observerFunction); // Returns an unsubscribe function
//   }

//   // Unsubscribe method to stop listening
//   unsubscribe(observerFunction) {
//     this.observers = this.observers.filter(
//       (observer) => observer !== observerFunction,
//     );
//   }

//   // Notify all observers about an event
//   notify(data) {
//     this.observers.forEach((observerFunction) => observerFunction(data));
//   }

//   // Map operator to transform the emitted values
//   map(transformationFunction) {
//     // Create a new Observable
//     const mappedObservable = new Observable();
//     // Subscribe a new observer to the current Observable
//     this.subscribe((data) => {
//       // Apply the transformation function to the data
//       const transformedData = transformationFunction(data);
//       // Notify observers of the new Observable with the transformed data
//       mappedObservable.notify(transformedData);
//     });
//     return mappedObservable; // Return the new Observable
//   }
// }

class Observable extends EventTarget {
  constructor(completeSignal) {
    super();
    this.#completeSignal = completeSignal;
  }
  #controller = new AbortController();
  #completeSignal;

  // Subscribe method for observers to listen to changes
  subscribe(observerFunction) {
    this.addEventListener("value", (e) => observerFunction(e.detail), {
      signal: this.#controller.signal,
    });

    this.#completeSignal?.addEventListener("abort", () => this.complete(), {
      once: true,
    });

    return () => this.complete(); // Returns an unsubscribe function
  }

  complete() {
    console.log("im completing");
    this.#controller.abort();
  }

  // Notify all observers about an event
  notify(data) {
    this.dispatchEvent(new CustomEvent("value", { detail: data }));
  }

  // Map operator to transform the emitted values
  map(transformationFunction) {
    // Create a new Observable
    const mappedObservable = new Observable(this.#controller.signal);
    // Subscribe a new observer to the current Observable
    this.subscribe((data) => {
      // Apply the transformation function to the data
      const transformedData = transformationFunction(data);
      // Notify observers of the new Observable with the transformed data
      mappedObservable.notify(transformedData);
    });

    return mappedObservable; // Return the new Observable
  }

  static of(value) {
    const ofObservable = new Observable();
    ofObservable.notify(value);
    return ofObservable;
  }

  flatMap(transformationFunction) {
    // Create a new Observable
    const mappedObservable = new Observable(this.#controller.signal);
    // Subscribe a new observer to the current Observable
    this.subscribe((data) => {
      // Apply the transformation function to the data
      const transformedObservable = transformationFunction(data);
      transformedObservable.#completeSignal = this.#controller.signal; // ????
      transformedObservable.subscribe((data) => {
        // Notify observers of the new Observable with the transformed data
        mappedObservable.notify(data);
      });
    });

    return mappedObservable; // Return the new Observable
  }

  filter(filteringFunction) {
    // Create a new Observable
    const filteredObservable = new Observable(this.#controller.signal);
    // Subscribe a new observer to the current Observable
    this.subscribe((data) => {
      // Apply the transformation function to the data
      const notify = filteringFunction(data);
      if (notify) {
        filteredObservable.notify(data);
      }
    });

    return filteredObservable; // Return the new Observable
  }
}

const observable1 = new Observable();
const observable2 = new Observable();

function observer(data) {
  console.log("Observer received data:", data);
}

// Map the data and subscribe the observer to the new Observable
const flatMappedObservable = observable1
  .flatMap((_data) => observable2)
  .filter((x) => x > 20);
const close = flatMappedObservable.subscribe(observer);

// // Emit some data to original observers
// observable.notify(1);
// observable.notify(2);
