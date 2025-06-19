// --------------------- Category ---------------------
export async function api_create_category(c_category) {
    try {
        const response = await fetch("../category", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                c_category
            })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

export async function api_delete_category(c_id) {
    try {
        const response = await fetch("../category/" + c_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

export async function api_get_all_categories() {
    try {
        const response = await fetch("../category", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

// --------------------- Hub ---------------------
export async function api_run_hub_sql(sql) {
    try {
        const response = await fetch("../hub/"+ encodeURIComponent(sql), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

export async function api_get_hub_sql_schema() {
    try {
        const response = await fetch("../schema", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}
// --------------------- Model ---------------------
export async function api_create_model(c_model) {
    try {
        const response = await fetch("../model", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                c_model
            })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

export async function api_delete_model(c_id) {
    try {
        const response = await fetch("../model/" + c_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

export async function api_get_all_models() {
    try {
        const response = await fetch("../model", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

// --------------------- Input ---------------------
export async function api_delete_input(c_id) {
    try {
        const response = await fetch("../input/" + c_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

export async function api_get_all_inputs() {
    try {
        const response = await fetch("../input", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

// --------------------- Output ---------------------
export async function api_delete_output(c_id) {
    try {
        const response = await fetch("../output/" + c_id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}

export async function api_get_all_outputs() {
    try {
        const response = await fetch("../output", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${result.error}`);
        }
        return {
            error: false,
            messages: "ok",
            data: result
        }
    } catch (error) {
        console.error("Error:", error);
        return {error: true, message: error, data: null};
    }
}