import {create} from 'zustand';
import { FacturaContext, FacturaContextInterface } from './FacturaContext';
import { DetalleContext, DetalleContextInterface } from './DetalleContext';

type StoreState = FacturaContextInterface;

export const useAppStore = create<StoreState>(FacturaContext);