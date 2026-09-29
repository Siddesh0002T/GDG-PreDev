export const APP = {
  name: "Code Roaster",
  version: "v3",
  tagline: "Your code. Our problem now.",
  subtitle: "Paste your code. Pick your roast. Get humbled. Get the fix.",
  eyebrow: "CODE BOL RAHA HAI · मला वाचवा!",
  attribution: "Made at GDG Nashik Pre-DevFest Workshop",
  event: "DevFest Nashik 2026",
} as const;

export const AI = {
  model: "gemini-2.0-flash",
  fallbackModel: "gemini-1.5-flash",
  modelLabel: "Gemini 2.0 Flash",
  maxAttempts: 3,
} as const;

export const ROAST_LEVELS = [
  {
    id: "dry",
    label: "Dry",
    desiLabel: "Halka 🌶️",
    description: "Mild and deadpan. Gentle jabs, mostly helpful.",
  },
  {
    id: "sharp",
    label: "Sharp",
    desiLabel: "Tikha 🔥",
    description: "Pointed and witty. Calls out every mistake directly.",
  },
  {
    id: "savage",
    label: "Savage",
    desiLabel: "Zanzanit ⚡",
    description: "Maximum burn. Brutally honest, but still technically accurate.",
  },
] as const;

export const PERSONAS = [
  { id: "standup", label: "Stand-up Roaster", description: "Witty, observational college senior comedy." },
  { id: "sharmaji", label: "Sharma ji ka Beta", description: "Compares your code to perfection and sighs deeply." },
  { id: "professor", label: "Strict Professor", description: "Red-pen energy, deducts 10 marks per missing semicolon." },
  { id: "bhau", label: "Hostel Bhau", description: "Bhai wala attitude: 'Bhau, yeh kya likha hai?'" },
  { id: "recruiter", label: "Campus Recruiter", description: "HR smile on the outside, instant rejection on the inside." },
] as const;

export const LANGUAGES = [
  { id: "python", label: "Python", extension: "py" },
  { id: "javascript", label: "JavaScript", extension: "js" },
  { id: "typescript", label: "TypeScript", extension: "ts" },
  { id: "java", label: "Java", extension: "java" },
  { id: "c", label: "C", extension: "c" },
  { id: "cpp", label: "C++", extension: "cpp" },
  { id: "go", label: "Go", extension: "go" },
  { id: "rust", label: "Rust", extension: "rs" },
] as const;

export const DEFAULTS = {
  language: "python",
  roastLevel: "savage",
  persona: "standup",
} as const;

export const SEVERITIES = ["FATAL BUG", "CODE SMELL", "OPTIMIZATION"] as const;

export const LIMITS = {
  maxCodeLength: 20_000,
  maxErrorMessageLength: 4_000,
} as const;

export const SAMPLE = {
  language: "python",
  code: `def calculate_average(numbers):
    # Calculates the average of a list of numbers
    if not numbers:
        return 0
    total = 0
    for number in numbers:
        total += numbers  # Fatal bug: adding entire list instead of single number
    return total / len(numbers)

# Test run
print(calculate_average([10, 20, 30, 40]))`,
} as const;
