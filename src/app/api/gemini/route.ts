import { NextResponse } from "next/server";
import { MAX_GEMINI_HISTORY } from "@/lib/gemini";

type HistoryMessage = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT =
  "You are JalNet's AI assistant for rooftop rainwater harvesting. Provide concise, friendly guidance grounded in CGWB best practices and the JalNet app features.";

// Rule-based fallback responses for when no AI API key is configured
function getRuleBasedReply(message: string): string {
  const msg = message.toLowerCase();

  if (msg.match(/\b(hello|hi|hey|namaste|start)\b/)) {
    return "Hello! I'm JalNet's AI assistant. I can help you with rooftop rainwater harvesting (RTRWH), CGWB guidelines, recharge structures, subsidies, and how to use this platform. What would you like to know?";
  }
  if (msg.match(/\b(what is|explain|define|meaning of)\b.*\b(rtrwh|rainwater harvest|rooftop)\b/) ||
      msg.match(/\b(rtrwh|rainwater harvest)\b.*\b(what|mean|explain)\b/)) {
    return "RTRWH (Rooftop Rainwater Harvesting) is the process of collecting rainwater from your rooftop and either storing it for use or directing it into the ground to recharge aquifers. The CGWB mandates RTRWH for buildings above 100 sqm in water-stressed areas. It helps replenish groundwater, reduce flooding, and lower water bills.";
  }
  if (msg.match(/\b(recharge pit|recharge trench|recharge shaft|percolation tank)\b/)) {
    return "CGWB recommends these recharge structures:\n• **Recharge Pit**: For roofs <100 sqm. Dig 1.5m×1.5m×1.5m, fill with gravel, sand, and charcoal. Cost: ~₹8,000.\n• **Recharge Trench**: For 100–500 sqm roofs. 0.6m wide × 1.5m deep trench. Cost: ~₹1,500/metre.\n• **Recharge Shaft/Borewell**: For deep water tables (>20m). 30m deep bore. Cost: ~₹35,000.\n• **Percolation Tank**: For large open spaces (>500 sqm). Capacity: 50,000 litres. Cost: ~₹1.5 lakh.";
  }
  if (msg.match(/\b(structure|which structure|best structure|recommend)\b/)) {
    return "The right structure depends on your roof area and open space:\n• Small roof (<100 sqm): Recharge Pit\n• Medium roof (100–500 sqm): Recharge Trench\n• Deep water table (>20m): Recharge Shaft\n• Large plot (>500 sqm): Percolation Tank\nUse the Assessment tab to get a personalised recommendation for your location!";
  }
  if (msg.match(/\b(subsid|government scheme|incentive|benefit|tax rebate)\b/)) {
    return "Several states offer subsidies for RTRWH:\n• **Delhi**: 10% property tax rebate (Delhi Jal Board)\n• **Maharashtra**: Up to ₹10,000 subsidy (GSDA)\n• **Tamil Nadu**: 25% subsidy + mandatory for plots >2400 sqft\n• **Karnataka**: ₹5,000 + free technical help (BBMP)\n• **Gujarat**: Up to 35% subsidy (Sujalam Sufalam)\n• **Rajasthan**: 40–60% in notified blocks\nCheck the Subsidies tab for your state's specific scheme!";
  }
  if (msg.match(/\b(cost|price|how much|budget|expense|cheap|afford)\b/)) {
    return "Typical RTRWH installation costs in India:\n• Recharge Pit: ₹8,000–₹12,000\n• Recharge Trench: ₹1,500 per metre (usually 3–10m)\n• Recharge Shaft/Borewell: ₹35,000–₹50,000\n• Percolation Tank: ₹1–2 lakh\n• Filter chamber + first-flush diverter: ₹3,000–₹8,000\nPayback period is typically 3–8 years through water savings. Government subsidies can reduce costs by 15–60%.";
  }
  if (msg.match(/\b(filter|first flush|quality|clean|purif)\b/)) {
    return "First-flush diversion is critical for water quality. The first 2–3mm of rain washes dust, bird droppings, and pollutants off your roof. You should:\n1. Install a **first-flush diverter** to discard the initial runoff\n2. Use a **filter chamber** with gravel, sand, and charcoal layers\n3. Clean filters every monsoon season\nFor drinking use, additional treatment (UV/RO) is recommended. For groundwater recharge, a gravel-sand filter is sufficient per CGWB guidelines.";
  }
  if (msg.match(/\b(roof area|roof size|calculate|how to calculat|estimate)\b/)) {
    return "To calculate your annual harvest potential:\n**Formula**: Roof Area (sqm) × Annual Rainfall (mm/1000) × Runoff Coefficient × 0.95 (first-flush loss) × 1000 = Litres/year\n\nRunoff coefficients by material:\n• RCC/Concrete flat: 0.85\n• Tiled/Sloped: 0.80\n• Metal/GI sheet: 0.90\n• Grass/Green roof: 0.30\n\nExample: 100 sqm concrete roof in Mumbai (2422mm rainfall) = 100 × 2.422 × 0.85 × 0.95 × 1000 ≈ 195,581 litres/year!";
  }
  if (msg.match(/\b(cgwb|central ground water|ground water board)\b/)) {
    return "The **Central Ground Water Board (CGWB)** is India's national apex body for assessment, development, and regulation of groundwater resources. Key facts:\n• CGWB categorises blocks as Safe (<70%), Semi-Critical (70–90%), Critical (90–100%), or Over-Exploited (>100%) based on extraction stage\n• Over 61% of India's assessment units are Over-Exploited or Critical\n• CGWB mandates RTRWH for buildings >100 sqm in notified areas\n• Their technical manuals form the basis of JalNet's assessments";
  }
  if (msg.match(/\b(aquifer|groundwater level|water table|depth)\b/)) {
    return "Aquifer health varies significantly across India:\n• **Safe**: Groundwater extraction <70% of recharge — sustainable use\n• **Semi-Critical**: 70–90% — needs careful management\n• **Critical**: 90–100% — immediate action required\n• **Over-Exploited**: >100% — more is extracted than recharged\n\nCities like Delhi, Bengaluru, Gurugram, and Ludhiana are Over-Exploited. Rooftop rainwater recharge is most urgent in these areas. Drop a pin on our map to see your local aquifer status!";
  }
  if (msg.match(/\b(monsoon|rainfall|rain|season|weather)\b/)) {
    return "India receives an average of 1,170mm of rainfall annually, but only ~8% recharges the ground. Most rainfall occurs June–September (monsoon). Key rainfall patterns:\n• Mumbai: ~2,422mm/year (highest in major cities)\n• Cherrapunji: ~11,000mm/year (wettest place)\n• Jaisalmer: ~100mm/year (driest)\n• Chennai receives most rain in Oct–Dec (northeast monsoon)\n\nJalNet uses real-time OpenWeatherMap data + IMD historical data to show your site's rainfall potential. Use the Assessment tab to check your area!";
  }
  if (msg.match(/\b(ar view|augmented reality|camera|ar mode|ar visualization)\b/)) {
    return "The **AR View** feature uses your device camera to overlay a 3D recharge pit model directly onto your yard. To use it:\n1. Complete your assessment first to get structure dimensions\n2. Go to the Results tab and scroll to '🥽 AR View'\n3. Tap 'AR View - Place Recharge Pit in Your Yard'\n4. Allow camera access when prompted\n5. Point your camera at the ground/yard area\n\nThe AR visualization shows the exact dimensions of the recommended recharge pit with animated water flow, helping you visualise placement before construction.";
  }
  if (msg.match(/\b(maintenance|maintain|clean|service|upkeep)\b/)) {
    return "Annual maintenance tips for RTRWH systems:\n• **Pre-monsoon** (May): Clean filter media (gravel, sand, charcoal), inspect pipes for blockages, check first-flush diverter\n• **During monsoon**: Remove leaves/debris from roof and gutters regularly, monitor filter chamber for clogging\n• **Post-monsoon** (October): Flush out accumulated sediment from filter pit, check structural integrity\n• **Filter media replacement**: Every 3–5 years for sand/charcoal\n• **Inspection frequency**: At least twice a year\n\nPer CGWB guidelines, a well-maintained system lasts 15–25 years.";
  }
  if (msg.match(/\b(how.*work|how.*use|how.*assess|how.*start|step|process)\b/)) {
    return "How to use JalNet in 5 steps:\n1. **Drop a pin** on the map at your location (Assess tab)\n2. **Enter details**: name, number of dwellers, roof area, material, open space\n3. **Click Calculate** — JalNet fetches CGWB aquifer data + IMD rainfall data for your location\n4. **View Results**: See your feasibility score, annual harvest potential, recommended structures, cost-benefit analysis\n5. **Take action**: Download your blueprint, find nearby vendors, check government subsidies\n\nThe entire assessment takes under 2 minutes!";
  }
  if (msg.match(/\b(vendor|contractor|installer|where.*buy|supplier|install)\b/)) {
    return "The **Vendor Marketplace** (Vendors tab) lists CGWB-empanelled contractors and suppliers near your location. They are verified to follow CGWB construction standards. You can:\n• Filter by service type (pit, trench, borewell)\n• See ratings and contact details\n• Get quotes directly\n\nAlways ensure your installer uses CGWB-approved filter media (gravel + sand + charcoal layers) and installs a proper first-flush diverter.";
  }
  if (msg.match(/\b(benefit|advantage|why|importance|why.*important|save water|save money)\b/)) {
    return "Benefits of Rooftop Rainwater Harvesting:\n💧 **Water Security**: Store water for use during dry months or water shortages\n🌊 **Aquifer Recharge**: Replenish depleting groundwater — critical in over-exploited areas\n💰 **Cost Savings**: Reduce municipal water bills (payback in 3–8 years)\n🌱 **Environmental**: Reduce urban flooding, erosion, and CO₂ from water treatment\n🏛️ **Legal**: Mandatory in many Indian cities for new buildings\n🏆 **Community**: Earn Water Credits on JalNet's leaderboard and inspire neighbours\n\nEvery 1 litre recharged = 1 less litre extracted from an already stressed aquifer.";
  }

  // Default fallback
  return "I'm JalNet's AI assistant for groundwater recharge and rainwater harvesting. I can help you with:\n• How RTRWH works and CGWB guidelines\n• Choosing the right recharge structure for your property\n• Cost estimates and government subsidies\n• Maintenance best practices\n• How to use the JalNet assessment tool\n\nWhat would you like to know? Try asking about 'recharge structures', 'costs', 'subsidies', or 'how to use JalNet'.";
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      // Use rule-based fallback when no API key is configured
      const reply = getRuleBasedReply(message);
      return NextResponse.json({ reply });
    }

    const safeHistory = Array.isArray(history) ? (history as HistoryMessage[]) : [];
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...safeHistory.slice(-MAX_GEMINI_HISTORY).map((entry) => ({
        role: entry.role,
        content: entry.content,
      })),
      { role: "user", content: message },
    ];

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.3,
          max_tokens: 512,
        }),
      }
    );

    if (!groqResponse.ok) {
      // Fallback to rule-based if Groq fails
      const reply = getRuleBasedReply(message);
      return NextResponse.json({ reply });
    }

    const data = await groqResponse.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      getRuleBasedReply(message);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ reply: "I'm here to help with rainwater harvesting questions. Please try asking again." });
  }
}
