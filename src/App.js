import "./App.css";
import { useState } from "react";
import { fetchHtmlNodes } from "./utils";

const dummyText = `

<html>
<body>
<button value="Foo" class="aa">Foo</button>
<button value="Foo" class="aa">Foo</button>
<button value="Boo" class="bb">Boo</button>

<div>
  <h1 class="red-text"> My Text </h1>
</div>

<div>
  <h1 class="red-text"> My Text </h1>
</div>

<div>
  <h1 class="red-text"> My Text </h1>
</div>

<div>
  <div class="text">
    <h1 class="text"> My NExt Text </h1>
  </div>
  <div class="text">
    <h1 class="text"> My NExt Text </h1>
  </div>
  <div class="text"> 
    <h1 class="text"> My NExt Text </h1>
  </div>
</div>

</body>
</html>
`;

function App() {
  const [html, setHtml] = useState(dummyText);
  const [nodes, setNodes] = useState([]);

  return (
    <div className='app'>
      <h1 className='heading'>Find Simlar Nodes</h1>
      <textarea className='input' value={html} onChange={(event) => setHtml(event.target.value)} />
      <div style={{ width: "100%", textAlign: "center" }}>
        <button
          className='button'
          onClick={() => {
            fetchHtmlNodes(html).then((result) => {
              setNodes(result);
            });
          }}>
          Submit
        </button>
      </div>
      <h1 className='heading'>Results</h1>
      <div className='grid'>
        {nodes.map((node) => (
          <div className='node'>
            <div class='renderNode'>
              <div dangerouslySetInnerHTML={{ __html: node.content }} />
              {node.content}
            </div>
            <div className='details'>
              <h3>Name</h3>
              {node.name}
              <h3>Occurences</h3>
              {node.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
