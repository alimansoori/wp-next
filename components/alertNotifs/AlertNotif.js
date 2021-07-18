import { useState } from 'react'
import { Alert } from 'react-bootstrap'

export function AlertNotif({ notif, notifs, setNotifs }) {

    const [show, setShow] = useState(true)

    const handleClose = () => {
        setShow(false)
        const newNotifs = notifs.filter((n) => n.title !== notif.title)
        setNotifs(newNotifs)
    }

    return (
        <Alert style={{direction:'rtl'}} variant={notif.variant} show={show} onClose={handleClose} dismissible>
            {notif.title && (<Alert.Heading style={{fontSize:'15px', marginBottom: '0'}}>{notif.title}</Alert.Heading>)}
            {
                notif.desc && (
                    <p>
                        {notif.desc}
                    </p>
                )
            }
        </Alert>
    )
}
