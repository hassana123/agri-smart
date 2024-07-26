// import React, { useState } from "react";
// import axios from "axios";
// import { storage } from "../../firebase";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// const Upload = () => {
//   const [image, setImage] = useState(null);
//   const [imageURL, setImageURL] = useState(null);
//   const [result, setResult] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [diagnosing, setDiagnosing] = useState(false);

//   const handleFileChange = async (e) => {
//     setResult(null);
//     setUploading(true);
//     const file = e.target.files[0];
//     setImage(file);
//     if (file) {
//       try {
//         const storageRef = ref(storage, `photos/${file.name}`);
//         await uploadBytes(storageRef, file);
//         const imageUrl = await getDownloadURL(storageRef);
//         console.log("done", imageUrl);
//         setImageURL(imageUrl);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       } finally {
//         setUploading(false);
//       }
//     }
//   };

//   const handleImageDiagnose = async (e) => {
//     setResult(null);
//     e.preventDefault();
//     setDiagnosing(true);
//     const reader = new FileReader();
//     reader.onload = async (e) => {
//       const base64Image = e.target.result.split(",")[1];
//       try {
//         const response = await axios.post(
//           "https://crop.kindwise.com/api/v1/identification",
//           {
//             images: [base64Image],
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               "Api-Key": import.meta.env.VITE_KINDWISE_API_KEY,
//             },
//           }
//         );
//         console.log(response.data); // Log the full response data
  
//         // Extracting the relevant information with safety checks
//         const diseaseSuggestions = response.data?.result?.disease?.suggestions || [];
//         const cropSuggestions = response.data?.result?.crop?.suggestions || [];
//         const crop = cropSuggestions[0] || {};  // Take the first suggestion if available
//         const diseases = diseaseSuggestions.map(suggestion => ({
//           name: suggestion.name || "Unknown disease",
//           scientificName: suggestion.scientific_name || "Unknown scientific name",
//           probability: (suggestion.probability * 100).toFixed(2) + '%',  // Convert to percentage
//           treatment: suggestion.details?.treatment || "No treatment available"
//         }));
  
//         setResult({
//           diseases: diseases,
//           plant: crop.name || "Unknown plant",
//           suggestions: cropSuggestions.map(suggestion => ({
//             name: suggestion.name || "Unknown plant",
//             probability: (suggestion.probability * 100).toFixed(2) + '%'  // Convert to percentage
//           })),
//           status: diseases.length > 0 ? "Infected" : "Healthy",
//         });
//       } catch (error) {
//         console.error("Error diagnosing image:", error);
//       } finally {
//         setDiagnosing(false);
//       }
//     };
//     reader.readAsDataURL(image);
//   };

//   // download report as text file
//   const downloadReport = () => {
//     const report = `Status: ${result.status}\nPlant: ${result.plant}\nDiseases:\n` +
//       result.diseases.map(disease => 
//         `- Name: ${disease.name}\n  Scientific Name: ${disease.scientificName}\n  Probability: ${disease.probability}\n  Remedy: ${disease.treatment}`
//       ).join("\n");
//     const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'diagnosis-report.txt';
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   // URL for additional tips based on the disease
//   const getTipsUrl = (disease) => {
//     return disease
//       ? 'https://www.apsnet.org/edcenter/disimpactmngmnt/topc/EpidemiologyTemporal/Pages/ManagementStrategies.aspx'  // Replace with actual URLs
//       : 'https://www.elitetreecare.com/2021/02/maintaining-plant-health-tips/';
//   };

//   return (
//     <section className="md:w-[80%] font-mulish w-[90%] mx-auto my-20 rounded-sm shadow-lg bg-white">
//       <div className="relative">
//         <span className="mx-auto z-[0] bg-[#F7FAFE] block md:block hidden rounded-md h-[67px] w-[259px]"></span>
//         <h1 className="text-center font-roboto absolute top-0 left-1/2 transform -translate-x-1/2 md:text-[40px] z-60 mx-auto text-[18px] font-[700]">
//           Upload a Picture
//         </h1>
//       </div>

//       <div className="text-[#111111] font-[500] space-y-8 py-10 px-5">
//         <h3 className="text-[20px] md:text-[25px]">Your Crop / Plant Health Report</h3>
//         <p className="text-[18px] font-[400]">
//           Based on the image you provided, here are the details of your crop's health status.
//         </p>
      
//         <div
//           style={{
//             backgroundImage: imageURL ? `url(${imageURL})` : "none",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//           className="bg-[#F6F7F9] md:w-[483px] h-[205px] flex items-center">
//           <input
//             type="file"
//             id="fileUpload"
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//           />
//         </div>
        
//        <div className="items-center flex md:w-[40%]">
//         <button
//           onClick={handleImageDiagnose}
//           className="font-roboto rounded-lg text-white px-10 py-3 bg-primary"
//           disabled={diagnosing}>
//           {diagnosing ? "Diagnosing..." : "Diagnose"}
//         </button>
//         <label
//             htmlFor="fileUpload"
//             className="border cursor-pointer mx-auto text-center mx-auto block border-[#90BFA8] rounded-[6px] text-[#90BFA8] shadow-sm py-3 px-6">
//             {uploading
//                 ? "Uploading..."
//                 : imageURL
//                 ? "Change Image"
//                 : "Upload Image"}
//           </label>
//        </div>
//       </div>
//       {result && (
//         <div className="mx-5 p-5 rounded-lg shadow-lg">
//           <h3 className="text-[20px] md:text-[25px] font-bold mb-4">Diagnosis Result</h3>
//           <ol className="mb-4 space-y-4 list-decimal list-inside ml-3">
//             <li className="space-y-1">
//               <p className="text-lg inline font-bold">Status</p>{" "}
//               <small
//                 className={
//                   result.status === "Infected"
//                     ? "text-red-600 block ml-5"
//                     : "text-green-600 block ml-5"
//                 }>
//                 {result.status}
//               </small>
//             </li>
//             <li className="space-y-1">
//               <p className="text-lg inline font-bold">Plant</p>
//               <small className="block ml-5">{result.plant}</small>
//             </li>
//             <li className="space-y-1">
//               <p className="text-lg inline font-bold">Possible Plants</p>
//               {result.suggestions.map((sug, index) => (
//                 <small key={index} className="block ml-5">
//                   {sug.name} ({sug.probability})
//                 </small>
//               ))}
//             </li>
//             <li>  <p className="text-lg inline font-bold">Possible Diseases</p> 
//             {result.status === "Infected" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 my-3 gap-4">
//                 {result.diseases.map((disease, index) => (
//                   <div key={index} className="space-y-1 border p-3 rounded-lg shadow-sm">
//                     <p className="text-lg font-bold">Disease {index + 1}</p>
//                     <small className="block">Name: {disease.name}</small>
//                     <small  className="block"> Scientific Name: {disease.scientificName}</small>
//                     <small  className="block">Probability: {disease.probability}</small>
//                     <small  className="block">Remedy: {disease.treatment}</small>
//                   </div>
//                 ))}
//               </div>
//             )}
//             </li>
//           </ol>
//           {result.status === "Infected" && (
//             <div className="p-4 bg-red-100 border border-red-400 rounded-md">
//               <h4 className="font-bold text-red-700">Infection Alert!</h4>
//               <p>{result.diseases[0].treatment}</p>
//             </div>
//           )}
//           <div className="mt-5 md:flex space-y-5 mx-auto mx:space-x-4">
//             <button
//               onClick={downloadReport}
//               className="bg-secondary block w-[50%] md:w-auto text-white py-3 px-6 rounded-lg font-roboto">
//               Download Report
//             </button>
//             <a
//               href={getTipsUrl(result.status === "Infected")}
//               className="bg-green-600 w-[50%] md:w-auto block text-center text-white py-3 px-6 rounded-lg font-roboto">
//               Get More Tips
//             </a>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Upload;


import React, { useState } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AIChatbot from "./AIChatbot"; // Import the AIChatbot component

const Upload = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [result, setResult] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [diagnosing, setDiagnosing] = useState(false);

  const handleFileChange = async (e) => {
    setResult(null);
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

  const handleImageDiagnose = async (e) => {
    setResult(null);
    e.preventDefault();
    setDiagnosing(true);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target.result.split(",")[1];
      try {
        const response = await axios.post(
          "https://crop.kindwise.com/api/v1/identification",
          {
            images: [base64Image],
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Api-Key": import.meta.env.VITE_KINDWISE_API_KEY,
            },
          }
        );
        console.log(response.data); // Log the full response data
  
        const diseaseSuggestions = response.data?.result?.disease?.suggestions || [];
        const cropSuggestions = response.data?.result?.crop?.suggestions || [];
        const crop = cropSuggestions[0] || {};  // Take the first suggestion if available
        const diseases = diseaseSuggestions.map(suggestion => ({
          name: suggestion.name || "Unknown disease",
          scientificName: suggestion.scientific_name || "Unknown scientific name",
          probability: (suggestion.probability * 100).toFixed(2) + '%',  // Convert to percentage
          treatment: suggestion.details?.treatment || "No treatment available"
        }));
  
        setResult({
          diseases: diseases,
          plant: crop.name || "Unknown plant",
          suggestions: cropSuggestions.map(suggestion => ({
            name: suggestion.name || "Unknown plant",
            probability: (suggestion.probability * 100).toFixed(2) + '%'  // Convert to percentage
          })),
          status: diseases.length > 0 ? "Infected" : "Healthy",
        });
      } catch (error) {
        console.error("Error diagnosing image:", error);
      } finally {
        setDiagnosing(false);
      }
    };
    reader.readAsDataURL(image);
  };

  const downloadReport = () => {
    const report = `Status: ${result.status}\nPlant: ${result.plant}\nDiseases:\n` +
      result.diseases.map(disease => 
        `- Name: ${disease.name}\n  Scientific Name: ${disease.scientificName}\n  Probability: ${disease.probability}\n  Remedy: ${disease.treatment}`
      ).join("\n");
    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagnosis-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getTipsUrl = (disease) => {
    return disease
      ? 'https://www.apsnet.org/edcenter/disimpactmngmnt/topc/EpidemiologyTemporal/Pages/ManagementStrategies.aspx'  // Replace with actual URLs
      : 'https://www.elitetreecare.com/2021/02/maintaining-plant-health-tips/';
  };

  return (
    <section className="md:w-[80%] font-mulish w-[90%] mx-auto my-20 rounded-sm shadow-lg bg-white">
      <div className="relative">
        <span className="mx-auto z-[0] bg-[#F7FAFE] block md:block hidden rounded-md h-[67px] w-[259px]"></span>
        <h1 className="text-center font-roboto absolute top-0 left-1/2 transform -translate-x-1/2 md:text-[40px] z-60 mx-auto text-[18px] font-[700]">
          Upload a Picture
        </h1>
      </div>

      <div className="text-[#111111] font-[500] space-y-8 py-10 px-5">
        <h3 className="text-[20px] md:text-[25px]">Your Crop / Plant Health Report</h3>
        <p className="text-[18px] font-[400]">
          Based on the image you provided, here are the details of your crop's health status.
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
        </div>
        
        <div className="items-center block md:space-y-0 space-y-2 md:flex md:w-[65%] lg:w-[55%]">
          <button
            onClick={handleImageDiagnose}
            className="font-roboto rounded-lg w-full  md:w-[50%] text-white px-10 py-3 bg-primary"
            disabled={diagnosing}>
            {diagnosing ? "Diagnosing..." : "Diagnose"}
          </button>
          <label
            htmlFor="fileUpload"
            className="border cursor-pointer mx-auto text-center mx-auto block border-[#90BFA8] rounded-[6px] text-[#90BFA8] shadow-sm py-3 px-6">
            {uploading
                ? "Uploading..."
                : imageURL
                ? "Change Image"
                : "Upload Image"}
          </label>
        </div>
      </div>

      {result && (
        <div className="mx-5 p-5 rounded-lg shadow-lg">
          <h3 className="text-[20px] md:text-[25px] font-bold mb-4">Diagnosis Result</h3>
          <ol className="mb-4 space-y-4 list-decimal list-inside ml-3">
            <li className="space-y-1">
              <p className="text-lg inline font-bold">Status</p>{" "}
              <small
                className={
                  result.status === "Infected"
                    ? "text-red-600 block ml-5"
                    : "text-green-600 block ml-5"
                }>
                {result.status}
              </small>
            </li>
            <li className="space-y-1">
              <p className="text-lg inline font-bold">Plant</p>
              <small className="block ml-5">{result.plant}</small>
            </li>
            <li className="space-y-1">
              <p className="text-lg inline font-bold">Possible Plants</p>
              {result.suggestions.map((sug, index) => (
                <small key={index} className="block ml-5">
                  {sug.name} ({sug.probability})
                </small>
              ))}
            </li>
            <li>
              <p className="text-lg inline font-bold">Possible Diseases</p> 
              {result.status === "Infected" && (
                <div className="grid grid-cols-1 md:grid-cols-2 my-3 gap-4">
                  {result.diseases.map((disease, index) => (
                    <div key={index} className="space-y-1 border p-3 rounded-lg shadow-sm">
                      <p className="text-lg font-bold">Disease {index + 1}</p>
                      <small className="block">Name: {disease.name}</small>
                      <small className="block">Scientific Name: {disease.scientificName}</small>
                      <small className="block">Probability: {disease.probability}</small>
                      <small className="block">Remedy: {disease.treatment}</small>
                    </div>
                  ))}
                </div>
              )}
            </li>
          </ol>
          {/* {result.status === "Infected" && (
            <div className="p-4 bg-red-100 border border-red-400 rounded-md">
              <h4 className="font-bold text-red-700">Infection Alert!</h4>
              <p>{result.diseases[0].treatment}</p>
            </div>
          )} */}
          <AIChatbot diseases={result.diseases} /> {/* Integrate AIChatbot component */}
          <div className="mt-5 md:flex space-y-5 mx-auto mx:space-x-4">
            <button
              onClick={downloadReport}
              className="bg-secondary block w-[50%] md:w-auto text-white py-3 px-6 rounded-lg font-roboto">
              Download Report
            </button>
            <a
              href={getTipsUrl(result.status === "Infected")}
              className="bg-green-600 w-[50%] md:w-auto block text-center text-white py-3 px-6 rounded-lg font-roboto">
              Get More Tips
            </a>
          </div>
        </div>
      )}
    </section>
  );
};

export default Upload;
