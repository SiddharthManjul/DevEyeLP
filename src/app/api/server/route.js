// pages/api/generate-answer.js

import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { createRetrievalChain } from "langchain/chains/retrieval";
import dotenv from "dotenv";
dotenv.config();

const generateCode = async(req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  try {
    // Model Initialization
    const model = new ChatGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY,
      model: "gemini-pro",
      temperature: 0,
    });

    // Prompt Template
    const prompt = ChatPromptTemplate.fromMessages([
      `
        Answer the User Question.
        Context: {context}
        Question: ${req.body.input}
      `,
    ]);

    // Document Loader
    const loader = new CheerioWebBaseLoader("https://www.rust-lang.org/");
    const docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    // Embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      apiKey: process.env.GEMINI_API_KEY,
      model: "embedding-001",
      taskType: TaskType.RETRIEVEL_DOCUMENT,
    });

    const vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );

    // Retriever
    const retriever = vectorStore.asRetriever({ k: 0 });

    // Create chain
    const chain = await createStuffDocumentsChain({
      llm: model,
      prompt: prompt,
    });

    const parsedChain = chain.pipe(new StringOutputParser());

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: parsedChain,
      retriever: retriever,
    });

    // Invoke chain with input
    const response = await retrievalChain.invoke({ input: req.body.input });

    console.log(response);

    // Send response
    res.status(200).json({ answer: response.answer });
  } catch (error) {
    console.error("Error generating answer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export default generateCode;