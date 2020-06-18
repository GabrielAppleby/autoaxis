import React, {useCallback, useState} from "react";
import {Grid} from "@material-ui/core";

interface InterpolationPanelProps {

}

export const InterpolationPanel: React.FC<InterpolationPanelProps> = ({}) => {
    // const [dataset, setDataset] = useState<any>("mnist");
    // const handleDatasetChange = useCallback((props) => setDataset("mnist"), [])

    return (
        <Grid container>
            <Grid item xs={12} sm={6}>
                <Grid container>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Grid container>

                </Grid>
            </Grid>
        </Grid>
    )
}