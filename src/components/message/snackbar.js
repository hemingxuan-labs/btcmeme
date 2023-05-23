import * as React from 'react'
import { useState } from 'react'
import { Snackbar, Alert } from '@mui/material'

export default function Message(props) {
    const { content, duration, type, iconShow } = props
    const [open, setOpen] = useState(true)
    // 关闭消息提示
    const handleClose = (event, reason) => {
        setOpen(false)
    }
    return (
        <Snackbar
            open={open}
            autoHideDuration={Number(duration.toString())}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            onClose={handleClose}>
            {iconShow ? (
                <Alert variant="filled" severity={type.toString()}>
                    {content.toString()}
                </Alert>
            ) : (
                <Alert icon={false} variant="filled" severity={type.toString()}>
                    {content.toString()}
                </Alert>
            )}
        </Snackbar>
    )
}
