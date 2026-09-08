
export async function getCalmWorldScenario(favorites: string) {
  try {
    const res = await fetch('/api/ai/getCalmWorldScenario', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorites })
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (e) { return null; }
}

export async function getBraveStoryStep(protagonist: string, fear: string, previousStory: string, childAction: string) {
  try {
    const res = await fetch('/api/ai/getBraveStoryStep', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ protagonist, fear, previousStory, childAction })
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (e) { return null; }
}

export async function createMonsterTranslation(feeling: string) {
  try {
    const res = await fetch('/api/ai/createMonsterTranslation', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feeling })
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (e) { return null; }
}

export async function chatWithMonsterAi(monsterName: string, chatHistory: string, userMessage: string) {
  try {
    const res = await fetch('/api/ai/chatWithMonsterAi', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monsterName, chatHistory, userMessage })
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (e) { return null; }
}

export async function getSocialScenario() {
  try {
    const res = await fetch('/api/ai/getSocialScenario', { method: 'POST' });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (e) { return null; }
}

export async function evaluateSocialResponseAction(scenario: string, childResponse: string) {
  try {
    const res = await fetch('/api/ai/evaluateSocialResponseAction', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ scenario, childResponse })
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (e) { return null; }
}

export async function getThoughtMystery() {
  try {
    const res = await fetch('/api/ai/getThoughtMystery', { method: 'POST' });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (e) { return null; }
}

export async function evaluateAlternativeThought(_mystery: any, _childThought: string) {
  return { isBright: true, feedback: "¡Gran pensamiento alternativo!" };
}

export async function getThoughtDetectiveMystery() {
  try {
    const res = await fetch('/api/ai/getThoughtDetectiveMystery', { method: 'POST' });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (e) { return null; }
}
