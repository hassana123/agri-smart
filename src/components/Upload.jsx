// import React from "react";
// import frame from "../assets/Frame2.png";
// const Upload = () => {
//   return (
//     <section className="md:w-[80%] w-[90%] mx-auto  my-20 rounded-sm shadow-lg bg-white ">
//       <div className="relative ">
//         <span className="mx-auto z-[0] bg-[#F7FAFE] block rounded-md h-[67px] w-[259px]"></span>
//         <h1 className="text-center absolute  top-0  left-1/2 transform -translate-x-1/2 md:text-[40px] z-60  mx-auto  text-[18px] font-[700] ">
//           Upload a Picture
//         </h1>
//       </div>

//       <div className="text-[#111111]  font-[500] space-y-5  py-10  px-5">
//         <h3 className="text-[27px] ">Your Crop / Plant Health Report</h3>
//         <p className="text-[20px]">
//           Based on the image you provided, here are the details of your crop's
//           health status.
//         </p>
//         <div className=' bg-[url("/src/assets/p4.webp")] bg-cover md:w-[483px] h-[205px] flex items-center'>
//           <div className="border cursor-pointer w-[40%]  mx-auto text-center ">
//             <span className="mx-auto block border border-[#90BFA8] rounded-[6px] text-[#90BFA8] shadow-lg py-4 px6">
//               Upload an Image
//             </span>
//           </div>
//         </div>
//         <button className="rounded-lg text-white px-5 py-3  bg-primary ">
//           Upload and diagnose
//         </button>
//       </div>
//       <div className=" space-y-5">
//         <ol>
//           <li>
//             Infection/disease identified :<br />
//             <small>disaeae NAme</small>
//           </li>

//           <li>
//             Health Status :<br />
//             <small>At risk/healthy/ infected</small>
//           </li>
//           <li>
//             Recommendation :<br />
//             <small>
//               To adrresss thiss issue we recommend the following Acction{" "}
//               <ol>
//                 <li>Spray with [specific pesticide or treatment]</li>
//                 <li>Implement preventive measures such as [details].</li>
//                 <li>Monitor the crop closely for [specific period]</li>
//               </ol>{" "}
//             </small>
//           </li>
//         </ol>
//       </div>
//     </section>
//   );
// };

// export default Upload;

import React, { useState } from "react";
import Clarifai from "clarifai";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Initialize Clarifai app with your API key
const app = new Clarifai.App({
  apiKey: "63098a5b07bf42fd9c19b5d03a5e7429",
});
const conceptMapping = {
  insect: {
    condition: "Pest Infestation",
    recommendations: [
      "Use insecticidal soap or other pesticides.",
      "Inspect and remove infected leaves.",
    ],
  },
  disease: {
    condition: "Crop Disease",
    recommendations: [
      "Apply appropriate fungicide.",
      "Ensure proper watering and drainage.",
    ],
  },
};

const Upload = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [result, setResult] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [diagnosing, setDiagnosing] = useState(false);

  const handleFileChange = async (e) => {
    setUploading(true);
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      try {
        const storageRef = ref(storage, `photos/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        console.log("done", imageUrl);
        setImageURL(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    }
  };
  
  console.log(imageURL);
  console.log(image)
  const handleImageDiagnose = async (e) => {
    e.preventDefault()
    setDiagnosing(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target.result.split(",")[1];
      try {
        const response = await app.models.predict(Clarifai.GENERAL_MODEL, {
          base64: base64Image,
        });
        console.log
        const concepts = response.outputs[0].data.concepts;
        setResult(concepts);
        console.log(concepts)
        // Determine recommendations based on concepts
        const recommendationsList = [];
        concepts.forEach((concept) => {
          if (conceptMapping[concept.name]) {
            recommendationsList.push({
              condition: conceptMapping[concept.name].condition,
              recommendations: conceptMapping[concept.name].recommendations,
            });
          }
        });
        setRecommendations(recommendationsList);
      } catch (error) {
        console.error("Error analyzing image:", error);
        setDiagnosing(false);
      } finally {
        setDiagnosing(false);
      }
    };
    reader.readAsDataURL(image);
  };
  return (
    <section className="md:w-[80%] w-[90%] mx-auto my-20 rounded-sm shadow-lg bg-white">
      <div className="relative">
        <span className="mx-auto z-[0] bg-[#F7FAFE] block rounded-md h-[67px] w-[259px]"></span>
        <h1 className="text-center absolute top-0 left-1/2 transform -translate-x-1/2 md:text-[40px] z-60 mx-auto text-[18px] font-[700]">
          Upload a Picture
        </h1>
      </div>

      <div className="text-[#111111] font-[500] space-y-8 py-10 px-5">
        <h3 className="text-[20px] md:text-[25px]">
          Your Crop / Plant Health Report
        </h3>
        <p className="text-[18px]">
          Based on the image you provided, here are the details of your crop's
          health status.
        </p>
        <div
          style={{
            backgroundImage: imageURL ? `url(${imageURL})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="bg-[#F6F7F9] md:w-[483px] h-[205px] flex items-center">
          <input
            type="file"
            id="fileUpload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label
            htmlFor="fileUpload"
            className="border cursor-pointer w-[40%] mx-auto text-center">
            <span className="mx-auto block border border-[#90BFA8] rounded-[6px] text-[#90BFA8] shadow-lg py-4 px6">
              {uploading ? "Uploading" :imageURL? "change image":"upload image"}
            </span>
          </label>
        </div>
        <button
          onClick={handleImageDiagnose}
          className="rounded-lg text-white px-10 py-3 bg-primary"
          disabled={diagnosing}>
        {diagnosing? "Diagnosing":"Diagnose"}
        </button>
      </div>
      {result && (
        <div className="mx-5">
          <ol className="space-y-5">
            {recommendations.map((item, index) => (
              <li key={index}>
                {item.condition}:<br />
                <small>
                  {item.recommendations.map((rec, i) => (
                    <div key={i}>{rec}</div>
                  ))}
                </small>
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
};

export default Upload;
