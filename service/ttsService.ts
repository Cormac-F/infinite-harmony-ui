// import { OpenAI } from 'openai';
// import Redis from 'ioredis';

// const openai = new OpenAI();
// const redis = new Redis(); // Connect to Redis

// async function generateAudio(id: string) {
//     // Check if the audio file is in the cache
//     const cachedAudio = await redis.get(id);
//     if (cachedAudio) {
//         // If it is, return the cached file
//         return cachedAudio;
//     } else {
//         // If it's not, generate the audio file
//         const audioFile = await openai.generateSpeech(id);

//         // Store the audio file in the cache
//         await redis.set(id, audioFile);

//         // Return the audio file
//         return audioFile;
//     }
// }