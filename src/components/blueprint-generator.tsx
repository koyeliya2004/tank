"use client";
import { AssessmentResult } from "@/lib/feasibility-engine";
import { Download, FileText } from "lucide-react";

interface BlueprintProps {
  result: AssessmentResult;
}

export function BlueprintGenerator({ result }: BlueprintProps) {
  const handleDownload = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();

    const pageW = doc.internal.pageSize.getWidth();
    let y = 15;

    // Header
    doc.setFillColor(10, 30, 60);
    doc.rect(0, 0, pageW, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("JalSetu - RTRWH & Artificial Recharge Blueprint", pageW / 2, y, { align: "center" });
    y += 10;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Powered by CGWB Data | Central Ground Water Board of India", pageW / 2, y, { align: "center" });
    y = 40;

    // Owner info
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Property & Owner Information", 15, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Name: ${result.input.name}`, 15, y); y += 6;
    doc.text(`Location: ${result.input.location}`, 15, y); y += 6;
    doc.text(`Coordinates: ${result.input.lat.toFixed(4)}, ${result.input.lon.toFixed(4)}`, 15, y); y += 6;
    doc.text(`Roof Area: ${result.input.roofArea} sqm | Open Space: ${result.input.openSpaceArea} sqm`, 15, y); y += 6;
    doc.text(`Dwellers: ${result.input.dwellers} | Roof Material: ${result.input.roofMaterial}`, 15, y); y += 6;
    doc.text(`Report Date: ${new Date().toLocaleDateString("en-IN")}`, 15, y); y += 12;

    // Feasibility
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Feasibility Assessment", 15, y); y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Feasibility Score: ${result.feasibility.score}/100 - ${result.feasibility.status}`, 15, y); y += 6;
    result.feasibility.reasons.forEach((r) => {
      doc.text(`• ${r}`, 18, y); y += 5;
    });
    y += 5;

    // Water harvest
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Rainwater Harvesting Potential", 15, y); y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Annual Harvestable Volume: ${(result.waterHarvest.annualHarvestable / 1000).toFixed(2)} kL/year`, 15, y); y += 6;
    doc.text(`Daily Average: ${result.waterHarvest.dailyAverage.toFixed(0)} liters/day`, 15, y); y += 6;
    doc.text(`Monsoon Harvest: ${(result.waterHarvest.monsoonHarvest / 1000).toFixed(2)} kL`, 15, y); y += 6;
    doc.text(`Per Person Per Day: ${result.waterHarvest.perPersonPerDay.toFixed(0)} liters`, 15, y); y += 6;
    doc.text(`Runoff Coefficient (${result.input.roofMaterial}): ${result.waterHarvest.runoffCoefficient}`, 15, y); y += 6;
    doc.text(`Local Annual Rainfall (${result.rainfall.district}, IMD): ${result.rainfall.annualRainfall} mm`, 15, y); y += 12;

    // Aquifer
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Aquifer Information (CGWB Data)", 15, y); y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Principal Aquifer: ${result.aquiferInfo.name}`, 15, y); y += 6;
    doc.text(`Depth to Water Table: ${result.aquiferInfo.depthToWater} m BGL`, 15, y); y += 6;
    doc.text(`Aquifer Thickness: ${result.aquiferInfo.thickness} m`, 15, y); y += 6;
    doc.text(`Water Quality: ${result.aquiferInfo.quality}`, 15, y); y += 6;
    doc.text(`Groundwater Status: ${result.aquiferInfo.category} (${result.aquiferInfo.stageOfExtraction}% extraction)`, 15, y); y += 6;
    doc.text(`Recharge Potential: ${result.aquiferInfo.rechargePotential}`, 15, y); y += 12;

    // Structures
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Recommended Structures & Dimensions", 15, y); y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    result.structures.forEach((s, i) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${i + 1}. ${s.name} (${s.suitability})`, 15, y); y += 6;
      doc.setFont("helvetica", "normal");
      if (s.length) doc.text(`   Dimensions: ${s.length}m (L) × ${s.width}m (W) × ${s.depth}m (D)`, 15, y);
      else if (s.diameter) doc.text(`   Dimensions: Ø ${s.diameter}m × ${s.depth}m depth`, 15, y);
      else doc.text(`   Depth: ${s.depth}m`, 15, y);
      y += 6;
      doc.text(`   Volume: ${s.volume.toFixed(2)} m³ | Filter: ${s.filter_media}`, 15, y); y += 6;
      doc.text(`   Estimated Cost: ₹${s.estimatedCost.toLocaleString()}`, 15, y); y += 6;
      doc.text(`   Reason: ${s.reason.substring(0, 90)}`, 15, y); y += 8;
    });
    y += 4;

    // Bill of Materials
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Bill of Materials (BOM)", 15, y); y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    const bom = [
      ["1", "PVC Pipes (100mm)", "As per layout", "₹120/m", "~₹3,000-8,000"],
      ["2", "First Flush Diverter", "1 unit per downpipe", "₹800-1,500", "₹1,600-4,500"],
      ["3", "Mesh Filter Screen", "1 unit", "₹500-1,200", "₹500-1,200"],
      ["4", "Gravel (20mm)", "0.5 m³ per pit", "₹800/m³", "₹800-2,400"],
      ["5", "Sand (coarse)", "0.3 m³ per pit", "₹600/m³", "₹600-1,800"],
      ["6", "Charcoal Filter", "0.1 m³", "₹2,000/m³", "₹200-600"],
      ["7", "RCC Rings (1m dia)", "As per depth", "₹500/ring", "₹2,000-5,000"],
      ["8", "Cement + Sand (mortar)", "As required", "Market rate", "₹1,000-3,000"],
      ["9", "Brick / Stone blocks", "As required", "₹5/brick", "₹2,000-8,000"],
      ["10", "Labour (skilled)", "2-3 days", "₹800/day", "₹1,600-2,400"],
    ];

    // BOM table header
    doc.setFillColor(10, 30, 60);
    doc.rect(15, y, pageW - 30, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.text("No.", 18, y + 5);
    doc.text("Item", 30, y + 5);
    doc.text("Qty", 100, y + 5);
    doc.text("Unit Price", 130, y + 5);
    doc.text("Approx. Total", 165, y + 5);
    y += 9;

    doc.setTextColor(0, 0, 0);
    bom.forEach(([no, item, qty, unitPrice, total]) => {
      doc.text(no, 18, y);
      doc.text(item, 30, y);
      doc.text(qty, 100, y);
      doc.text(unitPrice, 130, y);
      doc.text(total, 165, y);
      y += 6;
    });
    y += 6;

    // Cost-Benefit
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Cost-Benefit Analysis", 15, y); y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Total Installation Cost: ₹${result.costBenefit.totalInstallationCost.toLocaleString()}`, 15, y); y += 6;
    doc.text(`Annual Maintenance Cost: ₹${result.costBenefit.annualMaintenanceCost.toLocaleString()}`, 15, y); y += 6;
    doc.text(`Annual Water Value Saved: ₹${result.costBenefit.annualWaterValueINR.toLocaleString()}`, 15, y); y += 6;
    doc.text(`Payback Period: ${result.costBenefit.paybackPeriodYears > 99 ? "N/A" : result.costBenefit.paybackPeriodYears.toFixed(1) + " years"}`, 15, y); y += 6;
    doc.text(`Water Saved Per Year: ${result.costBenefit.waterSavedPerYear.toFixed(1)} kL`, 15, y); y += 6;
    doc.text(`CO₂ Equivalent Saved: ${result.costBenefit.co2SavedKg.toFixed(1)} kg/year`, 15, y); y += 12;

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Disclaimer: This assessment is based on CGWB and IMD published data. Please consult a qualified hydrogeologist before construction.",
      pageW / 2, doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
    doc.text(
      "Data Sources: CGWB Ground Water Year Book 2023, IMD Rainfall Atlas of India, CGWB Technical Manual on Artificial Recharge to Ground Water",
      pageW / 2, doc.internal.pageSize.getHeight() - 5,
      { align: "center" }
    );

    doc.save(`JalSetu_RTRWH_Blueprint_${result.input.name.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-400" />
        DIY Smart Blueprint
      </h2>
      <p className="text-sm text-blue-300">
        Download a localized PDF blueprint with structure dimensions, bill of materials (BOM)
        with local hardware prices, installation steps, and cost-benefit analysis.
      </p>
      <div className="bg-blue-900/20 border border-blue-600/20 rounded-xl p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm text-blue-200">
          <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
          Structure dimensions (pits, trenches, shafts)
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-200">
          <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
          Bill of Materials with local market prices
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-200">
          <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
          Cost-benefit analysis & payback period
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-200">
          <span className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
          CGWB & IMD data references
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2.5 rounded-xl transition font-medium w-full justify-center"
      >
        <Download className="w-4 h-4" />
        Download PDF Blueprint (Free)
      </button>
    </div>
  );
}
