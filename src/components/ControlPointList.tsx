import React from "react";
import {List, ListItem} from "@material-ui/core";
import {ControlCoord, InstanceCoord} from "../constants/constants";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';


interface ControlPointListProps {
    readonly controlPoints: ControlCoord[];
    readonly deleteControlPoint: (coord: ControlCoord) => void;
}

export const ControlPointList: React.FC<ControlPointListProps> = ({controlPoints, deleteControlPoint}) => {

    return (
        <List>
            {controlPoints.map(el => {
                return (
                    <ListItem key={el.id}>
                        <ListItemText primary={el.id} secondary={"x: " + el.controlledX + " y: " + el.controlledY}/>

                        <IconButton edge="end" aria-label="delete" onClick={() => {
                            deleteControlPoint(el)
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                )
            })}
        </List>
    )
}