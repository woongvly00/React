import {create} from 'zustand';

const useScheduleStore = create((set) => ({
    events: [],
    setEvents: (NewEvent) => set({events: NewEvent}),

    addEvnet: (event) => {
        set((state) => ({
            events:[...state.events, event]
        }))
    }
}));

export default useScheduleStore;