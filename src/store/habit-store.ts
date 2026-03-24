import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Habit {
    id: string,
    name: string,
    frequency: 'daily' | 'weekly',
    completedDates: string[],
    createdAt: string

}

interface HabitState {
    habits: Habit[],
    isLoading: boolean,
    error: string | null
}

const initialState: HabitState = {
    habits: [],
    isLoading: false,
    error:  null
}

export const fetchHabits = createAsyncThunk('habits/fetch', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    const data = [
        {
            id: '1',
            name: 'Exercise',
            frequency: 'daily',
            completedDates: ['2024-06-01', '2024-06-02'],
            createdAt: '2024-06-01T00:00:00.000Z'
        },
        {
            id: '2',
            name: 'Read a book',
            frequency: 'weekly',
            completedDates: ['2024-05-30'],
            createdAt: '2024-05-30T00:00:00.000Z'
        }
    ]
    return data
    // const data = localStorage.getItem('habits')
    // if (data) {
    //     return JSON.parse(data) as Habit[]
    // }
    // return []
})

const habitSlice = createSlice({ //create slice
    name: 'habits',
    initialState,
    reducers: {
        addHabit: (
            state,
            action: PayloadAction<{ name: string, frequency: 'daily' | 'weekly' }>
        ) => {
            const newHabit: Habit = {
                id: Date.now().toString(),
                name: action.payload.name,
                frequency: action.payload.frequency,
                completedDates: [],
                createdAt: new Date().toISOString()
            }
            state.habits.push(newHabit)
        },
        toggleHabit: (
            state,
            action: PayloadAction<{ id: string, date: string }>
        ) => {
                const habit  = state.habits.find(hab => hab.id === action.payload.id)
                if(habit){
                    const index = habit.completedDates.indexOf(action.payload.date)
                    if(index > -1){
                        habit.completedDates.splice(index,1)
                    }else{
                        habit.completedDates.push(action.payload.date)
                    }
                }
        },
        removeHabit: (
            state, 
            action: PayloadAction<{ id: string }>
        ) => {
            const index = state.habits.findIndex(hab => hab.id === action.payload.id)
            if(index > -1){
                state.habits.splice(index,1)
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHabits.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(fetchHabits.fulfilled, (state, action) => {
            state.isLoading = false;
            state.habits = action.payload;
        })
        builder.addCase(fetchHabits.rejected, (state, action)=>{
            state.isLoading = false;
            state.error = action.error.message || 'Failed to fetch habits';
        })
    }
})

export const { addHabit, toggleHabit, removeHabit } = habitSlice.actions
export default habitSlice.reducer // while importing in App.tsx we will import this reducer as habitReducer and then add it to the store.ts file in the reducer object.