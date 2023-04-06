import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div>
      <Sidebar></Sidebar>
      <div>
        <div class="sm:ml-64 px-5">
          <Navbar></Navbar>
        </div>
      </div>
    </div>
  );
}

export default App;
