// import { useState, useEffect } from "react";

// const useFetchData = (urlToFetch) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(
//     //callbacks
//     () => {
//       const getData = async () => {
//         try {
//           setIsLoading(true);
//           const response = await fetch(urlToFetch);

//           const responseJson = await response.json();
//           setData(responseJson);
//         } catch (err) {
//           console.log(err);
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       getData();
//     },
//     []
//   );
//   return {
//     data,
//     isLoading,
//   };
// };

// export default useFetchData;
