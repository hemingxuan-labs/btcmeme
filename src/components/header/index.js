import * as React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import home15 from '@/assets/image/home15.png'
import './index.scss'
import { MyButton } from '@/assets/mui-css/mui-css.js'
import web3Wallet from '@/utils/web3-wallet.js'
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
    const web3WalletNow = new web3Wallet()
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
    const walletAddress = useSelector((state) => state.wallet.walletAddress)
    const showWalletAddress = useSelector((state) => state.wallet.showWalletAddress)
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
                message="Cooming Soon"
                action={action}
            />
            <header className="header-box webkit-scrollbar-none pb-0">
                <div className="logo-box d-flex-center">
                    <img
                        className="me-4"
                        src={home15}
                        style={{
                            width: 44
                        }}
                        alt=""
                    />
                    BTCMEME
                </div>
                <div className="header-item-box">
                    {menuList.map((item) => {
                        return (
                            <div
                                key={item.title}
                                className="header-item text-nowrap"
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
                <div className="header-button">
                    {!walletAddress ? (
                        <MyButton
                            className="text-nowrap px-3"
                            onClick={() => {
                                web3WalletNow.requestSignature()
                            }}>
                            Connect Wallet
                        </MyButton>
                    ) : (
                        <div className="text-white">{showWalletAddress}</div>
                    )}
                </div>
            </header>
        </div>
    )
}
