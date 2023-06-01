import { StateCreator } from "zustand";
import { Factura, FacturasList } from "../interfaces";
import { get } from 'http';
import ApiLabService from "@/api/apiLab";

export interface FacturaContextInterface{
    facturas: Factura[];
    getFacturas: () => Promise<void>;
    postFactura: (nombre: string, direccion: string, dui: string, fecha: Date, total: number) => Promise<void>;
    updateFactura: (id: number, nombre: string, direccion: string, dui: string, fecha: Date, total: number) => Promise<void>;
    deleteFactura: (id: number) => Promise<void>;
}

export const FacturaContext: StateCreator<FacturaContextInterface> = (set) => ({
    facturas: [],
    getFacturas: async () => {
        const res = await ApiLabService.getAllFacturas();
        set({ facturas: res });
    },
    postFactura: async (nombre: string, direccion: string, dui: string, fecha: Date, total: number) => {
        const res = await ApiLabService.postFactura(nombre, direccion, dui, fecha, total);
        set({ facturas: res });
    },
    updateFactura: async (id: number, nombre: string, direccion: string, dui: string, fecha: Date, total: number) => {
        const res = await ApiLabService.updateFactura(id, nombre, direccion, dui, fecha, total);
        set({ facturas: res });
    },
    deleteFactura: async (id: number) => {
        const res = await ApiLabService.deleteFactura(id);
        set({ facturas: res });
    }
});