
function useShippingHours() {
    const currentDate = new Date()
    let defaultHours = {
        1: '۱۵:۰۰ تا ۱۸:۰۰',
        2: '۱۸:۰۰ تا ۲۱:۰۰'
    }

    const getHours = (date) => {
        if ( currentDate.getHours() < 13 && currentDate.getHours() > 9 && currentDate.getDay() == date.getDay() ) {
            delete defaultHours[1]
        }
        return defaultHours
    }

    return {getHours}
}

export default useShippingHours