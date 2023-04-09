
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { Routes, Route , HashRouter} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
import { useState } from "react";

function App() {

const pageSize = 12;
const [progress, setProgress] = useState(0)
const [mode, setMode] = useState('light')
const toggleMode = () => {
  if(mode === 'light'){
    setMode('dark');
    document.body.style.backgroundColor = '#505050';
  }
  else{
    setMode('light');
    document.body.style.backgroundColor = 'white';
  }
}

return (
  
  <HashRouter basename="/">
       <div className="App" >
  
        {/* <Navbar mode={mode} toggle={toggleMode}/> */}
        <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <News progress = {setProgress} mode={mode} title="Daily News" country="us" category = "general" pageSize = {pageSize} />
          {/* <Routes>
            <Route path="/" element={<News progress={setProgress} mode={mode} title="Daily News" country="us" category = "general" pageSize ="10" />} ></Route>

            <Route path="/general" element={<News progress = {setProgress} mode={mode} title="Daily News" country="us" category = "general" pageSize = {pageSize} />} ></Route>
            <Route exact path="/health" element={<News progress = {setProgress} mode={mode} title="Daily News" country="us" category = "health"  pageSize = {pageSize} />} ></Route>
            <Route exact path="/science" element={<News progress = {setProgress} mode={mode} title="Daily News" country="us" category = "science"  pageSize = {pageSize} />} ></Route>
            <Route exact path="/sports" element={<News progress = {setProgress} mode={mode} title="Daily News" country="us" category = "sports" pageSize = {pageSize}/>} ></Route>
            <Route exact path="/technology" element={<News progress = {setProgress} mode={mode} title="Daily News" country="us" category = "technology" pageSize = {pageSize} />} ></Route>

          </Routes> */}

       </div>
    </HashRouter>
    
);
}

export default App;
