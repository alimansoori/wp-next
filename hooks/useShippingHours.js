
function useShippingHours() {
    const currentDate = new Date()
    let defaultHours = {
        1: '۱۲:۰۰ تا ۱۵:۰۰',
        2: '۱۵:۰۰ تا ۱۸:۰۰',
        3: '۱۸:۰۰ تا ۲۱:۰۰'
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