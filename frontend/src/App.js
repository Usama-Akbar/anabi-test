import "./App.css";
import HomePage from "./Components/HomePage";
import FormPage from "./Components/FormPage";
import ResultPage from "./Components/ResultPage";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" exact element={<FormPage />} />
          <Route path="/form/:id" exact element={<FormPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </div>
    </ChakraProvider>
  );
}

export default App;
