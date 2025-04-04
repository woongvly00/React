import {create} from 'zustand';

const useScheduleStore = create((set) => ({
    events: [],

    setEvents: (events) => set({ events }),

    addEvent: (event) => 
        set((state) => ({
            events:[...state.events, event]
        })),

    removeEvent: (id) => 
        set((state) => ({
            events: state.events.filter((e) => e.id !== id)
        }))
}));

export default useScheduleStore;