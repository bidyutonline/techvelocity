import React, { Fragment, useEffect, useState } from 'react';
import './index.css'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import TopNav from './components/widgets/topnav';
import Topics from './components/tutorials/topics';
import Article from './components/tutorials/article';
import AdminDashboard from './components/admin/admindashboard';
import AddTutorial from './components/admin/addtutorial';
import AddTopic from './components/admin/addtopic';
import AddArticle from './components/admin/addarticle';

function App() {
  const [selectedTutorial, setSelectedTutorial] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const url = window.location.href;
    if (url.search("/cpanel") > 0) {
      setIsAdmin(true)
    }
  })

  return (
    <div className='bg-slate-200 w-screen h-screen'>
      <BrowserRouter>
        
        {!isAdmin && <TopNav setSelectedTutorial={setSelectedTutorial}></TopNav>}

        <Routes>
          {/* Public Section */}
          <Route path='' element={<Home />} ></Route>
          <Route path='tutorials/:tutorialBreadcrumb' element={<Topics selectedTutorial={selectedTutorial} setSelectedTopic={setSelectedTopic} />} ></Route>
          <Route path='tutorials/:tutorialBreadcrumb/:topicBreadcrumb' element={<Article selectedTutorial={selectedTutorial} selectedTopic={selectedTopic} />}></Route>
          <Route path='tutorials/:tutorialBreadcrumb/:topicBreadcrumb/:articleBreadcrumb' element={<Article selectedTutorial={selectedTutorial} selectedTopic={selectedTopic} />} ></Route>

          {/* Admin Section */}
          <Route path='cpanel/' element={<AdminDashboard />} >
            <Route path='add-tutorial' element={<AddTutorial />}></Route>
            <Route path='add-topic' element={<AddTopic />}></Route>
            <Route path='add-article' element={<AddArticle />}></Route>
          </Route>
        </Routes>

      </BrowserRouter>

    </div >
  );
}

export default App;
