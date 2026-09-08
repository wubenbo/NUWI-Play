import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, HarmCategory, HarmBlockThreshold } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const baseSystemInstruction = "Eres un asistente amigable de terapia cognitivo-conductual (TCC) para niños (6-12 años). Formas parte del 'Escuadrón Rescate de Colores', un equipo eco-cibernético que ayuda a niños a entender y manejar sus emociones.";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

    // API ROUTES
  
  const generateWithRetry = async (modelName, contents, config, retries = 3, backoff = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await ai.models.generateContent({
          model: modelName,
          contents,
          config
        });
      } catch (err) {
        if (err?.status === "UNAVAILABLE" || err?.status === 503 || err?.message?.includes("503")) {
          if (i === retries - 1) throw err;
          console.warn(`Model unavailable (503). Retrying in ${backoff}ms... (Attempt ${i + 1} of ${retries})`);
          await new Promise(res => setTimeout(res, backoff));
          backoff *= 2; // Exponential backoff
        } else {
          throw err;
        }
      }
    }
  };

  const lenientSafety = [
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ];

  const parseOrFallback = (response, fallback) => {
    try {
      const text = response.text || response.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        console.warn("Empty response or blocked by safety settings", response);
        return fallback;
      }
      return JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse AI response", err);
      return fallback;
    }
  };

  app.post("/api/ai/getCalmWorldScenario", async (req, res) => {
    const fallback = {
      title: "Un lugar seguro",
      steps: [
        { text: "Respira profundamente y cierra los ojos.", action: "Inhala lento..." },
        { text: "Imagina una luz cálida a tu alrededor.", action: "Siente la calma..." },
        { text: "Todo está bien y estás a salvo aquí.", action: "Exhala y sonríe..." }
      ]
    };
    try {
      const { favorites } = req.body;
      const response = await generateWithRetry('gemini-3.6-flash', `Cosas favoritas del niño: ${favorites}`, {
          safetySettings: lenientSafety,
          systemInstruction: baseSystemInstruction + " Eres Juku. Crea una visualización guiada de mindfulness de exactamente 3 pasos ('Santuario Holográfico'), basada en sus cosas favoritas. Usa lenguaje mágico y poético. No uses situaciones de miedo.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              steps: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { text: { type: Type.STRING }, action: { type: Type.STRING } }, required: ["text", "action"] } }
            },
            required: ["title", "steps"]
          }
        });
      res.json(parseOrFallback(response, fallback));
    } catch (e) { 
      if (e?.status === 429 || e?.message?.includes('429') || e?.status === "RESOURCE_EXHAUSTED") {
        console.warn("AI Quota exceeded (429). Using fallback response.");
      } else {
        console.error("AI Error:", e);
      }
      res.json(fallback); 
    }
  });

  app.post("/api/ai/getBraveStoryStep", async (req, res) => {
    const fallback = {
      storyText: "El personaje toma un respiro y decide dar un paso adelante con valentía.",
      isOver: false,
      options: ["Seguir explorando", "Pedir ayuda a un amigo"]
    };
    try {
      const { protagonist, fear, previousStory, childAction } = req.body;
      const prompt = previousStory === "" 
        ? `Inicia un holo-cuento sobre ${protagonist} que tiene miedo a: ${fear}. SÉ SÚPER BREVE (1-2 frases). Dale 2 opciones muy cortas (texto mínimo).`
        : `Historia hasta ahora: ${previousStory}\n\nEl niño eligió: ${childAction}. SÉ SÚPER CORTO (1 frase). Dale 2 opciones nuevas o termina la historia.`;
      const response = await generateWithRetry('gemini-3.6-flash', prompt, {
          safetySettings: lenientSafety,
          systemInstruction: baseSystemInstruction + " Eres Pari, la paraba 'Modo Turbo'. Eres la narradora de 'Holo-Cuentos'. Haz oraciones minúsculas y llenas de emojis.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              storyText: { type: Type.STRING },
              isOver: { type: Type.BOOLEAN },
              options: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["storyText", "isOver", "options"]
          }
        });
      res.json(parseOrFallback(response, fallback));
    } catch (e) { 
      if (e?.status === 429 || e?.message?.includes('429') || e?.status === "RESOURCE_EXHAUSTED") {
        console.warn("AI Quota exceeded (429). Using fallback response.");
      } else {
        console.error("AI Error:", e);
      }
      res.json(fallback); 
    }
  });

  app.post("/api/ai/createMonsterTranslation", async (req, res) => {
    const fallback = {
      monsterName: "Glitchy",
      emoji: "👾",
      greeting: "¡Hola! Soy Glitchy, a veces me siento raro, ¡pero podemos arreglarlo juntos!"
    };
    try {
      const { feeling } = req.body;
      const response = await generateWithRetry('gemini-3.6-flash', `El niño siente en su cuerpo: "${feeling}". Conviértelo en un monstruo de emoción o glitch.`, {
          safetySettings: lenientSafety,
          systemInstruction: baseSystemInstruction + " Eres Juku, el oso jukumari holográfico. Tienes un 'Escáner Ciber-Emocional'. Externalizas la sensación física en un 'glitch' o pequeño monstruo de código con personalidad. El monstruo no es malo, solo expresa una emoción.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              monsterName: { type: Type.STRING },
              emoji: { type: Type.STRING },
              greeting: { type: Type.STRING }
            },
            required: ["monsterName", "emoji", "greeting"]
          }
        });
      res.json(parseOrFallback(response, fallback));
    } catch (e) { 
      if (e?.status === 429 || e?.message?.includes('429') || e?.status === "RESOURCE_EXHAUSTED") {
        console.warn("AI Quota exceeded (429). Using fallback response.");
      } else {
        console.error("AI Error:", e);
      }
      res.json(fallback); 
    }
  });

  app.post("/api/ai/chatWithMonsterAi", async (req, res) => {
    const fallback = { reply: "Entiendo cómo te sientes. A veces todos nos sentimos así. ¡Respira conmigo!" };
    try {
      const { monsterName, chatHistory, userMessage } = req.body;
      const response = await generateWithRetry('gemini-3.6-flash', `Historial:\n${chatHistory}\n\nNiño dice: ${userMessage}`, {
          safetySettings: lenientSafety,
          systemInstruction: baseSystemInstruction + ` Eres el glitch llamado ${monsterName}. Responde al niño de forma comprensiva, validando su emoción y ayudándole a calmarse para reparar el código.`,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: { reply: { type: Type.STRING } },
            required: ["reply"]
          }
        });
      res.json(parseOrFallback(response, fallback));
    } catch (e) { 
      if (e?.status === 429 || e?.message?.includes('429') || e?.status === "RESOURCE_EXHAUSTED") {
        console.warn("AI Quota exceeded (429). Using fallback response.");
      } else {
        console.error("AI Error:", e);
      }
      res.json(fallback); 
    }
  });

  app.post("/api/ai/getSocialScenario", async (_req, res) => {
    const fallback = {
      scenario: "Un amigo no quiere compartir su juguete en el recreo.",
      otherPersonInfo: "El amigo quiere jugar solo un rato más."
    };
    try {
      const response = await generateWithRetry('gemini-3.6-flash', `Genera un escenario social (alguien se burla, amigo no comparte, etc). MUY CORTO (10 palabras máximo). Lleno de emojis.`, {
          safetySettings: lenientSafety,
          systemInstruction: baseSystemInstruction + " Eres Quirqui, el armadillo con escudo. Plantea una situación realista de convivencia, súper corta, como un 'Simulador Social'.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              scenario: { type: Type.STRING },
              otherPersonInfo: { type: Type.STRING }
            },
            required: ["scenario", "otherPersonInfo"]
          }
        }
      );
      res.json(parseOrFallback(response, fallback));
    } catch (e) { 
      if (e?.status === 429 || e?.message?.includes('429') || e?.status === "RESOURCE_EXHAUSTED") {
        console.warn("AI Quota exceeded (429). Using fallback response.");
      } else {
        console.error("AI Error:", e);
      }
      res.json(fallback); 
    }
  });

  app.post("/api/ai/evaluateSocialResponseAction", async (req, res) => {
    const fallback = {
      reaction: "El amigo te escucha con atención.",
      isResolved: true,
      feedback: "Hablar tranquilo siempre ayuda a que los demás nos entiendan mejor."
    };
    try {
      const { scenario, childResponse } = req.body;
      const response = await generateWithRetry('gemini-3.6-flash', `Escenario: ${scenario}\n\nEl niño le dice/hace esto: "${childResponse}"`, {
          safetySettings: lenientSafety,
          systemInstruction: baseSystemInstruction + " Eres Quirqui. Evalúa si la respuesta resuelve el problema de forma asertiva, bajando los escudos defensivos (ganar-ganar). Si es agresiva o pasiva, explícale cómo se sintió la otra persona.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reaction: { type: Type.STRING },
              isResolved: { type: Type.BOOLEAN },
              feedback: { type: Type.STRING }
            },
            required: ["reaction", "isResolved", "feedback"]
          }
        });
      res.json(parseOrFallback(response, fallback));
    } catch (e) { 
      if (e?.status === 429 || e?.message?.includes('429') || e?.status === "RESOURCE_EXHAUSTED") {
        console.warn("AI Quota exceeded (429). Using fallback response.");
      } else {
        console.error("AI Error:", e);
      }
      res.json(fallback); 
    }
  });

  app.post("/api/ai/getThoughtMystery", async (_req, res) => {
    const fallback = {
      negative: "Nadie quiere jugar conmigo nunca.",
      options: [
        "A lo mejor hoy están ocupados con otro juego.",
        "Nunca me van a invitar a nada.",
        "Todos son malos conmigo."
      ],
      correctIndex: 0
    };
    try {
      const response = await generateWithRetry('gemini-3.6-flash', `Genera un 'bloque corrupto' (pensamiento distorsionado o negativo común en niños) y 3 opciones de pensamientos alternativos. MUY CORTO. CREA SITUACIONES NUEVAS Y VARIADAS.`, {
          safetySettings: lenientSafety,
          temperature: 0.9,
          systemInstruction: baseSystemInstruction + " Eres Pari, la paraba 'Modo Turbo'. Generas bloques de pensamiento para que el niño los repare. Una de las opciones debe ser la 'correcta' (pensamiento realista, positivo o neutral).",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              negative: { type: Type.STRING, description: "Pensamiento corrupto (ej. 'Soy un desastre porque me equivoqué')" },
              options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 opciones de pensamiento. Una de ellas debe ser la correcta y realista." },
              correctIndex: { type: Type.INTEGER, description: "El índice (0, 1 o 2) de la opción correcta." }
            },
            required: ["negative", "options", "correctIndex"]
          }
        });
      res.json(parseOrFallback(response, fallback));
    } catch (e) { 
      if (e?.status === 429 || e?.message?.includes('429') || e?.status === "RESOURCE_EXHAUSTED") {
        console.warn("AI Quota exceeded (429). Using fallback response.");
      } else {
        console.error("AI Error:", e);
      }
      res.json(fallback); 
    }
  });
  
  app.post("/api/ai/getThoughtDetectiveMystery", async (_req, res) => {
    const fallback = {
      situation: "Estás leyendo en voz alta y te trabas en una palabra.",
      negativeThought: "Todos creen que soy tonto y se van a reír.",
      clue: "Ayer, tu amigo también se trabó y nadie se burló de él."
    };
    try {
      const response = await generateWithRetry('gemini-3.6-flash', `Genera un caso de detective. Un niño en una situación escolar o de hogar tiene un pensamiento sombrío. Genera la situación, el pensamiento, y una pista que lo lleve a un pensamiento alternativo más realista y brillante. Todo debe ser muy corto, dinámico y diferente cada vez.`, {
          safetySettings: lenientSafety,
          systemInstruction: baseSystemInstruction + " Eres el Inspector Juku. Tu misión es enseñar a los niños a buscar evidencia para cambiar pensamientos negativos a pensamientos útiles y realistas. Varía mucho las situaciones (colegio, familia, amigos, deportes).",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              situation: { type: Type.STRING, description: "La situación. Ej. 'Estás leyendo en voz alta y te trabas en una palabra.'" },
              negativeThought: { type: Type.STRING, description: "Pensamiento sombrío. Ej. 'Todos creen que soy tonto.'" },
              clue: { type: Type.STRING, description: "Una pista para pensar diferente. Ej. 'Ayer, tu amiga María también se trabó y nadie se burló.'" }
            },
            required: ["situation", "negativeThought", "clue"]
          },
          temperature: 0.9
        }
      );
      res.json(parseOrFallback(response, fallback));
    } catch (e) { 
      if (e?.status === 429 || e?.message?.includes('429') || e?.status === "RESOURCE_EXHAUSTED") {
        console.warn("AI Quota exceeded (429). Using fallback response.");
      } else {
        console.error("AI Error:", e);
      }
      res.json(fallback); 
    }
  });

  app.post("/api/tts", async (req, res) => {
    try {
      const { text, voiceName, languageCode, ssmlGender, pitch, speakingRate } = req.body;
      const apiKey = process.env.GOOGLE_TTS_API_KEY || process.env.VITE_GOOGLE_TTS_API_KEY || process.env.GEMINI_API_KEY;
      
      if (!apiKey || !text) {
        return res.status(400).json({ error: "Missing API key or text" });
      }

      const response = await fetch(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text },
            voice: {
              languageCode: languageCode || 'es-US',
              name: voiceName || 'es-US-Neural2-B',
              ssmlGender: ssmlGender || 'MALE'
            },
            audioConfig: {
              audioEncoding: 'MP3',
              pitch: typeof pitch === 'number' ? pitch : 0,
              speakingRate: typeof speakingRate === 'number' ? speakingRate : 1.0
            }
          })
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.warn("TTS API response error:", response.status, errText);
        return res.status(response.status).json({ error: "TTS synthesis failed", details: errText });
      }

      const data = await response.json();
      return res.json({ audioContent: data.audioContent });
    } catch (e: any) {
      console.error("Server /api/tts error:", e);
      return res.status(500).json({ error: e.message || "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
