import React, { useState } from 'react';
import OpenAI from 'openai';
import axios from 'axios';

const AIChatbot = ({ diseases }) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    const openai = new OpenAI({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });

    const prompt = diseases
      .map(disease => `Provide treatment recommendations for: ${disease.name}.`)
      .join("\n");

    try {
      const result = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 150,
      });
      setResponse(result.choices[0].text.trim());
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setResponse('Unable to fetch recommendations at the moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <button onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Fetching Recommendations..." : "Get Treatment Recommendations"}
      </button>
      {response && (
        <div className="recommendations">
          <h3>Treatment Recommendations:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default AIChatbot;
