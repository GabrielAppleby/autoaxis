import React, {useCallback, useEffect, useState} from "react";
import {Grid, List, ListItem} from "@material-ui/core";
import {useInstanceCoords} from "../../hooks/Conversion";
import {ControlCoord, Dataset, InstanceCoord} from "../../constants/constants";
import {EmbeddingChart} from "../charts/EmbeddingChart";
import {ControlPointList} from "../ControlPointList";
import Button from "@material-ui/core/Button";

interface InterpolationPanelProps {

}

export const InterpolationPanel: React.FC<InterpolationPanelProps> = () => {
    const [dataset, setDataset] = useState<Dataset>(Dataset.digits);
    const [request, setRequest] = useState<boolean>(true);
    const [coords, setCoords] = useState<InstanceCoord[] | undefined>([])
    const [controlPoints, setControlPoints] = useState<ControlCoord[]>([]);
    const handleDatasetChange = useCallback((dataset) => setDataset(dataset), [])
    const {
        loading: coordsLoading,
        results: coordsResults,
        error: coordsError
    } = useInstanceCoords(dataset, controlPoints, request);

    useEffect(() => {
        if (coordsResults){
            setRequest(false);
            setControlPoints([]);
        }
    }, [coordsResults])

    const addControlPoint = useCallback((item: ControlCoord) => {
        setControlPoints([...controlPoints, item]);
        }, [controlPoints]);

    const deleteControlPoint = useCallback((item: ControlCoord) => {
        const newControlPoints = [...controlPoints]
        const idx = newControlPoints.indexOf(item);
        newControlPoints.splice(idx, 1);
        setControlPoints(newControlPoints);
    }, [controlPoints]);

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Grid container>
                    <Grid item xs={12}>
                        <EmbeddingChart coords={coordsResults} controlPoints={controlPoints} addControlPoint={addControlPoint}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={() => {
                            setRequest(!request);
                        }}>
                            Do the thing
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <ControlPointList controlPoints={controlPoints} deleteControlPoint={deleteControlPoint}/>
            </Grid>
        </Grid>
    )
}