import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Update with your backend URL

export const createWallet = async (address: string, balance: number) => {
  try {
    const response = await axios.post(`${BASE_URL}/wallet/create`, { address, balance });
    return response.data;
  } catch (error: any) { // Specify the type of error as `any`
    throw error.response.data.message;
  }
};

export const getWalletDetails = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/wallet`);
    return response.data.wallet;
  } catch (error: any) { // Specify the type of error as `any`
    throw error.response.data.message;
  }
};
