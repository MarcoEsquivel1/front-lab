import axios from "axios";
export const apiLab = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export default class ApiLabService {
    static async getAllFacturas() {
        const res = await apiLab.get("/facturas");
        return res.data;
    }

    static async postFactura(nombre: string, direccion: string, dui: string, fecha: Date, total: number) {
        const res2 = await apiLab.post("/facturas", {
            nombre: nombre,
            direccion: direccion,
            dui: dui,
            fecha: fecha,
            total: total
        });
        const res = this.getAllFacturas();
        return res;
    }

    static async updateFactura(id: number, nombre: string, direccion: string, dui: string, fecha: Date, total: number) {
        
        const res2 = await apiLab.put("/facturas/" + id, {
            nombre: nombre,
            direccion: direccion,
            dui: dui,
            fecha: fecha,
            total: total
        });
        const res = this.getAllFacturas();
        return res;
    }

    static async deleteFactura(id: number) {
        const res2 = await apiLab.delete("/facturas/" + id);
        const res = this.getAllFacturas();
        return res;
    }

    static async getAllDetalles(id: number) {
        const res = await apiLab.get("/detalles/" + id);
        return res.data;
    }

    static async postDetalle(facturaid: number, producto: string, cantidad: number, subtotal: number) {
        const res2 = await apiLab.post("/detalles", {
            facturaid: facturaid,
            producto: producto,
            cantidad: cantidad,
            subtotal: subtotal
        });
        const res = this.getAllDetalles(facturaid);
        return res;
    }

}

