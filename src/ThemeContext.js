import { createContext } from "react";

// we put a hook into the context, the function is actually a placeholder
// notes for the future self
// state and an updater
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
