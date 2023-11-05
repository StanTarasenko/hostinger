// Modules
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Admin from './pages/AdminPage/Admin';
import Contacts from './pages/Contacts';
import Details from './pages/Details';
import FoundationDev from './pages/FoundationDev';
import Home from './pages/HomePage/Home';
import Layout from './pages/LayoutPage/Layout';
import Login from './pages/LoginPage/Login';
import NoPage from './pages/NoPage';
import InfoBox from './pages/FoundationDev/components/InfoBox';

// Styles
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="details" element={<Details />} />
          <Route path="foundation" element={<FoundationDev />} />
          <Route path="foundation/:id" element={<InfoBox />} />
          <Route path="front" element={<FoundationDev />} />
          <Route path="front/:id" element={<InfoBox />} />
          <Route path="back" element={<FoundationDev />} />
          <Route path="back/:id" element={<InfoBox />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="login" element={<Login />} />
          <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

