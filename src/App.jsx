import AlarmClockCon from "./components/AlarmClockCon";
import Nav from "./components/Nav";
import StopWatchCon from "./components/StopWatchCon";
import TimerCon from "./components/TimerCon";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="w-100 h-[100vh] bg-[#F8F9FF]">
      <div className="container mx-auto ">
        <Nav />

        <Routes>
          <Route path="/" element={<AlarmClockCon />} />
          <Route path="/stopwatch" element={<StopWatchCon />} />
          <Route path="/timer" element={<TimerCon />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
