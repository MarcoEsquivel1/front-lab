import { StateCreator } from "zustand";
import { Detalle, DetallesList } from "../interfaces";
import { get } from 'http';
import ApiLabService from "@/api/apiLab";

export interface DetalleContextInterface{
    detalles: Detalle[];
    getDetalles: (id: number) => Promise<void>;
    postDetalle: (facturaid: number, producto: string, cantidad: number, subtotal: number) => Promise<void>;
    updateDetalle: (iddetalle: number, producto: string, cantidad: number, subtotal: number, idfactura: number) => Promise<void>;
}

export const DetalleContext: StateCreator<DetalleContextInterface> = (set) => ({
    detalles: [],
    getDetalles: async (id: number) => {
        const res = await ApiLabService.getAllDetalles(id);
        set({ detalles: res });
    },
    postDetalle: async (facturaid: number, producto: string, cantidad: number, subtotal: number) => {
        const res = await ApiLabService.postDetalle(facturaid, producto, cantidad, subtotal);
        set({ detalles: res });
    },
    updateDetalle: async (iddetalle: number, producto: string, cantidad: number, subtotal: number, idfactura: number) => {
        const res = await ApiLabService.updateDetalle(iddetalle, producto, cantidad, subtotal, idfactura);
        set({ detalles: res });
    }
});