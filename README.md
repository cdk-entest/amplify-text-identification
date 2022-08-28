---
title: Amplify Text Identification
description: Amplify Text Identification
author: haimtran
publishedDate: 08/10/2022
date: 2022-08-10
---

## Introduction

[GitHub](https://github.com/entest-hai/amplify-text-identification) shows how to setup and use amplify text to speech api. Amplify provides many AI/ML services such as text to speed, translation, text identification, etc [predictions](https://docs.amplify.aws/lib/predictions/intro/q/platform/js/)

<LinkedImage
  href="https://youtu.be/0z_hqB4wh_Y"
  height={400}
  alt="Amplify Text Indentification"
  src="/thumbnail/amplify-text-identification.png"
/>

## Init nextjs project

```bash
npx create-next-app@latest --typescript
```

add chakra-ui

```bash
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion aws-amplify react-icons
```

add amplify

```bash
npm i aws-amplify
```

## Amplify init

```bash
amplify init
```

add auth and choose default with useremail login

```bash
amplfy add auth
```

add predictions and select text to speech for this example

```bash
amplify add predictions
```

## Amplify configure in react

in \_app.ts configure amplify

```tsx
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Amplify, Auth, Predictions } from 'aws-amplify'
import { AmazonAIPredictionsProvider } from '@aws-amplify/predictions'
import awsconfig from './../src/aws-exports'
try {
  Amplify.configure(awsconfig)
  Amplify.register(Predictions)
  Amplify.register(Auth)
  Predictions.addPluggable(new AmazonAIPredictionsProvider())
} catch (error) {
  console.log(error)
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
```

## Text Identification

You can choose images from local or S3. I re-use the upload button to choose an image and then call the Amplify API to identify plain text from an image.

```tsx
import { Text, Box } from '@chakra-ui/react'
import { Predictions } from 'aws-amplify'
import { useState } from 'react'
import { UploadForm } from '@components/upload-form'

const TextIdentification = () => {
  const [text, setText] = useState('...')

  // identify text - call amplify api

  // ui component
}
```

```tsx
const identifyText = async (file: File) => {
  setText('...')
  console.log('start processing ...', file)
  Predictions.identify({
    text: {
      source: {
        file
      },
      format: 'PLAIN'
    }
  }).then(({ text: { fullText } }) => {
    console.log(fullText)
    setText(fullText)
  })
}
```

UI

```tsx
return (
  <Box maxWidth={'1000px'} margin="auto" marginTop={'100px'}>
    <UploadForm processFile={identifyText}></UploadForm>
    <Box
      backgroundColor={'gray.100'}
      marginTop={'20px'}
      height={'300px'}
      overflowY="auto"
      padding={'10px'}
    >
      <Text>{text}</Text>
    </Box>
  </Box>
)
```

## Troubleshooting

if received not authorized to call textract api, goto iam in aws console to check permission for both auth and unauth id created by cognito id pools.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "rekognition:DetectText",
        "rekognition:DetectLabel",
        "textract:AnalyzeDocument",
        "textract:DetectDocumentText",
        "textract:GetDocumentAnalysis",
        "textract:StartDocumentAnalysis",
        "textract:StartDocumentTextDetection"
      ],
      "Resource": "*",
      "Effect": "Allow"
    }
  ]
}
```
