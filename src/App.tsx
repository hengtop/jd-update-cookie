import { useState } from "react";
import Form from "./components/form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h3 className="title">JD-自助更新cookie</h3>
      <Form />
    </div>
  );
}

export default App;
