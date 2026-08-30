import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faChartBar, 
    faListCheck,
    faFile,
    faShield,
    faFolder,
    faGear,
    faCode,
    faFontAwesome,
    faWebAwesome,
    faFilter,
    faBath
} from "@fortawesome/free-solid-svg-icons"


const sidebarData = [
    {
        icon: <FontAwesomeIcon icon={faChartBar} />,
        label: "Dashboard",
        path: "/"
    },
    {
        icon: <FontAwesomeIcon icon={faListCheck} />,
        label: "Projects",
        path: "/projects"
    },
    {
        icon: <FontAwesomeIcon icon={faFile} />,
        label: "Files",
        path: "/files"
    },
    {
        icon: <FontAwesomeIcon icon={faShield} />,
        label: "Security",
        path: "/security"
    },
    {
        icon: <FontAwesomeIcon icon={faFolder} />,
        label: "Folders",
        path: "/folders"
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        label: "Settings",
        path: "/settings"
    },
    {
        icon: <FontAwesomeIcon icon={faCode} />,
        label: "Code",
        path: "/code"
    },
    {
        icon: <FontAwesomeIcon icon={faFontAwesome} />,
        label: "Font Awesome",
        path: "/font-awesome"
    },
    {
        icon: <FontAwesomeIcon icon={faWebAwesome} />,
        label: "Web Awesome",
        path: "/web-awesome"
    },
    {
        icon: <FontAwesomeIcon icon={faFilter} />,
        label: "Filter",
        path: "/filter"
    },
    {
        icon: <FontAwesomeIcon icon={faBath} />,
        label: "Bath",
        path: "/bath"
    }
]

export default sidebarData