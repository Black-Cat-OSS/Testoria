/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CodeBlock,
  createShikiAdapter,
  Icon,
} from "@chakra-ui/react";
import {
  CurrentFileContext,
  useColorMode,
} from "@contexts";
import { useContext } from "react";
import { FaReact } from "react-icons/fa";
import { HighlighterGeneric } from "shiki";

const shikiAdapter = createShikiAdapter<
  HighlighterGeneric<any, any>
>({
  async load() {
    const { createHighlighter } = await import(
      "shiki"
    );
    return createHighlighter({
      langs: [
        "tsx",
        "scss",
        "html",
        "bash",
        "json",
      ],
      themes: ["github-dark", "github-light"],
    });
  },
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
});

export const CodeView = () => {
  const { colorMode } = useColorMode();
  const { file } = useContext(CurrentFileContext);

  return (
    file && (
      <CodeBlock.AdapterProvider
        value={shikiAdapter}
      >
        <CodeBlock.Root
          code={file.content}
          language={file.type}
          textAlign={"start"}
          bg={{
            base: "bg",
            _dark: "gray.800",
          }}
          meta={{
            colorScheme: colorMode,
            showLineNumbers: true,
          }}
        >
          <CodeBlock.Header>
            <CodeBlock.Title>
              <Icon
                size={"sm"}
                as={FaReact}
                color="blue.500"
              />
              {file.name}
            </CodeBlock.Title>
          </CodeBlock.Header>
          <CodeBlock.Content>
            <CodeBlock.Code>
              <CodeBlock.CodeText />
            </CodeBlock.Code>
          </CodeBlock.Content>
        </CodeBlock.Root>
      </CodeBlock.AdapterProvider>
    )
  );
};
