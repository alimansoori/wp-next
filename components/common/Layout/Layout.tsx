import {FC} from "react"

const Layout: FC = ({children}) => {
    return (
        <div className={`Layout`}>
            {children}
        </div>
    )
}

export default Layout