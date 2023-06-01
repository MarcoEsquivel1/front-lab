'use client';  
import React, { useState, useEffect, use } from "react";
import { Modal, Button, Text, Input, Grid } from "@nextui-org/react";
import { useAppStore } from "@/context/store";
import { Factura } from "../interfaces/index"
import { useRouter } from "next/navigation";
import Link from "next/link";

const FacturasTable = ({  }) => {
    const { facturas, getFacturas, postFactura, updateFactura, deleteFactura } = useAppStore();
    const router = useRouter();

    const [lFacturas, setlFacturas] = useState<Factura[]>([]);
    const [FacturaEdit, setFacturaEdit] = useState<Factura>({} as Factura);
    const [FacturaDelete, setFacturaDelete] = useState<Factura>({} as Factura);
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dui, setDui] = useState('');
    const [fecha, setFecha] = useState('');
    const [total, setTotal] = useState('');
    const [error, setError] = useState(false);

    const [visible, setVisible] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [deleteM, setDeleteM] = React.useState(false);

    const handler = () => setVisible(true);
    const editHandler = () => {
        setEdit(true)
    };
    const deleteHandler = () => setDeleteM(true);

    const closeHandler = () => {
        setVisible(false);
    };

    const closeEditHandler = () => {
        setEdit(false);
    };

    const closeDeleteHandler = () => {
        setDeleteM(false);
    };

    const agregarFactura = () => {
        if (nombre.trim() === '' || direccion.trim() === '' || dui.trim() === '' || fecha.trim() === '' || total.trim() === '') {
            setError(true);
            return;
        }
        postFactura(nombre, direccion, dui, fecha, total);
        closeHandler();
    };

    const editarFactura = () => {
        if (nombre.trim() === '' || direccion.trim() === '' || dui.trim() === '' || fecha.trim() === '' || total === '') {
            setError(true);
            return;
        }
        updateFactura(FacturaEdit.idfactura, nombre, direccion, dui, fecha, total);
        closeEditHandler();
    };

    const eliminarFactura = () => {
        deleteFactura(FacturaDelete.idfactura);
        closeDeleteHandler();
    };

    useEffect(() => {
        getFacturas();
    }
    , []);

    useEffect(() => {
        setlFacturas(facturas);
    }
    , [facturas]);

    useEffect(() => {
        setNombre('');
        setDireccion('');
        setDui('');
        setFecha('');
        setTotal('');
    }
    , [visible, edit, deleteM]);

    useEffect(() => {
        setNombre(FacturaEdit.nombre);
        setDireccion(FacturaEdit.direccion);
        setDui(FacturaEdit.dui);
        setFecha(FacturaEdit.fecha);
        setTotal(FacturaEdit.total);
    }, [FacturaEdit]);

    return (
        <div className="flex flex-col min-w-full divide-y mt-5">
            <div className="flex flex-row justify-end">
                <Button
                    onClick={handler}
                    className="mb-4"
                >
                    Agregar nueva factura
                </Button>
            </div>

            <table className=" divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dirección
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            DUI
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {lFacturas.map((factura) => (
                        <tr key={factura.idfactura}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {factura.idfactura}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {factura.nombre}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {factura.direccion}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {factura.dui}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {factura.fecha.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${factura.total}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                    onClick={() => {
                                        setFacturaEdit(factura);
                                        editHandler();
                                    }}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => {
                                        setFacturaDelete(factura);
                                        deleteHandler();
                                    }}
                                    className="text-red-600 hover:text-red-900 ml-2"
                                >
                                    Eliminar
                                </button>
                                <Link href={{ pathname: `/facturas/${factura.idfactura}`}}
                                    className="text-green-600 hover:text-green-900 ml-2"
                                >
                                    Ver detalles 
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <Modal 
                closeButton
                blur
                preventClose
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>
                <Text id="modal-title" b size={28}>
                    Agregar factura
                </Text>
                </Modal.Header>
                <Modal.Body autoMargin>
                    <Grid.Container gap={3}>
                        <Grid>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="xl"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type="text"
                                minLength={3}
                                required
                            />
                        </Grid>
                        <Grid>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="xl"
                                placeholder="Dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                type="text"
                                minLength={3}
                                required
                            />
                        </Grid>
                        <Grid>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="xl"
                                placeholder="DUI"
                                value={dui}
                                onChange={(e) => setDui(e.target.value)}
                                type="text"
                                minLength={3}
                                required
                            />
                        </Grid>
                        <Grid>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="xl"
                                placeholder="Fecha"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                type="date"
                                required
                            />
                        </Grid>
                        <Grid>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="xl"
                                placeholder="Total"
                                value={total}
                                onChange={(e) => setTotal(e.target.value)}
                                type="number"
                                step={0.01}
                                min={0}
                                required
                            />
                        </Grid>
                    </Grid.Container>
                    <Text b size={16} color="error" className="my-2 mx-5">{error ? 'Todos los campos son requeridos' : ''}</Text>
                </Modal.Body>
                <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    Cancelar
                </Button>
                <Button auto onPress={agregarFactura}>
                    Agregar
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal 
                closeButton
                blur
                preventClose
                aria-labelledby="modal-title"
                open={edit}
                onClose={closeEditHandler}
            >
                <Modal.Header>
                <Text id="modal-title" b size={28}>
                    Editar factura
                </Text>
                </Modal.Header>
                <Modal.Body autoMargin>
                    <Grid.Container gap={3}>
                        <Grid>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="xl"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                type="text"
                                minLength={3}
                                required
                            />
                        </Grid>
                        <Grid>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="xl"
                                placeholder="Dirección"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                type="text"
                                minLength={3}
                                required
                            />
                        </Grid>
                        <Grid>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="xl"
                                placeholder="DUI"
                                value={dui}
                                onChange={(e) => setDui(e.target.value)}
                                type="text"
                                minLength={3}
                                required
                            />
                        </Grid>
                        <Grid>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="xl"
                                placeholder="Fecha"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                type="date"
                                required
                            />
                        </Grid>
                        <Grid>
                            <Input
                                clearable
                                bordered
                                fullWidth
                                color="primary"
                                size="xl"
                                placeholder="Total"
                                value={total}
                                onChange={(e) => setTotal(e.target.value)}
                                type="number"
                                step={0.01}
                                min={0}
                                required
                            />
                        </Grid>
                    </Grid.Container>
                    <Text b size={16} color="error" className="my-2 mx-5">{error ? 'Todos los campos son requeridos' : ''}</Text>
                </Modal.Body>
                <Modal.Footer>
                <Button auto flat color="error" onPress={closeEditHandler}>
                    Cancelar
                </Button>
                <Button auto onPress={editarFactura}>
                    Editar
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal 
                closeButton
                blur
                preventClose
                aria-labelledby="modal-title"
                open={deleteM}
                onClose={closeDeleteHandler}
            >
                <Modal.Header>
                <Text id="modal-title" b size={28}>
                    Eliminar factura
                </Text>
                </Modal.Header>
                <Modal.Body autoMargin>
                    <Text b size={16} color="error" className="my-2 mx-5">¿Está seguro de eliminar la factura seleccionada?</Text>
                </Modal.Body>
                <Modal.Footer>
                <Button auto flat color="error" onPress={closeDeleteHandler}>
                    Cancelar
                </Button>
                <Button auto onPress={eliminarFactura}>
                    Eliminar
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FacturasTable;
