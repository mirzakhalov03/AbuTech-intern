const base_url = import.meta.env.VITE_BASE_URL

export const EditContract = async (id: number, data: any) => {
        try {
            const response = await fetch(`${base_url}/contracts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                throw new Error("Xatolik yuz berdi");
            }
    
            return response.json();
        } catch (error) {
            console.error("Xatolik:", error);
            throw error;
        }
    };