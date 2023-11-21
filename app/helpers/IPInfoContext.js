
export async function fetchIpInfo() {
    try {
      const response = await fetch('http://ip-api.com/json/');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching IP info:', error);
      return null;
    }
  }
  



// import { createContext, useContext, useState, useEffect } from 'react';

// const IpInfoContext = createContext();

// export const IpInfoProvider = ({ children }) => {
//   const [ipInfo, setIpInfo] = useState(null);

//   useEffect(() => {
//     const fetchIpInfo = async () => {
//       try {
//         const response = await fetch('http://ip-api.com/json/');
//         const data = await response.json();
//         setIpInfo(data);
//       } catch (error) {
//         console.error('Error fetching IP info:', error);
//       }
//     };

//     fetchIpInfo();
//   }, []);

//   return (
//     <IpInfoContext.Provider value={ipInfo}>
//       {children}
//     </IpInfoContext.Provider>
//   );
// };

// export const useIpInfo = () => {
//   const ipInfo = useContext(IpInfoContext);
//   if (ipInfo === undefined) {
//     throw new Error('useIpInfo must be used within an IpInfoProvider');
//   }
//   return ipInfo;
// };

