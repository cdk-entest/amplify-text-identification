import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Box, Text} from "@chakra-ui/react"
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {

  const [text, setText] = useState('')

  return (
    <Box maxW={'1000px'} margin='auto' marginTop={'100px'}>
      <UploadForm></UploadForm>
      <Box
        backgroundColor={'gray.100'}
        marginTop='20px'
        height={'300px'}
        overflowY='auto'
        padding={'10px'}
      >
        <Text>{text}</Text>
      </Box>

    </Box>
  );
};

const UploadForm = () => {

}

export default Home;
