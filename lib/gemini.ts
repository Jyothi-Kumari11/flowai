import { GoogleGenerativeAI } from "@google/generative-ai";

const getGenAI = () => {
  const key = process.env.GEMINI_API_KEY || "";
  return new GoogleGenerativeAI(key);
};

export const getGeminiModel = () => {
  const genAI = getGenAI();
  return genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
};

export async function generateProjectSummary(projectData: {
  name: string;
  tasks: Array<{ title: string; status: string; priority: string }>;
  memberCount: number;
}) {
  const prompt = `
    Analyze this project and provide a concise summary with insights:
    
    Project: ${projectData.name}
    Total Members: ${projectData.memberCount}
    Tasks: ${JSON.stringify(projectData.tasks, null, 2)}
    
    Provide:
    1. Overall project health (Good/At Risk/Critical)
    2. Key bottlenecks
    3. 3 actionable recommendations
    4. Estimated completion percentage
    
    Format as JSON with keys: health, bottlenecks, recommendations, completionPercentage
  `;

  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: text };
  } catch {
    return { raw: text };
  }
}

export async function generateTaskSuggestions(context: {
  projectName: string;
  existingTasks: string[];
  goal?: string;
}) {
  const prompt = `
    For the project "${context.projectName}" with goal: "${context.goal || "general project"}",
    existing tasks: ${context.existingTasks.join(", ")}
    
    Suggest 5 new tasks that would help complete this project.
    Format as JSON array: [{"title": "...", "priority": "HIGH|MEDIUM|LOW", "description": "..."}]
  `;

  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch {
    return [];
  }
}

export async function generateSmartPrioritization(tasks: Array<{
  id: string;
  title: string;
  dueDate?: string;
  priority: string;
}>) {
  const prompt = `
    Re-prioritize these tasks based on urgency, importance, and deadlines:
    ${JSON.stringify(tasks, null, 2)}
    
    Return JSON array with same task IDs but suggested priorities and reasoning:
    [{"id": "...", "suggestedPriority": "URGENT|HIGH|MEDIUM|LOW", "reason": "..."}]
  `;

  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
  } catch {
    return [];
  }
}
