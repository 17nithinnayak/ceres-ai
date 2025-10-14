import os
import google.generativeai as genai
from PIL import Image
import io
import base64
from datetime import datetime

# Import our RAG tool
from rag_tool import retrieve_context

# Configure the Gemini API with the key from our.env file
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in.env file")
genai.configure(api_key=GEMINI_API_KEY)

# --- The "Detective" Agent ---
def run_analysis_agent(image_base64: str, user_query: str, farm_details: dict) -> dict:
    """
    This is the core agentic function. It gathers context and uses Gemini Vision
    to perform an expert-level analysis.
    """
    print("🕵️ Agent Activated: Starting investigation...")

    # --- Step 1: "Checking the Records" (Fetching Farm History) ---
    # For now, we'll use the farm details passed in. Later, this will query the database.
    farm_history = f"This farm is located in {farm_details.get('location', 'Kodagu')} and primarily grows {farm_details.get('crop_type', 'Robusta Coffee')}. Past issues are not yet recorded."
    print(f"   -> Fetched Farm History: {farm_history}")

    # --- Step 2: "Surveying the Scene" (Retrieving Hyper-Local Context with RAG) ---
    # We'll create a search query for our RAG tool based on the user's query.
    rag_query = user_query if user_query else "coffee pepper disease management"
    local_context = retrieve_context(rag_query, "knowledge_base")
    print(f"   -> Retrieved RAG Context for query '{rag_query}'")

    # --- Step 3: "Building the Profile" (The Rich Prompt Synthesis) ---
    # This is where we combine all the evidence into a master prompt.
    prompt = f"""
    You are an expert agronomist specializing in Kodagu (Coorg) coffee and pepper plantations. Your analysis must be scientific, practical, and easy for a local farmer to understand.

    **Case File:**
    - **Farmer's Observation (in Kannada/Kodava Takk):** "{user_query if user_query else 'No voice note provided.'}"
    - **Farm History & Details:** {farm_history}
    - **Relevant Local Knowledge (from official guides):**
      ---
      {local_context if local_context else 'No specific local context found. Rely on your general knowledge.'}
      ---

    **Your Task:**
    Analyze the attached image in the context of all the information provided above. Respond ONLY with a valid JSON object following this exact structure, with no extra text or markdown formatting like ```json:
    {{
        "diseaseName": "Your Diagnosis (e.g., Coffee Leaf Rust)",
        "severity": "Your assessment of severity (e.g., 'Low', 'Medium', 'High')",
        "summary": "A brief, 2-3 sentence summary explaining the issue in simple terms.",
        "recommendedActions":,
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
        # Prepare the image for the API
        # Remove the "data:image/jpeg;base64," prefix
        image_data = base64.b64decode(image_base64.split(',')[1])
        img = Image.open(io.BytesIO(image_data))

        # Initialize the Gemini Pro Vision model
        model = genai.GenerativeModel('gemini-pro-vision')
        
        print("   -> Calling Gemini Vision API...")
        response = model.generate_content([prompt, img])
        
        # Clean up the response to extract only the JSON part
        response_text = response.text.strip().replace("```json", "").replace("```", "")
        
        import json
        return json.loads(response_text)

    except Exception as e:
        print(f"   -> ERROR during Gemini API call: {e}")
        return {"error": "Failed to get analysis from AI. Please try again."}