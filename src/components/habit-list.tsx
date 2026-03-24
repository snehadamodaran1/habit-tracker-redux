import React from "react";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {Box,Paper,Grid,Typography, Button,LinearProgress} from "@mui/material";
import { CheckCircle , Delete} from "@mui/icons-material";
import { toggleHabit, removeHabit, type Habit } from "../store/habit-store";


const HabitList: React.FC = () => {
    const  habits  = useSelector((state: RootState) => state.habits.habits)
    const today = new Date().toISOString().split('T')[0]
    const dispatch = useDispatch();

    const getStreak = (habit: Habit) => {
        let streak = 0;
        const currentDate = new Date();
        while(true){
            const dateString = currentDate.toISOString().split('T')[0];
            if(habit.completedDates.includes(dateString)){
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            }else{
                break;
            }
        }
        return streak;
    }

    return (
        <Box>
            {habits.map((habit) =>{
                return <Paper key={habit.id} elevation={2} sx={{ p: 2}}>
                    <Grid container alignItems='center' justifyContent='space-between'>
                        <Grid xs={12} sm={6}>
                           <Typography variant="h6">{habit.name}</Typography>
                           <Typography variant="body2" color="text.secondary" sx={{textTransform: 'capitalize'}} >{habit.frequency}</Typography>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                <Button onClick={() => dispatch(toggleHabit({ id: habit.id, date: today }))} variant="outlined" color={ habit.completedDates.includes(today) ? 'success' : 'primary' } startIcon={<CheckCircle />}>
                                   {habit.completedDates.includes(today) ? 'Completed' : 'Mark Completed'}
                                </Button>
                                 <Button onClick={() => dispatch(removeHabit({ id: habit.id }))} variant="outlined" color='error' startIcon={<Delete />}>
                                   Remove
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ marginTop: 2 }}>
                        <Typography variant="body2" color="text.secondary">Current Streak: {getStreak(habit)} days</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={getStreak(habit)/30 * 100} sx={{ marginTop: 2 }} />
                </Paper>
            })}
        </Box>  
    )
}

export default HabitList
