import type {ReactNode} from "react";

export const H1 = ({children} : {children:ReactNode }) => {
    return <h1 className={"text-3xl font-extrabold"}>
        {children}
    </h1>
}

export const H2 = ({children} : {children:ReactNode }) => {
    return <h2 className={"text-2xl font-bold"}>{children}</h2>
}
export const H3 = ({children} : {children:ReactNode }) => {
    return <h3 className={"text-xl font-semibold"}>{children}</h3>
}
export const H4 = ({children} : {children:ReactNode }) => {
    return <h5 className={"text-lg"}>{children}</h5>
}

export const Paragraph = ({children} : {children:ReactNode }) => {
    return <p className={"text-lg"}>{children}</p>
}
