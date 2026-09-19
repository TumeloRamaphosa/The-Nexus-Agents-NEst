import "./styles.css";
import { renderCommandDeck } from "./render";

const root = document.querySelector<HTMLElement>("#app");
if (!root) {
  throw new Error("Command Deck mount point #app missing");
}

renderCommandDeck(root);
