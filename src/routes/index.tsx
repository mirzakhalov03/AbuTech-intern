import { useRoutes } from "react-router-dom"
import Home from "./home/Home"
import Private from "./private/Private"
import Contracts from "./contracts/Contracts"

const RouteController = () => {
  return useRoutes([
    {
        path: "",
        element: <Home />,

    },
    {
        path: "/dashboard",
        element: <Private/>,
        children: [
            {
                path: "",
                element: <Contracts/>
            }
        ]

    }
    
  ])
}

export default RouteController