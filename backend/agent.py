# backend/agent.py

import os
import google.generativeai as genai
from PIL import Image
import io
import base64
from datetime import datetime
from dotenv import load_dotenv

# Import our RAG tool
from rag_tool import retrieve_context

# Load environment variables from the.env file
load_dotenv()

# Configure the Gemini API with the key from our.env file
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in.env file")
genai.configure(api_key=GEMINI_API_KEY)

# --- Helper function to determine language ---
def get_language_name(code: str) -> str:
    """Converts a language code to a full name for the prompt."""
    if code and code.lower().startswith('kn'):
        return "Kannada"
    return "English"

# --- The "Detective" Agent (Updated) ---
def run_analysis_agent(image_base64: str, user_query: str, farm_details: dict, language_code: str) -> dict:
    """
    This is the core agentic function. It gathers context and uses Gemini Vision
    to perform an expert-level analysis in the requested language.
    """
    print("🕵️ Agent Activated: Starting investigation...")

    # --- Step 1: "Checking the Records" (Fetching Farm History) ---
    farm_history = f"This farm is located in {farm_details.get('location', 'Kodagu')} and primarily grows {farm_details.get('crop_type', 'Robusta Coffee')}. Past issues are not yet recorded."
    print(f"   -> Fetched Farm History: {farm_history}")

    # --- Step 2: "Surveying the Scene" (Retrieving Hyper-Local Context with RAG) ---
    rag_query = user_query if user_query else "coffee pepper disease management"
    local_context = retrieve_context(rag_query, "knowledge_base")
    print(f"   -> Retrieved RAG Context for query '{rag_query}'")

    # --- Step 3: "Building the Profile" (The Rich Prompt Synthesis) ---
    target_language = get_language_name(language_code)
    print(f"   -> Target language for response: {target_language}")

    prompt = f"""
    You are an expert agronomist specializing in Kodagu (Coorg) coffee and pepper plantations. Your analysis must be scientific, practical, and easy for a local farmer to understand.

    **Case File:**
    - **Farmer's Observation:** "{user_query if user_query else 'No voice note provided.'}"
    - **Farm History & Details:** {farm_history}
    - **Relevant Local Knowledge (from official guides):**
      ---
      {local_context if local_context else 'No specific local context found. Rely on your general knowledge.'}
      ---

    **Your Task:**
    Analyze the attached image in the context of all the information provided above. Respond ONLY with a valid JSON object following this exact structure, with no extra text or markdown formatting like ```json.

    **CRITICAL INSTRUCTION: The entire final JSON response, including all text in the 'summary', 'recommendedActions', 'scientificReason', and 'preventativeMeasures' fields, MUST be in the {target_language} language.**
    
    {{
        "diseaseName": "Your Diagnosis (e.g., Coffee Leaf Rust)",
        "severity": "Your assessment of severity (e.g., 'Low', 'Medium', 'High')",
        "summary": "A brief, 2-3 sentence summary explaining the issue in simple terms.",
        "recommendedActions": [
            "A list of 2-3 simple, numbered, actionable steps for the farmer.",
            "Example: 1. Prune and destroy all affected leaves immediately to reduce fungal load."
        ],
        "scientificReason": "A simple scientific explanation of the disease (e.g., 'This is a fungus that thrives in high humidity...').",
        "preventativeMeasures": [
            "A list of 2-3 long-term preventative measures.",
            "Example: 'Ensure proper shade management to improve air circulation.'"
        ]
    }}
    """
    print("   -> Master prompt for Gemini has been constructed.")

    # --- Step 4: "Consulting the Expert" (Calling Gemini Vision) ---
    try:
        image_data = base64.b64decode(image_base64.split(',')[1])
        img = Image.open(io.BytesIO(image_data))

        # Using the model name from your previous code
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        print("   -> Calling Gemini Vision API...")
        response = model.generate_content([prompt, img])
        
        response_text = response.text.strip().replace("```json", "").replace("```", "")
        
        import json
        return json.loads(response_text)

    except Exception as e:
        print(f"   -> ERROR during Gemini API call: {e}")
        return {"error": "Failed to get analysis from AI. Please try again."}