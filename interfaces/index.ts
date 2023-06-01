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

export interface Detalle {
    cantidad:  number;
    facturaid: number;
    iddetalle: number;
    producto:  string;
    subtotal:  number;
}

export interface DetallesList {
    detalles: Detalle[];
}
