import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store.ts";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>()
