import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { fetchHabits, type Habit } from "../store/habit-store";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { LinearProgress } from "@mui/material";

const HabitStats: React.FC = () => {
    const { habits, isLoading, error } = useSelector((state: RootState) => state.habits)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchHabits())
    }, [])

    if (isLoading) {
        return <LinearProgress />
    }
    if (error) {
        return <Typography variant="h6" color="error">Error: {error}</Typography>
    }

    const getStreak = (habit: Habit) => {
        let streak = 0;
        const currentDate = new Date();
        while (true) {
            const dateString = currentDate.toISOString().split('T')[0];
            if (habit.completedDates.includes(dateString)) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }
        return streak;
    }

    const getLongestStreak = () => {
        let longestStreak = 0;
        habits.forEach(habit => {
            const streak = getStreak(habit);
            if (streak > longestStreak) {
                longestStreak = streak;
            }
        })
        return longestStreak;   
    }


    return (
        <Paper elevation={2} sx={{ p: 2, marginTop: 4 }}>
            <Typography variant="h6">Total habits :{habits.length} </Typography>
            <Typography variant="body1">Habits completed today : {habits.filter(habit => habit.completedDates.includes(new Date().toISOString().split('T')[0])).length}</Typography>
            <Typography variant="body1">Longest streak : {getLongestStreak()} </Typography>
        </Paper>
    )
}

export default HabitStats