

export function INITIAL_EVENTS(date) {


    return new Date(date).toLocaleDateString();
  }
  
  export function createEventId() {

    
    return Math.random().toString(36).substr(2, 9);
  }