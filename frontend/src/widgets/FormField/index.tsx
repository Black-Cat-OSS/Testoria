import {
  Heading,
  HeadingProps,
  Input,
  InputProps,
  StackProps,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

interface FormFieldProps {
  title: string;
  headingProps?: HeadingProps;
  inputProps?: InputProps;
  vStackProps?: StackProps;
  error?: string;
}

export const FormField: FC<FormFieldProps> = (
  props
) => {
  return (
    <VStack
      {...props.vStackProps}
      align="start"
      gap={2}
    >
      <Heading
        size="md"
        color={{
          base: "gray.600",
          _dark: "gray.300",
        }}
        fontWeight="normal"
      >
        {props.title}
      </Heading>
      <Input 
        {...props.inputProps} 
        _invalid={{
          borderColor: "red.500",
          boxShadow: "0 0 0 1px red.500",
        }}
        borderColor={props.error ? "red.300" : undefined}
        _focus={{
          borderColor: props.error ? "red.500" : undefined,
          boxShadow: props.error ? "0 0 0 1px red.500" : undefined,
        }}
      />
      {props.error && (
        <Text color="red.500" fontSize="sm">
          {props.error}
        </Text>
      )}
    </VStack>
  );
};
