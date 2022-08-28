import type { NextPage } from "next";
import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Predictions } from "aws-amplify";
import { UploadForm } from "../src/components/upload-form";

const Home: NextPage = () => {
  const [text, setText] = useState("");

 const identifyText = async (file: File) => {
   setText("...");
   console.log("start processing ...", file);
   Predictions.identify({
     text: {
       source: {
         file,
       },
       format: "PLAIN",
     },
   }).then(({ text: { fullText } }) => {
     console.log(fullText);
     setText(fullText);
   });
 };

  return (
    <Box maxW={"1000px"} margin="auto" marginTop={"100px"}>
      <UploadForm processFile={identifyText}></UploadForm>
      <Box
        backgroundColor={"gray.100"}
        marginTop="20px"
        height={"300px"}
        overflowY="auto"
        padding={"10px"}
      >
        <Text>{text}</Text>
      </Box>
    </Box>
  );
};

export default Home;
