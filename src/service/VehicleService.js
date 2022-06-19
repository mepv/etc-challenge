import Axios from "axios";
import authHeader from "./AuthHeader";

const VEHICLE_LIST_URL = "http://localhost:8080/api/v1/vehicles";

const getVehicles = () => {
    return Axios.get(VEHICLE_LIST_URL, { headers: authHeader() }); 
}

const vehicleService = {
    getVehicles,
}

export default vehicleService;