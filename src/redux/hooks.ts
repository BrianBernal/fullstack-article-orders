// libraries
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// redux
import { TAppDispatch, TRootState } from "./store";

const useAppDispatch: () => TAppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export { useAppDispatch, useAppSelector };
