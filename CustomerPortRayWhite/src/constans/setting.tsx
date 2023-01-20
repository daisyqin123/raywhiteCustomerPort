export const isProduction = process.env.NODE_ENV === 'production';

const prodBackEndUrl = 'https://realestateadminapi.auokka.com'; // 'https://mp.tour61.com.au'
const prodFrontEndUrl = 'realestateadminapi.auokka.com'; // 'http://www.tourx.com.au'

export const backEndBaseURL = isProduction ? prodBackEndUrl : 'https://realestateadminapi.auokka.com'//'http://localhost:52012'
export const frontEndBaseUrl = isProduction ? prodFrontEndUrl : 'http://localhost:3000';

export const googleMapApiKey = "AIzaSyD6710nxRY5KzD5rfHOjaFFE_diB7b8AQA";

export const encryptedPassword = "*ENCRYPTEDPASSWORD*";