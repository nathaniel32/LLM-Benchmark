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