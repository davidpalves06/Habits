import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useAuthValue} from "../../context/AuthContext"
import { useHabits } from '../../hooks/useHabits';
import "./Dashboard.css"


const Dashboard = () => {
  const {user} = useAuthValue();
  const [habits,setHabits] = useState([])
  const [habitName,setHabitName] = useState("")
  const {error,getHabits,addHabit,deleteHabit,updateHabit} = useHabits()

  useEffect(() => {
    async function loadHabits () {
      const fetchedHabits = await getHabits(user)
      setHabits(fetchedHabits)
    }

    loadHabits()
  },[user])

  const handleAddHabit = async (e) => {
    e.preventDefault()

    const habit = {
      habit: habitName,
    }

    const newHabits = await addHabit(user,habit)
    if (newHabits) {
      setHabits(newHabits);
    }
    setHabitName("")
  }

  async function handleDeletion(position) {
      const newHabits = await deleteHabit(user,position);
      if (newHabits) {
        setHabits(newHabits);
      }
  }

  async function handleDone(done,position) {
      const changes = {
        done: !done,
        position
      }
      const newHabit = await updateHabit(user,changes)
      if (newHabit) {
        setHabits((atual) => {
          atual[newHabit.position] = newHabit
          return atual
        })
      }
  }

  async function handleScore(score,position) {
    const changes = {
      score,
      position
    }

    const newHabit = await updateHabit(user,changes)
    if (newHabit) {
      setHabits((atual) => {
        atual[newHabit.position] = newHabit
        return atual
      })
    }
  }

  return (
    <div className='dashboardPage'>
      <div className='profileContainer'>
        <h2>Welcome {user.name}!</h2>
        <div>
          <img src="profile.png" alt={user.name} />
          <Link to={"/password"}>Change Password</Link>
        </div>
      </div>
      <div className='habitsContainer'>
        <h1>Hábits</h1>
        {error && <span>{error}</span>}
        <form onSubmit={handleAddHabit} className="addHabitForm">
          <input type="text" name="habit" value={habitName}
          onChange={(e) => setHabitName(e.target.value)} required
          placeholder='Add a habit...'/>
          <button>Add habit</button>
        </form>
        {habits.length === 0 && <p>You got no habits!</p>}
        <div className='habitGrid'>
        {habits.length > 0 && habits.map((habit) => (
          <div className='habitBox' key={habit.position}>
            <h3>{habit.habitName}</h3>
            <label className='doneCheck'>
              <input type="checkbox" name="something" value="Done" checked={habit.done} onChange={() => handleDone(habit.done,habit.position)}/>
              Done
            </label>
            <span className='habitStreak'><img src="fire.png" alt="Streak" /> : {habit.habitStreak}</span>
            {habit.score === '=' && (
            <div className='habitScoreContainer'>
              <button className='downButton' onClick={(e) => handleScore("-",habit.position)}>-</button>
              <span className='habitScore'>Neutral Habit!</span>
              <button className='upButton' onClick={(e) => handleScore("+",habit.position)}>+</button>
            </div>
            )}
            {habit.score === '+' && (
            <div className='habitScoreContainer'>
              <button className='downButton' onClick={(e) => handleScore("=",habit.position)}>-</button>
              <span className='habitScore'>Positive Habit!</span>
            </div>
            )}
            {habit.score === '-' && (
            <div className='habitScoreContainer'>
              <span className='habitScore'>Negative Habit</span>
              <button className='upButton' onClick={(e) => handleScore("=",habit.position)}>+</button>
            </div>
            )}
            <div className='habitButtonsContainer'>
              <button className='deleteButton' onClick={() => handleDeletion(habit.position)}>X</button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard