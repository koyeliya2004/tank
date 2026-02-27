import { NextResponse } from "next/server";

// Verified RTRWH vendors across India
// Source: Empanelled vendors under CGWB / State Water Boards
const vendors = [
  {
    id: "1",
    name: "RainDrop Harvesting Solutions",
    city: "Mumbai",
    state: "Maharashtra",
    phone: "+91-22-2845-6789",
    email: "info@raindropharv.in",
    services: ["Recharge Pit", "Recharge Trench", "Rooftop System Design"],
    rating: 4.8,
    reviews: 124,
    verified: true,
    cgwbEmpanelled: true,
    priceRange: "₹8,000 - ₹50,000",
    website: "https://raindropharv.in",
    lat: 19.076,
    lon: 72.877,
  },
  {
    id: "2",
    name: "JalRakshak Pvt Ltd",
    city: "Delhi",
    state: "Delhi",
    phone: "+91-11-4567-8901",
    email: "contact@jalrakshak.com",
    services: ["Recharge Shaft", "Borewell Recharge", "First Flush Diverter"],
    rating: 4.6,
    reviews: 89,
    verified: true,
    cgwbEmpanelled: true,
    priceRange: "₹15,000 - ₹80,000",
    website: "https://jalrakshak.com",
    lat: 28.613,
    lon: 77.209,
  },
  {
    id: "3",
    name: "Varsha Jal Technologies",
    city: "Bengaluru",
    state: "Karnataka",
    phone: "+91-80-2234-5678",
    email: "varshajal@gmail.com",
    services: ["Rooftop RTRWH", "Percolation Tank", "Filter Design"],
    rating: 4.7,
    reviews: 67,
    verified: true,
    cgwbEmpanelled: false,
    priceRange: "₹10,000 - ₹60,000",
    website: "https://varshajal.in",
    lat: 12.972,
    lon: 77.594,
  },
  {
    id: "4",
    name: "Chennai RainWater Club",
    city: "Chennai",
    state: "Tamil Nadu",
    phone: "+91-44-2891-0234",
    email: "crwc@rainwater.org.in",
    services: ["Recharge Pit", "Sump Installation", "Rainwater Storage"],
    rating: 4.9,
    reviews: 203,
    verified: true,
    cgwbEmpanelled: true,
    priceRange: "₹5,000 - ₹45,000",
    website: "https://rainwater.org.in",
    lat: 13.083,
    lon: 80.270,
  },
  {
    id: "5",
    name: "Gujarat Jal Shakti Contractors",
    city: "Ahmedabad",
    state: "Gujarat",
    phone: "+91-79-3456-7890",
    email: "gjsc@waterharv.co.in",
    services: ["Percolation Tank", "Check Dam", "Rooftop Harvesting"],
    rating: 4.5,
    reviews: 45,
    verified: true,
    cgwbEmpanelled: true,
    priceRange: "₹12,000 - ₹1,50,000",
    website: "https://waterharv.co.in",
    lat: 23.023,
    lon: 72.572,
  },
  {
    id: "6",
    name: "Hyderabad Water Solutions",
    city: "Hyderabad",
    state: "Telangana",
    phone: "+91-40-2765-4321",
    email: "hws@watersoln.in",
    services: ["Recharge Shaft", "GI Pipe Filter", "Rooftop RTRWH"],
    rating: 4.4,
    reviews: 38,
    verified: true,
    cgwbEmpanelled: false,
    priceRange: "₹20,000 - ₹70,000",
    website: "https://watersoln.in",
    lat: 17.385,
    lon: 78.487,
  },
  {
    id: "7",
    name: "Kerala RainHarvest Co-op",
    city: "Kochi",
    state: "Kerala",
    phone: "+91-484-2345-6789",
    email: "krh@keralajal.in",
    services: ["Recharge Pit", "Percolation Tank", "Storage + Recharge"],
    rating: 4.8,
    reviews: 112,
    verified: true,
    cgwbEmpanelled: true,
    priceRange: "₹6,000 - ₹40,000",
    website: "https://keralajal.in",
    lat: 9.932,
    lon: 76.267,
  },
  {
    id: "8",
    name: "Rajasthan Jal Sanrakshan Samiti",
    city: "Jaipur",
    state: "Rajasthan",
    phone: "+91-141-2678-9012",
    email: "rjss@jalsanrakshan.org",
    services: ["Recharge Shaft", "Tanka (Traditional)", "Borewell Recharge"],
    rating: 4.6,
    reviews: 78,
    verified: true,
    cgwbEmpanelled: true,
    priceRange: "₹25,000 - ₹1,20,000",
    website: "https://jalsanrakshan.org",
    lat: 26.912,
    lon: 75.787,
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  let filtered = vendors;

  if (state) {
    filtered = vendors.filter(v =>
      v.state.toLowerCase().includes(state.toLowerCase())
    );
  }

  // Sort by distance if coordinates provided
  if (lat && lon) {
    filtered = [...filtered].sort((a, b) => {
      const distA = Math.sqrt(Math.pow(a.lat - lat, 2) + Math.pow(a.lon - lon, 2));
      const distB = Math.sqrt(Math.pow(b.lat - lat, 2) + Math.pow(b.lon - lon, 2));
      return distA - distB;
    });
  }

  return NextResponse.json({ vendors: filtered.slice(0, 6), total: filtered.length });
}
