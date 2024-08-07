import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="app bg-veryLightGrayBlue dark:bg-dDarkBlue min-h-screen lg:text-lg">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
