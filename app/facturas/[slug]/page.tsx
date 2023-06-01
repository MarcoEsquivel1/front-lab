"use client"
import { Detalle, Factura } from "@/interfaces";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppStore } from "@/context/store";
import { Modal, Button, Text, Input, Grid } from "@nextui-org/react";
import Link from "next/link";



export default function DetailsPage({params}) {
    const { detalles, getDetalles, postDetalle } = useAppStore();
    const router = useRouter();

    const [lDetalles, setlDetalles] = React.useState<Detalle[]>(detalles);
    const [DetalleEdit, setDetalleEdit] = React.useState<Detalle>({} as Detalle);
    const [DetalleDelete, setDetalleDelete] = React.useState<Detalle>({} as Detalle);
    const [producto, setProducto] = React.useState('');
    const [cantidad, setCantidad] = React.useState('');
    const [subtotal, setSubtotal] = React.useState('');
    const [error, setError] = React.useState(false);

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

    const agregarDetalle = () => {
        if(producto.trim() === '' || cantidad.trim() === '' || subtotal.trim() === '') {
            setError(true);
            return;
        }
        postDetalle(params.slug, producto, cantidad, subtotal);
        closeHandler();
    };

    const editarDetalle = () => {
        // if (nombre.trim() === '' || direccion.trim() === '' || dui.trim() === '' || fecha.trim() === '' || total === '') {
        //     setError(true);
        //     return;
        // }
        // updateFactura(FacturaEdit.idfactura, nombre, direccion, dui, fecha, total);
        closeEditHandler();
    };

    const eliminarDetalle = () => {
        // deleteFactura(FacturaDelete.idfactura);
        closeDeleteHandler();
    };

    useEffect(() => {
        getDetalles(params.slug);
    }, []);
    
    useEffect(() => {
        setlDetalles(detalles);
    }, [detalles]);

    useEffect(() => {
        setProducto('');
        setCantidad('');
        setSubtotal('');
        setError(false);
    }
    , [visible, edit, deleteM]);

    useEffect(() => {
        setProducto(DetalleEdit.producto);
        setCantidad(DetalleEdit.cantidad);
        setSubtotal(DetalleEdit.subtotal);
        setError(false);
    }, [DetalleEdit]);

    return (
        <main className="flex flex-col min-h-full items-center justify-center p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                <p className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0">
                    <span className="flex text-xl font-bold text-gray-900 dark:text-gray-100 lg:text-3xl">
                        Detalles de factura: {params.slug}
                    </span>
                </p>
            </div>
        </div>

        <div className="flex flex-col min-w-full divide-y mt-5">
            <div className="flex flex-row justify-end">
                <Button
                    onClick={handler}
                    className="mb-4"
                >
                    Agregar nuevo detalle
                </Button>
            </div>

            <table className=" divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Producto
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cantidad
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Subtotal
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {lDetalles.map((detalle) => (
                        <tr key={detalle.iddetalle}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {detalle.iddetalle}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {detalle.producto}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {detalle.cantidad}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                ${detalle.subtotal}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                    onClick={() => {
                                        
                                        editHandler();
                                    }}
                                    className="text-indigo-600 hover:text-indigo-900"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => {
                                        
                                        deleteHandler();
                                    }}
                                    className="text-red-600 hover:text-red-900 ml-2"
                                >
                                    Eliminar
                                </button>
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
                    Agregar detalle
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
                                placeholder="Producto"
                                value={producto}
                                onChange={(e) => setProducto(e.target.value)}
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
                                placeholder="Cantidad"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                type="number"
                                min={1}
                                step={1}
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
                                placeholder="Subtotal"
                                value={subtotal}
                                onChange={(e) => setSubtotal(e.target.value)}
                                type="number"
                                min={0}
                                step={0.01}
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
                <Button auto onPress={agregarDetalle}>
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
                                placeholder="Producto"
                                value={producto}
                                onChange={(e) => setProducto(e.target.value)}
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
                                placeholder="Cantidad"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                type="number"
                                min={1}
                                step={1}
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
                                placeholder="Subtotal"
                                value={subtotal}
                                onChange={(e) => setSubtotal(e.target.value)}
                                type="number"
                                min={0}
                                step={0.01}
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
                <Button auto onPress={editarDetalle}>
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
                    Eliminar detaller
                </Text>
                </Modal.Header>
                <Modal.Body autoMargin>
                    <Text b size={16} color="error" className="my-2 mx-5">¿Está seguro de eliminar el detalle seleccionado?</Text>
                </Modal.Body>
                <Modal.Footer>
                <Button auto flat color="error" onPress={closeDeleteHandler}>
                    Cancelar
                </Button>
                <Button auto onPress={eliminarDetalle}>
                    Eliminar
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    </main>   
    )
}