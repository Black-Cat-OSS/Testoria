import { Box } from "@chakra-ui/react/box";
import {
  Button,
  createTreeCollection,
  TreeView,
} from "@chakra-ui/react";
import { LuFile, LuFolder } from "react-icons/lu";
import { useColorMode } from "@contexts";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

export const FileTreeView = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <Box
      width={"330px"}
      height={"100svh - 192px"}
      textAlign={"start"}
      as="aside"
      pt="64px"
      pb="0"
      minH="calc(100svh - 64px)"
      flex="1"
      colorScheme={colorMode}
      bg={{
        base: "gray.100",
        _dark: "gray.800",
      }}
    >
      <Button
        margin={"20px"}
        width={"calc(100% - 40px)"}
        onClick={() => navigate(`/${id}`)}
        bg={{
          base: "gray.200",
          _dark: "gray.900",
        }}
        color={{
          base: "black",
          _dark: "white",
        }}
      >
        В лаунчер
      </Button>
      <TreeView.Root
        collection={collection}
        pl={"10px"}
      >
        <TreeView.Tree>
          <TreeView.Node
            indentGuide={
              <TreeView.BranchIndentGuide />
            }
            render={({ node, nodeState }) =>
              nodeState.isBranch ? (
                <TreeView.BranchControl>
                  <LuFolder />
                  <TreeView.BranchText>
                    {node.name}
                  </TreeView.BranchText>
                </TreeView.BranchControl>
              ) : (
                <TreeView.Item>
                  <LuFile />
                  <TreeView.ItemText>
                    {node.name}
                  </TreeView.ItemText>
                </TreeView.Item>
              )
            }
          />
        </TreeView.Tree>
      </TreeView.Root>
    </Box>
  );
};

interface Node {
  id: string;
  name: string;
  children?: Node[];
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: "ROOT",
    name: "",
    children: [
      {
        id: "node_modules",
        name: "node_modules",
        children: [
          {
            id: "node_modules/zag-js",
            name: "zag-js",
          },
          {
            id: "node_modules/pandacss",
            name: "panda",
          },
          {
            id: "node_modules/@types",
            name: "@types",
            children: [
              {
                id: "node_modules/@types/react",
                name: "react",
              },
              {
                id: "node_modules/@types/react-dom",
                name: "react-dom",
              },
            ],
          },
        ],
      },
      {
        id: "src",
        name: "src",
        children: [
          { id: "src/app.tsx", name: "app.tsx" },
          {
            id: "src/index.ts",
            name: "index.ts",
          },
        ],
      },
      {
        id: "panda.config",
        name: "panda.config.ts",
      },
      {
        id: "package.json",
        name: "package.json",
      },
      {
        id: "renovate.json",
        name: "renovate.json",
      },
      { id: "readme.md", name: "README.md" },
    ],
  },
});
