import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/AuthService";
import vehicleService from "../service/VehicleService";

const VehicleComponent = () => {
    const [vehicles, setVehicles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        vehicleService.getVehicles().then(
            (response) => {
                setVehicles(response.data);
            },
            (error) => {
                if (error.response && error.response.status === 403) {
                    authService.logout();
                    navigate("/login");
                    window.location.reload();
                }
            }
        );
    });

    return (
        <div>
            <h1 className="text-center">Vehicles</h1>
            <table className="table tables-striped">
                <thead>
                    <tr>
                        <td>Make</td>
                        <td>Model</td>
                        <td>Color</td>
                        <td>Year</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        vehicles.map(
                            v =>
                                <tr key={v.uuid}>
                                    <td>{v.make}</td>
                                    <td>{v.model}</td>
                                    <td>{v.color}</td>
                                    <td>{v.year}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default VehicleComponent;