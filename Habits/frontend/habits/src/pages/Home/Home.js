import React from 'react'
import "./Home.css"

const Home = () => {
  return (
    <div className='homeContainer'>
        <h2>Keep your <span className='atomicHabits'>Atomic Habits</span> up to date.</h2>
        <p>With this application, you can track your daily habits and check your progress.</p>
        <p>In the image below, you can see the 4 rules for creating good habits!</p>
        <img src="Four-Laws.webp" alt="Hábitos" className='habitRules'/>
        <div>
            <span className='bookRef'>Learn more on habits with <a href='https://jamesclear.com/atomic-habits' target="_blank" rel="noopener noreferrer">this book</a></span>
        </div>
    </div>
  )
}

export default Home