
function useAddDayToCurrent() {
    const currentDate = new Date()

    if (currentDate.getHours() > 10 && currentDate.getDay() == 4) {
        return 2
    }

    if (currentDate.getHours() > 10 || currentDate.getDay() == 5) {
        return 1
    }

    return 0
}

export default useAddDayToCurrent