import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/AuthService";
import vehicleService from "../service/VehicleService";
import "./component.css";

const VehicleComponent = () => {
    const [vehicles, setVehicles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showFormUpdate, setShowFormUpdate] = useState(false);
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [color, setColor] = useState("");
    let uuid = "";

    function setUUID(value) {
        uuid = value;
    }

    const displayForm = () => {
        setShowForm(!showForm);
    }

    const displayFormUpdate = () => {
        setShowFormUpdate(!showFormUpdate);
    }

    const navigate = useNavigate();

    useEffect(() => {
        vehicleService.getVehicles().then(
            (response) => {
                setVehicles(response.data);
            },
            (error) => {
                if (error.response && error.response.status === 403) {
                    authService.logout();
                    navigate("/");
                    window.location.reload();
                }
            }
        );
    }, []);

    const createVehicle = async (e) => {
        e.preventDefault();
        try {
            await vehicleService.addVehicle(make, model, color, year)
                .then(
                    () => {
                        navigate("/vehicles");
                        window.location.reload();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } catch (err) {
            console.log(err);
        };
    }

    // todo: review, not working at the moment
    const updateVehicle = async (e) => {
        e.preventDefault();
        try {
            await vehicleService.updateVehicle(uuid, make, model, color, year)
                .then(
                    () => {
                        navigate("/vehicles");
                        window.location.reload();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } catch (err) {
            console.log(err);
        };
    }

    const deleteVehicle = async () => {
        try {
            await vehicleService.deleteVehicle(uuid)
                .then(
                    () => {
                        navigate("/vehicles");
                        window.location.reload();
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        } catch (err) {
            console.log(err);
        };
    }

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
                                    <td>
                                        <button type="submit" className="btn btn-warning" name="update" onClick={() => { setUUID(v.uuid); displayFormUpdate(); updateVehicle(); }}>Update</button>
                                        <span> </span>
                                        <button type="submit" className="btn btn-danger" onClick={() => { setUUID(v.uuid); deleteVehicle(); }}>Delete</button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
            <button type="button" className="btn btn-primary" name="add" onClick={displayForm}>Add</button>
            {showForm && (
                <form onSubmit={createVehicle}>
                    <br></br>
                    <div className="input-group mb-3 form">
                        <input type="text"
                            placeholder="make"
                            className="form-control"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3 form">
                        <input type="text"
                            placeholder="model"
                            className="form-control"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3 form">
                        <input type="text"
                            placeholder="year"
                            className="form-control"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3 form">
                        <input type="text"
                            placeholder="color"
                            className="form-control"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Send</button>
                    <span> </span>
                    <button type="button" className="btn btn-primary" onClick={displayForm}>Cancel</button>
                </form>
            )}

            {showFormUpdate && (
                <form onSubmit={updateVehicle}>
                    <br></br>
                    <div className="input-group mb-3 form">
                        <input type="text"
                            placeholder="make"
                            className="form-control"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3 form">
                        <input type="text"
                            placeholder="model"
                            className="form-control"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3 form">
                        <input type="text"
                            placeholder="year"
                            className="form-control"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                    <div className="input-group mb-3 form">
                        <input type="text"
                            placeholder="color"
                            className="form-control"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Send</button>
                    <span> </span>
                    <button type="button" className="btn btn-primary" onClick={displayFormUpdate}>Cancel</button>
                </form>
            )}
        </div>
    );
}

export default VehicleComponent;