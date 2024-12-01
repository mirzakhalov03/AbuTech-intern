const base_url = import.meta.env.VITE_BASE_URL;

export const UploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("files", file);

    try {
        const response = await fetch(`${base_url}/upload/contract/attachment`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload file. Status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Upload result:", result);
        return result;
    } catch (error) {
        console.error("UploadFile error:", error);
        throw error; 
    }
};
