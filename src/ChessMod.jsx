import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";

export const ChessMod = () => {
    const params = useParams();
    const id = params.chessId;
    const navigate = useNavigate();
    const [chess, setChess] = useState({
        name: '',
        birth_date: '',
        world_ch_won: 0,
        profile_url: '',
        image_url: ''
    });

    useEffect(() => {
        fetch("http://chess.sulla.hu/chess/" + id)
        .then(response => response.json())
        .then(sakkos =>  setChess(sakkos))
        .catch(err => console.log(err))
    }, [id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setChess(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        fetch("http://chess.sulla.hu/chess/" + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chess)
        }).then(() => navigate("/chess/" + id));
    }

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            <div>
                <h2>Sakkozó</h2>
                <div className="card col-sm3 d-inline-block m-1 p-2">
                    <form onSubmit={handleSubmit()}>
                        <div className="form-group row pb-3">
                            <label className="col-sm-2 col-form-label">Sakkozó neve:</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" className="form-control" defaultValue={chess.name} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="form-group row pb-3">
                            <label className="col-sm-2 col-form-label">Születési dátum:</label>
                            <div className="col-sm-9">
                                <input type="date" name="birth_date" className="form-control" defaultValue={chess.birth_date} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="form-group row pb-3">
                            <label className="col-sm-2 col-form-label">Nyert világbajnokságok:</label>
                            <div className="col-sm-9">
                                <input type="number" name="world_ch_won" className="form-control" value={chess.world_ch_won} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="form-group row pb-3">
                            <label className="col-sm-2 col-form-label"> Profil Url:</label>
                            <div className="col-sm-9">
                                <input type="text" name="profile_url" className="form-control" defaultValue={chess.profile_url} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="form-group row pb-3">
                            <label className="col-sm-2 col-form-label"> Kép URL:</label>
                            <div className="col-sm-9">
                                <input type="text" name="image_url" className="form-control" defaultValue={chess.image_url} onChange={handleInputChange} />
                                <img src={chess.image_url} height="200px" alt={chess.name}></img>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary"><i className="bi bi-pencil-square"></i></button>
                    </form>
                </div>
            </div>
        </div>
    );

}