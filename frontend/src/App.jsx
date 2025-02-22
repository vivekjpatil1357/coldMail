import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
import Progress from "./components/Progress";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
            <Toaster position="bottom-right" richColors expand={true} />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/settings" element={<Settings  />}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
