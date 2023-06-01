export interface Factura {
    detalleList: any[];
    direccion:   string;
    dui:         string;
    fecha:       Date;
    idfactura:   number;
    nombre:      string;
    total:       number;
}

export interface FacturasList {
    facturas: Factura[];
}