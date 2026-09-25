import express from "express";
import { GoogleGenAI } from "@google/genai";

export const aiRouter = express.Router();

aiRouter.get("/test-gemini", async (req, res) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    const r = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: "Say hello and confirm you are working",
    });
    res.json({ success: true, text: r.text });
  } catch (err: any) {
    res.json({ success: false, error: err.message, stack: err.stack });
  }
});

aiRouter.post("/agent/chat", async (req, res) => {
  const { query, systemPrompt, model, apiKey, apiPort, apiHost } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: "Query is required." });
  }

  const activeKey = apiKey || process.env.PHRS_DEEPSEEK_KEY || "";
  
  if (!activeKey || activeKey.trim() === "") {
    return res.status(400).json({ error: "మీ DeepSeek API కీ సెట్ చేయబడలేదు. దయచేసి '5G Bridge Config' (సెట్టింగ్స్) ప్యానెల్ లో మీ సొంత DeepSeek API కీని కాన్ఫిగర్ చేయండి." });
  }

  const selectedModel = model || "deepseek-chat";

  try {
    const messages = [];
    if (systemPrompt) {
      messages.push({ role: "system", content: systemPrompt });
    }
    messages.push({ role: "user", content: query });

    let host = apiHost || process.env.PHRS_DEEPSEEK_HOST || "https://api.deepseek.com";
    let port = apiPort || process.env.PHRS_DEEPSEEK_PORT || "";
    
    let urlBase = host.trim();
    if (port && port.trim() !== "") {
      const portStr = port.trim();
      if (urlBase.startsWith("http://") || urlBase.startsWith("https://")) {
        try {
          const urlObj = new URL(urlBase);
          urlObj.port = portStr;
          urlBase = urlObj.toString();
        } catch (e) {
          urlBase = `${urlBase}:${portStr}`;
        }
      } else {
        urlBase = `http://${urlBase}:${portStr}`;
      }
    }
    
    if (urlBase.endsWith("/")) {
      urlBase = urlBase.slice(0, -1);
    }
    
    let finalUrl = `${urlBase}/v1/chat/completions`;
    if (urlBase.includes("/v1")) {
      finalUrl = `${urlBase}/chat/completions`;
    }

    console.log(`[DEEPSEEK API] Dispatching request to: ${finalUrl} with model: ${selectedModel}`);
    
    const response = await fetch(finalUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${activeKey}`
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: messages,
        temperature: 0.6,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[DEEPSEEK API WARNING] Response failure, trying Gemini fallback:`, errText);
      
      // Automatic fallback to Gemini if API key is present
      if (process.env.GEMINI_API_KEY) {
          console.log("[GEMINI FALLBACK] Dispatching request to Gemini API...");
          // Fallback logic here if needed
          res.status(500).json({ error: "DeepSeek API failed, Gemini fallback not fully implemented." });
      } else {
          res.status(500).json({ error: "DeepSeek API failed." });
      }
      return;
    }

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    console.error("[DEEPSEEK INTEGRATION EXCEPTION], trying Gemini fallback:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
