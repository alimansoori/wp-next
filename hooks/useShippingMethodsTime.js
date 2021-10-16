import useAddDayToCurrent from "./useAddDayToCurrent"
import useShippingHours from "./useShippingHours"

function useShippingMethodsTime(shippingMethod = 'WC_Courier_Method') {
    const addDayToCurrent = useAddDayToCurrent()
    const {getHours} = useShippingHours()

    const getShippingMethodsTime = (shippingMethod) => {
        if (shippingMethod !== 'WC_Courier_Method') return [];
        let shippingDate = []
        const persianDays = [
            'یکشنبه',
            'دوشنبه',
            'سه‌شنبه',
            'چهارشنبه',
            'پنج‌شنبه',
            'جمعه',
            'شنبه',
        ]

        for (var i = 0; i < 5; i++) {
            const d = new Date()
            d.setDate(d.getDate() + (i + addDayToCurrent))
            shippingDate.push({
                shippingDate: {
                    date: d.toLocaleDateString('fa-IR'),
                    day: persianDays[d.getDay()]
                },
                hours: getHours(d)
            })
        }

        console.log(shippingDate)
        return shippingDate
    }

    return {getShippingMethodsTime}
}

export default useShippingMethodsTime