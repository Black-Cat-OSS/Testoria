import RouterApp from "@routes";
import { createRoot } from "react-dom/client";
import { ChakraProvider, UserProvider } from "@contexts";
import "./index.css";

createRoot(
  document.getElementById("root")!
).render(
  <ChakraProvider>
    <UserProvider>
      <RouterApp />
    </UserProvider>
  </ChakraProvider>
);
