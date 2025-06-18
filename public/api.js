export async function get_all_category() {
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