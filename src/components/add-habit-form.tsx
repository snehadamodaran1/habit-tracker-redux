import { useState } from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material'
import { addHabit } from '../store/habit-store';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/store';

const AddHabitForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [frequncy, setFrequency] = useState<'daily' | 'weekly'>("daily")

    const dispatch = useDispatch<AppDispatch>();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (name.trim())
            dispatch(
                addHabit({
                    name,
                    frequency: frequncy
                })
            )
    }
    return (
        <form onSubmit={handleSubmit} >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
                <TextField label="Habit Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth placeholder='Enter Habit' />
                <FormControl fullWidth>
                    <InputLabel>Frequency</InputLabel>
                    <Select value={frequncy} onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit" variant="contained" color="primary">
                    Add Habit
                </Button>
            </Box>
        </form>
    )
}

export default AddHabitForm
