import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import fetch from "node-fetch"
dotenv.config()
const app = express()
app.use(cors())



app.get("/api/weather",async (req,res)=>{
    const city = req.query.city;
    if(!city) return res.status(400).json({error:"City is required"})
        const apikey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    try {
       const response = await fetch(url) 
       const data = await response.json()
       if(data.cod != 200) return res.status(data.cod).json(data)
        res.json(data)
       
    } catch (error) {
       res.status(500).json({error:"Failed to fetch weather"}) 
    }
})

//City suggestions
app.get("/api/city-suggestions", async (req, res) => {
  const query = req.query.name; // ✅ fixed here
  if (!query)
    return res.status(400).json({ error: "City name prefix is required" });

  const rapidApiKey = process.env.X_RAPID_API_KEY;
  const apiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`;
  try {
    const response = await fetch(apiUrl, {
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    });
    const data = await response.json();
    res.json(data.data);
  } catch (error) {
    res.status(500).json({ error: "Error in fetch cities" });
  }
});


app.listen(5000,()=>console.log("Backend running of http://localhost:5000"))