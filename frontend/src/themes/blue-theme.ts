import { createSystem, defaultConfig } from "@chakra-ui/react";

const blueTheme = createSystem({
  ...defaultConfig,
  theme: {
    ...defaultConfig.theme,
    tokens: {
      ...(defaultConfig.theme?.tokens ?? {}),
      colors: {
        ...(defaultConfig.theme?.tokens?.colors ?? {}),
        blue: {
          50: { value: "#eff6ff" },
          100: { value: "#dbeafe" },
          200: { value: "#bfdbfe" },
          300: { value: "#93c5fd" },
          400: { value: "#60a5fa" },
          500: { value: "#3b82f6" },
          600: { value: "#2563eb" },
          700: { value: "#1d4ed8" },
          800: { value: "#1e40af" },
          900: { value: "#1e3a8a" },
          950: { value: "#172554" },
        },
      },
    },
  },
});

export default blueTheme;
