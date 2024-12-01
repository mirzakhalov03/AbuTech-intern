import { CreateContract } from "../../types";

// const base_url = import.meta.env.VITE_BASE_URL


export const createContract = async (data: CreateContract) => {
    try {
      const response = await fetch(`https://dev.api-erp.najotedu.uz/api/staff/contracts/create`, {
        method: "POST",
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