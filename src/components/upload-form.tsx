// haimtran 10 AUG 2022
// 1. amplify storage upload s3 and progress
// 2. create a custom upload form using react-hook-form

import {
  Button,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Progress,
} from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useRef, useState } from "react";

type UploadFormProps = {
  processFile: (file: File) => Promise<void>;
};

export const UploadForm = ({ processFile }: UploadFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("Your File ...");
  const [progress, setProgress] = useState(1);

  const uploadButton = (
    <Button
      colorScheme="green"
      minW={"150px"}
      onClick={async () => {
        processFile(selectedFile as File);
        setSelectedFile(null);
      }}
    >
      Upload
    </Button>
  );

  const chooseFileButton = (inputRef: any) => (
    <Button
      colorScheme="green"
      minW={"150px"}
      onClick={() => inputRef.current?.click()}
    >
      Choose File
    </Button>
  );

  const HiddenInput = () => {
    return (
      <input
        type={"file"}
        name={"FirstName"}
        ref={inputRef}
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            setFileName(event.target.files[0].name);
            setSelectedFile(event.target.files[0]);
          }
        }}
        style={{ display: "none" }}
      ></input>
    );
  };

  return (
    <div>
      <FormControl>
        <InputGroup>
          <InputLeftElement>
            <Icon as={FiFile}></Icon>
          </InputLeftElement>
          <HiddenInput></HiddenInput>
          <Input
            placeholder="Your file ..."
            value={fileName}
            onChange={(e) => console.log(e)}
          ></Input>
          <InputRightElement width={"auto"}>
            {selectedFile ? uploadButton : chooseFileButton(inputRef)}
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </div>
  );
};
