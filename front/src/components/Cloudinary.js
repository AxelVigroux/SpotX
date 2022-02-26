// import { useState, useEffect } from "react";
// import axios from "axios";
// import loadingGif from "./spinner.gif";

// const url = 'your API Base URL';
// const preset = 'your Upload presets';

// const Cloudinary = (props) => {

//   const [imageSelected, setImageSelected] = useState("");

//   const [imageURL, setImageURL] = useState("");
//   const [url, setUrl] = useState("");

//   const token = window.localStorage.getItem("user_token");

//   const uploadImage = () => {
//     const data = new FormData();

//     data.append("file", imageURL);
//     data.append("upload_preset", "SpotX-Preset");
//     data.append("cloud_name", "du7ab0zzw");

//     axios
//       .post("  https://api.cloudinary.com/v1_1/du7ab0zzw/image/upload", data, {
//         headers: { "x-access-token": token },
//       })
//       .then((response) => {
//         console.log("CLOUDINARY.JS", response);
//       })
//       .then((data) => {
//         console.log("CLOUDINARY.JS", data);
//       })
//       .catch((err) => {
//         console.log("CLOUDINARY.JS", err);
//       });
//   };

//   //    --------------- UPLOAD IMAGE DIRECT AVEC L'API ------------------------ //
//   // const uploadImage = () => {
//   //   const formData = new FormData();
//   //   formData.append("file", imageSelected);
//   //   formData.append("upload_preset", "SpotX-Preset");

//   //   axios
//   //     .post("https://api.cloudinary.com/v1_1/du7ab0zzw/image/upload", formData)
//   //     .then((response) => {
//   //       console.log(response);
//   //     })
//   //     .catch((err) => {
//   //       console.log("error cloud", err);
//   //     });
//   // };
//   // --------------------------------------------------------------------------- //

//   return (
//     <div>
//       <input
//         type="file"
//         onChange={(e) => {
//           console.log('CLOUDINARY.JS',e.target.files[0]);
//           setImageURL(e.target.files[0]);
//         }}
//       />
//       <button onClick={uploadImage}>Upload Image</button>
//       <div>
//         <h1>Uploaded Image</h1>
//         <img src={url} alt={"from upload"} />
//       </div>
//     </div>
//   );
// };

// export default Cloudinary;
