require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const mime = require("mime-types");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

const main = async (filePath) => {
  if (!filePath || !fs.existsSync(filePath)) {
    throw new Error("File or File path is missing!");
  }

  const file = fs.readFileSync(filePath);

  const audio = {
    inlineData: {
      data: Buffer.from(file).toString("base64"),
      mimeType: mime.lookup(filePath)
    },
  };
  const prompt = "Extract text from this audio.";


  const result = await model.generateContent([audio, prompt]);
  console.info("Result:", result.response.text())
};

main(process.argv[2]);
