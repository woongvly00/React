import {create} from 'zustand';

const useScheduleStore = create((set) => ({
    events: [],

    setEvents: (newEvents) =>
        set((prev) => ({
            events: Array.isArray(newEvents) ? newEvents : []
        })),

    addEvent: (event) => 
        set((state) => ({
            events:[...state.events, event]
        })),
    
    addEvents: (newEvents) =>
        set((state) => ({
            events: [...state.events, ...(Array.isArray(newEvents) ? newEvents : [])]
        })),

    removeEvent: (id) => 
        set((state) => ({
            events: state.events.filter((e) => e.id !== id)
        }))
}));

export default useScheduleStore;