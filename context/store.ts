import {create} from 'zustand';
import { FacturaContext, FacturaContextInterface } from './FacturaContext';
import { DetalleContext, DetalleContextInterface } from './DetalleContext';

type StoreState = FacturaContextInterface & DetalleContextInterface;

export const useAppStore = create<StoreState>()((...a) => ({
    ...FacturaContext(...a),
    ...DetalleContext(...a)
}));