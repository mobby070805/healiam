// The Healiam blood panel, from https://healiam.com/tests (medical spellings corrected).
// Shared by every page so the marker list never drifts. Order matches healiam.com/tests.
// Icons are Healiam's own line art, copied from healiam.com/images/icon-*.png.

export type PanelCategory = {
  readonly slug: string;
  readonly icon: string;
  readonly image: string;
  readonly name: string;
  /** Shorter name for compact lists. */
  readonly short?: string;
  /** Shortest name, for icon tiles. */
  readonly tile?: string;
  readonly line: string;
  readonly markers: readonly string[];
  /** Logged by the customer in the app, not measured by the lab. */
  readonly selfLogged?: boolean;
};

export const panelCategories: readonly PanelCategory[] = [
  {
    slug: "cbc",
    icon: "Droplet",
    image: "/panel/cbc.png",
    name: "Complete Blood Count (CBC)",
    short: "Blood count (CBC)",
    tile: "CBC",
    line: "Red cells, white cells and platelets.",
    markers: [
      "WBC", "RBC", "Hemoglobin", "Hematocrit", "MCV", "MCH", "MCHC", "RDW-SD", "RDW",
      "Platelet count", "MPV", "Immature platelet", "Neutrophils", "Neutrophils (abs)", "Lymphs",
      "Lymphs (abs)", "Monocytes", "Eos", "Eos (abs)", "Basos", "Basos (abs)",
      "Immature granulocytes", "Immature granulocytes (abs)",
    ],
  },
  {
    slug: "biometrics",
    icon: "Weight",
    image: "/panel/biometrics.png",
    name: "Biometrics",
    line: "Logged by you in the app.",
    markers: ["Weight", "Oxygen level", "Systolic pressure", "Diastolic pressure", "Temperature", "Heart rate"],
    selfLogged: true,
  },
  {
    slug: "thyroid",
    icon: "Activity",
    image: "/panel/thyroid.png",
    name: "Thyroid",
    line: "Thyroid function.",
    markers: ["TSH", "Free T4", "Total T3"],
  },
  {
    slug: "electrolytes",
    icon: "Zap",
    image: "/panel/electrolytes.png",
    name: "Electrolytes",
    line: "Hydration and balance.",
    markers: ["Sodium", "Potassium", "Chloride", "Magnesium", "Phosphorus"],
  },
  {
    slug: "lipids",
    icon: "HeartPulse",
    image: "/panel/lipids.png",
    name: "Lipids",
    line: "Cholesterol and triglycerides.",
    markers: ["Total cholesterol", "LDL", "HDL", "Triglycerides"],
  },
  {
    slug: "kidney",
    icon: "Bean",
    image: "/panel/kidney.png",
    name: "Kidney",
    line: "Kidney health and function.",
    markers: ["Creatinine", "Urea nitrogen", "Uric acid", "Calcium", "Creatine kinase"],
  },
  {
    slug: "pancreas",
    icon: "FlaskConical",
    image: "/panel/pancreas.png",
    name: "Pancreas",
    line: "Pancreatic enzymes.",
    markers: ["Amylase", "Lipase"],
  },
  {
    slug: "iron",
    icon: "Magnet",
    image: "/panel/iron-list.png",
    name: "Iron",
    line: "Iron status.",
    markers: ["Iron", "UIBC"],
  },
  {
    slug: "liver",
    icon: "Funnel",
    image: "/panel/liver.png",
    name: "Liver",
    line: "Liver enzymes and proteins.",
    markers: [
      "Albumin", "Total protein", "Bilirubin total", "Bilirubin direct", "Alkaline phosphatase",
      "ALT (alanine aminotransferase)", "AST (aspartate aminotransferase)",
    ],
  },
  {
    slug: "diabetes",
    icon: "Gauge",
    image: "/panel/diabetes.png",
    name: "Diabetes",
    line: "Blood sugar control.",
    markers: ["Glucose", "HbA1c"],
  },
  {
    slug: "other",
    icon: "Sun",
    image: "/panel/vitamin-d.png",
    name: "Vitamin D and more",
    short: "Vitamin D + more",
    tile: "Vitamin D",
    line: "Extra markers for deeper insight.",
    markers: ["Vitamin D", "LDH", "Carbon dioxide"],
  },
];

/** Lab measurements only, excluding the biometrics you log yourself. */
export const labMeasurementCount = panelCategories
  .filter((c) => !c.selfLogged)
  .reduce((n, c) => n + c.markers.length, 0);

/** Categories the lab measures (10). Biometrics are logged in the app, so they are not counted. */
export const labCategoryCount = panelCategories.filter((c) => !c.selfLogged).length;
