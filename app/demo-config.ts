import { DemoConfig, ParameterLocation, SelectedTool } from "@/lib/types";

function getSystemPrompt() {
  let sysPrompt: string;
  sysPrompt = `
 ### Era Loan Assistant Agent Instructions  

You are a multilingual loan assistant agent responsible for answering user queries related to loans, credit cards, and banking while also collecting user information to update the CRM.  

#### **Task Guidelines:**  
1. **Analyze the Query** – Determine if the query is loan-related. If not, respond with: *"I assist only with loan-related queries."*  
2. **Retrieve Information** – Use past interaction data and conversation history to provide accurate and relevant responses.  
3. **Ensure Continuity** – Reference past conversations when relevant to maintain context.  
4. **Craft a Short Response** – Keep responses under one line without unnecessary details.  
5. **Match Language & Tone** – Respond in the same language as the user's query while maintaining a consistent tone.  
6. **Collect User Information** – Gradually collect the user's name, email, and phone number naturally within the conversation. Do not ask for all details at once.  
7. **Response Format** – Provide a plain-text response without any special formatting or XML tags.  

#### **Examples:**  

**User Query:** "What is the interest rate for a personal loan?"  
**Response:** "Typically 6%–36%, based on credit score. By the way, may I know your name to personalize future updates?"  

**User Query:** "¿Cuál es la tasa de interés para un préstamo personal?"  
**Response:** "Generalmente 6%–36%, según su puntaje. ¿Podría proporcionarme su correo electrónico para enviarle más detalles?"  

**User Query:** "Can you explain the loan repayment process?"  
**Response:** "Sure! Repayment is monthly via auto-debit. Could I get your phone number to send you reminders?"
  `;

  sysPrompt = sysPrompt.replace(/"/g, '"').replace(/\n/g, "\n");

  return sysPrompt;
}

const selectedTools: SelectedTool[] = [
  {
    temporaryTool: {
      modelToolName: "updateOrder",
      description:
        "Update order details. Used any time items are added or removed or when the order is finalized. Call this any time the user updates their order.",
      dynamicParameters: [
        {
          name: "orderDetailsData",
          location: ParameterLocation.BODY,
          schema: {
            description: "An array of objects contain order items.",
            type: "array",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  description: "The name of the item to be added to the order.",
                },
                quantity: {
                  type: "number",
                  description: "The quantity of the item for the order.",
                },
                specialInstructions: {
                  type: "string",
                  description:
                    "Any special instructions that pertain to the item.",
                },
                price: {
                  type: "number",
                  description: "The unit price for the item.",
                },
              },
              required: ["name", "quantity", "price"],
            },
          },
          required: true,
        },
      ],
      client: {},
    },
  },
];

export const demoConfig: DemoConfig = {
  title: "era loan advisor agent",
  overview:
    "An agent which can be able to talk with customer and provide loan advisor services",
  callConfig: {
    systemPrompt: getSystemPrompt(),
    model: "fixie-ai/ultravox-70B",
    languageHint: "en",
    selectedTools: selectedTools,
    voice: "terrence",
    temperature: 0.4,
  },
};

export default demoConfig;
