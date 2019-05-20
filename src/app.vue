<template>
    <div class="app">
        <Month
            v-for="cal in calendars"
            :key="`calendar-${cal.dates[0].date.getMonth()}-${cal.dates[0].date.getFullYear()}`"
            :calendar="cal" />
    </div>
</template>

<script>
    export default {
        name: 'App',
        components: {
            Month: require('./components/month').default
        },
        data() {
            return {
                lastDate: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                months: [
                    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
                ],
                today: null,
                calendars: [],
                reservationDaysLimit: 12,
                remainingOpenReservationDays: 13
            }
        },
        methods: {
            isLeapYear(year) {
                return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)
            },
            generateCalendars(ref) {
                // just querying the default date library
                // dates: [{
                //     date: Date object , openForReservation: true
                // }]

                // get previous days within the same month
                let calendarDates = []
                for (let i = 1; i < ref.getDate(); i++) {
                    let dateText = `${ref.getFullYear()}-${ref.getMonth() + 1}-${i}`
                    let newDay = {
                        date: new Date(dateText),
                        openForReservation: false
                    }
                    calendarDates.push(newDay)
                }

                // get next days within the same month
                for (let i = ref.getDate(); i <= this.lastDate[ref.getMonth()];
                    i++) {
                    let dateText = `${ref.getFullYear()}-${ref.getMonth() + 1}-${i}`
                    let newDay = {
                        date: new Date(dateText),
                        openForReservation: this.remainingOpenReservationDays > 0
                    }
                    calendarDates.push(newDay)

                    if (this.remainingOpenReservationDays > 0)
                        this.remainingOpenReservationDays--
                    else
                        this.remainingOpenReservationDays = 0
                }

                // get dates from the previous month to pad the week
                let prevDays = []
                if (calendarDates[0].date.getDay() > 0) {
                    let paddedDays = calendarDates[0].date.getDay() - 1
                    let month = ref.getMonth() > 1 ? ref.getMonth() - 1 : 11
                    let year = month != 11 ? ref.getFullYear() : ref.getFullYear() - 1
                    let monthEnd = this.lastDate[month]

                    for (let i = monthEnd - paddedDays; i <= monthEnd; i++) {
                        let dateText = `${year}-${month + 1}-${i}`
                        let newDay = {
                            date: new Date(dateText),
                            openForReservation: false
                        }
                        prevDays.push(newDay)
                    }
                }

                // get dates from the next month to pad the week
                let nextDays = []
                if (calendarDates[calendarDates.length - 1].date.getDay() < 6) {
                    let paddedDays = 7 - calendarDates[calendarDates.length - 1].date.getDay()
                    let month = ref.getMonth() < 10 ? ref.getMonth() + 1 : 0
                    let year = month != 0 ? ref.getFullYear() : ref.getFullYear() + 1

                    for (let i = 1; i < paddedDays; i++) {
                        let dateText = `${year}-${month + 1}-${i}`
                        let newDay = {
                            date: new Date(dateText),
                            openForReservation: false
                        }
                        nextDays.push(newDay)
                    }
                }

                let calendar = {
                    today: this.today,
                    prevDays: prevDays,
                    dates: calendarDates,
                    nextDays: nextDays
                }

                this.calendars.push(calendar)
            }
        },
        created() {
            this.today = new Date()

            // update list if it's a leap year
            if (this.isLeapYear(this.today.getFullYear()))
                this.$set(this.lastDate, 1, 29)

            this.generateCalendars(this.today)

            // generate next month if there are still open days left
            if (this.remainingOpenReservationDays > 0) {
                let newMonth = this.today.getMonth() < 11 ?
                    this.today.getMonth() + 1 : 0
                let newYear = newMonth > 0 ? this.today.getFullYear() :
                    this.today.getFullYear() + 1

                if (newMonth == 0) newYear++

                let newDate = new Date(`${newYear}-${newMonth + 1}-1`)
                this.generateCalendars(newDate)
            }
        }
    }
</script>

<style>
    .app {
        padding: 48px 0;
        margin: 0 auto;
        max-width: 1280px;
        width: 100vw;
    }
</style>
