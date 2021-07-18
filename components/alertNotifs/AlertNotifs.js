import { AlertNotif } from './AlertNotif'

export function AlertNotifs({ notifs, setNotifs }) {

    return (
        <>
            {
                notifs.map((notif, i) => (
                    <AlertNotif key={i} notif={notif} notifs={notifs} setNotifs={setNotifs} />
                ))
            }
        </>
    )
}
