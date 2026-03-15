// Mock API for Mandi Prices with Tamil Nadu Districts

const tamilNaduDistricts = [
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
  'Tirunelveli', 'Erode', 'Vellore', 'Dindigul', 'Thanjavur',
  'Tiruppur', 'Kanchipuram', 'Karur', 'Nagercoil', 'Hosur',
  'Namakkal', 'Sivaganga', 'Theni', 'Pudukkottai', 'Ramanathapuram'
]

const crops = ['Tomato', 'Onion', 'Rice', 'Potato', 'Wheat', 'Chilli', 'Cotton', 'Sugarcane']

// Generate random price based on district and crop
const generatePrice = (district, crop) => {
  const basePrices = {
    'Tomato': 40,
    'Onion': 30,
    'Rice': 25,
    'Potato': 35,
    'Wheat': 20,
    'Chilli': 120,
    'Cotton': 65,
    'Sugarcane': 32
  }
  
  // Add variation based on district (simulate regional differences)
  const districtFactor = district.charCodeAt(0) % 10 // Simple hash for consistency
  const variation = (districtFactor - 5) * 2 // -10 to +10 variation
  
  const basePrice = basePrices[crop] || 30
  const price = Math.max(15, basePrice + variation)
  
  // Generate change percentage
  const change = (Math.random() * 10 - 5).toFixed(1) // -5% to +5%
  const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral'
  
  return {
    district,
    crop,
    price: Math.round(price),
    change: parseFloat(change),
    trend
  }
}

// Mock API function
export const fetchMandiPrices = async (districtFilter = '', cropFilter = '') => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const allPrices = []
  
  // Generate prices for all districts and crops
  tamilNaduDistricts.forEach(district => {
    crops.forEach(crop => {
      allPrices.push(generatePrice(district, crop))
    })
  })
  
  // Filter by district and crop
  let filtered = allPrices
  
  if (districtFilter) {
    filtered = filtered.filter(item => 
      item.district.toLowerCase().includes(districtFilter.toLowerCase())
    )
  }
  
  if (cropFilter) {
    filtered = filtered.filter(item => 
      item.crop.toLowerCase().includes(cropFilter.toLowerCase())
    )
  }
  
  return filtered
}

// Get unique districts for dropdown
export const getDistricts = () => {
  return tamilNaduDistricts
}

// Get unique crops for dropdown
export const getCrops = () => {
  return crops
}






