const axios = require('axios');
require('dotenv').config();

async function generateGeneralFinancialAdvice(userPrompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an AI financial advisor, providing helpful and insightful advice on personal finance matters. Your responses should be professional, informative, and tailored to the user\'s financial questions or concerns.'
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    const botResponse = response.data.choices[0]?.message?.content || 'No response generated';
    console.log("AI Financial Advisor:", botResponse);
    return botResponse;
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  }
}

async function generatePersonalizedFinancialAdvice(user, question, area) {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `
    User Profile:
    - Annual Income: $${user.annualIncome}
    - Monthly Expenses: ${JSON.stringify(user.monthlyExpenses)}
    - Current Savings: $${user.currentSavings}
    - Financial Goals: ${user.financialGoals.join(', ')}
    - Risk Tolerance: ${user.riskTolerance}

    Question: ${question}
    Area of Interest: ${area}

    Given the user prompt and user profile, give the response according to the user's question. If the question is general, provide a general response.
    If the user is asking for advice or any other help, use the information of the user profile to provide a good response. And build on the chat as you move further. Do not give advice if not asked for this.
    Structure your response in Markdown format.
  `;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a knowledgeable financial advisor.' },
        { role: 'user', content: prompt }
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to generate financial advice');
  }
}


function generateChatResponse(messages) {
  const apiKey = process.env.OPENAI_API_KEY;
  return axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
  }, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.data.choices[0].message.content)
  .catch(error => {
    console.error('Error:', error.response?.data || error.message);
    throw error;
  });
}

async function generateGoalStrategy(user, goal) {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `
    User Profile:
    - Annual Income: $${user.annualIncome}
    - Monthly Expenses: ${JSON.stringify(user.monthlyExpenses)}
    - Current Savings: $${user.currentSavings}
    - Financial Goals: ${user.financialGoals.join(', ')}
    - Risk Tolerance: ${user.riskTolerance}

    Goal Details:
    - Type: ${goal.type}
    - Target Amount: $${goal.targetAmount}
    - Current Amount: $${goal.currentAmount}
    - Target Date: ${new Date(goal.targetDate).toLocaleDateString()}

    Given the user's financial profile and goal details, generate a personalized strategy to help them achieve this financial goal. Include specific recommendations, potential challenges, and actionable steps. Structure your response in Markdown format.
    In the response do not mention something like Dear Client or [User name] no placeholders should be present.
  `;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a knowledgeable financial advisor specializing in goal-based financial planning.' },
        { role: 'user', content: prompt }
      ],
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Failed to generate goal strategy');
  }
}

module.exports = {
  generateGeneralFinancialAdvice,
  generatePersonalizedFinancialAdvice,
  generateChatResponse,
  generateGoalStrategy
};