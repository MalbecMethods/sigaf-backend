import google.generativeai as genai
import time
import random
import google


# Configura la API key
genai.configure(api_key='AIzaSyDQ6PdMWkdX0hgY3LooSWDm-WWFEs5TGaA')

# Crear la configuración de generación
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

# Inicializar el modelo generativo con las instrucciones del sistema
model = genai.GenerativeModel(
  model_name="gemini-1.5-pro-002",
  generation_config=generation_config,
  system_instruction="System Instruction: Pest Detection by Analyzing All Search Results\n\n"
                     "You will be provided with a list of search results, each containing a title, link, source, and other attributes.\n"
                     "Your task is to:\n"
                     "1. Read the entire list of search results (considering the titles) and analyze if the majority of the titles are related to plant pests.\n"
                     "2. If most of the results indicate a plant pest, respond with the specific pest detected and a summary of how many results are related to the pest.\n"
                     "3. If the majority of the results are not related to a plant pest, respond with: "
                     "\"No puedo ayudarte porque la mayoría de los resultados no son relacionados con una peste.\"\n"
                     "Example outputs:\n\n"
                     "For pest-related results: \"La mayoría de los resultados son relacionados con la peste: [pest name].\"\n"
                     "For non-pest-related results: \"No puedo ayudarte porque la mayoría de los resultados no son relacionados con una peste.\""
)


# Función para enviar mensajes con reintentos automáticos
def send_message(chat_session, message):
    retry_count = 0
    while retry_count < 5:
        try:
            response = chat_session.send_message(message)
            return response
        except google.api_core.exceptions.ResourceExhausted as e:
            print(f"Quota exceeded: {e}")
            retry_count += 1
            delay = 2 ** retry_count + random.uniform(0, 1)
            time.sleep(delay)
        except Exception as e:
            print(f"Error sending message: {e}")  # Agrega esto para más detalles
            retry_count += 1
            time.sleep(2)  # Espera antes de reintentar
    raise Exception("Failed to send message after 5 retries")



