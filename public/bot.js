export async function prompt_bot_chat(url, temperature, model, messages) {
    try {
        const response = await fetch(url+'/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                messages: messages,
                stream: false,
                options: {'temperature': temperature}
            })
        });
        const result = await response.json();
        //console.log(result);

        const content = result.message.content;
        const think_match = content.match(/<think>([\s\S]*?)<\/think>/);
        return {
            error: false,
            messages: "ok",
            data: {
                think: think_match ? think_match[1].trim() : null,
                final: content.replace(/<think>[\s\S]*?<\/think>/, '').trim(),
                total_duration: result.total_duration,
                load_duration: result.load_duration,
                prompt_eval_count: result.prompt_eval_count,
                prompt_eval_duration: result.prompt_eval_duration,
                eval_count: result.eval_count,
                eval_duration: result.eval_duration
            }
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

export async function prompt_bot_generate(url, temperature, model, prompt) {
    try {
        const response = await fetch(url+'/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                stream: false,
                options: {'temperature': temperature}
            })
        });
        const result = await response.json();
        console.log(result);

        const content = result.response;
        const think_match = content.match(/<think>([\s\S]*?)<\/think>/);
        return {
            error: false,
            messages: "ok",
            data: {
                think: think_match ? think_match[1].trim() : null,
                final: content.replace(/<think>[\s\S]*?<\/think>/, '').trim(),
                total_duration: result.total_duration,
                load_duration: result.load_duration,
                prompt_eval_count: result.prompt_eval_count,
                prompt_eval_duration: result.prompt_eval_duration,
                eval_count: result.eval_count,
                eval_duration: result.eval_duration
            }
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}