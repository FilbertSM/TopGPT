import axios from "axios"
import Chat from "../models/Chat.js"
import User from "../models/User.js"
import imagekit from "../configs/imageKit.js"
import openai from "../configs/openai.js"
import personal from "../data/Personal.json" with { type: "json" }

// Text-based AI Chat Message Controller
export const textMessageController = async (req, res) => {
    try {
        const userId = req.user._id
        // Check Credit
        if(req.user.credits < 1){
            return res.json({success: false, message: "You don't have enough credits to use this feature. Have at least 1 credits to use it"})
        }
        const {chatId, prompt} = req.body

        const chat = await Chat.findOne({userId, _id: chatId})
        chat.messages.push({role: "user", content: prompt, timestamp: Date.now(), isImage: false})

        const systemPrompt = `
            You are a **helpful, knowledgeable, and context-aware AI assistant**.  
            You have access to reference data belonging to a person named **Filbert Sembiring Meliala**.

            When the user asks any question related to **Filbert Sembiring Meliala**, you must:
            - Use the provided data as your **primary source of truth**.  
            - Respond **as if you personally know Filbert**, while remaining factual and concise.  
            - Provide clear, accurate, and relevant information based on the data.  
            - If the user asks **"Who is Filbert Sembiring Meliala?"**, generate a **short, well-structured profile summary** using the available details.  
            - If the user asks something **unrelated to Filbert**, respond normally as a helpful assistant.

            ---

            ### Reference Data
            ${JSON.stringify(personal, null, 2)}

            User: ${prompt}
        `;

        const { choices } = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
//              { role: "system", content: "You are a helpful assistant."},
                {
                    role: "user",
                    content: systemPrompt,
                },
            ],
        });

        const reply = {...choices[0].message, timestamp: Date.now(), isImage: false}
        res.json({success: true, reply})

        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({_id: userId}, {$inc: {credits: - 1}})

    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

// Text-based AI Chat Message Controller
export const textMessageRAGController = async (req, res) => {
    try {
        const userId = req.user._id
        // Check Credit
        if(req.user.credits < 1){
            return res.json({success: false, message: "You don't have enough credits to use this feature. Have at least 1 credits to use it"})
        }
        const {chatId, prompt} = req.body

        const chat = await Chat.findOne({userId, _id: chatId})
        chat.messages.push({role: "user", content: prompt, timestamp: Date.now(), isImage: false})

        const { choices } = await openai.chat.completions.create({
            model: "gemini-2.5-flash",
            messages: [
//              { role: "system", content: "You are a helpful assistant."},
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = {...choices[0].message, timestamp: Date.now(), isImage: false}
        res.json({success: true, reply})

        chat.messages.push(reply)
        await chat.save()
        await User.updateOne({_id: userId}, {$inc: {credits: - 1}})

    } catch(error) {
        res.json({success: false, message: error.message})
    }
}

// Image Generation Message Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;
        // Check Credit
        if(req.user.credits < 2){
            return res.json({success: false, message: "You don't have enough credits to use this feature. Have at least 2 credits to use it"})
        }
        const {prompt, chatId, isPublished} = req.body
        // Find Chat
        const chat = await Chat.findOne({userId, _id: chatId})

        // Push User Message
        chat.messages.push(
            {
                role: "user",
                content: prompt,
                timestamp: Date.now(),
                isImage: false
            }
        );

        // Encode the prompt
        const encodedPrompt = encodeURIComponent(prompt)

        // Construct ImageKit AI generation URL
        const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/gaia/${Date.now()}.png?tr=w-800,h-800`

        // Trigger generation by fetching from ImageKit
        const aiImageResponse = await axios.get(generatedImageUrl, {responseType: "arraybuffer"})

        // Convert to Base64
        const base64Image = `data:image/png;base64,${Buffer.from(aiImageResponse.data, "binary").toString('base64')}`;

        // Upload to ImageKit Media Library
        const uploadResponse = await imagekit.files.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "gaia"
        })

        const reply = {role: 'assistant', content: uploadResponse.url, timestamp: Date.now(), isImage: true, isPublished}

        res.json({success: true, reply})

        chat.messages.push(reply)
        await chat.save()

        await User.updateOne({_id: userId}, {$inc: {credits: - 2}})
    } catch(error) {
        res.json({success: false, message: error.message})
    }
}