import React from 'react'
import "./About.css"

const About = () => {
  return (
    <div className='about'>
      <div>
        <h2>What lead me to develop this application?</h2>
        <p>I found out the book about atomic habits and found it very interesting!
          I saw in it an opportunity to also develop my skills as a software engineer and learn some new technologies!
        </p>
      </div>
      <div>
          <h3>Tech Stack</h3>
          <p>I choose to go for the MERN stack so I could learn NodeJS and React! I could also get more experience working with NoSQL databases like MongoDB!</p>
          <img src="mern.jpeg" alt="MERN" className='mern'/>
      </div>
      <div className='contacts'>
        <p>If you wish to contact me, you have several links below!</p>
        <div className='socialIcons'>
          <a href="">
            <img src="facebook.png" alt="Facebook"  className='socialMedia' />
          </a>
          <a href="">
            <img src="gmail.png" alt="Gmail"  className='socialMedia'/>
          </a>
          <a href="">
            <img src="twitter.png" alt="Twitter"  className='socialMedia'/>
          </a>
          <a href="">
            <img src="linkedin.png" alt="Linkedin"  className='socialMedia'/>
          </a>
          <a href="">
            <img src="github.png" alt="Githubb" className='socialMedia' />
          </a>
          <a href="">
            <img src="instagram.png" alt="Instagram" className='socialMedia' />
          </a>
        </div>
      </div>
    </div>
  )
}

export default About