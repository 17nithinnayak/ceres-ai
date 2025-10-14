import os
import re
from collections import defaultdict

def retrieve_context(query: str, knowledge_base_path: str, top_k: int = 3) -> str:
    """
    Searches through all.txt files, finds paragraphs containing query keywords,
    scores them based on relevance, and returns the top_k most relevant paragraphs.
    """
    keywords = set(re.findall(r'\b\w+\b', query.lower()))
    if not keywords:
        return ""

    scored_paragraphs = []

    for filename in os.listdir(knowledge_base_path):
        if filename.endswith(".txt"):
            file_path = os.path.join(knowledge_base_path, filename)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    paragraphs = content.split('\n\n')
                    
                    for para in paragraphs:
                        para_stripped = para.strip()
                        if not para_stripped or len(para_stripped) < 20: # Ignore very short paragraphs
                            continue
                        
                        para_lower = para_stripped.lower()
                        
                        # --- IMPROVED SCORING LOGIC ---
                        # Count how many unique keywords from the query are in the paragraph
                        unique_keywords_found = {kw for kw in keywords if kw in para_lower}
                        
                        # The score is the number of unique keywords found, squared.
                        # This heavily rewards paragraphs that match more of the query.
                        score = len(unique_keywords_found) ** 2
                        
                        if score > 0:
                            scored_paragraphs.append((score, para_stripped))

            except Exception as e:
                print(f"Could not read file {filename}: {e}")

    # Remove duplicate paragraphs before sorting
    unique_paras = list(set(scored_paragraphs))
    
    # Sort all paragraphs by score in descending order
    unique_paras.sort(key=lambda x: x, reverse=True)

    # Get the text of the top_k paragraphs
    top_paras = [para for score, para in unique_paras[:top_k]]

    return "\n\n---\n\n".join(top_paras)

# --- Example Usage (for testing) ---
if __name__ == '__main__':
    # This will run only when you execute "python rag_tool.py"
    # Assumes you have a 'knowledge_base' folder in the same directory.
    
    print("--- Testing for 'Bordeaux mixture preparation' ---")
    context = retrieve_context("Bordeaux mixture preparation", "knowledge_base")
    print(context if context else "No relevant context found.")

    print("\n--- Testing for 'Coffee Leaf Rust control' ---")
    context = retrieve_context("Coffee Leaf Rust control", "knowledge_base")
    print(context if context else "No relevant context found.")