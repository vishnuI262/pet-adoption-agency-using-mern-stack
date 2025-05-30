import {create} from "zustand";
import { useState } from "react";

export const usePetStore = create((set) => ({
    pets: [],
    token: localStorage.getItem("token") || null,

    setToken: (token) => {
        localStorage.setItem("token", token);
        set({ token });
    },

    logout: () => {
        localStorage.removeItem("token");
        set({ token: null });
    },
    addPet: (pet) => set((state) => ({ pets: [...state.pets, pet] })),
    createPet:async(newPet) => {
        if(!newPet.name || !newPet.type || !newPet.breed || !newPet.age || !newPet.image) {
            return {success: false, message: "All fields are required"};
        }
        console.log("Sending petData : ",newPet);
        const res = await fetch("/api/pets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPet)
        })
        const data = await res.json();
        set((state) => ({pets: [...state.pets, data.data]}));
        return {success: true, message: "Pet added successfully"}
    },
    fetchPets : async () => {
        const res = await fetch("/api/pets");
        const data = await res.json();
        set({pets: data.data});
    },
    deletePet : async (pid) => {
        const res = await fetch(`/api/pets/${pid}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if(!data.success) return { success:false, message: data.message};
        set(state => ({pets: state.pets.filter(pet => pet._id !== pid)}));
        return { success: true, message: "Pet deleted successfully"};
    },
    updatePet : async (pid, updatedPet) => {
        const res = await fetch(`/api/pets/${pid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPet)
        });
        const data = await res.json();
        if(!data.success) return { success:false, message: data.message};
        set(state => ({pets: state.pets.map(pet => pet._id === pid ? data.data : pet)}));
        return { success: true, message: "Pet updated successfully"};
    }
}));

