import axios from "axios";
import { NextResponse } from "next/server";

function extractText(data) {
  return (
    data?.aiResponse ||
    data?.response ||
    data?.message ||
    data?.text ||
    data?.output ||
    data?.choices?.[0]?.message?.content ||
    data?.choices?.[0]?.text ||
    ""
  );
}

export async function POST(req) {
  try {
    const { model, msg, parentModel } = await req.json();

    const response = await axios.post(
      "https://kravixstudio.com/api/v1/chat",
      {
        message: msg,
        aiModel: model,
        outputType: "text",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.KRAVIXSTUDIO_API_KEY,
        },
      },
    );

    const aiResponse = extractText(response.data);

    console.log("RAW:", response.data);
    console.log("EXTRACTED:", aiResponse);

    return NextResponse.json({
      aiResponse,
      model: parentModel,
    });
  } catch (error) {
    console.error(error?.response?.data || error.message);

    return NextResponse.json(
      {
        aiResponse: "⚠️ Error fetching response.",
        model: "unknown",
      },
      { status: 500 },
    );
  }
}

// import axios from "axios";
// import { NextResponse } from "next/server";

// export async function POST(req) {

//     const {model,msg,parentModel} = await req.json();
//   /* Send POST request using Axios */
//   const response = await axios.post(
//     "https://kravixstudio.com/api/v1/chat",
//     {
//       message: msg, // Messages to AI
//       aiModel: model, // Selected AI model
//       outputType: "text", // 'text' or 'json'
//     },
//     {
//       headers: {
//         "Content-Type": "application/json", // Tell server we're sending JSON
//         Authorization: "Bearer " + process.env.KRAVIXSTUDIO_API_KEY, // Replace with your API key
//       },
//     },
//   );

//   console.log(response.data); // Log API response

//   return NextResponse.json({
//     ...response.data ,
//     model:parentModel
//   });
// }
