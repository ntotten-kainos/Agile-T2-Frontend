import axios from "axios";

export const getChatGPTResponse = async (prompt: string, OPENAI_API_KEY: string): Promise<string> => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt,
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.7
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          }
        }
      );
  
      const completion = response.data.choices[0].text.trim();
      return completion;
    } catch (error) {
      console.error('Error fetching data from OpenAI API:', error);
      throw error;
    }
  }