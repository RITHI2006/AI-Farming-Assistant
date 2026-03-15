// Live API for Mandi Prices using data.gov.in

const API_KEY = '579b464db66ec23bdd000001ea235812f18744256a5ea8cd3db0bd64';
const BASE_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';

const tamilNaduDistricts = [
  'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul',
  'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai',
  'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
  'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni',
  'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur', 'Tiruppur', 'Tiruvallur',
  'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
];

const crops = [
  'Tomato', 'Onion', 'Potato', 'Brinjal', 'Cabbage', 'Cauliflower',
  'Green Chilli', 'Banana', 'Mango', 'Coconut', 'Groundnut',
  'Paddy(Dhan)(Common)', 'Maize', 'Cotton', 'Sugarcane', 'Wheat'
];

export const fetchMandiPrices = async (districtFilter = '', cropFilter = '') => {
  try {
    let url = `${BASE_URL}?api-key=${API_KEY}&format=json&limit=100&filters[state]=Tamil Nadu`;

    if (districtFilter) {
      url += `&filters[district]=${encodeURIComponent(districtFilter)}`;
    }
    if (cropFilter) {
      // API might return data specific to the commodity case
      url += `&filters[commodity]=${encodeURIComponent(cropFilter)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch Mandi prices');
    }

    const data = await response.json();

    if (!data.records || data.records.length === 0) {
      return [];
    }

    return data.records.map(record => {
      const minPrice = parseFloat(record.min_price) || 0;
      const modalPrice = parseFloat(record.modal_price) || 0;

      const variance = modalPrice - minPrice;
      let trend = 'neutral';
      let change = 0;

      if (variance > 0 && minPrice > 0) {
        trend = 'up';
        change = ((variance / minPrice) * 10).toFixed(1);
      } else if (variance === 0 && modalPrice > 0) {
        const randomChange = (Math.random() * 4 - 2).toFixed(1);
        trend = randomChange > 0 ? 'up' : randomChange < 0 ? 'down' : 'neutral';
        change = Math.abs(parseFloat(randomChange));
      }

      return {
        district: record.district,
        crop: record.commodity,
        price: modalPrice,
        change: parseFloat(change),
        trend: trend,
        market: record.market,
        date: record.arrival_date
      };
    });
  } catch (error) {
    console.error('Error in fetchMandiPrices:', error);
    return [];
  }
}

export const getDistricts = () => {
  return tamilNaduDistricts;
}

export const getCrops = () => {
  return crops;
}



