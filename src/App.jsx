import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MostRecent from './components/MostRecent';
import Showcase from './components/Showcase';
import Photography from './components/Photography';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <MostRecent />
        <Showcase
          id="sports-media"
          title="Sports Media"
          numeral="101"
          image="/sports-media.jpg"
          align="left"
        />
        <Showcase
          id="videography"
          title="Videography"
          numeral="202"
          image="/videography.jpg"
          align="right"
        />
        <Photography />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
