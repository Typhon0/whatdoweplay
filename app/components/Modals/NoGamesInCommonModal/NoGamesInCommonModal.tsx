import { NextPage } from "next";
import React, { SyntheticEvent } from "react";
import { Button, Modal } from "rsuite";


interface IProps {
    open: boolean
    handleClose:React.Dispatch<SyntheticEvent>
}
export const NoGamesInCommonModal: NextPage<IProps> = (props: IProps) => {

   

    return (
        <Modal backdrop="static" role="alertdialog" open={props.open} onClose={props.handleClose} size="xs">
            <Modal.Body>
                No games in commin found for the selected friends. Please retry with different one.
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.handleClose} appearance="subtle">
                    Cancel
                </Button>
                <Button onClick={props.handleClose} appearance="primary">
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

