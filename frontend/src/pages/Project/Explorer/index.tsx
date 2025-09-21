/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDocumentTitle } from "@uidotdev/usehooks";
import { Stack } from "@chakra-ui/react";
import {
  CurrentFileContext,
  File,
} from "@contexts";
import { useEffect, useState } from "react";
import { Breadcrumb, CodeView } from "./ui";

export const Explorer = () => {
  useDocumentTitle(
    "RepoDock - обозреватель исходного кода"
  );

  const [file, setFile] = useState<File>();

  useEffect(() => {
    setFile({
      content: `
export const Home: FC = () => {
  return (
    <div class="container">
      <h1>Hello, world!</h1>
    </div>
  )
}
`,
      name: "index.tsx",
      type: "tsx",
      path: "src/pages/index.tsx",
    });
  }, []);

  return (
    file && (
      <Stack>
        <CurrentFileContext.Provider
          value={{ file, setFile }}
        >
          <Breadcrumb />
          <CodeView />
        </CurrentFileContext.Provider>
      </Stack>
    )
  );
};
