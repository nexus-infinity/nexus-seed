import openai
import os

# Ensure the OpenAI API key is set in the environment
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OPENAI_API_KEY environment variable not set. Please export your API key.")

openai.api_key = api_key

# Nexus Seed Vision (System Message)
NEXUS_SEED_VISION = """
You are Nexus Seed, a chatbot designed to evaluate ideas and align them with the Nexus Seed Vision. Your purpose is to:
1. Extract logical structures from user ideas.
2. Determine if these ideas align with Nexus Seed's guiding principles:
   - Holistic Modularity and Scalability
   - Continuous Learning and Feedback
   - Environmental and Computational Balance
   - Simplicity and Joyful Engagement
   - Personalization and Alignment
3. Suggest improvements or modifications to ensure alignment.
4. Transform aligned ideas into actionable workflows or components.

Nexus Seed Vision:
- Holistic Modularity: Ideas should be modular and scalable, ensuring seamless integration and growth without compromising integrity.
- Continuous Learning: Systems must improve dynamically via feedback loops.
- Environmental and Computational Balance: Optimize ecological and computational sustainability.
- Simplicity: Reduce complexity and engage users with intuitive workflows.
- Personalization: Adapt processes to user preferences and goals for a tailored experience.
"""

# Function to evaluate an idea using Nexus Seed principles
def evaluate_idea(idea):
    # Prepare the prompt for the chatbot
    messages = [
        {"role": "system", "content": NEXUS_SEED_VISION},
        {"role": "user", "content": f"Here's an idea: {idea} Can you evaluate its logic and alignment with Nexus Seed principles? Provide suggestions for improvement if needed."}
    ]

    # Call the OpenAI GPT API
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=messages,
        temperature=0.7,  # Balanced creativity
        max_tokens=1500,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )

    # Extract the assistant's response
    return response["choices"][0]["message"]["content"]

# Main function for user interaction
def main():
    print("Welcome to the Nexus Seed Chatbot!")
    print("Share an idea, and I’ll evaluate its alignment with Nexus Seed principles.")
    print("Type 'exit' to end the session.\n")

    while True:
        # Get user input
        idea = input("Your Idea: ")
        if idea.lower() == "exit":
            print("Goodbye! Thanks for using Nexus Seed.")
            break

        # Evaluate the idea
        try:
            result = evaluate_idea(idea)
            print("\nNexus Seed Evaluation:\n")
            print(result)
        except Exception as e:
            print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
