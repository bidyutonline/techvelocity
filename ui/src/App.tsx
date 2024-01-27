import React, { useState } from 'react';
import './index.css'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import TopNav from './components/widgets/topnav';
import Topics from './components/tutorials/topics';
import Article from './components/tutorials/article';

function App() {
  const [selectedTutorial, setSelectedTutorial] = useState()
  const [selectedTopic, setSelectedTopic] = useState()

  return (
    <div className='bg-slate-200 w-screen h-screen'>
      <BrowserRouter>
        <TopNav setSelectedTutorial={setSelectedTutorial}/>
        <Routes>
          <Route path='' element= {<Home />} ></Route>
          <Route path='tutorials/:tutorialBreadcrumb' element={<Topics selectedTutorial={selectedTutorial} setSelectedTopic={setSelectedTopic}/>} ></Route>
          <Route path='tutorials/:tutorialBreadcrumb/:topicBreadcrumb' element={<Article selectedTutorial={selectedTutorial} selectedTopic={selectedTopic} />} ></Route>          
          <Route path='tutorials/:tutorialBreadcrumb/:topicBreadcrumb/:articleBreadcrumb' element={<Article selectedTutorial={selectedTutorial} selectedTopic={selectedTopic} />} ></Route>          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
