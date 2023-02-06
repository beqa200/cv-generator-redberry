import Home from "./pages/Home";
import { GlobalStyles } from "./styled-components";
import { createContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

export const MyContext = createContext<ContextProps | null>(null);
function App() {
  return (
    <MyContext.Provider value={{}}>
      
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
