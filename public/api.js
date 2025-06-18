export async function api_get_all_categories() {
    try {
        const response = await fetch("./category", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function api_get_all_models() {
    try {
        const response = await fetch("./model", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}

export async function api_create_input(c_input, c_note, t_category_id) {
    //console.log("=======================================");
    //console.log(c_input);
    //console.log(t_category_id);
    //console.log("=======================================");
    try {
        const response = await fetch("./input", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                c_input,
                c_note,
                t_category_id
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        return error;
    }
}

export async function api_create_output(c_output_think, c_output_final, c_total_duration, c_load_duration, c_prompt_eval_count, c_prompt_eval_duration, c_eval_count, c_eval_duration, c_score, c_note, t_input_id, t_model_id) {
    console.log("=======================================");
    console.log(c_output_think);
    console.log(c_output_final);
    console.log(c_total_duration);
    console.log(c_load_duration);
    console.log(c_prompt_eval_count);
    console.log(c_prompt_eval_duration);
    console.log(c_eval_count);
    console.log(c_eval_duration);
    console.log(c_score);
    console.log(c_note);
    console.log(t_input_id);
    console.log(t_model_id);
    console.log("=======================================");
    try {
        const response = await fetch("./output", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                c_output_think,
                c_output_final,
                c_total_duration,
                c_load_duration,
                c_prompt_eval_count,
                c_prompt_eval_duration,
                c_eval_count,
                c_eval_duration,
                c_score,
                c_note,
                t_input_id,
                t_model_id
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
}