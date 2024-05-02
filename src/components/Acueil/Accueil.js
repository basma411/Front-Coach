import Footer from "../coach/Footer";
import Newsletter from "../coach/Newsletter";
import Atelier from "./Atelier";
import BiblioCoaching from "./BiblioCoaching";
import ChercheCoach from "./ChercheCoach";
import Icon from "./Icon";
import Partenaire from "./Partenaire";
import Slide from "./Slide";


function Acueil() {

  return (
    <>
     <Slide/>
      
<ChercheCoach/>
<Partenaire/>
<Atelier/>
<Icon/>
<BiblioCoaching/>
<Newsletter/>
<Footer/>
    </>
  );
}

export default Acueil;
