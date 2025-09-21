import {
  Breadcrumb as BreascrumbChakraUI,
  For,
  Show,
} from "@chakra-ui/react";
import { CurrentFileContext } from "@contexts";
import { useContext } from "react";

export const Breadcrumb = () => {
  const { file } = useContext(CurrentFileContext);

  const items = file?.path.split("/") as [];

  return (
    file && (
      <BreascrumbChakraUI.Root padding={"5px"}>
        <BreascrumbChakraUI.List>
          <For each={items}>
            {(item, index) => {
              const isNotLast =
                index < items.length - 1;

              return (
                <>
                  <BreascrumbChakraUI.Item>
                    <BreascrumbChakraUI.Link href="#">
                      {item}
                    </BreascrumbChakraUI.Link>
                  </BreascrumbChakraUI.Item>
                  <Show when={isNotLast}>
                    <BreascrumbChakraUI.Separator />
                  </Show>
                </>
              );
            }}
          </For>
        </BreascrumbChakraUI.List>
      </BreascrumbChakraUI.Root>
    )
  );
};
