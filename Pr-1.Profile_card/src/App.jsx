import React from 'react';
import UserProfileCard from './components/UserProfileCard';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='card-row'>
        <UserProfileCard 
          name="John Smith" 
          email="john.smith@gmail.com" 
          profilePicture="https://a.storyblok.com/f/191576/1200x800/a3640fdc4c/profile_picture_maker_before.webp"
          bio= "Passionate about creating intuitive and beautiful digital experiences." 
          phone="123-456-7890"
          address="123 Main St, Anytown, USA"
        />
        <UserProfileCard 
          name="Jane Doe" 
          email="jane.doe@gmail.com" 
          profilePicture="https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
          bio="I'm a UI/UX Designer with a passion for creating intuitive and visually."
          phone="987-654-3210"
          address="456 Elm St, Anytown, USA" 
        />
      </div>
      <div className='card-row'>
        <UserProfileCard 
          name="Bob Johnson" 
          email="bob.johnson@gmail.com" 
          profilePicture="https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=612x612&w=0&k=20&c=kPvoBm6qCYzQXMAn9JUtqLREXe9-PlZyMl9i-ibaVuY="
          bio="Passionate about creating intuitive and beautiful digital experiences."
          phone="432-654-7865"
          address="789 Oak St, Anytown, USA"
        />
        <UserProfileCard 
          name="Alice Williams" 
          email="alice.williams@gmail.com" 
          profilePicture="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
          bio="I'm a UI/UX Designer with a passion for creating intuitive and visually."
          phone="432-765-4567"
          address="532 Oak St, Anytown, USA"

        />  
      </div>
      <div className='card-row'>
        <UserProfileCard 
          name="Charlie Brown" 
          email="charlie.brown@gmail.com" 
          profilePicture="https://media.istockphoto.com/id/1311634222/photo/portrait-of-successful-black-male-modern-day-student-holding-smartphone.jpg?s=612x612&w=0&k=20&c=vl2FeMtO91rpRUcq0reIfqAQPrQsf30JF-JAxU5baro="
          bio="Passionate about creating intuitive and beautiful digital experiences."
          phone="786-213-3432"
          address="654 LA, california, USA"

        />
        <UserProfileCard 
          name="Diana Green" 
          email="diana.green@gmail.com" 
          profilePicture="https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=" 
          bio="I'm a UI/UX Designer with a passion for creating intuitive and visually."
          phone="675-473-7484"
          address="654 Equador, downtown, USA"
        />
      </div>
    </div>
  );
}

export default App;