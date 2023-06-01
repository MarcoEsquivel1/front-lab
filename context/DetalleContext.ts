import { StateCreator } from "zustand";
import { Detalle, DetallesList } from "../interfaces";
import { get } from 'http';
import ApiLabService from "@/api/apiLab";

export interface DetalleContextInterface{
    detalles: Detalle[];
    getDetalles: () => Promise<void>;
}

export const DetalleContext: StateCreator<DetalleContextInterface> = (set) => ({
    detalles: [],
    getDetalles: async () => {
        const res = await ApiLabService.getAllDetalles();
        set({ detalles: res });
    }
});