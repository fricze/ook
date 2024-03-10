import { setupCounter } from "./counter.ts";
import "./list.ts";
import "./style.css";
import typescriptLogo from "./typescript.svg";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>

    <a id="save-img" href="" download>save Image in my folder</a>

    <p id="loading">Loading...</p>
    <img id="current-image" />

    <div class="card">
      <button id="counter" type="button">Get img</button>
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
