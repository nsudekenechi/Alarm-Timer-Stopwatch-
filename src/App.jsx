import AlarmClockCon from "./components/AlarmClockCon";
import Nav from "./components/Nav";
import StopWatchCon from "./components/StopWatchCon";

function App() {
  return (
    <div className="w-100 h-[100vh] bg-[#F8F9FF]">
      <div className="container mx-auto ">
        <Nav />
        {/* <StopWatchCon /> */}
        <AlarmClockCon />
      </div>
    </div>
  );
}

export default App;
