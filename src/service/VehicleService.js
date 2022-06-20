import Axios from "axios";
import authHeader from "./AuthHeader";

const VEHICLE_URL = "http://localhost:8080/api/v1/vehicles/";

const getVehicles = () => {
    return Axios.get(VEHICLE_URL, { headers: authHeader() });
}

const addVehicle = (make, model, color, year) => {
    return Axios.post(VEHICLE_URL, {
        make,
        model,
        color,
        year,
    },
        { headers: authHeader() }
    );
}

const updateVehicle = (uuid, make, model, color, year) => {
    return Axios.put(VEHICLE_URL + uuid, {
        make,
        model,
        color,
        year,
    },
        { headers: authHeader() }
    );
}

const deleteVehicle = (uuid) => {
    return Axios.delete(VEHICLE_URL + uuid, { headers: authHeader() })
}

const vehicleService = {
    getVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
}

export default vehicleService;