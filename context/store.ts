import {create} from 'zustand';
import { FacturaContext, FacturaContextInterface } from './FacturaContext';

type StoreState = FacturaContextInterface;

export const useAppStore = create<StoreState>(FacturaContext);