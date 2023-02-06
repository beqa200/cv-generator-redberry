import Home from "./pages/Home";
import { GlobalStyles } from "./styled-components";
import { createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";
import Personal from "./pages/Personal";

export const MyContext = createContext<ContextProps | null>(null);
function App() {
  const [pageCount, setPageCount] = useState<number>(1);
  return (
    <MyContext.Provider value={{ pageCount, setPageCount }}>
      <GlobalStyles />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
