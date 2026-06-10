import Hero from '../components/Hero';
import MostRecent from '../components/MostRecent';
import Showcase from '../components/Showcase';
import Photography from '../components/Photography';
import About from '../components/About';
import Contact from '../components/Contact';

function Home() {
  return (
    <>
      <Hero />
      <MostRecent />
      <Showcase
        id="sports-media"
        title="Sports Media"
        numeral="101"
        image="/sports-media.jpg"
        to="/sports-media"
        align="left"
      />
      <Showcase
        id="videography"
        title="Videography"
        numeral="202"
        image="/videography.jpg"
        to="/videography"
        align="right"
      />
      <Photography />
      <About />
      <Contact />
    </>
  );
}

export default Home;
