import {createPortal} from "react-dom";
import {useEffect, useState} from "react";
import type {ReactNode} from "react";
interface ModalProps {
    isOpen:boolean;
    onClose:() => void;
    children:ReactNode;
}
export const Modal = ({isOpen, onClose, children} :ModalProps) => {
    const [mounted, setMounted] = useState<boolean>(true);
    useEffect(() => {setMounted((true))}, [])

    if(!isOpen || !mounted) return null;

    const modalRoot = document.getElementById("modal-root");
    return createPortal(<div className={"fixed inset-0 flex items-center justify-center bg-black/50 z-50"}>
        <div className={"absolute inset-0"} onClick={onClose} />
        <div className={"relative z-10 bg-white p-6 rounded-lg shadow-xl"}>{children}</div>
    </div>, modalRoot);
}