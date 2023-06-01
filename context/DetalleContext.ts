import { StateCreator } from "zustand";
import { Detalle, DetallesList } from "../interfaces";
import { get } from 'http';
import ApiLabService from "@/api/apiLab";

export interface DetalleContextInterface{
    detalles: Detalle[];
    getDetalles: (id: number) => Promise<void>;
}

export const DetalleContext: StateCreator<DetalleContextInterface> = (set) => ({
    detalles: [],
    getDetalles: async (id: number) => {
        const res = await ApiLabService.getAllDetalles(id);
        set({ detalles: res });
    }
});