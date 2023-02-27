import "./styles/App.css";
import { useState, useEffect } from "react";
import PassAnalysis from "./PassAnalysis";
import CompanyBalance from "./CompanyBalance";
import Arrow from "./assets/right-arrow.png";
import ButtonAppBar from "./ButtonAppBar";

function App() {
    const [route, setRoute] = useState("Balance");
    const [company, setCompany] = useState("");
  
    return (
        <div className="appContainer">
          <ButtonAppBar setRoute={setRoute} />
              {
                route  == "Balance"
                ?
                  <CompanyBalance setRoute={setRoute} />
                :
                  <PassAnalysis />
              } 
        </div>
    );
}

export default App;
