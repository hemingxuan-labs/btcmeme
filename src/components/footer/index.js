import * as React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import home5 from '@/assets/image/home5.png'
import home6 from '@/assets/image/home6.png'
import home7 from '@/assets/image/home7.png'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const MySnackbar = styled(Snackbar)`
    .MuiSnackbarContent-message {
        color: #f7931c !important;
    }
`
export default function PrimarySearchAppBar() {
    const navigate = useNavigate()
    const menuList = [
        {
            title: 'AirDrop',
            path: 'mint'
        },
        {
            title: 'About',
            path: 'about'
        },
        {
            title: 'Economics',
            path: 'economics'
        },
        {
            title: 'Staking',
            path: '/staking'
        }
    ]
    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                anchorElement.scrollIntoView()
            }
        }
    }
    const [openSnackbar, setOpenSnackbar] = React.useState(false)
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSnackbar(false)
    }
    const action = (
        <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    )
    return (
        <div>
            <MySnackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={handleClose}
                message="Coming Soon"
                action={action}
            />
            <footer
                className="p-4 webkit-scrollbar-none"
                style={{ height: 149, background: '#F7931B', overflowX: 'auto' }}>
                <div className="container">
                    <div className="d-flex-between-center">
                        <p className="fs-5">BTCMEME</p>
                        <div className="d-none d-sm-flex">
                            {menuList.map((item) => {
                                return (
                                    <div
                                        key={item.title}
                                        className="mx-3"
                                        onClick={() => {
                                            if (item.path === '/staking') {
                                                setOpenSnackbar(true)
                                                return
                                            }
                                            scrollToAnchor(item.path)
                                        }}>
                                        {item.title}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="d-flex-center">
                            <a
                                href="https://twitter.com/BTC__MEME?t=9i6KLhgiQVCTQrzPatJk2A&s=09"
                                target="_blank"
                                rel="noreferrer">
                                <img className="mx-2" style={{ width: 34 }} src={home5} alt="" />
                            </a>
                            <a href="https://t.me/BTCMEMELABS" target="_blank" rel="noreferrer">
                                <img className="mx-2" style={{ width: 34 }} src={home6} alt="" />
                            </a>
                        </div>
                    </div>
                    <div
                        className="my-4"
                        style={{ width: '100%', height: '1px', background: '#000' }}></div>
                    <div className="fs-8 text-center">BTCMEME © 2023. All right reserved.</div>
                </div>
            </footer>
        </div>
    )
}
