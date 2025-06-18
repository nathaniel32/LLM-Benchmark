export async function prompt_bot(url, temperature, model, messages) {
    try {
        const response = await fetch(url, {
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
        console.log(result);

        const content = result.message.content;
        const think_match = content.match(/<think>([\s\S]*?)<\/think>/);
        return {
            think: think_match ? think_match[1].trim() : '',
            final: content.replace(/<think>[\s\S]*?<\/think>/, '').trim(),
            total_duration: result.total_duration
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}